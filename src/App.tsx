/*
 * @Author: BuXiongYu
 * @Date: 2025-04-15 08:11:42
 * @LastEditors: BuXiongYu
 * @LastEditTime: 2025-04-15 13:44:51
 * @Description: 请填写简介
 */
import './App.css'
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
    utils.loadJs('//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js')
    utils.loadJs('https://connect.facebook.net/en_US/sdk.js').then((res) => {
      console.log('loadJs', res)
    })
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
