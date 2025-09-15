import { useState } from 'react';

export const UserMenu = ({ token}) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="user-menu" className="relative inline-block text-left mx-2">
            <button
                id="dropdownInformationButton"
                onClick={() => setIsOpen(!isOpen)}
                className="font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center nav-button"
                type="button"
            >
                My profile
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
                className="user-menu absolute right-0 mt-2 z-10 divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:divide-gray-600"
                role="menu"
                >
                <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                    <div className="flex items-center space-x-8 mb-2">
                        <div className="relative w-10 h-10 mb-2 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                        {<img src={token.user?.profile_picture ? token.user.profile_picture : '/icons/default-avatar.png'} alt={token.user?.name} className="w-full h-full object-cover" />}
                        </div>
                        { token.user?.email_verified ? (
                            <span className="bg-green-500 font-bold text-white text-center py-1 px-2 text-xs rounded-full">Pro</span>
                        ) : (
                            <span className="bg-red-500 font-bold text-white text-center py-1 px-2 text-xs rounded-full">Inactive</span>
                        )}
                    </div>
                    <div className="font-medium text-gray-400 truncate">{token.user?.email}</div>
                </div>
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                    <li>
                    <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Subscription
                    </a>
                    </li>
                    <li>
                    <a href="/app/user-settings" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                        Settings
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
                    href="/logout"
                    className="block px-4 py-2 text-sm !text-red-500 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >
                    Log out
                    </a>
                </div>
                </div>
            )}
        </div>
    );
};