import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import Providers from "./providers"
import Navbar from "@/_component/navbar/page"
import Footer from "@/_component/footer/page"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col` }>
        <Providers>
          <Suspense fallback={null}>
            <Navbar />
            <main className="flex-1">
            {children}
            </main>
            <Footer />
          </Suspense>
        </Providers>
      </body>
    </html>
  )
}
