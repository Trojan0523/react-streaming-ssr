/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 08:11:42
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 09:49:04
 * @Description: Server entry point for React SSR with Suspense
 */
import { StrictMode } from 'react'
import {
  type RenderToPipeableStreamOptions,
  renderToPipeableStream,
} from 'react-dom/server'
import App from './App'

export function render(_url: string, options?: RenderToPipeableStreamOptions) {
  // Create options with Suspense support for progressive streaming
  const streamingOptions: RenderToPipeableStreamOptions = {
    // Called when all the shell HTML is ready (includes skeleton)
    // This is the first flush point - we stream the skeleton immediately
    onShellReady() {
      console.log('Shell with initial skeleton is ready')
      options?.onShellReady?.();
    },
    
    // Called when all Suspense boundaries have been resolved
    // This is the second flush point - we've loaded all content
    onAllReady() {
      console.log('All content including suspended components is ready')
      options?.onAllReady?.();
    },
    
    // Called when there's an error during rendering
    onError(error: unknown) {
      console.error('Error during rendering:', error);
      options?.onError?.(error);
    },
    
    // Sets higher priority to shell content (skeleton)
    // This ensures the skeleton gets sent to the client faster
    bootstrapScripts: ['/_react_streaming.js'],
  };

  // Return the stream with all options combined
  return renderToPipeableStream(
    <StrictMode>
      <App />
    </StrictMode>,
    streamingOptions
  )
}
