import Navbar from "@/components/Navbar";
import "./globals.css";
import { ReactNode } from 'react'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
   <html lang="eng" >
      <head>
        <title>Pageantry Voting System</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <Navbar />
          <main className="container bg-gray-900">{children}</main>
      </body>
   </html>
  )
}