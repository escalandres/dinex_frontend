import { useState } from 'react';
import { User, Bell, CreditCard, House } from 'lucide-react';
import { ThemeToggle } from "../components/ThemeToggle";
import { Account } from './pages-components/user_settings/Account';

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

const token = 'Algo';

const user = {
  id: 1,
  nombre: 'Andres',
  apellido: 'Escala',
  email: 'andres.escala.344@gmai.com',
  profile_picture: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
  pais: {
    id: 0,
    nombre: '',
    codigo_iso: '',
    moneda_local: '',
    simbolo_moneda: '',
    emoji_bandera: '',
    formato_moneda: '',
  }
}

export default function UserSettings() {
  const [activeView, setActiveView] = useState('account');

  const renderContent = () => {
    switch(activeView) {
      case 'account':
        return (
          <div className="max-w-2xl flex-grow overflow-y-auto p-4">
            <Account user={user} token={token} paises={catalogos.paises} />
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