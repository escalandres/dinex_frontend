import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader } from '../../js/utils';
import { jwtDecode } from 'jwt-decode'; // Esto puede ser incorrecto, asegúrate de que la importación es correcta
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { Navbar } from '../components/Navbar';
import { Sidebar } from "../components/Sidebar";

import "../dinex.css";
import "../navbar.css";

import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { AgregarInstrumentos } from "./pages-components/instrumentos/AgregarInstrumentos";

export const Navbar = () => {

    return (
        <nav className="bg-white dark:bg-[#191D21] fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse ml-auto">
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="absolute right-4 top-4 flex space-x-3">
                    <Notification />
                    <UserMenu />
                </div>
                <div className="ml-16 items-center justify-between w-full md:flex md:w-auto md:order-1 grid grid-cols-2 gap-x-3" id="navbar-sticky">
                    <AgregarInstrumentos />
                </div>
            </div>
        </nav>

    );
}

const Instrumentos = () => {
    // const token = localStorage.getItem('token');
    // const decoded = jwtDecode(token);

    return (
            <div className='flex flex-col h-screen'>
                <Sidebar />
                <main className='flex-grow p-4 bg-gray-50 dark:bg-gray-900'>
                    <Navbar />
                    <div className='mt-16'>
                        <h1 className='text-2xl font-bold mb-4'>Bienvenido a Instrumentos</h1> 
                    </div>
                </main>
            </div>
    );
};

export default Instrumentos;
