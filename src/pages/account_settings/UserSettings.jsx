import React, { useState } from 'react';
import { User, Key, Bell, CreditCard, Users, Eye, EyeOff, House } from 'lucide-react';

import "../assets/css/utils.css";
import { ThemeToggle } from "../dinex/components/ThemeToggle";
const Sidebar = () => {
  return (
    <div className="sidebar top-0 left-0 z-40 w-70 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-8">Settings</h2>
          <ul className="space-y-2 font-medium">
              <li>
                  <a href="/dinex" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                  <span className="flex items-center justify-center w-5 h-5">
                      <House size={20} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Home</span>
                  </a>
              </li>
              <li>
                  <a href="/app" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                  <span className="flex items-center justify-center w-5 h-5">
                      <User size={20} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Account</span>
                  </a>
              </li>
              <li>
                  <a href="/app/instrumentos" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                  <span className="flex items-center justify-center w-5 h-5">
                      <Bell className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" size={24} />
                  </span>
                  <span className="text-l font-medium">Instrumentos</span>
                  </a>
              </li>
              <li>
                  <a href="/app/ingresos" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg  group">
                  <span className="flex items-center justify-center w-5 h-5">
                      <CreditCard size={24} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Ingresos</span>
                  </a>
              </li>
          </ul>
          <hr className="flex-1 mt-8 border-gray-300 dark:border-gray-600" />
          <ThemeToggle />
      </div>
    </div>
  );
}

export default function AccountSettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: 'Josef',
    lastName: 'Albers',
    email: 'josef@subframe.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="text-left content-window flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-70 border-r border-gray-200 dark:border-gray-700">
          <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="p-8 flex flex-col flex-grow">
        <div className="max-w-2xl flex-grow overflow-y-auto p-4">
          <h2 className="text-4xl text-left font-semibold mb-2">Account</h2>
          <p className="text-gray-400 mb-8">Update your profile and personal details here</p>
          
          {/* Profile Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6">Profile</h2>
            
            {/* Avatar */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">Avatar</label>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
                  Upload
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-2">For best results, upload an image 512x512 or larger.</p>
            </div>
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            
            {/* Email */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
              <div className="relative">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Password Section */}
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-6">Password</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Current password</label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={formData.currentPassword}
                    onChange={(e) => handleInputChange('currentPassword', e.target.value)}
                    placeholder="Enter current password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New password</label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={formData.newPassword}
                    onChange={(e) => handleInputChange('newPassword', e.target.value)}
                    placeholder="Enter new password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">Your password must have at least 8 characters, include one uppercase letter, and one number.</p>
              </div>
              
              <div>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
                Change password
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div>
            <h2 className="text-lg font-medium mb-6">Danger zone</h2>
            <div className="border border-red-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-red-400 mb-1">Delete account</h3>
                  <p className="text-sm text-gray-400">Permanently remove your account. This action is not reversible.</p>
                </div>
                <button className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-medium transition-colors">
                  Delete account
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}