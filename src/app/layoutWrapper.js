"use client";
import { SessionProvider } from "next-auth/react"
export default function LayoutWrapper({ children }) {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
