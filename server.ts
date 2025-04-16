import fs from 'node:fs/promises'
import express, { Request, Response } from 'express'
import { Transform } from 'node:stream'
import type { ViteDevServer } from 'vite'
import type { RequestHandler } from 'express'
import path from 'node:path'

// For missing module declaration
// This is needed to fix TypeScript warnings about missing module declarations
// @ts-ignore
// Define the render interface
interface RenderResult {
  pipe: (stream: Transform) => void;
  abort: () => void;
}

interface ServerRenderer {
  render: (
    url: string,
    options: {
      onShellError: () => void;
      onShellReady: () => void;
      onAllReady: () => void;
      onError: (error: Error) => void;
    }
  ) => RenderResult;
}

// Constants
const isProduction = process.env.NODE_ENV === 'production'
const port = process.env.PORT || 5173
const base = process.env.BASE || '/'

// Cached production assets
const templateHtml = isProduction
  ? await fs.readFile('./dist/client/index.html', 'utf-8')
  : ''

// Create http server
const app = express()

// Add Vite or respective production middlewares
let vite: ViteDevServer | undefined
if (!isProduction) {
  const { createServer } = await import('vite')
  vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom',
    base,
  })
  app.use(vite.middlewares)
  // Serve files from public directory in development
  app.use(express.static('public'))
} else {
  const { default: compression } = await import('compression')
  const { default: sirv } = await import('sirv')
  app.use(compression() as RequestHandler)
  app.use(base, sirv('./dist/client', { extensions: [] }) as RequestHandler)
  
  // In production, copy the _react_streaming.js file to dist/client directory
  const publicDir = path.resolve('./public')
  const streamingJsPath = path.join(publicDir, '_react_streaming.js')
  const distClientDir = path.resolve('./dist/client')
  
  try {
    const streamingJsContent = await fs.readFile(streamingJsPath, 'utf-8')
    await fs.writeFile(path.join(distClientDir, '_react_streaming.js'), streamingJsContent)
  } catch (err) {
    console.error('Error copying _react_streaming.js:', err)
  }
}

// Serve HTML
app.use('/', async (req: Request, res: Response) => {
  try {
    const url = req.originalUrl.replace(base, '')

    let template: string
    let render: ServerRenderer['render']
    if (!isProduction) {
      // Always read fresh template in development
      template = await fs.readFile('./index.html', 'utf-8')
      template = await vite!.transformIndexHtml(url, template)
      const serverModule = await vite!.ssrLoadModule('/src/entry-server.tsx') as ServerRenderer
      render = serverModule.render
    } else {
      template = templateHtml
      // Using a type assertion to help TypeScript understand this import
      const serverModule = await import('./dist/server/entry-server.js') as unknown as ServerRenderer
      render = serverModule.render
    }

    let didError = false

    // Enable streaming to send the skeleton quickly and update later
    const { pipe, abort } = render(url, {
      onShellError() {
        res.status(500)
        res.set({ 'Content-Type': 'text/html' })
        res.send('<h1>Something went wrong</h1>')
      },
      onShellReady() {
        // Called when the initial shell (with skeleton) is ready
        console.log('Shell ready - streaming initial HTML with skeleton...')
        res.status(didError ? 500 : 200)
        res.set({ 'Content-Type': 'text/html' })
        
        const [htmlStart, htmlEnd] = template.split(`<!--app-html-->`)
        res.write(htmlStart)

        const transformStream = new Transform({
          transform(chunk, encoding, callback) {
            callback(null, chunk)
          },
        })

        transformStream.pipe(res, { end: false })
        transformStream.on('end', () => {
          res.write(htmlEnd)
          res.end()
        })

        pipe(transformStream)
      },
      onAllReady() {
        // Called when all Suspense boundaries are resolved
        console.log('All content ready - complete streaming...')
      },
      onError(error: Error) {
        didError = true
        console.error('Error during rendering:', error)
      },
    })

    setTimeout(() => {
      abort()
    }, 0)
  } catch (e: any) {
    vite?.ssrFixStacktrace(e)
    console.log(e.stack)
    res.status(500).end(e.stack)
  }
})

// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`)
}) 