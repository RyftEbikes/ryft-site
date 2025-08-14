'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { 
  GlobeAltIcon,
  CheckIcon,
  ArrowRightIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

interface Language {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
  description: string;
}

export default function LanguagesPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('en');

  const languages: Language[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
      flag: '🇺🇸',
      description: 'The primary language of Ryft'
    },
    {
      code: 'es',
      name: 'Spanish',
      nativeName: 'Español',
      flag: '🇪🇸',
      description: 'Idioma español para usuarios hispanohablantes'
    },
    {
      code: 'fr',
      name: 'French',
      nativeName: 'Français',
      flag: '🇫🇷',
      description: 'Langue française pour les utilisateurs francophones'
    },
    {
      code: 'de',
      name: 'German',
      nativeName: 'Deutsch',
      flag: '🇩🇪',
      description: 'Deutsche Sprache für deutschsprachige Benutzer'
    },
    {
      code: 'it',
      name: 'Italian',
      nativeName: 'Italiano',
      flag: '🇮🇹',
      description: 'Lingua italiana per utenti italofoni'
    },
    {
      code: 'pt',
      name: 'Portuguese',
      nativeName: 'Português',
      flag: '🇵🇹',
      description: 'Língua portuguesa para usuários lusófonos'
    },
    {
      code: 'ja',
      name: 'Japanese',
      nativeName: '日本語',
      flag: '🇯🇵',
      description: '日本語を話すユーザーのための言語'
    },
    {
      code: 'ko',
      name: 'Korean',
      nativeName: '한국어',
      flag: '🇰🇷',
      description: '한국어 사용자를 위한 언어'
    },
    {
      code: 'zh',
      name: 'Chinese',
      nativeName: '中文',
      flag: '🇨🇳',
      description: '为中文用户提供的语言'
    },
    {
      code: 'ar',
      name: 'Arabic',
      nativeName: 'العربية',
      flag: '🇸🇦',
      description: 'اللغة العربية للمستخدمين الناطقين بالعربية'
    },
    {
      code: 'hi',
      name: 'Hindi',
      nativeName: 'हिन्दी',
      flag: '🇮🇳',
      description: 'हिंदी भाषी उपयोगकर्ताओं के लिए भाषा'
    },
    {
      code: 'ru',
      name: 'Russian',
      nativeName: 'Русский',
      flag: '🇷🇺',
      description: 'Русский язык для русскоязычных пользователей'
    }
  ];

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
    // Here you would typically implement actual language switching logic
    // For now, we'll just update the state
  };

  const applyLanguage = () => {
    // Here you would implement the actual language application logic
    // For now, we'll just show an alert
    const selectedLang = languages.find(lang => lang.code === selectedLanguage);
    alert(`Language changed to ${selectedLang?.name}. This would typically reload the page with the new language.`);
  };

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      {/* Action Bar */}
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-blue-600' : 'bg-blue-100'
          }`}>
            <GlobeAltIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Choose Your Language
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Select your preferred language to view the Ryft website
          </p>
        </motion.div>

        {/* Language Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {languages.map((language, index) => (
            <motion.div
              key={language.code}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => handleLanguageSelect(language.code)}
              className={`p-6 rounded-2xl shadow-xl cursor-pointer transition-all duration-300 ${
                selectedLanguage === language.code
                  ? darkMode 
                    ? 'bg-blue-600 border-2 border-blue-400' 
                    : 'bg-blue-50 border-2 border-blue-500'
                  : darkMode 
                    ? 'bg-gray-800 hover:bg-gray-700 border-2 border-transparent' 
                    : 'bg-white hover:bg-gray-50 border-2 border-transparent'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{language.flag}</div>
                <div className="flex-1">
                  <h3 className={`text-lg font-bold mb-1 ${
                    selectedLanguage === language.code 
                      ? 'text-white' 
                      : darkMode ? 'text-white' : 'text-black'
                  }`}>
                    {language.name}
                  </h3>
                  <p className={`text-sm mb-2 ${
                    selectedLanguage === language.code 
                      ? 'text-blue-100' 
                      : darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {language.nativeName}
                  </p>
                  <p className={`text-xs ${
                    selectedLanguage === language.code 
                      ? 'text-blue-200' 
                      : darkMode ? 'text-gray-500' : 'text-gray-500'
                  }`}>
                    {language.description}
                  </p>
                </div>
                {selectedLanguage === language.code && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`w-6 h-6 rounded-full flex items-center justify-center ${
                      darkMode ? 'bg-white' : 'bg-blue-600'
                    }`}
                  >
                    <CheckIcon className={`w-4 h-4 ${
                      darkMode ? 'text-blue-600' : 'text-white'
                    }`} />
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Apply Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center"
        >
          <button
            onClick={applyLanguage}
            className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
              darkMode 
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700' 
                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700'
            } shadow-lg hover:shadow-xl`}
          >
            <LanguageIcon className="w-6 h-6" />
            <span>Apply Language</span>
            <ArrowRightIcon className="w-5 h-5" />
          </button>
        </motion.div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-16"
        >
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
              About Language Support
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                  🌍 Global Accessibility
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Ryft is committed to making our revolutionary electric vehicles accessible to riders worldwide. 
                  Our multi-language support ensures that everyone can experience the future of transportation.
                </p>
              </div>
              <div>
                <h3 className={`text-lg font-semibold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                  🔄 Continuous Updates
                </h3>
                <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  We regularly update our translations to ensure accuracy and cultural relevance. 
                  Your feedback helps us improve our language support for all users.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Language Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="mt-12"
        >
          <h2 className={`text-3xl font-bold text-center mb-12 ${darkMode ? 'text-white' : 'text-black'}`}>
            Language Features
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className={`text-center p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-green-600' : 'bg-green-100'
              }`}>
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                Complete Translation
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All website content, product descriptions, and user interface elements are fully translated.
              </p>
            </div>
            
            <div className={`text-center p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <LanguageIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                Localized Content
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Content is adapted to local preferences, units, and cultural considerations.
              </p>
            </div>
            
            <div className={`text-center p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-purple-600' : 'bg-purple-100'
              }`}>
                <CheckIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className={`text-xl font-bold mb-3 ${darkMode ? 'text-white' : 'text-black'}`}>
                Customer Support
              </h3>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Multi-language customer support available in all supported languages.
              </p>
            </div>
          </div>
        </motion.div>
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
