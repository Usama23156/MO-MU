import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Navbar from "@/_component/navbar/page"
import Footer from "@/_component/footer/page"
import Providers from "./providers"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          <Suspense>
            <Navbar />
            {children}
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
