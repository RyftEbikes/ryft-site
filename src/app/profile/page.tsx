'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { 
  UserIcon,
  CogIcon,
  ShieldCheckIcon,
  TruckIcon,
  HeartIcon,
  BellIcon,
  KeyIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CreditCardIcon,
  DocumentTextIcon,
  ArrowRightIcon,
  PencilIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  address: string;
  avatar: string;
  memberSince: string;
  totalOrders: number;
  totalSpent: number;
}

interface Order {
  id: string;
  date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'cancelled';
  items: string[];
  total: number;
}

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);

  const userProfile: UserProfile = {
    name: 'Alex Johnson',
    email: 'alex.johnson@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Electric Ave, Tech City, TC 12345',
    avatar: '/gallery1.jpg',
    memberSince: 'March 2024',
    totalOrders: 3,
    totalSpent: 32000
  };

  const recentOrders: Order[] = [
    {
      id: 'RYFT-001',
      date: '2024-03-15',
      status: 'delivered',
      items: ['Ryft Z Electric Motorcycle'],
      total: 25000
    },
    {
      id: 'RYFT-002',
      date: '2024-02-28',
      status: 'shipped',
      items: ['Ryft One Electric Bike'],
      total: 7000
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'orders', name: 'Orders', icon: TruckIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-500 bg-green-100';
      case 'shipped': return 'text-blue-500 bg-blue-100';
      case 'processing': return 'text-yellow-500 bg-yellow-100';
      case 'cancelled': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const renderProfileTab = () => (
    <div className="space-y-8">
      {/* Profile Header */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <div className="flex items-center space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={userProfile.avatar} 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            <button className={`absolute bottom-0 right-0 p-2 rounded-full ${
              darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
            } text-white transition-colors`}>
              <CameraIcon className="w-4 h-4" />
            </button>
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
              {userProfile.name}
            </h2>
            <p className={`text-lg ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Member since {userProfile.memberSince}
            </p>
            <div className="flex items-center space-x-6 mt-4">
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  {userProfile.totalOrders}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Orders
                </div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-black'}`}>
                  ${userProfile.totalSpent.toLocaleString()}
                </div>
                <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  Total Spent
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>
      </div>

      {/* Contact Information */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <EnvelopeIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</div>
              <div className={`${darkMode ? 'text-white' : 'text-black'}`}>{userProfile.email}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</div>
              <div className={`${darkMode ? 'text-white' : 'text-black'}`}>{userProfile.phone}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPinIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address</div>
              <div className={`${darkMode ? 'text-white' : 'text-black'}`}>{userProfile.address}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-6">
      <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
        Recent Orders
      </h3>
      {recentOrders.map((order) => (
        <div key={order.id} className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
                Order {order.id}
              </h4>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {new Date(order.date).toLocaleDateString()}
              </p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </span>
          </div>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                • {item}
              </div>
            ))}
          </div>
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
            <span className={`font-semibold ${darkMode ? 'text-white' : 'text-black'}`}>
              Total: ${order.total.toLocaleString()}
            </span>
            <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}>
              <span>View Details</span>
              <ArrowRightIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWishlistTab = () => (
    <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
      <HeartIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        Your Wishlist is Empty
      </h3>
      <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Start adding products to your wishlist to save them for later.
      </p>
      <a
        href="/"
        className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          darkMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
            : 'bg-black text-white hover:bg-gray-800'
        }`}
      >
        Browse Products
      </a>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
          Notifications
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Order Updates</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Get notified about your order status
              </div>
            </div>
            <button className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <div className="w-4 h-4 bg-white rounded-full ml-1 mt-1"></div>
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Product Updates</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Receive updates about new products
              </div>
            </div>
            <button className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-gray-600' : 'bg-gray-300'
            }`}>
              <div className="w-4 h-4 bg-white rounded-full ml-1 mt-1"></div>
            </button>
          </div>
        </div>
      </div>

      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
          Preferences
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className={`font-medium ${darkMode ? 'text-white' : 'text-black'}`}>Dark Mode</div>
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Use dark theme
              </div>
            </div>
            <button className={`w-12 h-6 rounded-full transition-colors ${
              darkMode ? 'bg-blue-600' : 'bg-blue-500'
            }`}>
              <div className="w-4 h-4 bg-white rounded-full ml-1 mt-1"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
          Security Settings
        </h3>
        <div className="space-y-4">
          <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <KeyIcon className="w-5 h-5" />
              <span>Change Password</span>
            </div>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <CreditCardIcon className="w-5 h-5" />
              <span>Payment Methods</span>
            </div>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
          <button className={`w-full flex items-center justify-between p-4 rounded-lg transition-colors ${
            darkMode 
              ? 'bg-gray-700 text-white hover:bg-gray-600' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}>
            <div className="flex items-center space-x-3">
              <DocumentTextIcon className="w-5 h-5" />
              <span>Privacy Policy</span>
            </div>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile': return renderProfileTab();
      case 'orders': return renderOrdersTab();
      case 'wishlist': return renderWishlistTab();
      case 'settings': return renderSettingsTab();
      case 'security': return renderSecurityTab();
      default: return renderProfileTab();
    }
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
            <UserIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
            My Profile
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Manage your account and preferences
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <div className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                      activeTab === tab.id
                        ? darkMode 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-blue-50 text-blue-600'
                        : darkMode 
                          ? 'text-gray-300 hover:bg-gray-700' 
                          : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    <span className="font-medium">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
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
