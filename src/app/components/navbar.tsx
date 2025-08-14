'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useCart } from '../contexts/CartContext'
import {
  GlobeAltIcon,
  UserIcon,
  ShoppingBagIcon,
  Bars3Icon
} from '@heroicons/react/24/outline'

export default function Navbar() {
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  
  return (
    <nav className="fixed top-0 left-0 w-full bg-[#0a0a0a] text-white px-6 py-4 flex items-center justify-between z-50 shadow-md">
      
      {/* Left: Z (link to Z model page) */}
      <Link href="/z">
        <span className="text-white text-base font-normal hover:text-gray-400 transition">Z</span>
      </Link>

      {/* Center: ryft logo as text */}
      <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
        <span className="text-2xl font-medium tracking-widest">ryft</span>
      </Link>

      {/* Right: Icon menu */}
      <div className="flex items-center space-x-5">
        <Link href="/languages">
          <GlobeAltIcon className="h-5 w-5 text-white hover:text-gray-300 transition cursor-pointer" title="Language" />
        </Link>
        <Link href="/profile">
          <UserIcon className="h-5 w-5 text-white hover:text-gray-300 transition cursor-pointer" title="Profile" />
        </Link>
        <Link href="/cart" className="relative">
          <ShoppingBagIcon className="h-5 w-5 text-white hover:text-gray-300 transition cursor-pointer" title="Cart" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartItemCount}
            </span>
          )}
        </Link>
        <Link href="/menu">
          <Bars3Icon className="h-6 w-6 text-white hover:text-gray-300 transition cursor-pointer" title="Menu" />
        </Link>
      </div>
    </nav>
  )
}
