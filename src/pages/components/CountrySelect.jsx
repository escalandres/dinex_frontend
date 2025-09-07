import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { VARIABLES } from '../assets/js/utils';

export const CountrySelect = ({ paises, countrySelected, handleOptionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);


    return(
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
                <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + countrySelected.emoji_bandera} 
                alt={countrySelected.nombre} />
                <span className="text-base font-medium">{countrySelected.nombre}</span>
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
                {paises.map((option) => (
                <button
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className={`country-select w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                    countrySelected.id === option.id
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-white'
                    } ${
                    option === paises[0] ? 'rounded-t-xl' : ''
                    } ${
                    option === paises[paises.length - 1] ? 'rounded-b-xl' : ''
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
    )
}