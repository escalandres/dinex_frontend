import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { alerta, showLoader, hideLoader } from '@pages/assets/js/utils';

const VerifyEmail = () => {
    const [status, setStatus] = useState<'pending' | 'success' | 'error'>('pending');
    const [message, setMessage] = useState('');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
        setStatus('error');
        setMessage('Token de verificación no encontrado.');
        return;
        }

        const verify = async () => {
        try {
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/verify-email?token=${token}`, {
                method: 'GET',
            });
            hideLoader();
            const result = await response.json();
            if (response.status === 200) {
                setStatus('success');
                setMessage(result.message);
                setTimeout(() => navigate('/app'), 3000); // redirige tras éxito
            } else {
                alerta.error(result.message || 'Error al verificar el correo.');
                setStatus('error');
                setMessage(result.message || 'Error al verificar el correo.');
                throw new Error('Respuesta inesperada');
            }
        } catch (err) {
            hideLoader();
            setStatus('error');
            setMessage(err.message || 'Error al verificar el correo.');
        }
        };

        verify();
    }, [searchParams, navigate]);

    return (
        <div className="verify-email-container">
        {status === 'pending' && <p>Verificando tu correo electrónico...</p>}
        {status === 'success' && <p className="success">{message}</p>}
        {status === 'error' && <p className="error">{message}</p>}
        </div>
    );
};

export default VerifyEmail;