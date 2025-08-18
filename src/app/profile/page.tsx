'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import ActionBar from '../components/ActionBar';
import { userStorage, type UserProfile, type Order } from '../utils/userStorage';
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

export default function ProfilePage() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showCreateAccount, setShowCreateAccount] = useState(false);
  const { t } = useLanguage();

  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
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

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);

  // Check for existing user session on component mount
  useEffect(() => {
    const currentUser = userStorage.getCurrentUser();
    if (currentUser) {
      setUserProfile(currentUser);
      setHasProfile(true);
    }
  }, []);

  // Load user orders when userProfile changes
  useEffect(() => {
    if (userProfile) {
      const userOrders = userStorage.getUserOrders(userProfile.id);
      setRecentOrders(userOrders);
    } else {
      setRecentOrders([]);
    }
  }, [userProfile]);

  const handleInputChange = (field: string, value: string) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStartEditing = () => {
    if (userProfile) {
      setEditForm({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
        address: userProfile.address,
        password: userProfile.password
      });
      setIsEditing(true);
    }
  };

  const handleSaveProfile = () => {
    if (userProfile) {
      try {
        const updatedUser = userStorage.updateUser(userProfile.id, editForm);
        setUserProfile(updatedUser);
        setHasProfile(true);
        setShowCreateAccount(false);
        setIsEditing(false);
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile. Please try again.');
      }
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleCreateProfile = () => {
    setShowCreateAccount(true);
    setShowLogin(false);
    setEditForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      password: ''
    });
    setIsEditing(true);
  };

  const handleSaveNewProfile = () => {
    try {
      const newUser = userStorage.createUser({
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
        password: editForm.password,
    avatar: '/gallery1.jpg',
        memberSince: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
        totalOrders: 0,
        totalSpent: 0
      });
      
      setUserProfile(newUser);
      setHasProfile(true);
      setShowCreateAccount(false);
      setIsEditing(false);
      setEditForm({
        name: '',
        email: '',
        phone: '',
        address: '',
        password: ''
      });
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again.');
    }
  };

  const handleLogout = () => {
    userStorage.logout();
    setHasProfile(false);
    setShowLogin(false);
    setShowCreateAccount(false);
    setUserProfile(null);
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
    if (loginForm.email && loginForm.password) {
      try {
        const user = userStorage.login(loginForm.email, loginForm.password);
        setUserProfile(user);
        setHasProfile(true);
        setShowLogin(false);
        setLoginForm({ email: '', password: '' });
      } catch (error) {
        console.error('Login error:', error);
        alert('Login failed. Please check your email and password.');
      }
    }
  };

  const handleLoginInputChange = (field: string, value: string) => {
    setLoginForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const tabs = [
    { id: 'profile', name: t('profile.title'), icon: UserIcon },
    { id: 'orders', name: t('profile.orders'), icon: TruckIcon },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon },
    { id: 'settings', name: 'Settings', icon: CogIcon },
    { id: 'security', name: 'Security', icon: ShieldCheckIcon }
  ];

  // Early return if no user profile and not creating account
  if (!userProfile && !showCreateAccount && !showLogin) {
    return (
      <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
        <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="text-center py-12">
            <UserIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                         <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('profile.welcome')}</h3>
             <p className="text-gray-600 mb-6">{t('profile.welcomeSubtitle')}</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={handleCreateProfile}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                                 {t('profile.createAccount')}
               </button>
             <button
                onClick={() => setShowLogin(true)}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                {t('profile.signIn')}
          </button>
        </div>
      </div>
        </div>
      </main>
    );
  }

  // Show login form
  if (showLogin) {
    return (
      <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
        <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <UserIcon className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                             <h2 className="text-2xl font-bold">{t('profile.signIn')}</h2>
               <p className="text-gray-600">{t('profile.welcomeBack')}</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }} className="space-y-6">
                <div>
                                     <label className="block text-sm font-medium mb-2">{t('profile.email')}</label>
                  <input
                    type="email"
                    required
                    value={loginForm.email}
                    onChange={(e) => handleLoginInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email"
                  />
    </div>
                
            <div>
                  <label className="block text-sm font-medium mb-2">Password</label>
                  <input
                    type="password"
                    required
                    value={loginForm.password}
                    onChange={(e) => handleLoginInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
            </div>
                
                                   <button
                     type="submit"
                     className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                   >
                     {t('profile.signIn')}
                   </button>
              </form>
              
              <div className="mt-6 text-center">
                                 <button
                   onClick={() => setShowLogin(false)}
                   className="text-blue-600 hover:text-blue-700"
                 >
                   {t('profile.backToOptions')}
               </button>
          </div>
        </div>
          </div>
    </div>
      </main>
    );
  }

  // Show create account form
  if (showCreateAccount) {
    return (
      <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
        <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
        <div className="max-w-6xl mx-auto px-6 py-16">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <UserIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                             <h2 className="text-2xl font-bold">{t('profile.createAccount')}</h2>
               <p className="text-gray-600">{t('profile.joinRyft')}</p>
    </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <form onSubmit={(e) => { e.preventDefault(); handleSaveNewProfile(); }} className="space-y-6">
            <div>
                  <label className="block text-sm font-medium mb-2">{t('profile.fullName')} *</label>
                  <input
                    type="text"
                    required
                    value={editForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profile.enterFullName')}
                  />
              </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('profile.email')} *</label>
                  <input
                    type="email"
                    required
                    value={editForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profile.enterEmail')}
                  />
            </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
                  <input
                    type="tel"
                    value={editForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profile.enterPhone')}
                  />
          </div>
                
            <div>
                  <label className="block text-sm font-medium mb-2">{t('profile.address')}</label>
                  <input
                    type="text"
                    value={editForm.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profile.enterAddress')}
                  />
      </div>

            <div>
                  <label className="block text-sm font-medium mb-2">{t('profile.password')} *</label>
                  <input
                    type="password"
                    required
                    value={editForm.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={t('profile.createPassword')}
                  />
              </div>
                
                <button
                  type="submit"
                  disabled={!editForm.name || !editForm.email || !editForm.password}
                  className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  {t('profile.createAccount')}
                </button>
              </form>
              
              <div className="mt-6 text-center">
                <button
                  onClick={() => setShowCreateAccount(false)}
                  className="text-blue-600 hover:text-blue-700"
                >
                  {t('profile.backToOptions')}
            </button>
          </div>
        </div>
      </div>
    </div>
      </main>
    );
  }

  // Main profile view
  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
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
            {t('profile.title')}
          </h1>
          <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            {t('profile.manage')}
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="flex border-b border-gray-200 overflow-x-auto">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
                  </button>
                ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {activeTab === 'profile' && userProfile && (
            <div className="space-y-8">
              {/* Profile Header */}
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden">
                    <img 
                      src={userProfile.avatar} 
                      alt="Profile" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute bottom-0 right-0 p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors">
                    <CameraIcon className="w-4 h-4" />
                  </button>
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2">{userProfile.name}</h2>
                  <p className="text-lg text-gray-600">Member since {userProfile.memberSince}</p>
                  <div className="flex items-center space-x-6 mt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold">{userProfile.totalOrders}</div>
                      <div className="text-sm text-gray-500">Orders</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">${userProfile.totalSpent.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">Total Spent</div>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={handleStartEditing}
                    className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <PencilIcon className="w-4 h-4" />
                    <span>Edit Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                  >
                    <ArrowRightIcon className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
            </div>
          </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-xl font-bold mb-6">{t('profile.contactInfo')}</h3>
                
                {isEditing ? (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.fullName')} *</label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('profile.enterFullName')}
                        />
          </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.email')} *</label>
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('profile.enterEmail')}
                        />
        </div>
      </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.phone')}</label>
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('profile.enterPhone')}
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.address')}</label>
                        <input
                          type="text"
                          value={editForm.address}
                          onChange={(e) => handleInputChange('address', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('profile.enterAddress')}
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.password')}</label>
                        <input
                          type="password"
                          value={editForm.password}
                          onChange={(e) => handleInputChange('password', e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder={t('profile.newPassword')}
                        />
            </div>
            <div>
                        <label className="block text-sm font-medium mb-2">{t('profile.confirmPassword')}</label>
                        <input
                          type="password"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Confirm new password"
                        />
                      </div>
                    </div>
                    
                    <div className="flex space-x-4 pt-4">
                      <button
                        onClick={handleSaveProfile}
                        disabled={!editForm.name || !editForm.email}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        {t('profile.saveChanges')}
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-medium hover:bg-gray-300 transition-colors"
                      >
                        {t('profile.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                                                 <div className="text-sm text-gray-500">{t('profile.email')}</div>
                         <div>{userProfile.email || t('profile.notSet')}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <PhoneIcon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                                                 <div className="text-sm text-gray-500">{t('profile.phone')}</div>
                         <div>{userProfile.phone || t('profile.notSet')}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPinIcon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                                                 <div className="text-sm text-gray-500">{t('profile.address')}</div>
                         <div>{userProfile.address || t('profile.notSet')}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <KeyIcon className="w-5 h-5 text-gray-400" />
                      <div className="flex-1">
                                                 <div className="text-sm text-gray-500">{t('profile.password')}</div>
                         <div>{userProfile.password ? t('profile.maskedPassword') : t('profile.notSet')}</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div>
                             <h3 className="text-xl font-bold mb-6">{t('profile.orders')}</h3>
              {recentOrders.length === 0 ? (
                <div className="text-center py-8">
                  <TruckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                     <h4 className="text-lg font-semibold mb-2">{t('profile.noOrders')}</h4>
                   <p className="text-gray-600 mb-4">{t('profile.noOrdersSubtitle')}</p>
                   <a
                     href="/configurator"
                     className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                   >
                     {t('profile.startShopping')}
                   </a>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="p-6 rounded-xl bg-gray-50 border">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-semibold">Order #{order.id}</h4>
                          <p className="text-sm text-gray-600">Date: {order.date}</p>
                          <p className="text-sm text-gray-600">Status: {order.status}</p>
                          <p className="text-sm text-gray-600">Items: {order.items.join(', ')}</p>
                        </div>
                        <div className="text-lg font-bold">${order.total.toLocaleString()}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div>
                             <h3 className="text-xl font-bold mb-6">Wishlist</h3>
              <div className="text-center py-8">
                <HeartIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                                   <h4 className="text-lg font-semibold mb-2">{t('profile.wishlistEmpty')}</h4>
                   <p className="text-gray-600 mb-4">{t('profile.wishlistSubtitle')}</p>
                   <a
                     href="/configurator"
                     className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                   >
                     {t('profile.startShopping')}
                   </a>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div>
                             <h3 className="text-xl font-bold mb-6">Settings</h3>
               <div className="text-center py-8">
                 <CogIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                 <h4 className="text-lg font-semibold mb-2">{t('profile.settingsComingSoon')}</h4>
                 <p className="text-gray-600">{t('profile.settingsSubtitle')}</p>
               </div>
          </div>
          )}

          {activeTab === 'security' && (
            <div>
                             <h3 className="text-xl font-bold mb-6">Security</h3>
               <div className="text-center py-8">
                 <ShieldCheckIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                 <h4 className="text-lg font-semibold mb-2">{t('profile.securityComingSoon')}</h4>
                 <p className="text-gray-600">{t('profile.securitySubtitle')}</p>
               </div>
        </div>
          )}
        </motion.div>
      </div>
    </main>
  );
}
