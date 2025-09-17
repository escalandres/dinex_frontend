import { useState, useEffect, useCallback } from 'react';
import { alerta, showLoader, hideLoader } from '@pages/assets/js/utils';
import { decodeToken, updateTokens } from '@components/auth';
import './components/verify.css';

const VerifyRequired = () => {
    const { decoded, token, csrfToken } = decodeToken();
    if (!token) {
        window.location.href = '/login';
    }
    const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
    const [isUserEmailVerified, setIsUserEmailVerified] = useState(false);

    const handleResend = useCallback(async () => {
        setStatus('sending');
        try {
            showLoader();
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/resend-verification`, {
                method: 'POST',
                credentials: 'include', 
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                    'X-CSRF-Token': csrfToken,
                },
            });
            hideLoader();
            if (response.ok) {
                const result = await response.json();
                if (result.emailVerified) {
                    updateTokens(result.newToken, result.newCSRFToken);
                    setIsUserEmailVerified(true);
                    alerta.success('Tu correo ya está verificado. Redirigiendo...');
                    setTimeout(() => {
                        window.location.href = '/app';
                    }, 2000);
                }else{
                    setStatus('sent');
                    alerta.success('Correo de verificación reenviado');
                }
                
            } else {
                setStatus('error');
                alerta.error('Error al reenviar el correo de verificación');
            }
        } catch (err) {
            console.error('Error al reenviar verificación:', err);
            setStatus('error');
            alerta.error('Error al reenviar el correo de verificación');
        }
    }, [token, csrfToken, setStatus]);

     // ⏱️ Polling defensivo cada 3 minutos para verificar si el email ha sido confirmado
    useEffect(() => {
        if (!isUserEmailVerified) {
        const interval = setInterval(async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/resend-verificatio`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                        'X-CSRF-Token': csrfToken,
                    },
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
            }
        }, 1000 * 60 * 3); // cada 3 minutos

        return () => clearInterval(interval);
        }
    }, [token, isUserEmailVerified, csrfToken]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                await handleResend();
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };

        fetchData();
    }, [handleResend]);

    return (
        <div className="body">
        <div className="verify-email">
            <div className="gradient-bar"></div>

            <div className="email-icon">📩</div>

            <h2 className="title">Verifica tu correo electrónico</h2>
            
            <p className="paragraph">Hemos enviado un correo de verificación a:</p>

            <div className="email-address">
            {decoded?.user?.email || 'usuario@ejemplo.com'}
            </div>
            
            <p className="paragraph">
            Por favor revisa tu bandeja de entrada y haz clic en el enlace para activar tu cuenta.
            </p>
            
            <div className="instructions">
            <h3 className="instructions-title">💡 ¿No encuentras el correo?</h3>
            <ul className="instructions-list">
                <li className="instructions-item">Revisa tu carpeta de spam o correo no deseado</li>
                <li className="instructions-item">Asegúrate de que la dirección sea correcta</li>
                <li className="instructions-item">El correo puede tardar unos minutos en llegar</li>
            </ul>
            </div>
            
            <button 
                className="resend-button"
                onClick={handleResend} 
                disabled={status === 'sending'}
            >
                {status === 'sending' && <span className="loading-spinner"></span>}
                {status === 'sending' ? 'Reenviando...' : 'Reenviar correo'}
            </button>
            
            { status === 'sent' && (
                <div className="status-message status-success">
                    ✅ Correo reenviado correctamente
                </div>
            )}
            
            {status === 'error' && (
                <div className="status-message status-error">
                    ❌ Hubo un error al reenviar el correo
                </div>
            )}
        </div>
        </div>
    );
}


export default VerifyRequired;