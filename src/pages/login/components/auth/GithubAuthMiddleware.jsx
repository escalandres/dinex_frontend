import { useEffect, useState } from 'react';
import { alerta, showLoader, hideLoader } from '../../../js/utils.js';

const GithubAuthorize = () => {
    const [code, setCode] = useState(null);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const codeParam = urlParams.get('code');
        setCode(codeParam);
    }, []);

    useEffect(() => {
        if (code) {
            const fakeEvent = { preventDefault: () => console.log("preventDefault called") };
            handleSignUp(fakeEvent, code);
        }
    }, [code]);

    const handleSignUp = async (e,code) => {
        e.preventDefault();

        if (window.hasCalled) return; // Verifica si ya se ha llamado
            window.hasCalled = true;
        try{
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/user/auth/github`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code }),
            });
            hideLoader();
            if (!response.ok) {
                alerta.error('Error al iniciar sesión');
            }

            const data = await response.json();

            // Guardar el token o información del usuario en el almacenamiento local o en el estado
            localStorage.setItem('token', data.token);
            // alert("token: "+data.token);
            // Redireccionar o actualizar el estado de la aplicación
            window.location.href = '/app';
        } catch (error) {
            hideLoader();
            console.error("Ocurrio un error:",error);
            alerta.error('Error al iniciar sesión. Intente de nuevo');
            window.location.href = '/login';
            // setError(error.message);
        }
        return null;
    };
}

export default GithubAuthorize;