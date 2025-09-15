import { useState, useEffect } from 'react';
import { decodeToken, updateTokens } from '@components/auth';

export const VerifyEmail = () => {
    const { decoded, token, csrfToken } = decodeToken();
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [checking, setChecking] = useState(false);
    const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);

    const handleResend = async () => {
        setStatus('sending');
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/resend-verification`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'X-CSRF-Token': csrfToken,
                },
            });

            if (response.ok) {
                setStatus('sent');
            } else {
                setStatus('error');
            }
        } catch (err) {
            console.error('Error al reenviar verificación:', err);
            setStatus('error');
        }
    };

     // ⏱️ Polling defensivo cada 3 minutos para verificar si el email ha sido confirmado
    useEffect(() => {
        if (!isUserEmailVerified) {
        const interval = setInterval(async () => {
            setChecking(true);
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/auth/refresh`, {
                    method: 'POST',
                    credentials: 'include',
                });

                if (response.ok) {
                    const result = await response.json();
                    if (result.emailVerified) {
                        updateTokens(result.newToken, result.newCSRFToken); // Actualiza el token en localStorage
                        setIsUserEmailVerified(true);
                        clearInterval(interval); // Detiene el polling
                    }
                }
            } catch (err) {
                console.error('Error al verificar estado de email:', err);
            } finally {
                setChecking(false);
            }
        }, 1000 * 60 * 3); // cada 3 minutos

        return () => clearInterval(interval);
        }
    }, [token, isUserEmailVerified]);



    if (isUserEmailVerified) {
        return (
        <div className="verified-message">
            <h2>✅ Tu correo ya está verificado</h2>
            <p>Ya puedes acceder a todas las funcionalidades.</p>
            <button onClick={() => window.location.href = '/app'}>Ir a la aplicación</button>
        </div>
        );
    }

    return (
        <div className="verify-email">
            <h2>📩 Verifica tu correo electrónico</h2>
            <p>Hemos enviado un correo de verificación a <strong>{decoded.user?.email}</strong>.</p>
            <p>Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.</p>

            <button onClick={handleResend} disabled={status === 'sending'}>
                {status === 'sending' ? 'Reenviando...' : 'Reenviar correo'}
            </button>

            {status === 'sent' && <p style={{ color: 'green' }}>Correo reenviado correctamente.</p>}
            {status === 'error' && <p style={{ color: 'red' }}>Hubo un error al reenviar el correo.</p>}
        </div>
    );
};