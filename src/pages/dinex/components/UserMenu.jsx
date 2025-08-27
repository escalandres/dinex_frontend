import { useState } from 'react';

export const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left mx-2">
            <button
                id="dropdownInformationButton"
                onClick={() => setIsOpen(!isOpen)}
                className="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center nav-button"
                type="button"
            >
                Mi cuenta
                <svg
                className="w-2.5 h-2.5 ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
                >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                />
                </svg>
            </button>

            {isOpen && (
                <div
                className="absolute right-0 mt-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 dark:divide-gray-600"
                role="menu"
                aria-labelledby="dropdownInformationButton"
                >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-8 mb-2">
                        <div className="relative w-10 h-10 mb-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                            <svg className="absolute w-12 h-12 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        <span class="bg-green-500 font-bold text-white text-center py-1 px-2 text-xs rounded-full">Pro</span>
                    </div>
                    <div className="font-medium truncate">name@flowbite.com</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                    <a href="#" className="block !text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Suscripción
                    </a>
                    </li>
                    <li>
                    <a href="#" className="block !text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Configuración
                    </a>
                    </li>
                    {/* <li>
                    <a href="#" className="block text-white px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Earnings
                    </a>
                    </li> */}
                </ul>
                <div className="py-2">
                    <a
                    href="#"
                    className="block px-4 py-2 text-sm !text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                    Cerrar sesión
                    </a>
                </div>
                </div>
            )}
        </div>
    );
};