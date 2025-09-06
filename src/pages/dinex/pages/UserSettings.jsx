import React, { useState, useRef, useEffect } from 'react';
import { User, Key, Bell, CreditCard, Users, Eye, EyeOff, House, ChevronDown } from 'lucide-react';
import { alerta, VARIABLES } from '../../assets/js/utils';
import { ThemeToggle } from "../components/ThemeToggle";
import { DragDropZone } from '../components/DragDropZone';

import "../../assets/css/utils.css";

const Sidebar = ({ activeView, setActiveView }) => {
  return (
    <div className="sidebar top-0 left-0 z-40 w-70 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div className="h-full px-3 py-4 overflow-y-auto">
          <h2 className="text-2xl font-semibold mb-8">Settings</h2>
          <ul className="space-y-2 font-medium">
              <li>
                  <a href="/dinex" className="flex items-center gap-7 p-2 text-gray-900 rounded-lg group">
                  <span className="flex items-center justify-center w-5 h-5">
                      <House size={20} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Home</span>
                  </a>
              </li>
              <p className="text-gray-400 mt-4 mb-2 uppercase text-sm">Manage</p>
              <li>
                  <button href="#" className={`${activeView === 'account' ? 'active-menu-item' : 'menu-item'} flex items-center gap-7 p-2 text-gray-900 rounded-lg group w-full`}
                    onClick={() => setActiveView('account')}
                  >
                  <span className="flex items-center justify-center w-5 h-5">
                      <User size={20} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Account</span>
                  </button>
              </li>
              <li>
                  <button className={`${activeView === 'notifications' ? 'active-menu-item' : 'menu-item'} flex items-center gap-7 p-2 text-gray-900 rounded-lg group w-full`}
                    onClick={() => setActiveView('notifications')}
                  >
                  <span className="flex items-center justify-center w-5 h-5">
                      <Bell className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" size={24} />
                  </span>
                  <span className="text-l font-medium">Notifications</span>
                  </button>
              </li>
              <li>
                  <button className={`${activeView === 'billing' ? 'active-menu-item' : 'menu-item'} flex items-center gap-7 p-2 text-gray-900 rounded-lg group w-full`}
                    onClick={() => setActiveView('billing')}
                  >
                  <span className="flex items-center justify-center w-5 h-5">
                      <CreditCard size={24} className="text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  </span>
                  <span className="text-l font-medium">Billing</span>
                  </button>
              </li>
          </ul>
          <hr className="flex-1 mt-8 border-gray-300 dark:border-gray-600" />
          <ThemeToggle />
      </div>
    </div>
  );
}

const catalogos = {
  paises: [
    {
      "id": 1,
      "nombre": "México",
      "emoji_bandera": "mx.svg"
    },
    {
      "id": 2,
      "nombre": "Canadá",
      "emoji_bandera": "ca.svg"
    },
    {
      "id": 3,
      "nombre": "Estados Unidos",
      "emoji_bandera": "us.svg"
    },
    {
      "id": 4,
      "nombre": "Venezuela",
      "emoji_bandera": "ve.svg"
    },
    {
      "id": 5,
      "nombre": "Colombia",
      "emoji_bandera": "co.svg"
    },
    {
      "id": 6,
      "nombre": "Perú",
      "emoji_bandera": "pe.svg"
    },
    {
      "id": 7,
      "nombre": "Chile",
      "emoji_bandera": "cl.svg"
    },
    {
      "id": 8,
      "nombre": "Ecuador",
      "emoji_bandera": "ec.svg"
    },
    {
      "id": 9,
      "nombre": "República Dominicana",
      "emoji_bandera": "do.svg"
    },
    {
      "id": 10,
      "nombre": "Argentina",
      "emoji_bandera": "ar.svg"
    },
    {
      "id": 11,
      "nombre": "Brasil",
      "emoji_bandera": "br.svg"
    },
    {
      "id": 12,
      "nombre": "España",
      "emoji_bandera": "es.svg"
    },
    {
      "id": 13,
      "nombre": "Alemania",
      "emoji_bandera": "de.svg"
    },
    {
      "id": 14,
      "nombre": "Reino Unido",
      "emoji_bandera": "gb.svg"
    },
    {
      "id": 15,
      "nombre": "Japón",
      "emoji_bandera": "jp.svg"
    },
    {
      "id": 16,
      "nombre": "Rusia",
      "emoji_bandera": "ru.svg"
    },
    {
      "id": 17,
      "nombre": "China",
      "emoji_bandera": "cn.svg"
    }
  ]
}

