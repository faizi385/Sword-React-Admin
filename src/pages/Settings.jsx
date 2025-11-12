import { motion } from 'framer-motion';
import { useState } from 'react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    siteName: 'Sword Admin',
    siteDescription: 'Modern Admin Dashboard',
    timezone: 'UTC+05:00',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    emailNotifications: true,
    pushNotifications: false,
    darkMode: true,
    compactMode: false,
  });

  const tabs = [
    { id: 'general', name: 'General' },
    { id: 'notifications', name: 'Notifications' },
    { id: 'appearance', name: 'Appearance' },
    { id: 'security', name: 'Security' },
    { id: 'billing', name: 'Billing' },
  ];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save settings logic here
    alert('Settings saved successfully!');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Name</label>
              <input
                type="text"
                name="siteName"
                value={formData.siteName}
                onChange={handleInputChange}
                className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Site Description</label>
              <textarea
                name="siteDescription"
                value={formData.siteDescription}
                onChange={handleInputChange}
                rows="3"
                className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Timezone</label>
                <select
                  name="timezone"
                  value={formData.timezone}
                  onChange={handleInputChange}
                  className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="UTC+05:00">(UTC+05:00) Islamabad, Karachi</option>
                  <option value="UTC+00:00">(UTC+00:00) London, Dublin</option>
                  <option value="UTC-05:00">(UTC-05:00) Eastern Time (US & Canada)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Date Format</label>
                <select
                  name="dateFormat"
                  value={formData.dateFormat}
                  onChange={handleInputChange}
                  className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#0b0b0b] rounded-lg border border-gray-800">
              <div>
                <h3 className="font-medium">Email Notifications</h3>
                <p className="text-sm text-gray-400">Receive email notifications for important updates</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="emailNotifications"
                  checked={formData.emailNotifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0b0b0b] rounded-lg border border-gray-800">
              <div>
                <h3 className="font-medium">Push Notifications</h3>
                <p className="text-sm text-gray-400">Enable browser push notifications</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="pushNotifications"
                  checked={formData.pushNotifications}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        );
      case 'appearance':
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between p-4 bg-[#0b0b0b] rounded-lg border border-gray-800">
              <div>
                <h3 className="font-medium">Dark Mode</h3>
                <p className="text-sm text-gray-400">Switch between light and dark theme</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={formData.darkMode}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
            <div className="flex items-center justify-between p-4 bg-[#0b0b0b] rounded-lg border border-gray-800">
              <div>
                <h3 className="font-medium">Compact Mode</h3>
                <p className="text-sm text-gray-400">Use compact spacing and smaller UI elements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="compactMode"
                  checked={formData.compactMode}
                  onChange={handleInputChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
              </label>
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-[#121212] rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-4">Change Password</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Current Password</label>
                  <input
                    type="password"
                    className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter current password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">New Password</label>
                  <input
                    type="password"
                    className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    className="w-full bg-[#0b0b0b] border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="Confirm new password"
                  />
                </div>
                <button className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Update Password
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#121212] rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
              <p className="text-gray-400 mb-4">Add an extra layer of security to your account by enabling two-factor authentication.</p>
              <button className="bg-gray-800 hover:bg-gray-700 text-white px-6 py-2 rounded-lg transition-colors">
                Enable 2FA
              </button>
            </div>
          </div>
        );
      case 'billing':
        return (
          <div className="space-y-6">
            <div className="p-6 bg-[#121212] rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-4">Current Plan</h3>
              <div className="p-4 bg-[#0b0b0b] rounded-lg border border-gray-800">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium">Pro Plan</h4>
                    <p className="text-sm text-gray-400">$29/month</p>
                  </div>
                  <span className="px-3 py-1 bg-green-900/50 text-green-400 text-sm rounded-full">Active</span>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400">Next billing date: <span className="text-white">December 12, 2023</span></p>
                </div>
              </div>
              <div className="mt-6">
                <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Change Plan
                </button>
              </div>
            </div>

            <div className="p-6 bg-[#121212] rounded-xl border border-gray-800">
              <h3 className="text-lg font-medium mb-4">Payment Methods</h3>
              <div className="p-4 bg-[#0b0b0b] rounded-lg border border-gray-800 mb-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className="h-10 w-16 bg-gray-800 rounded-lg flex items-center justify-center mr-4">
                      <span className="text-2xl">💳</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Visa ending in 4242</h4>
                      <p className="text-sm text-gray-400">Expires 12/25</p>
                    </div>
                  </div>
                  <button className="text-red-400 hover:text-red-300">
                    Remove
                  </button>
                </div>
              </div>
              <button className="text-red-500 hover:text-red-400 flex items-center">
                <span className="mr-2">+</span> Add Payment Method
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="p-6"
    >
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <div className="bg-[#121212] rounded-xl border border-gray-800 overflow-hidden">
        <div className="border-b border-gray-800">
          <nav className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-4 text-sm font-medium whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-red-500 border-b-2 border-red-500'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {renderTabContent()}
            {activeTab !== 'billing' && activeTab !== 'security' && (
              <div className="mt-8 pt-6 border-t border-gray-800 flex justify-end">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg mr-3 hover:bg-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Save Changes
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Settings;
