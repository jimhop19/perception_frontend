import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import NavigationBar from './component/navBar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Perception',
  description: 'News reading App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div style={{width:"100vw",height:"10vh",backgroundColor:"white", position:"absolute",top:"0",zIndex:"10000000"}}></div>
        <NavigationBar/>
        {children}
      </body>
    </html>
  )
}
