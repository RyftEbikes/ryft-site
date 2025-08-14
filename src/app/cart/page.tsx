'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import ActionBar from '../components/ActionBar';
import { useCart } from '../contexts/CartContext';
import { 
  TrashIcon, 
  PlusIcon, 
  MinusIcon, 
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function CartPage() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const { items: cartItems, removeFromCart, updateQuantity, getTotalPrice } = useCart();

  const subtotal = getTotalPrice();
  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Action Bar */}
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Your Cart
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
          </p>
        </motion.div>

        {cartItems.length === 0 ? (
          /* Empty Cart */
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`text-center py-20 ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-2xl shadow-xl`}
          >
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <BoltIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              Your cart is empty
            </h2>
            <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Ready to experience the future of electric riding?
            </p>
                         <button
               onClick={() => router.push('/configurator')}
               className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                 darkMode 
                   ? 'bg-blue-600 text-white hover:bg-blue-700' 
                   : 'bg-black text-white hover:bg-gray-800'
               }`}
             >
               Continue Shopping
             </button>
          </motion.div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl shadow-xl ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                >
                  <div className="flex items-center space-x-6">
                    {/* Product Image */}
                    <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                        {item.name}
                      </h3>
                      <div className="space-y-1 mb-4">
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          Color: <span className="font-medium">{item.color}</span>
                        </p>
                        {item.extendedWarranty && (
                          <p className={`text-sm ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                            ✓ Extended Warranty Included
                          </p>
                        )}
                      </div>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-4">
                        <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg border ${
                          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
                        }`}>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className={`p-1 rounded hover:bg-opacity-80 transition-colors ${
                              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                            }`}
                          >
                            <MinusIcon className="w-4 h-4" />
                          </button>
                          <span className={`w-8 text-center font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className={`p-1 rounded hover:bg-opacity-80 transition-colors ${
                              darkMode ? 'hover:bg-gray-600' : 'hover:bg-gray-200'
                            }`}
                          >
                            <PlusIcon className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className={`p-2 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-300 ${
                            darkMode ? 'text-gray-400 hover:bg-red-500' : 'text-gray-500 hover:bg-red-500'
                          }`}
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                        ${(item.totalPrice * item.quantity).toLocaleString()}
                      </div>
                      <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        ${item.totalPrice.toLocaleString()} each
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Order Summary */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className={`p-6 rounded-2xl shadow-xl h-fit ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
            >
              <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                Order Summary
              </h2>

              {/* Price Breakdown */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Subtotal</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    ${subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Shipping</span>
                  <span className={`font-semibold text-green-600`}>
                    Free
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={darkMode ? 'text-gray-300' : 'text-gray-600'}>Tax</span>
                  <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                    ${tax.toLocaleString()}
                  </span>
                </div>
                <div className={`border-t pt-4 ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
                  <div className="flex justify-between">
                    <span className={`text-lg font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Total</span>
                    <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                      ${total.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className={`space-y-4 mb-6 p-4 rounded-xl ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
                <div className="flex items-center space-x-3">
                  <ShieldCheckIcon className="w-5 h-5 text-green-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    3-Year Comprehensive Warranty
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <TruckIcon className="w-5 h-5 text-blue-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Free Shipping & Assembly
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCardIcon className="w-5 h-5 text-purple-500" />
                  <span className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    Secure Payment Processing
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button 
                onClick={() => router.push('/checkout')}
                className={`w-full py-4 px-6 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
                } shadow-lg hover:shadow-xl`}>
                Proceed to Checkout
              </button>

                             {/* Continue Shopping */}
               <button 
                 onClick={() => router.push('/configurator')}
                 className={`w-full mt-4 py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                   darkMode 
                     ? 'border border-gray-600 text-gray-300 hover:bg-gray-700' 
                     : 'border border-gray-300 text-gray-600 hover:bg-gray-100'
                 }`}>
                 Continue Shopping
               </button>
            </motion.div>
          </div>
        )}

        {/* Additional Features */}
        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>
              Why Choose Ryft?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-blue-600' : 'bg-blue-100'
                }`}>
                  <BoltIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Revolutionary Performance
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Experience unmatched power and precision with our cutting-edge electric technology.
                </p>
              </div>
              
              <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-green-600' : 'bg-green-100'
                }`}>
                  <ShieldCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Zero Maintenance
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  No oil changes, spark plugs, or transmission maintenance required.
                </p>
              </div>
              
              <div className={`text-center p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-purple-600' : 'bg-purple-100'
                }`}>
                  <TruckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                  Premium Support
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Expert assembly, delivery, and ongoing customer support included.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Footer */}
      <footer className={`py-16 px-6 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Ryft</h3>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Revolutionizing electric transportation with cutting-edge technology and sustainable design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Products</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/z" className="hover:text-white transition-colors">Ryft Z</a></li>
                <li><a href="/specs" className="hover:text-white transition-colors">Specifications</a></li>
                <li><a href="/cart" className="hover:text-white transition-colors">Shop</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="/contact" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="/languages" className="hover:text-white transition-colors">Languages</a></li>
                <li><a href="/profile" className="hover:text-white transition-colors">Account</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className={`space-y-2 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#terms" className="hover:text-white transition-colors">Terms</a></li>
              </ul>
            </div>
          </div>
          <div className={`border-t pt-8 text-center text-sm ${darkMode ? 'border-gray-700 text-gray-400' : 'border-gray-300 text-gray-600'}`}>
            <p>© 2024 Ryft. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
