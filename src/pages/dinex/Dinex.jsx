import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader } from '../js/utils';
import { jwtDecode } from 'jwt-decode'; // Esto puede ser incorrecto, asegúrate de que la importación es correcta

const Dinex = () => {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            Hola
        </div>
    );
};

export default Dinex;
