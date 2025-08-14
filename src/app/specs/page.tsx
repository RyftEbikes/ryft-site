'use client';

import { useState } from 'react';
import ActionBar from '../components/ActionBar';

export default function SpecsPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <main className={`px-6 py-16 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      {/* Action Bar */}
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
      
      <h1 className={`text-4xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>Ryft One — Full Specs</h1>
      <div className="max-w-3xl mx-auto">
        <table className={`w-full text-left border ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>
          <tbody>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Peak Motor Power</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>80 HP (≈ 60 kW)</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Rear-Wheel Torque</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>938 Nm (≈ 664 lb-ft)</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Top Motor RPM</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>~14,200 rpm</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Dry Weight</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>~110 kg / 242 lb</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Battery</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>6.5 kWh, ~6h ride, 1–2h recharge</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Range</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Full MX race or 6h trail ride</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Frame</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Chromoly steel (~6 kg)</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Suspension Travel</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>310 mm front & rear</td>
            </tr>
            <tr>
              <td className={`p-3 font-semibold border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Ride Modes</td>
              <td className={`p-3 border-b ${darkMode ? 'border-gray-600' : 'border-gray-300'}`}>Fully adjustable</td>
            </tr>
          </tbody>
        </table>
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
  )
}
