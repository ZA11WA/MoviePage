import Navbar from './components/Navbar'
import './globals.css'
import { Montserrat } from "@next/font/google"

const montserrat = Montserrat({
  weight: ['400','700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
})


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gradient-to-r bg-black`}>
      <Navbar/>
        {children}
      </body>
    </html>
  )
}
