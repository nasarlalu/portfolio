"use client"

import { useState, useEffect } from "react"
import styles from "./loader.module.scss"

export default function RealLoadingProgress({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [loadingStage, setLoadingStage] = useState("Initializing...")
  const [isComplete, setIsComplete] = useState(false)
  const [loadTime, setLoadTime] = useState(0)

  useEffect(() => {
    const startTime = performance.now()
    let animationFrame

    const updateProgress = () => {
      const now = performance.now()
      const elapsed = now - startTime

      // Get real performance metrics
      const navigation = performance.getEntriesByType("navigation")[0]
      const paintEntries = performance.getEntriesByType("paint")

      let currentProgress = 0
      let stage = "Loading..."

      // Stage 1: DOM Loading (0-30%)
      if (document.readyState === "loading") {
        currentProgress = Math.min((elapsed / 1000) * 15, 30) // Estimate based on time
        stage = "Loading DOM..."
      }
      // Stage 2: DOM Interactive (30-60%)
      else if (document.readyState === "interactive") {
        currentProgress = 30

        // Check if DOMContentLoaded has fired
        if (navigation && navigation.domContentLoadedEventEnd > 0) {
          const domLoadTime = navigation.domContentLoadedEventEnd - navigation.navigationStart
          currentProgress = 30 + Math.min((domLoadTime / 2000) * 30, 30)
        } else {
          currentProgress = 30 + Math.min((elapsed / 2000) * 30, 30)
        }
        stage = "Processing DOM..."
      }
      // Stage 3: Resources Loading (60-90%)
      else if (document.readyState === "complete") {
        currentProgress = 60

        // Get all resource entries
        const resources = performance.getEntriesByType("resource")
        const totalResources = resources.length
        const loadedResources = resources.filter((resource) => resource.responseEnd > 0).length

        if (totalResources > 0) {
          const resourceProgress = (loadedResources / totalResources) * 30
          currentProgress = 60 + resourceProgress
        } else {
          currentProgress = 60 + Math.min((elapsed / 3000) * 30, 30)
        }

        stage = `Loading resources... (${loadedResources}/${totalResources})`

        // Stage 4: Final rendering (90-100%)
        if (loadedResources === totalResources || elapsed > 3000) {
          currentProgress = 90

          // Check for paint events
          const firstPaint = paintEntries.find((entry) => entry.name === "first-paint")
          const firstContentfulPaint = paintEntries.find((entry) => entry.name === "first-contentful-paint")

          if (firstContentfulPaint) {
            currentProgress = 100
            stage = "Rendering complete!"

            const totalLoadTime = Math.round(elapsed)
            setLoadTime(totalLoadTime)
            setIsComplete(true)

            if (onComplete) {
              setTimeout(onComplete, 300)
            }
            return
          } else {
            currentProgress = 90 + Math.min((elapsed / 4000) * 10, 10)
            stage = "Final rendering..."
          }
        }
      }

      setProgress(Math.floor(currentProgress))
      setLoadingStage(stage)

      if (!isComplete && currentProgress < 100) {
        animationFrame = requestAnimationFrame(updateProgress)
      }
    }

    // Start monitoring
    updateProgress()

    // Fallback: Complete after maximum time
    const fallbackTimer = setTimeout(() => {
      if (!isComplete) {
        setProgress(100)
        setLoadingStage("Load complete!")
        setLoadTime(Math.round(performance.now() - startTime))
        setIsComplete(true)
        if (onComplete) onComplete()
      }
    }, 10000) // 10 second maximum

    // Listen for load events
    const handleLoad = () => {
      setTimeout(updateProgress, 100) // Small delay to ensure metrics are available
    }

    const handleDOMContentLoaded = () => {
      setTimeout(updateProgress, 50)
    }

    if (document.readyState === "complete") {
      handleLoad()
    } else {
      window.addEventListener("load", handleLoad)
      document.addEventListener("DOMContentLoaded", handleDOMContentLoaded)
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame)
      }
      clearTimeout(fallbackTimer)
      window.removeEventListener("load", handleLoad)
      document.removeEventListener("DOMContentLoaded", handleDOMContentLoaded)
    }
  }, [onComplete, isComplete])

  if (isComplete) {
    return null
  }

  return (
    <div className={styles.loading__container}>
      <div className={styles.loading__content}>
        <div className={styles.loading__spinner}></div>
        <h2 className={styles.loading__title}>Loading Your Site</h2>
        <div className={styles.loading__stage}>{loadingStage}</div>
        <div className={styles.progress__barContainer}>
          <div className={styles.progress__bar} style={{ width: `${progress}%` }}></div>
        </div>
        <div className={styles.progress__text}>{progress}%</div>
        {loadTime > 0 && <div className={styles.load__time}>Loaded in {loadTime}ms</div>}
      </div>
    </div>
  )
}
