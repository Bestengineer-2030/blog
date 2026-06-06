import type { Metadata } from "next"
import "./globals.css"
import Header from "@/components/Header"

export const metadata: Metadata = {
  title: "Sachi — Gut Health & Building in Public",
  description: "Writing about gut performance for Hyrox athletes, agentic AI, and building a startup from scratch.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <Header />
        <main className="max-w-3xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-gray-100 mt-24">
          <div className="max-w-3xl mx-auto px-6 py-8 flex items-center justify-between text-sm text-gray-400">
            <span>© 2026 Sachi</span>
            <span style={{ color: '#E84C1E' }} className="font-bold">Gut Health · Agentic AI · Building</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
