import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ravi Tomer | Software Development Engineer',
  description: 'Ravi Tomer is a Software Development Engineer building AI platforms, computer vision systems, and distributed backends.',
  openGraph: {
    title: 'Ravi Tomer | Software Development Engineer',
    description: 'Modern engineering README-style portfolio with projects, experience, and a functional CLI terminal.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="js">
      <head>
        <link rel="icon" href="/assets/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
