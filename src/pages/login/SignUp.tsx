import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from 'lucide-react';
import { alerta, showLoader, hideLoader } from '../assets/js/utils';
import { registerSchema } from '@/validations/registerSchema';
import { OAuth } from './components/OAuth';
import { CountrySelect } from '@pages/components/CountrySelect';

import './components/login.css';

interface SignupFormData {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    lastname: string;
}

interface Country {
    id: number;
    name: string;
    flag_icon: string;
}

const SignUp = () => {
    document.title = 'Sign up | Dinex';
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [countrySelected, setCountrySelected] = useState<Country>({
        id: 1,
        name: 'México',
        flag_icon: 'mx.svg'
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: yupResolver(registerSchema),
        mode: "onBlur",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const theme = localStorage.theme;
                setIsDarkMode(theme === 'dark');
                const catalogCountries = await getCountriesCatalog();
                setCountries(catalogCountries);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        
        fetchData();
    }, []);

    // Function to toggle password visibility
    const togglePasswordVisibility = () => setShowPassword(prev => !prev);
    const toggleConfirmVisibility = () => setShowConfirm(prev => !prev);

    const handleOptionClick = (option) => {
        setCountrySelected(option);
    };

    const getCountriesCatalog = async () => {
        try {
            // Simulación de la solicitud de autenticación al servidor
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/catalogs/countries`);
            if (!response.ok) throw new Error('Error al obtener el catálogo de países');
            const result = await response.json();
            return result.countries;
        } catch (error) {
            console.error('Error fetching countries:', error);
            return [];
        }
    };

    const handleSignUp = async (data: SignupFormData) => {
        try {
            showLoader();
            console.log('countrySelected', countrySelected);
            console.log('data', data);
            // const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
            //     method: 'POST',
            //     headers: {
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify({ name: data.name.trim(), lastname: data.lastname.trim(), email: data.email.trim(), 
            //         password: data.password.trim(), country: countrySelected.id }),
            // });
            
            // hideLoader();
            // if (!response.ok) {
            //     alerta.error('Error al iniciar sesión');
            // }

            // const result = await response.json();

            // // Guardar el token o información del usuario en el almacenamiento local o en el estado
            // localStorage.setItem('token', result.token);

            // // Redireccionar o actualizar el estado de la aplicación
            // window.location.href = '/app';
            
        } catch (error) {
            hideLoader();
            alerta.error('Error al registrar el usuario. Intente de nuevo');
            console.log('error', error.message);
        }
    };

    return (
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-10 sm:px-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md md:max-w-lg lg:max-w-2xl">
                <div className="shadow p-4 py-6 space-y-8 sm:p-8 sm:rounded-lg">
                    <div className="text-center">
                        <a href="/login">
                            <img src="/icons/logo.png" alt="Dinex icon" width={80} className="mx-auto" />
                        </a>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-2xl">Create an account</h3>
                            <p className="">Do you have an account? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Sign in</a></p>
                        </div>
                    </div>
                    <OAuth isDarkMode={isDarkMode} />
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300 dark:bg-black-100"></span>
                        <p className={`inline-block w-fit text-sm ${isDarkMode ? 'text-white bg-[#121212]' : 'bg-[#FBF9FA] text-black'} px-2 absolute -top-2 inset-x-0 mx-auto`}>Or continue with</p>
                    </div>
                    <form
                        onSubmit={handleSubmit(handleSignUp)}
                        className="space-y-5 text-sm"
                    >
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-left">
                                <fieldset>
                                    <label className="font-medium">
                                        Name(s)
                                    </label>
                                    <input
                                        type="text"
                                        {...register("name")}
                                        placeholder='Enter your name'
                                        className={`${errors.name ? 'field-error' : 'bg-transparent text-gray-500'} w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                                    />
                                </fieldset>
                                {errors.name && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.name.message}</legend>
                                )}
                            </div>
                            <div className="text-left">
                                <fieldset>
                                    <label className="font-medium">
                                        Lastname(s)
                                    </label>
                                    <input
                                        type="text"
                                        {...register("lastname")}
                                        placeholder='Enter your last name'
                                        className={`${errors.lastname ? 'field-error' : 'bg-transparent text-gray-500'} w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                                    />
                                </fieldset>
                                {errors.lastname && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.lastname.message}</legend>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-left">
                                <fieldset>
                                    <label className="font-medium">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        {...register("email")}
                                        placeholder='Enter your email'
                                        className={`${errors.email ? 'field-error' : 'bg-transparent text-gray-500'} w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg`}
                                    />
                                </fieldset>
                                {errors.email && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.email.message}</legend>
                                )}
                            </div>
                            <CountrySelect 
                                countries={countries} 
                                countrySelected={countrySelected} 
                                handleOptionClick={handleOptionClick} 
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className="text-left">
                                <fieldset>
                                    <label className="font-medium">
                                        Password
                                    </label>
                                    <div className="relative w-full mt-2">
                                        <input
                                        type={showPassword ? "text" : "password"}
                                        {...register("password")}
                                        placeholder="Enter your password"
                                        className={`${errors.password ? 'field-error' : 'bg-transparent text-gray-500'} w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10`}
                                        />
                                        {
                                            showPassword ? <EyeOff className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} /> 
                                            : <Eye className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                                        }
                                    </div>
                                </fieldset>
                                {errors.password && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.password.message}</legend>
                                )}
                            </div>
                            <div className="flex-auto text-left">
                                <fieldset>
                                    <label className="font-medium">
                                        Confirm Password
                                    </label>
                                    <div className="relative w-full mt-2">
                                        <input
                                        type={showConfirm ? "text" : "password"}
                                        {...register("confirmPassword")}
                                        placeholder="Enter your password"
                                        className={`${errors.confirmPassword ? 'field-error' : 'bg-transparent text-gray-500'} w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10`}
                                        />
                                        {
                                            showConfirm ? <EyeOff className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={toggleConfirmVisibility} /> 
                                            : <Eye className="eye-icon absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer" onClick={toggleConfirmVisibility} />
                                        }
                                    </div>
                                </fieldset>
                                {errors.confirmPassword && (
                                    <legend className="mt-1 text-sm field-error-message">{errors.confirmPassword.message}</legend>
                                )}
                            </div>
                        </div>
                        <button
                            className="w-full my-4 px-4 py-2 text-white font-medium rounded-lg duration-150 mt-8"
                            type="submit"
                        >
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default SignUp;

// const catalogs = {
//   countries: [
//     {
//       "id": 1,
//       "name": "México",
//       "flag_icon": "mx.svg"
//     },
//     {
//       "id": 2,
//       "name": "Canadá",
//       "flag_icon": "ca.svg"
//     },
//     {
//       "id": 3,
//       "name": "Estados Unidos",
//       "flag_icon": "us.svg"
//     },
//     {
//       "id": 4,
//       "name": "Venezuela",
//       "flag_icon": "ve.svg"
//     },
//     {
//       "id": 5,
//       "name": "Colombia",
//       "flag_icon": "co.svg"
//     },
//     {
//       "id": 6,
//       "name": "Perú",
//       "flag_icon": "pe.svg"
//     },
//     {
//       "id": 7,
//       "name": "Chile",
//       "flag_icon": "cl.svg"
//     },
//     {
//       "id": 8,
//       "name": "Ecuador",
//       "flag_icon": "ec.svg"
//     },
//     {
//       "id": 9,
//       "name": "República Dominicana",
//       "flag_icon": "do.svg"
//     },
//     {
//       "id": 10,
//       "name": "Argentina",
//       "flag_icon": "ar.svg"
//     },
//     {
//       "id": 11,
//       "name": "Brasil",
//       "flag_icon": "br.svg"
//     },
//     {
//       "id": 12,
//       "name": "España",
//       "flag_icon": "es.svg"
//     },
//     {
//       "id": 13,
//       "name": "Alemania",
//       "flag_icon": "de.svg"
//     },
//     {
//       "id": 14,
//       "name": "Reino Unido",
//       "flag_icon": "gb.svg"
//     },
//     {
//       "id": 15,
//       "name": "Japón",
//       "flag_icon": "jp.svg"
//     },
//     {
//       "id": 16,
//       "name": "Rusia",
//       "flag_icon": "ru.svg"
//     },
//     {
//       "id": 17,
//       "name": "China",
//       "flag_icon": "cn.svg"
//     }
//   ]
// }