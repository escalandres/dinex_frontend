import { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Eye, EyeOff } from 'lucide-react';
import { alerta, showLoader, hideLoader } from '../assets/js/utils';
import { loginSchema } from '@/validations/loginSchema';
import { OAuth } from './components/OAuth';
import './components/login.css';

const Login = () => {
    document.title = 'Iniciar sesión | Cosmos';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

    const [isDarkMode, setIsDarkMode] = useState(false);
    
    const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: yupResolver(loginSchema),
            mode: "onBlur",});

    useEffect(() => {
        const theme = localStorage.theme;
        setIsDarkMode(theme === 'dark');
    }, []);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            showLoader();
            // Simulación de la solicitud de autenticación al servidor
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email.trim(), password:password.trim() }),
            });
            hideLoader();
            // console.log(response);
            if (!response.ok) {
                alerta.error('Error al iniciar sesión');
            }
            else{
                const data = await response.json();
                console.log(response);
                localStorage.setItem('token', data.token); // Ejemplo
                // Redireccionar o actualizar el estado de la aplicación
                window.location.href = '/app'; // Ejemplo
            }
        } catch (error) {
            hideLoader();
            console.log('error', error.message);
        }
    };

    return (
        <>
        <main className="w-full h-screen flex flex-col items-center justify-center sm:px-4 py-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                    <div className="text-center">
                        <a href="/">
                            <img src="/icons/logo.png" alt="Dinex icon" width={80} className="mx-auto" />
                        </a>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-2xl">Inicia sesión</h3>
                            <p className="">¿No tienes una cuenta? <a href="/registro" className="">Regístrate gratis</a></p>
                        </div>
                    </div>
                    <OAuth />
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300 dark:bg-black-100"></span>
                        <p className={`inline-block w-fit text-sm ${isDarkMode ? 'text-white bg-[#121212]' : 'bg-[#FBF9FA] text-black'} px-2 absolute -top-2 inset-x-0 mx-auto`}>O continua con</p>
                    </div>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div className="text-left">
                            <fieldset>
                                <label className="font-medium">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    {...register("email")}
                                    placeholder='Escribe tu correo electrónico'
                                    className={`${errors.email ? 'field-error' : 'bg-transparent text-gray-500'} w-full mt-2 px-3 py-2 outline-none border shadow-sm rounded-lg`}
                                />
                            </fieldset>
                            {errors.email && (
                                <legend className="mt-1 text-sm field-error-message">{errors.email.message}</legend>
                            )}
                        </div>
                        <div className="text-left">
                            <label className="font-medium">
                                Contraseña
                            </label>
                            <div className="relative w-full mt-2">
                                <input
                                    type={showPassword ? "text" : "password"} // Alterna entre text y password
                                    {...register("password")}
                                    placeholder="Escribe tu contraseña"
                                    className={`${errors.password ? 'field-error' : 'bg-transparent text-gray-500'} w-full px-3 py-2 outline-none border shadow-sm rounded-lg pr-10`}
                                />
                                <i 
                                    className={`eye-icon fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                                    onClick={togglePasswordVisibility}
                                ></i>
                            </div>
                            {errors.password && (
                                <legend className="mt-1 text-sm field-error-message">{errors.password.message}</legend>
                            )}
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-mediumrounded-lg duration-150 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 "
                            type="submit"
                        >
                            Iniciar sesión
                        </button>
                    </form>
                    <div className="text-center">
                        <a href="/recuperacion" className="hover:text-indigo-600">¿Olvidaste tu contraseña?</a>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default Login;