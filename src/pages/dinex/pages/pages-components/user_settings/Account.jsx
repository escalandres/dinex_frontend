import { useState, useRef, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { fileSchema } from '@validations/fileSchema';
import { passwordSchema } from '@validations/passwordSchema';
import { DragDropZone } from './DragDropZone';
import { CountrySelect } from '@pages/components/CountrySelect';
import { alerta } from '@pages/assets/js/utils';
import { ThemeToggle } from "@pages/dinex/components/ThemeToggle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";


export const Account = ({ user, token, countries }) => {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const selectRef = useRef(null);
    const [countrySelected, setCountrySelected] = useState({
        id: user.country.id || 1,
        name: user.country.name || 'México',
        flag_icon: user.country.flag_icon || 'mx.svg'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(passwordSchema),
        mode: "onBlur",});

    const [formData, setFormData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
        profile_picture: '',
        country: {
            id: 0,
            name: ''
        }
    });

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
        ...prev,
        [field]: value
        }));
    };

    // Close dropdown when clicking outside
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
        setCountrySelected(option);
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
                    src={user.profile_picture}
                    alt="Profile" 
                    className="w-full h-full object-cover"
                />
                </div>
                <DragDropZone />
            </div>
            </div>
            
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">First name</label>
                <input
                type="text"
                value={user.name}
                // onChange={(e) => handleInputChange('nombre', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Last name</label>
                <input
                type="text"
                value={user.lastname}
                // onChange={(e) => handleInputChange('apellido', e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
                />
            </div>
            </div>
            
            {/* Email */}
            <div className="mb-8">
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <div className="relative">
                <input
                type="email"
                value={user.email}
                // onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-3 py-2 pr-10 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                </div>
            </div>
            </div>

            {/* Country */}
            <CountrySelect 
                countries={countries} 
                countrySelected={countrySelected} 
                handleOptionClick={handleOptionClick} 
            />
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-medium transition-colors">
                Change your country
            </button>
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
                        {...register("currentPassword")}
                        placeholder="Enter current password"
                        className={`${errors.currentPassword ? 'field-error' : ''} w-full px-3 py-2 pr-10 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    />
                    <button
                        type="button"
                        onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                        className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
                    >
                        {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {errors.currentPassword && <p className="mt-1 text-sm field-error-message">{errors.currentPassword.message}</p>}
            </div>
            
            <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">New password</label>
                <div className="relative">
                <input
                    type={showNewPassword ? "text" : "password"}
                    {...register("newPassword")}
                    placeholder="Enter new password"
                    className={`${errors.newPassword ? 'field-error' : ''} w-full px-3 py-2 pr-10 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
                >
                    {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                </div>
                {errors.newPassword ? (
                    <legend className="mt-1 text-sm field-error-message">{errors.newPassword.message}</legend>
                ) : (
                    <legend className="text-xs text-gray-500 mt-1">Your password must have at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character.</legend>
                )}
            </div>
            <div>
                <div className="relative">
                <input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Re-type new password"
                    className={`${errors.confirmPassword ? 'field-error' : ''} w-full px-3 py-2 pr-10 border rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                />
                <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute eye-icon inset-y-0 right-0 pr-3 flex items-center"
                >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-sm field-error-message">{errors.confirmPassword.message}</p>}
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