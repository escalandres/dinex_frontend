import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';
import { VARIABLES } from '../assets/js/utils';

export const CountrySelect = ({ countries, countrySelected, handleOptionClick }) => {
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);

    const handleToggleOpen = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    const handleSelectOption = (option, e) => {
        e.preventDefault();
        e.stopPropagation();
        handleOptionClick(option);
        setIsOpen(false);
    };

    return(
        <div className="">
        <label className="block text-sm font-medium text-gray-300 mb-2 text-left">Country you live in</label>
        {/* Select personalizado */}
        <div className="relative" ref={selectRef}>
            <button
                type="button" // Importante: especificar type="button"
                onClick={handleToggleOpen}
                onMouseDown={(e) => e.preventDefault()} // Prevenir pérdida de foco
                className={`country-select w-full px-4 py-4 border border-gray-700 rounded-xl text-left text-white hover:border-gray-600 focus:outline-none focus:border-gray-600 transition-all duration-200 flex items-center justify-between ${
                    isOpen ? 'border-gray-600' : ''
                }`}
            >
            <div className="flex items-center space-x-3">
                <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + countrySelected.flag_icon} 
                alt={countrySelected.name} />
                <span className="text-base font-medium">{countrySelected.name}</span>
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
                {countries.map((option) => (
                <button
                    key={option.id}
                    onClick={(e) => handleSelectOption(option, e)}
                    onMouseDown={(e) => e.preventDefault()}
                    className={`country-select w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors duration-150 flex items-center space-x-3 ${
                    countrySelected.id === option.id
                        ? 'bg-gray-700 text-blue-400'
                        : 'text-white'
                    } ${
                    option === countries[0] ? 'rounded-t-xl' : ''
                    } ${
                    option === countries[countries.length - 1] ? 'rounded-b-xl' : ''
                    }`}
                >

                    <div className="w-8 h-8 rounded-full flex items-center justify-center overflow-hidden p-0.5">
                    <img className="w-6 h-6 object-cover rounded-full" src={VARIABLES.icons.flags + option.flag_icon} alt={option.name} />
                    </div>
                    <span className="text-base font-medium">{option.name}</span>

                </button>
                ))}
            </div>
            )}
        </div>
        </div>
    )
}