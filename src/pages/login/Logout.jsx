import React, { useEffect } from 'react';
import { showLoader, hideLoader } from '@pages/assets/js/utils';

const Logout = () => {

  useEffect(() => {
    const performLogout = async () => {
      const token = localStorage.getItem('token');
      const csrfToken = sessionStorage.getItem('csrfToken');
      showLoader();
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/logout`, {
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
        // Elimina el JWT del localStorage
        localStorage.removeItem('token');
        sessionStorage.removeItem('csrfToken');
        // Redirige al usuario a la página de inicio de sesión
        window.location.href = '/login';
      } else {
        console.error('Error during logout:', response.statusText);
      }
    };

    performLogout();
  }, []);

  return null; // No muestra nada en pantalla
};

export default Logout;
