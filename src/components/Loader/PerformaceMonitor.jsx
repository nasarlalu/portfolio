"use client"

import { useState, useEffect } from "react"

export default function PerformanceMonitor() {
    const [metrics, setMetrics] = useState(null)

    useEffect(() => {
        const getPerformanceMetrics = () => {
            const navigation = performance.getEntriesByType("navigation")[0]
            const paintEntries = performance.getEntriesByType("paint")

            if (navigation) {
                const metrics = {
                    // Page load times
                    domContentLoaded: Math.round(navigation.domContentLoadedEventEnd - navigation.navigationStart),
                    fullyLoaded: Math.round(navigation.loadEventEnd - navigation.navigationStart),

                    // Network times
                    dnsLookup: Math.round(navigation.domainLookupEnd - navigation.domainLookupStart),
                    tcpConnection: Math.round(navigation.connectEnd - navigation.connectStart),
                    serverResponse: Math.round(navigation.responseEnd - navigation.requestStart),

                    // Paint times
                    firstPaint: paintEntries.find((entry) => entry.name === "first-paint")?.startTime || 0,
                    firstContentfulPaint: paintEntries.find((entry) => entry.name === "first-contentful-paint")?.startTime || 0,

                    // Resource count
                    totalResources: performance.getEntriesByType("resource").length,
                }

                setMetrics(metrics)
            }
        }

        // Wait for load event to ensure all metrics are available
        if (document.readyState === "complete") {
            setTimeout(getPerformanceMetrics, 100)
        } else {
            window.addEventListener("load", () => {
                setTimeout(getPerformanceMetrics, 100)
            })
        }
    }, [])

    if (!metrics) return null

    return (
        <div
            style={{
                position: "fixed",
                bottom: "20px",
                right: "20px",
                background: "rgba(0,0,0,0.8)",
                color: "white",
                padding: "15px",
                borderRadius: "8px",
                fontSize: "12px",
                fontFamily: "monospace",
                zIndex: 1000,
                maxWidth: "300px",
            }}
        >
            <h4 style={{ margin: "0 0 10px 0", color: "#00ff88" }}>Performance Metrics</h4>
            <div>DOM Ready: {metrics.domContentLoaded}ms</div>
            <div>Fully Loaded: {metrics.fullyLoaded}ms</div>
            <div>First Paint: {Math.round(metrics.firstPaint)}ms</div>
            <div>First Contentful Paint: {Math.round(metrics.firstContentfulPaint)}ms</div>
            <div>DNS Lookup: {metrics.dnsLookup}ms</div>
            <div>Server Response: {metrics.serverResponse}ms</div>
            <div>Resources Loaded: {metrics.totalResources}</div>
        </div>
    )
}
