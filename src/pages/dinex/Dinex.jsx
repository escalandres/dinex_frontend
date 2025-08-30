import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader } from '../js/utils';
import { jwtDecode } from 'jwt-decode'; // Esto puede ser incorrecto, asegúrate de que la importación es correcta

import { Navbar } from './components/Navbar';
import { Sidebar } from "./components/Sidebar";

import "./dinex.css";

const Dinex = () => {
    // const token = localStorage.getItem('token');
    // const decoded = jwtDecode(token);

    return (
        <div className='flex flex-col h-screen'>
            <Sidebar />
            <main className='flex-grow p-4 bg-gray-50 dark:bg-gray-900'>
                <Navbar />
                <div className="mb-4 main-content">
                    <h1 className='text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200'>Bienvenido a Dinex</h1>
                </div>
            </main>
        </div>
    );
};

export default Dinex;
