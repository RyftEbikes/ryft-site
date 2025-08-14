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
  password: string;
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
  const [hasProfile, setHasProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);

  const [userProfile, setUserProfile] = useState<UserProfile>({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    avatar: '/gallery1.jpg',
    memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    totalOrders: 0,
    totalSpent: 0
  });

  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    password: ''
  });

  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const recentOrders: Order[] = []; // Start with no orders for new accounts

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartEditing = () => {
    setEditForm({
      name: userProfile.name,
      email: userProfile.email,
      phone: userProfile.phone,
      address: userProfile.address,
      password: userProfile.password
    });
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    setUserProfile(prev => ({
      ...prev,
      ...editForm
    }));
    setHasProfile(true);
    setShowCreateAccount(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCreateProfile = () => {
    setShowCreateAccount(true);
    setShowLogin(false);
    // Initialize with empty profile data
    setUserProfile(prev => ({
      ...prev,
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      totalOrders: 0,
      totalSpent: 0
    }));
    // Start editing immediately
    setIsEditing(true);
    setEditForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });
  };

  const handleLogout = () => {
    setHasProfile(false);
    setShowLogin(false);
    setShowCreateAccount(false);
    setUserProfile({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: '',
      avatar: '/gallery1.jpg',
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
      totalOrders: 0,
      totalSpent: 0
    });
    setEditForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });
    setLoginForm({
      email: '',
      password: ''
    });
    setIsEditing(false);
    setActiveTab('profile');
  };

  const handleLogin = () => {
    // For demo purposes, we'll simulate a successful login
    // In a real app, this would validate against a backend
    if (loginForm.email && loginForm.password) {
      // Simulate finding a user profile
      setUserProfile({
        name: 'Demo User',
        email: loginForm.email,
    phone: '+1 (555) 123-4567',
        address: '123 Demo Street, Demo City, DC 12345',
        password: loginForm.password,
    avatar: '/gallery1.jpg',
        memberSince: 'January 2024',
        totalOrders: 2,
    totalSpent: 32000
      });
      setHasProfile(true);
      setShowLogin(false);
      setLoginForm({ email: '', password: '' });
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

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

  const renderProfileTab = () => {
    if (!hasProfile) {
      return (
        <div className="space-y-8">
          {/* Welcome Screen */}
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
            <div className={`w-24 h-24 mx-auto mb-6 rounded-full flex items-center justify-center ${
              darkMode ? 'bg-blue-600' : 'bg-blue-100'
            }`}>
              <UserIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className={`text-2xl font-bold mb-4 ${darkMode ? 'text-white' : 'text-black'}`}>
              Welcome to Ryft
            </h2>
            <p className={`mb-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Sign in to your existing account or create a new one to get started.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setShowLogin(true)}
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={handleCreateProfile}
                className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300 ${
                  darkMode 
                    ? 'bg-gray-700 text-white hover:bg-gray-600' 
                    : 'bg-gray-600 text-white hover:bg-gray-700'
                }`}
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      );
    }

    // Show login form
    if (showLogin) {
      return (
        <div className="space-y-8">
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                Sign In to Your Account
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Enter your credentials to access your profile.
              </p>
            </div>
            
            <div className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Email *
                </label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => handleLoginInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Password *
                </label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => handleLoginInputChange('password', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 text-white' 
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your password"
                />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={handleLogin}
                  disabled={!loginForm.email || !loginForm.password}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    !loginForm.email || !loginForm.password
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : darkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Sign In
                </button>
                <button
                  onClick={() => setShowLogin(false)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Back
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Don't have an account?{' '}
                  <button
                    onClick={() => {
                      setShowLogin(false);
                      handleCreateProfile();
                    }}
                    className={`text-blue-500 hover:text-blue-600 font-medium underline`}
                  >
                    Create one here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    // Show account creation form if profile exists but no data entered yet
    if (showCreateAccount) {
      return (
        <div className="space-y-8">
          {/* Account Creation Form */}
          <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
            <div className="text-center mb-8">
              <div className={`w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center ${
                darkMode ? 'bg-blue-600' : 'bg-blue-100'
              }`}>
                <UserIcon className="w-10 h-10 text-white" />
              </div>
              <h2 className={`text-2xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
                Complete Your Account
              </h2>
              <p className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Please provide your information to complete your account setup.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password *
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Create a password"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm Password *
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={!editForm.name || !editForm.email || !editForm.password}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    !editForm.name || !editForm.email || !editForm.password
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : darkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Create Account
                </button>
                <button
                  onClick={() => setShowCreateAccount(false)}
                  className={`px-8 py-3 rounded-lg font-semibold transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Back
                </button>
              </div>
              
              <div className="text-center pt-4">
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Already have an account?{' '}
                  <button
                    onClick={() => {
                      setShowCreateAccount(false);
                      setShowLogin(true);
                    }}
                    className={`text-blue-500 hover:text-blue-600 font-medium underline`}
                  >
                    Sign in here
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
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
                {userProfile.name || 'Your Name'}
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
            <div className="flex space-x-3">
          <button
                onClick={handleStartEditing}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              darkMode 
                ? 'bg-gray-700 text-white hover:bg-gray-600' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <PencilIcon className="w-4 h-4" />
                <span>Edit Profile</span>
              </button>
              <button
                onClick={handleLogout}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  darkMode 
                    ? 'bg-red-600 text-white hover:bg-red-700' 
                    : 'bg-red-500 text-white hover:bg-red-600'
                }`}
              >
                <ArrowRightIcon className="w-4 h-4" />
                <span>Logout</span>
          </button>
            </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl`}>
        <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
          Contact Information
        </h3>
          
          {isEditing ? (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email *
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your phone number"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address
                  </label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter your address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Password
                  </label>
                  <input
                    type="password"
                    value={editForm.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Enter new password (leave blank to keep current)"
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white' 
                        : 'bg-white border-gray-300 text-gray-900'
                    }`}
                    placeholder="Confirm new password"
                  />
                </div>
              </div>
              
              <div className="flex space-x-4 pt-4">
                <button
                  onClick={handleSaveProfile}
                  disabled={!editForm.name || !editForm.email}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    !editForm.name || !editForm.email
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : darkMode 
                        ? 'bg-blue-600 text-white hover:bg-blue-700' 
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  Save Changes
                </button>
                <button
                  onClick={handleCancelEdit}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    darkMode 
                      ? 'bg-gray-700 text-white hover:bg-gray-600' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <EnvelopeIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Email</div>
                  <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    {userProfile.email || 'Not set'}
                  </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <PhoneIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Phone</div>
                  <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    {userProfile.phone || 'Not set'}
                  </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <MapPinIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
            <div className="flex-1">
              <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Address</div>
                  <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    {userProfile.address || 'Not set'}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <KeyIcon className={`w-5 h-5 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <div className="flex-1">
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Password</div>
                  <div className={`${darkMode ? 'text-white' : 'text-black'}`}>
                    {userProfile.password ? '••••••••' : 'Not set'}
            </div>
          </div>
        </div>
      </div>
          )}
        </div>
      </div>
    );
  };

  const renderOrdersTab = () => {
    if (!hasProfile) {
      return (
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
          <TruckIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Create a Profile First
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You need to create a profile to view your order history and track purchases.
          </p>
          <button
            onClick={handleCreateProfile}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Create Profile
          </button>
    </div>
  );
    }

         return (
    <div className="space-y-6">
      <h3 className={`text-xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-black'}`}>
        Recent Orders
      </h3>
         <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
           <TruckIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
           <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
             No Orders Yet
           </h3>
           <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
             Start shopping to see your order history here.
           </p>
           <a
             href="/configurator"
             className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
               darkMode 
                 ? 'bg-blue-600 text-white hover:bg-blue-700' 
                 : 'bg-blue-600 text-white hover:bg-blue-700'
             }`}
           >
             Start Shopping
           </a>
            </div>
          </div>
     );
  };

  const renderWishlistTab = () => {
    if (!hasProfile) {
      return (
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
          <HeartIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Create a Profile First
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You need to create a profile to save products to your wishlist.
          </p>
          <button
            onClick={handleCreateProfile}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Create Profile
            </button>
    </div>
  );
    }

    return (
    <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
      <HeartIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
      <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
        Your Wishlist is Empty
      </h3>
      <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Start adding products to your wishlist to save them for later.
      </p>
      <a
          href="/configurator"
        className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
          darkMode 
            ? 'bg-blue-600 text-white hover:bg-blue-700' 
              : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        Browse Products
      </a>
    </div>
  );
  };

  const renderSettingsTab = () => {
    if (!hasProfile) {
      return (
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
          <CogIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Create a Profile First
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You need to create a profile to customize your settings and preferences.
          </p>
          <button
            onClick={handleCreateProfile}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Create Profile
          </button>
        </div>
      );
    }

    return (
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
  };

  const renderSecurityTab = () => {
    if (!hasProfile) {
      return (
        <div className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-xl text-center`}>
          <ShieldCheckIcon className={`w-16 h-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-300'}`} />
          <h3 className={`text-xl font-bold mb-2 ${darkMode ? 'text-white' : 'text-black'}`}>
            Create a Profile First
          </h3>
          <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            You need to create a profile to access security settings and manage your account.
          </p>
          <button
            onClick={handleCreateProfile}
            className={`inline-flex items-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
              darkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            Create Profile
          </button>
        </div>
      );
    }

    return (
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
  };

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
