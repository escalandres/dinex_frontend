import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader } from '../js/utils';
import { jwtDecode } from 'jwt-decode'; // Esto puede ser incorrecto, asegúrate de que la importación es correcta

import { Navbar } from './components/Navbar';

const Dinex = () => {
    // const token = localStorage.getItem('token');
    // const decoded = jwtDecode(token);

    return (
        <div className='flex flex-col h-screen'>
            <Navbar />
            <div className='flex-grow p-4 bg-gray-50 dark:bg-gray-900'>Hola</div>
        </div>
    );
};

export default Dinex;
