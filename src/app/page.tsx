'use client';

import { useState } from 'react';
import { useLanguage } from './contexts/LanguageContext';
import ActionBar from './components/ActionBar';

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const { t } = useLanguage();

  return (
    <main className={darkMode ? 'dark' : ''}>
      {/* Action Bar */}
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />

      {/* Hero Section */}
      <section className={`relative w-full h-screen overflow-hidden ${darkMode ? 'bg-black text-white' : 'bg-white text-black'}`}>
        <video
          className="absolute top-0 left-0 w-full h-full object-cover opacity-70"
          autoPlay
          loop
          muted
          playsInline
          src="/Hero.mp4"
        />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center">
          <h1 className={`text-6xl md:text-8xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-black'}`}>RYFT</h1>
                     <p className={`mt-4 text-xl md:text-2xl ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>{t('home.moveDifferent')}</p>
           <a href="#features" className={`mt-8 px-6 py-3 font-semibold rounded hover:bg-gray-200 transition ${darkMode ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}>{t('home.explore')}</a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className={`py-20 px-6 md:px-20 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                 <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.performanceLeads')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div>
                         <h3 className="text-xl font-semibold">🔋 {t('home.range75')}</h3>
             <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.rangeSubtitle')}</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold">⚡ {t('home.torque80')}</h3>
             <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.torqueSubtitle')}</p>
           </div>
           <div>
             <h3 className="text-xl font-semibold">📱 {t('home.appControl')}</h3>
             <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.appSubtitle')}</p>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className={`py-20 px-6 md:px-20 ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                 <h2 className={`text-4xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.gallery')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="/gallery1.jpg" alt="Ryft bike 1" className="rounded shadow-lg" />
          <img src="/gallery2.jpg" alt="Ryft bike 2" className="rounded shadow-lg" />
          <img src="/gallery3.jpg" alt="Ryft bike 3" className="rounded shadow-lg" />
        </div>
      </section>

      {/* Our Mission */}
      <section className={`py-20 px-6 md:px-20 text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
                 <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.ourMission')}</h2>
        <div className="space-y-12">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full ${darkMode ? 'bg-white' : 'bg-black'}`}>
                <span className="text-2xl">🚀</span>
              </div>
            </div>
                           <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                 {t('home.pioneeringFuture')}
               </h3>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className={`p-8 rounded-2xl border shadow-xl ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
                             <p className={`text-xl md:text-2xl leading-relaxed mb-8 text-center ${darkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                 {t('home.missionText')}
               </p>
              
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className={`text-center p-6 rounded-xl border shadow-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                  <div className="mb-3 flex justify-center">
                    <span className="text-3xl">⚡</span>
                  </div>
                                     <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.power')}</h4>
                   <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.powerSubtitle')}</p>
                 </div>
                 <div className={`text-center p-6 rounded-xl border shadow-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                   <div className="mb-3 flex justify-center">
                     <span className="text-3xl">🎯</span>
                   </div>
                   <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.precision')}</h4>
                   <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.precisionSubtitle')}</p>
                 </div>
                 <div className={`text-center p-6 rounded-xl border shadow-md ${darkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-200'}`}>
                   <div className="mb-3 flex justify-center">
                     <span className="text-3xl">🌍</span>
                   </div>
                   <h4 className={`text-lg font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.purity')}</h4>
                   <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{t('home.puritySubtitle')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Ryft */}
      <section className={`py-20 px-6 md:px-20 text-center ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
                 <h2 className={`text-4xl font-bold mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.whyRyft')}</h2>
        <div className="space-y-12">
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className={`w-20 h-20 mx-auto flex items-center justify-center rounded-full ${darkMode ? 'bg-white' : 'bg-black'}`}>
                <span className={`text-2xl ${darkMode ? 'text-black' : 'text-white'}`}>✨</span>
              </div>
            </div>
                           <h3 className={`text-3xl md:text-4xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
                 {t('home.moreThanName')}
               </h3>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column - Philosophy */}
              <div className={`p-8 rounded-2xl border shadow-2xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                                 <h4 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.philosophy')}</h4>
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                                         <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.theRift')}</h5>
                     <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       {t('home.riftText')}
                     </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                                         <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.theRevolution')}</h5>
                     <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       {t('home.revolutionText')}
                     </p>
                  </div>
                </div>
              </div>

              {/* Right Column - Meaning */}
              <div className={`p-8 rounded-2xl border shadow-2xl ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                                 <h4 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.theMeaning')}</h4>
                <div className="space-y-6">
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                                         <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>{t('home.revolutionary')}</h5>
                     <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                       {t('home.revolutionaryText')}
                     </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                    <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>Y - Youthful</h5>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Embracing innovation and looking forward to the future with optimism and energy.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                    <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>F - Freedom</h5>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      The freedom to ride anywhere, anytime, without environmental guilt or mechanical worry.
                    </p>
                  </div>
                  
                  <div className={`p-6 rounded-xl border ${darkMode ? 'bg-gray-800 border-gray-600' : 'bg-gray-100 border-gray-300'}`}>
                    <h5 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>T - Technology</h5>
                    <p className={`leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Cutting-edge electric technology that pushes the boundaries of what's possible.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Quote */}
            <div className="mt-12 text-center">
              <div className={`p-8 rounded-2xl border shadow-2xl max-w-3xl mx-auto ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-300'}`}>
                <blockquote className={`text-2xl md:text-3xl font-bold mb-4 italic ${darkMode ? 'text-white' : 'text-black'}`}>
                  "Where silence speaks power."
                </blockquote>
                <p className={`text-lg ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  — The Ryft Philosophy
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className={`py-20 px-6 md:px-20 text-center ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
        <h2 className={`text-4xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>What is Ryft?</h2>
        <p className={`max-w-2xl mx-auto ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          Ryft isn't just an e-bike. It's a movement. Designed with precision, built with soul, and ready to redefine electric riding for a new generation.
        </p>
        <a href="/about" className={`mt-6 inline-block px-6 py-3 rounded hover:bg-gray-200 transition ${darkMode ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}>Learn More</a>
      </section>

      {/* CTA Section */}
      <section className={`py-20 px-6 md:px-20 text-center ${darkMode ? 'bg-black text-white' : 'bg-gray-100 text-black'}`}>
        <h2 className={`text-4xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>Ready to Ride?</h2>
        <p className={`mt-4 text-lg ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Preorder the Ryft One and join the electric movement.</p>
        <a href="/preorder" className={`mt-6 inline-block px-8 py-3 rounded font-semibold hover:bg-gray-200 transition ${darkMode ? 'bg-white text-black' : 'bg-black text-white hover:bg-gray-800'}`}>Preorder Now</a>
      </section>

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