export default function UserSettings() {
  const [activeView, setActiveView] = useState('account');

  const renderContent = () => {
    switch(activeView) {
      case 'account':
        return (
          <div className="max-w-2xl flex-grow overflow-y-auto p-4">
            <Account />
          </div>
        );
      case 'billing':
        return (
          <div className="max-w-2xl flex-grow overflow-y-auto p-4">
            <Billing />
          </div>
        );
      case 'notifications':
        return (
          <div className="max-w-2xl flex-grow overflow-y-auto p-4">
            <Notifications />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="text-left content flex h-screen w-full">
      {/* Sidebar */}
      <aside className="w-70 border-r border-gray-200 dark:border-gray-700">
          <Sidebar activeView={activeView} setActiveView={setActiveView} />
      </aside>

      {/* Main Content */}
      <div className="p-8 flex flex-col flex-grow">
        {renderContent()}
      </div>
    </div>
  );
}

const Account = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef(null);
  const [selectedOption, setSelectedOption] = useState({
    id: 1,
    nombre: 'México',
    emoji_bandera: 'mx.svg'
  });

  const [formData, setFormData] = useState({
    firstName: 'Josef',
    lastName: 'Albers',
    email: 'josef@subframe.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    pais: {
      nombre: 'México',
      codigo_iso: 'MX',
      moneda_local: 'MXN',
      simbolo_moneda: '$',
      emoji_bandera: 'mx.svg',
      formato_moneda: '$#,##0.00',
    }
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Cerrar el dropdown cuando se hace click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
  };
  return (
    <div className="max-w-2xl flex-grow overflow-y-auto p-4">
      <h2 className="text-4xl text-left font-semibold mb-2">Account</h2>
      <p className="text-gray-400 mb-8">Update your profile and personal details here</p>
      
      {/* Profile Section */}
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-6">Profile</h2>
        
        {/* Avatar */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-3">Avatar</label>
          <div className="flex items-center space-x-4 flex-row">
            <div className="w-16 h-16 bg-gray-600 rounded-full overflow-hidden flex">
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face" 
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
            {/* <button className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors">
              Upload
            </button> */}
            <DragDropZone />
          </div>
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

        {/* País */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-300 mb-2">País</label>
          {/* Select personalizado */}
          <div className="relative" ref={selectRef}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`country-select w-full px-4 py-4 border border-gray-700 rounded-xl text-left text-white hover:border-gray-600 focus:outline-none focus:border-gray-600 transition-all duration-200 flex items-center justify-between ${
                isOpen ? 'border-gray-600' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + selectedOption.emoji_bandera} alt={selectedOption.nombre} />
                <span className="text-base font-medium">{selectedOption.nombre}</span>
              </div>
              <ChevronDown 
                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                  isOpen ? 'transform rotate-180' : ''
                }`}
              />
            </button>

            {/* Dropdown */}
            {isOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-transparent border border-gray-700 rounded-xl shadow-2xl z-50 max-h-64 overflow-y-auto">
                {catalogos.paises.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className={`country-select w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                      selectedOption.id === option.id
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-white'
                    } ${
                      option === catalogos.paises[0] ? 'rounded-t-xl' : ''
                    } ${
                      option === catalogos.paises[catalogos.paises.length - 1] ? 'rounded-b-xl' : ''
                    }`}
                  >

                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden p-0.5">
                      <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + option.emoji_bandera} alt={option.nombre} />
                    </div>
                    <span className="text-base font-medium">{option.nombre}</span>

                  </button>
                ))}
              </div>
            )}
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
                className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
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
                className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
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
                className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
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
              <h3 className="font-medium !text-red-500 mb-1">Delete account</h3>
              <p className="text-sm text-gray-400">Permanently remove your account. This action is not reversible.</p>
            </div>
            <button className="px-4 py-2 !bg-red-600 hover:!bg-red-500 rounded-lg text-sm font-medium transition-colors">
              Delete account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const Notifications = () => {
  return (
    <div className="max-w-2xl flex-grow overflow-y-auto p-4">
      <h2 className="text-4xl text-left font-semibold mb-2">Notifications</h2>
      <p className="text-gray-400 mb-8">Update your profile and personal details here</p>
    </div>
  );
}

const Billing = () => {
  return (
    <div className="max-w-2xl flex-grow overflow-y-auto p-4">
      <h2 className="text-4xl text-left font-semibold mb-2">Billing</h2>
      <p className="text-gray-400 mb-8">Manage your billing information and payment methods here</p>
    </div>
  );
}