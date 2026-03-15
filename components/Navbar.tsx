"use client";

import { motion } from 'framer-motion';

export default function Navbar() {
  return (
    <motion.header 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 px-8 md:px-12 py-8 flex justify-between items-center pointer-events-none drop-shadow-md"
    >
      <nav className="hidden md:flex gap-10 text-[11px] font-bold tracking-[0.1em] text-white uppercase">
        <span className="cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">About</span>
        <span className="cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">Our Fleet</span>
        <span className="cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">Advantages</span>
        <span className="cursor-pointer pointer-events-auto hover:opacity-70 transition-opacity">Global</span>
      </nav>
      
      <div className="hidden md:flex gap-10 text-[11px] font-bold tracking-wide text-white pointer-events-auto">
        <span className="hover:opacity-70 transition-opacity cursor-pointer">+971 54 432 5050</span>
        <span className="hover:opacity-70 transition-opacity cursor-pointer lowercase">info@jeskojets.com</span>
      </div>
    </motion.header>
  );
}
