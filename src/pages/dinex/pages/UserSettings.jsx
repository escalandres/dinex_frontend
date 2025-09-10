import { useState } from 'react';
import { User, Bell, CreditCard, House } from 'lucide-react';
import { ThemeToggle } from "../components/ThemeToggle";
import { Account } from './pages-components/user_settings/Account';

import "@pages/assets/css/utils.css";

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

const catalogs = {
  countries: [
    {
      "id": 1,
      "name": "México",
      "flag_icon": "mx.svg"
    },
    {
      "id": 2,
      "name": "Canadá",
      "flag_icon": "ca.svg"
    },
    {
      "id": 3,
      "name": "Estados Unidos",
      "flag_icon": "us.svg"
    },
    {
      "id": 4,
      "name": "Venezuela",
      "flag_icon": "ve.svg"
    },
    {
      "id": 5,
      "name": "Colombia",
      "flag_icon": "co.svg"
    },
    {
      "id": 6,
      "name": "Perú",
      "flag_icon": "pe.svg"
    },
    {
      "id": 7,
      "name": "Chile",
      "flag_icon": "cl.svg"
    },
    {
      "id": 8,
      "name": "Ecuador",
      "flag_icon": "ec.svg"
    },
    {
      "id": 9,
      "name": "República Dominicana",
      "flag_icon": "do.svg"
    },
    {
      "id": 10,
      "name": "Argentina",
      "flag_icon": "ar.svg"
    },
    {
      "id": 11,
      "name": "Brasil",
      "flag_icon": "br.svg"
    },
    {
      "id": 12,
      "name": "España",
      "flag_icon": "es.svg"
    },
    {
      "id": 13,
      "name": "Alemania",
      "flag_icon": "de.svg"
    },
    {
      "id": 14,
      "name": "Reino Unido",
      "flag_icon": "gb.svg"
    },
    {
      "id": 15,
      "name": "Japón",
      "flag_icon": "jp.svg"
    },
    {
      "id": 16,
      "name": "Rusia",
      "flag_icon": "ru.svg"
    },
    {
      "id": 17,
      "name": "China",
      "flag_icon": "cn.svg"
    }
  ]
}

const token = 'Algo';

const user = {
  uuid: '123e4567-e89b-12d3-a456-426614174000',
  name: 'Andres',
  lastname: 'Escala',
  email: 'andres.escala.344@gmai.com',
  profile_picture: 'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  country: {
    id: 0,
    name: '',
    country_iso_code: '',
    currency: '',
    currency_symbol: '',
    currency_code: '',
    currency_format: '',
    flag_icon: '',
    language_code: 'en',
    timezone: 'America/Mexico_City'
  }
}

export default function UserSettings() {
  const [activeView, setActiveView] = useState('account');

  const renderContent = () => {
    switch(activeView) {
      case 'account':
        return (
          <div className="max-w-2xl flex-grow overflow-y-auto p-4">
            <Account user={user} token={token} countries={catalogs.countries} />
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



const Security = () => {
  return (
    <div className="max-w-2xl flex-grow overflow-y-auto p-4">
      <h2 className="text-4xl text-left font-semibold mb-2">Security</h2>
      <p className="text-gray-400 mb-8">Manage your account security settings here</p>
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