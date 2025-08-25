import { useState } from 'react';
import { alerta, showLoader, hideLoader } from '../js/utils';
import GoogleAuth from './components/auth/GoogleAuth';
import GitHubAuth from './components/auth/GitHubAuth';
import "./login.css";

const SignUp = () => {
    document.title = 'Registro | Cosmos';
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmVisibility = () => {
        setShowConfirm(!showConfirm);
    };

    const handleSignUp = async (e) => {
        e.preventDefault();

        try {
            if (password !== confirm) {
                alerta.error('Las contraseñas no coinciden');
            }
            else{
                showLoader();
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: name.trim(), lastname: lastname.trim(), email: email.trim(), password: password.trim() }),
                });
                hideLoader();
                if (!response.ok) {
                    alerta.error('Error al iniciar sesión');
                }

                const data = await response.json();

                // Guardar el token o información del usuario en el almacenamiento local o en el estado
                localStorage.setItem('token', data.token);

                // Redireccionar o actualizar el estado de la aplicación
                window.location.href = '/app';
            }
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
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-2xl">Crea tu cuenta</h3>
                            <p className="">¿Ya tienes una cuenta? <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">Iniciar sesion</a></p>
                        </div>
                    </div>
                    <div className="grid grid-cols-3 gap-x-3">
                        <GoogleAuth oauthClass="oauth-button" />
                        <GitHubAuth oauthClass="oauth-button" />
                    </div>
                    <div className="relative">
                        <span className="block w-full h-px"></span>
                        <p className="inline-block w-fit text-sm px-2 absolute -top-2 inset-x-0 mx-auto">O continua con</p>
                    </div>
                    <form
                        onSubmit={handleSignUp}
                        className="space-y-5 text-sm"
                    >
                        <div className="grid grid-cols-2 gap-x-4">
                            <div className="text-left">
                                <label className="font-medium">
                                    Nombre(s)
                                </label>
                                <input
                                    type="text"
                                    value={name} 
                                    placeholder='Escribe tu nombre'
                                    onChange={(e) => setName(e.target.value)} 
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                            <div className="text-left">
                                <label className="font-medium">
                                    Apellido(s)
                                </label>
                                <input
                                    type="text"
                                    value={lastname} 
                                    placeholder='Escribe tu nombre'
                                    onChange={(e) => setLastname(e.target.value)} 
                                    required
                                    className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                                />
                            </div>
                        </div>
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
                        <div className='grid grid-cols-2 gap-x-4'>
                            <div className="flex-auto text-left">
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
                            <div className="flex-auto text-left">
                                <label className="font-medium">
                                    Confirma tu contraseña
                                </label>
                                <div className="relative w-full mt-2">
                                    <input
                                        type={showConfirm ? "text" : "password"} // Alterna entre text y password
                                        value={confirm} 
                                        placeholder='Confirma tu contraseña'
                                        onChange={(e) => setConfirm(e.target.value)} 
                                        required
                                        className="w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg pr-10"
                                    />
                                    <i 
                                        className={`fa-solid ${showConfirm ? 'fa-eye-slash' : 'fa-eye'} absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer`}
                                        onClick={toggleConfirmVisibility}
                                    ></i>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            className="w-full my-4 px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </main>
    )
}

export default SignUp;