import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Elimina el JWT del localStorage
    localStorage.removeItem('token'); // Asegúrate de que 'token' es la clave correcta

    // Redirige al usuario a la página de inicio de sesión
    navigate('/login');
  }, [navigate]);

  return null; // No muestra nada en pantalla
};

export default Logout;
