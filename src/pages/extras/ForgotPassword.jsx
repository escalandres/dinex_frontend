import { useState } from 'react';
import { alerta, showLoader, hideLoader } from '../assets/js/utils';

const ForgotPassword = () => {
    document.title = 'Recuperar cuenta | Cosmos';
    const [email, setEmail] = useState('');

    const handleForgot = async (e) => {
        e.preventDefault();

        try {
            showLoader();
            // Simulación de la solicitud de autenticación al servidor
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/generate-otp`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email:email.trim() }),
            });
            hideLoader();
            // console.log(response);
            if (!response.ok) {
                alerta.error('Error al solicitar la recuperación de la cuenta. Inténtalo de nuevo.');
            }
            else{
                const data = await response.json();
                console.log(response);
                localStorage.setItem('tokenOTP', data.token); // Ejemplo
                // Redireccionar o actualizar el estado de la aplicación
                alerta.success('Se ha enviado un correo electrónico con las instrucciones para recuperar tu cuenta.');
                setEmail('');
            }
        } catch (error) {
            hideLoader();
            alerta.error('Error al solicitar la recuperación de la cuenta. Inténtalo de nuevo.');
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
                            <img src="/icons/dark-favicon.svg" alt="Cosmos" width={100} className="mx-auto" />
                        </a>
                        <div className="mt-5 space-y-2">
                            <h3 className="text-gray-800 text-2xl font-bold sm:text-xl">Recupera tu cuenta</h3>
                        </div>
                    </div>
                    <form
                        onSubmit={handleForgot}
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
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Recuperar contraseña
                        </button>
                    </form>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">O continua con</p>
                    </div>
                    <div className="text-center">
                        <p className="">¿No tienes cuenta en Cosmos? <a href="/registro" className="font-medium text-indigo-600 hover:text-indigo-500">Registrarse</a></p>
                    </div>
                    <div className="text-center">
                        <p className="">También puedes <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">iniciar sesión</a></p>
                    </div>
                </div>
            </div>
        </main>
        </>
    )
}

export default ForgotPassword;