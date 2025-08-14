import './globals.css'
import { Sora } from 'next/font/google'
import Navbar from './components/navbar'
import { CartProvider } from './contexts/CartContext'

const sora = Sora({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
})

export const metadata = {
  title: 'Ryft',
  description: 'Electric bikes that break the mold.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={sora.className}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
