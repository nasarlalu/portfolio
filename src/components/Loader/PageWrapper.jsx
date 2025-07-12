"use client"

import React, { useState } from "react"
import RealLoadingProgress from "./LoadingProgress"
import PerformanceMonitor from "./PerformaceMonitor"

export default function RealPageWrapper({ children, showMetrics = false }) {
  const [isLoading, setIsLoading] = useState(true)

  const handleLoadingComplete = () => {
    setIsLoading(false)
  }

  return (
    <React.Fragment>
      {isLoading && <RealLoadingProgress onComplete={handleLoadingComplete} />}
      <div
        style={{
          opacity: isLoading ? 0 : 1,
          transition: "opacity 0.5s ease",
          minHeight: "100dvh",
        }}
      >
        {children}
      </div>
      {showMetrics && <PerformanceMonitor />}
    </React.Fragment>
  )
}
