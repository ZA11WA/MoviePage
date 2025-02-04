'use client'; // Ensure this component is client-side rendered
import { useState } from "react";
import Navbar from './components/Navbar';
import SidebarComponent from './components/SidebarComponent';
import './globals.css';
import { Montserrat } from "@next/font/google";

const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false); // Control sidebar state

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar visibility
  };

  return (
    <html lang="en">
      <body className={`${montserrat.className} bg-gradient-to-r bg-black`}>
        <Navbar toggleSidebar={toggleSidebar} />
        <SidebarComponent isOpen={isOpen} toggleSidebar={toggleSidebar} />
        {children}
      </body>
    </html>
  );
}
