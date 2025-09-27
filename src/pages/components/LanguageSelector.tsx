import { useTranslation } from "react-i18next";
import { VARIABLES } from '@pages/assets/js/utils';
import { useRef, useState } from "react";
import { ChevronDown } from 'lucide-react';

const supportedLanguages = [
    { code: "en", label: "English", icon: "us.svg" },
    { code: "es", label: "Español", icon: "mx.svg" },
];

export const LanguageSelector = () => {
    const savedLang = localStorage.getItem("lang");
    const [isOpen, setIsOpen] = useState(false);
    const [languageSelected, setLanguageSelected] = useState(
        supportedLanguages.find(lang => lang.code === (savedLang || "en")) || supportedLanguages[0]
    );

    const selectRef = useRef(null);

    const handleToggleOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const { i18n: i18nInstance, t:translations } = useTranslation();

    const handleChangeLanguage = (option) => {
        const lang = option.code;
        if (supportedLanguages.some(l => l.code === lang)) {
            i18nInstance.changeLanguage(lang);
            localStorage.setItem("lang", lang);
            setLanguageSelected(option);
            setIsOpen(false);
        }
    };

    return (
        <div className="">
            <label className="block text-sm font-medium text-gray-300 mb-2 text-left">{translations("language.select_language")}</label>
            {/* Select customization */}
            <div className="relative" ref={selectRef}>
                <button
                    type="button"
                    onClick={handleToggleOpen}
                    onMouseDown={(e) => e.preventDefault()} // Prevent losing focus
                    className={`country-select w-full px-4 py-4 border border-gray-700 rounded-xl text-left text-white hover:border-gray-600 focus:outline-none focus:border-gray-600 transition-all duration-200 flex items-center justify-between ${
                        isOpen ? 'border-gray-600' : ''
                    }`}
                >
                <div className="flex items-center space-x-3">
                    <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + languageSelected.icon} 
                    alt={languageSelected.label} />
                    <span className="text-base font-medium">{languageSelected.label}</span>
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
                    {supportedLanguages?.map((option) => (
                    <button
                        key={option.code}
                        onClick={() => handleChangeLanguage(option)}
                        onMouseDown={(e) => e.preventDefault()}
                        className={`country-select w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                        languageSelected.code === option.code
                            ? 'bg-gray-700 text-blue-400'
                            : 'text-white'
                        } ${
                        option === supportedLanguages[0] ? 'rounded-t-xl' : ''
                        } ${
                        option === supportedLanguages[supportedLanguages.length - 1] ? 'rounded-b-xl' : ''
                        }`}
                    >
    
                        <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden p-0.5">
                        <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + option.icon} alt={option.label} />
                        </div>
                        <span className="text-base font-medium">{option.label}</span>
    
                    </button>
                    ))}
                </div>
                )}
            </div>
            </div>
    );
};