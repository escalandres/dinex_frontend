import { useState } from 'react';
import { alerta, showLoader, hideLoader } from '../js/utils.js';
import GoogleAuth from './components/auth/GoogleAuth';
import GitHubAuth from './components/auth/GitHubAuth';

const Login = () => {
    document.title = 'Iniciar sesión | Cosmos';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showPassword, setShowPassword] = useState(false);

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
        <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-10 dark:bg-gray-50 sm:px-4 py-4">
            <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
                <div className="bg-white shadow p-4 py-6 space-y-8 sm:p-6 sm:rounded-lg">
                    <div className="text-center">
                        <a href="/">
                            <img src="/icons/finanzas.png" alt="Cosmos" width={80} className="mx-auto" />
                        </a>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-2xl">Inicia sesión</h3>
                            <p className="">¿No tienes una cuenta? <a href="/registro" className="font-medium text-indigo-600 hover:text-indigo-500">Regístrate gratis</a></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3">
                        <GoogleAuth />
                        <GitHubAuth />
                    </div>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">O continua con</p>
                    </div>
                    <form
                        onSubmit={handleLogin}
                        className="space-y-5"
                    >
                        <div className="text-left">
                            <label className="font-medium">
                                Correo electrónico
                            </label>
                            <input
                                type="email"
                                value={email}
                                placeholder='Escribe tu correo electrónico'
                                onChange={(e) => setEmail(e.target.value)} 
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <div className="text-left">
                            <label className="font-medium">
                                Contraseña
                            </label>
                            <div className="relative w-full mt-2">
                                <input
                                    type={showPassword ? "text" : "password"} // Alterna entre text y password
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Escribe tu contraseña"
                                    required
                                    className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
                                />
                                <i 
                                    className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                                    onClick={togglePasswordVisibility}
                                ></i>
                            </div>
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
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