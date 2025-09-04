import { useState } from 'react';
import { alerta, showLoader, hideLoader } from '../assets/js/utils';
import { jwtDecode } from 'jwt-decode';

const ChangePassword = () => {
    document.title = 'Cambiar contraseña | Cosmos';
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    // Función para alternar la visibilidad de la contraseña
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const toggleConfirmVisibility = () => {
        setShowConfirm(!showConfirm);
    };

    // Función para alternar el estado de habilitado/deshabilitado
    const toggleDisabled = () => {
        setIsDisabled(!isDisabled);
    };

    const handleCheckOtp = async (e) => {
        e.preventDefault();

        try {
            showLoader();
            const tokenOTP = localStorage.getItem('tokenOTP');
            // Verifica si existe el token en el localStorage
            if (!tokenOTP) {
                hideLoader();
                alerta.error('Intente recuperar su cuenta desde el dispositivo donde solicitó el cambio de contraseña');
            }else{
                const decoded = jwtDecode(tokenOTP);
                let email = decoded.email;

                // Simulación de la solicitud de autenticación al servidor
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/check-otp`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ otp:otp.trim(), email:email.trim() }),
                });
                hideLoader();
                if (!response.ok) {
                    alerta.error('Error al iniciar sesión');
                }
                else{
                    const data = await response.json();
                    console.log(response);
                    
                    setIsDisabled(!data.success);
                    alerta.success('El código de verificación es correcto. Ingrese su nueva contraseña');
                }
            }
        } catch (error) {
            hideLoader();
            alerta.error(error.message);
            console.log('error', error.message);
        }
    };

    const handleChangePassword = async (e) => {
        e.preventDefault();

        try {
            showLoader();
            if(password.trim() !== confirm.trim()){
                alerta.error('Las contraseñas no coinciden');
                hideLoader();
                return;
            }else{
                const tokenOTP = localStorage.getItem('tokenOTP');
                // Verifica si existe el token en el localStorage
                if (!tokenOTP) {
                    alerta.error('Intente recuperar su cuenta desde el dispositivo donde solicitó el cambio de contraseña');
                }else{
                    const decoded = jwtDecode(tokenOTP);
                    let email = decoded.email;

                    // Simulación de la solicitud de autenticación al servidor
                    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/change-password`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ password:password.trim(), email:email.trim() }),
                    });
                    hideLoader();
                    // console.log(response);
                    if (!response.ok) {
                        alerta.error('Ocurrió un error al cambiar su contraseña. Intente nuevamente');
                    }
                    else{
                        
                        console.log(response);
                        
                        setIsDisabled(false);
                        alerta.success('Se ha cambiado su contraseña correctamente');
                        localStorage.removeItem('tokenOTP'); // Ejemplo
                        // Redireccionar o actualizar el estado de la aplicación
                        window.location.href = '/login'; // Ejemplo
                    }
                }
            }
        } catch (error) {
            hideLoader();
            alerta.error('Ocurrió un error al cambiar su contraseña. Intente nuevamente');
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
                        onSubmit={handleCheckOtp}
                        className="space-y-5"
                    >
                        <div className="text-left">
                            <label className="font-medium">
                                Código de verificación
                            </label>
                            <input
                                type="text"
                                value={otp}
                                placeholder='Escribe tu código de verificación'
                                onChange={(e) => setOTP(e.target.value)} 
                                required
                                className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-indigo-600 shadow-sm rounded-lg"
                            />
                        </div>
                        <button
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                        >
                            Verificar código
                        </button>
                    </form>
                    <div className="relative">
                        <span className="block w-full h-px bg-gray-300"></span>
                        <p className="inline-block w-fit text-sm bg-white px-2 absolute -top-2 inset-x-0 mx-auto">Continua con</p>
                    </div>
                    <form
                        onSubmit={handleChangePassword}
                        className="space-y-5"
                    >
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
                                        disabled={isDisabled}
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
                                        disabled={isDisabled}
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
                            className="w-full px-4 py-2 text-white font-medium bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-600 rounded-lg duration-150"
                            type="submit"
                            disabled={isDisabled}
                        >
                            Cambiar contraseña
                        </button>
                    </form>
                </div>
            </div>
        </main>
        </>
    )
}

export default ChangePassword;