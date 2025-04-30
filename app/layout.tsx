import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { SharedDataProvider } from "@/context/shared-data-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Beastlink University",
  description: "Admission system dashboard for Beastlink University",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SharedDataProvider>{children}</SharedDataProvider>
      </body>
    </html>
  )
}
