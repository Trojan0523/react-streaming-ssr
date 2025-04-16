/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 08:11:42
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 16:44:24
 * @Description: 请填写简介
 */
import { Suspense, lazy, useEffect, useState } from 'react'
import { LayoutSkeleton } from './components/Skeleton'
import * as utils from './utils'

// Regular import for SSR
import Layout from './components/Layout'

function App() {
  // State to control when to show the actual layout
  const [showSkeleton, setShowSkeleton] = useState(true)
  
  // Simulate a delay before showing the actual content
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSkeleton(false)
    }, 800)  // Show skeleton for 800ms
    
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    console.log('start load js')
    utils.loadJsWithSRI('https://js.stripe.com/v3/')
    utils.loadJsWithSRI('https://x.klarnacdn.net/kp/lib/v1/api.js')
    utils.loadJsWithSRI('https://c.paypal.com/da/r/fb.js')
  })
  
  return (
    <>
      {showSkeleton ? (
        <LayoutSkeleton />
      ) : (
        <Layout />
      )}
    </>
  )
}

export default App
