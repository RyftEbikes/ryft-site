'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { 
  Bars3Icon,
  HomeIcon,
  BoltIcon,
  CogIcon,
  UserIcon,
  ShoppingBagIcon,
  GlobeAltIcon,
  HeartIcon,
  TruckIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  ArrowRightIcon,
  StarIcon,
  FireIcon,
  SparklesIcon,
  ChartBarIcon,
  CalendarIcon,
  EyeIcon
} from '@heroicons/react/24/outline';

interface MenuSection {
  id: string;
  title: string;
  icon: any;
  items: MenuItem[];
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  href: string;
  icon?: any;
  badge?: string;
}

export default function MenuPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeSection, setActiveSection] = useState('main');

  const menuSections: MenuSection[] = [
         {
       id: 'main',
       title: 'Main Navigation',
       icon: HomeIcon,
       items: [
         {
           id: 'home',
           name: 'Home',
           description: 'Return to the main page',
           href: '/',
           icon: HomeIcon
         },
         {
           id: 'z-model',
           name: 'Ryft Z',
           description: 'World\'s most powerful electric motorcycle',
           href: '/z',
           icon: BoltIcon,
           badge: 'New'
         },
         {
           id: 'preorder',
           name: 'Preorder Ryft Z',
           description: 'Secure your place in the future of electric transportation',
           href: '/preorder',
           icon: CalendarIcon,
           badge: 'Limited Time'
         },
         {
           id: 'about',
           name: 'About Us',
           description: 'Learn about our mission and values',
          href: '/about',
           icon: StarIcon
         },
        {
          id: 'compare',
          name: 'Compare Ebikes',
          description: 'Compare Ryft Z with competitors',
          href: '/compare',
          icon: ChartBarIcon,
          badge: 'New'
        },
         {
           id: 'contact',
           name: 'Contact Us',
           description: 'Get in touch with our team',
           href: '/contact',
           icon: PhoneIcon
         },
         {
           id: 'admin',
           name: 'Admin Dashboard',
           description: 'View system data and manage users',
           href: '/admin',
           icon: EyeIcon,
           badge: 'Admin'
         }
       ]
     },
    {
      id: 'account',
      title: 'Account & Profile',
      icon: UserIcon,
      items: [
        {
          id: 'profile',
          name: 'My Profile',
          description: 'Manage your account settings',
          href: '/profile',
          icon: UserIcon
        },
        {
          id: 'orders',
          name: 'Order History',
          description: 'View your past orders',
          href: '/profile?tab=orders',
          icon: TruckIcon
        },
        {
          id: 'wishlist',
          name: 'Wishlist',
          description: 'Your saved products',
          href: '/profile?tab=wishlist',
          icon: HeartIcon
        },
        {
          id: 'cart',
          name: 'Shopping Cart',
          description: 'View your cart items',
          href: '/cart',
          icon: ShoppingBagIcon
        }
      ]
    },
         {
       id: 'support',
       title: 'Support & Help',
       icon: ShieldCheckIcon,
       items: [
         {
           id: 'contact',
           name: 'Contact Us',
           description: 'Get in touch with our team',
           href: '/contact',
           icon: PhoneIcon
         },
         {
           id: 'faq',
           name: 'FAQ',
           description: 'Frequently asked questions',
           href: '/contact',
           icon: DocumentTextIcon
         },
         {
           id: 'warranty',
           name: 'Warranty',
           description: 'Warranty information and claims',
           href: '/contact',
           icon: ShieldCheckIcon
         }
       ]
     },
         
  ];

     const quickActions = [
     {
       name: 'Buy Now',
       description: 'Purchase your Ryft vehicle',
       href: '/cart',
       color: 'from-blue-600 to-purple-600'
     },
     {
       name: 'Support',
       description: 'Get help and support',
       href: '/contact',
       color: 'from-orange-600 to-red-600'
     }
   ];

  const renderMenuItem = (item: MenuItem) => (
    <motion.a
      key={item.id}
      href={item.href}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`block p-6 rounded-2xl transition-all duration-300 ${
        darkMode 
          ? 'bg-gray-800 hover:bg-gray-700 border border-gray-700' 
          : 'bg-white hover:bg-gray-50 border border-gray-200'
      } shadow-lg hover:shadow-xl`}
    >
      <div className="flex items-center space-x-4">
        {item.icon && (
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            darkMode ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <item.icon className={`w-6 h-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
          </div>
        )}
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className={`text-lg font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
              {item.name}
            </h3>
            {item.badge && (
              <span className="px-2 py-1 text-xs font-medium bg-red-500 text-white rounded-full">
                {item.badge}
              </span>
            )}
          </div>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {item.description}
          </p>
        </div>
        <ArrowRightIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
      </div>
    </motion.a>
  );

  const renderQuickAction = (action: any, index: number) => (
    <motion.a
      key={action.name}
      href={action.href}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`block p-6 rounded-2xl text-white font-semibold text-center transition-all duration-300 bg-gradient-to-r ${action.color} shadow-lg hover:shadow-xl`}
    >
      <h3 className="text-xl mb-2">{action.name}</h3>
      <p className="text-sm opacity-90">{action.description}</p>
    </motion.a>
  );

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
            <Bars3Icon className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            Menu
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Navigate through all sections of the Ryft website
          </p>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <h2 className={`text-2xl font-bold mb-6 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
            Quick Actions
          </h2>
                     <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
             {quickActions.map((action, index) => renderQuickAction(action, index))}
           </div>
        </motion.div>

        {/* Menu Sections */}
        <div className="space-y-12">
          {menuSections.map((section, sectionIndex) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + sectionIndex * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-6">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}>
                  <section.icon className={`w-5 h-5 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
                </div>
                <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  {section.title}
                </h2>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                {section.items.map((item) => renderMenuItem(item))}
              </div>
            </motion.div>
          ))}
        </div>

                 {/* Contact Information */}
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.8 }}
           className="mt-24 mb-20"
         >
           <div className={`p-12 rounded-3xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-2xl max-w-6xl mx-auto`}>
             <h2 className={`text-4xl font-bold mb-12 text-center ${darkMode ? 'text-white' : 'text-black'}`}>
               Get in Touch
             </h2>
             <div className="grid md:grid-cols-2 gap-16 max-w-4xl mx-auto">
               <div className="text-center group">
                 <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                   darkMode ? 'bg-blue-600 shadow-lg' : 'bg-blue-100 shadow-md'
                 }`}>
                   <PhoneIcon className="w-12 h-12 text-white" />
                 </div>
                 <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                   Call Us
                 </h3>
                 <p className={`text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   +1 (704) 349-7066
                 </p>
               </div>
               
               <div className="text-center group">
                 <div className={`w-24 h-24 mx-auto mb-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 ${
                   darkMode ? 'bg-green-600 shadow-lg' : 'bg-green-100 shadow-md'
                 }`}>
                   <EnvelopeIcon className="w-12 h-12 text-white" />
                 </div>
                 <h3 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
                   Email Us
                 </h3>
                 <p className={`text-xl font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                   support@ryftebikes.com
                 </p>
               </div>
             </div>
           </div>
         </motion.div>

                 {/* Footer */}
         <footer className={`py-20 px-8 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`}>
           <div className="w-full max-w-7xl mx-auto">
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
                   <li><a href="/about" className="hover:text-white transition-colors">About</a></li>
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
      </div>
    </main>
  );
}
