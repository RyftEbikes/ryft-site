'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ActionBar from '../components/ActionBar';
import { userStorage } from '../utils/userStorage';
import { 
  UserIcon,
  TruckIcon,
  HeartIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  TrashIcon
} from '@heroicons/react/24/outline';

export default function AdminPage() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [wishlist, setWishlist] = useState<any[]>([]);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      // Access private methods through a simple workaround
      const allData = userStorage.exportAllData();
      const parsed = JSON.parse(allData);
      setUsers(parsed.users || []);
      setOrders(parsed.orders || []);
      setWishlist(parsed.wishlist || []);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  };

  const exportData = () => {
    try {
      const data = userStorage.exportAllData();
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ryft-data-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };

  const clearAllData = () => {
    if (confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      try {
        userStorage.clearAllData();
        loadData();
        alert('All data cleared successfully');
      } catch (error) {
        console.error('Error clearing data:', error);
      }
    }
  };

  const tabs = [
    { id: 'users', name: 'Users', icon: UserIcon, count: users.length },
    { id: 'orders', name: 'Orders', icon: TruckIcon, count: orders.length },
    { id: 'wishlist', name: 'Wishlist', icon: HeartIcon, count: wishlist.length }
  ];

  const renderUsersTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">User Accounts ({users.length})</h3>
        <button
          onClick={exportData}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <DocumentArrowDownIcon className="w-4 h-4" />
          <span>Export All Data</span>
        </button>
      </div>
      
      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No users found
        </div>
      ) : (
        <div className="grid gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{user.name}</h4>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-sm text-gray-500">{user.phone}</p>
                  <p className="text-sm text-gray-500">{user.address}</p>
                  <p className="text-xs text-gray-400">
                    Member since: {user.memberSince} | Orders: {user.totalOrders} | Total: ${user.totalSpent.toLocaleString()}
                  </p>
                </div>
                <div className="text-xs text-gray-400">
                  ID: {user.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderOrdersTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Orders ({orders.length})</h3>
      
      {orders.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No orders found
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div key={order.id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">Order #{order.id}</h4>
                  <p className="text-sm text-gray-600">Date: {order.date}</p>
                  <p className="text-sm text-gray-500">Status: {order.status}</p>
                  <p className="text-sm text-gray-500">Type: {order.orderType}</p>
                  <p className="text-sm text-gray-500">Items: {order.items.join(', ')}</p>
                  <p className="text-sm font-semibold">Total: ${order.total.toLocaleString()}</p>
                </div>
                <div className="text-xs text-gray-400">
                  User ID: {order.userId}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderWishlistTab = () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Wishlist Items ({wishlist.length})</h3>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No wishlist items found
        </div>
      ) : (
        <div className="grid gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow border">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold">{item.productName}</h4>
                  <p className="text-sm text-gray-600">Price: ${item.price.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">Added: {new Date(item.addedAt).toLocaleDateString()}</p>
                </div>
                <div className="text-xs text-gray-400">
                  User ID: {item.userId}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <ActionBar darkMode={darkMode} onDarkModeToggle={setDarkMode} />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className={`w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center ${
            darkMode ? 'bg-red-600' : 'bg-red-100'
          }`}>
            <EyeIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Admin Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            View and manage all user data and system information
          </p>
        </motion.div>

        {/* Warning */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <p className="text-yellow-800 text-sm">
              <strong>⚠️ Admin Access:</strong> This page shows all user data stored in the system. 
              In production, this should be protected with proper authentication and authorization.
            </p>
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8 flex justify-center space-x-4"
        >
          <button
            onClick={exportData}
            className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <DocumentArrowDownIcon className="w-5 h-5" />
            <span>Export All Data</span>
          </button>
          <button
            onClick={clearAllData}
            className="flex items-center space-x-2 px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
          >
            <TrashIcon className="w-5 h-5" />
            <span>Clear All Data</span>
          </button>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <div className="flex border-b border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span>{tab.name}</span>
                <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Tab Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {activeTab === 'users' && renderUsersTab()}
          {activeTab === 'orders' && renderOrdersTab()}
          {activeTab === 'wishlist' && renderWishlistTab()}
        </motion.div>
      </div>
    </main>
  );
}
