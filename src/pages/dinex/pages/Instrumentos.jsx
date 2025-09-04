import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader, obtenerColorBadge } from '../../assets/js/utils';
import { jwtDecode } from 'jwt-decode'; 
import { Sidebar } from "../components/Sidebar";

import "../dinex.css";
import "../navbar.css";

import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { AgregarInstrumentos } from "./pages-components/instrumentos/AgregarInstrumentos";

export const Navbar = ({ token }) => {

    return (
        <nav className="bg-white dark:bg-[#191D21] w-full z-10 border-b border-gray-200 dark:border-gray-600">
            <div className="w-full flex flex-wrap items-center justify-between p-4">
                <div className="w-full flex flex-wrap items-center justify-between px-4">
                    <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
                        <span className="sr-only">Open main menu</span>
                        <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
                        </svg>
                    </button>
                </div>
                <div className="right-4 top-4 flex space-x-3 order-3">
                    <Notification />
                    <UserMenu token={token} />
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 grid grid-cols-2 gap-x-3" id="navbar-sticky">
                    <AgregarInstrumentos />
                </div>
            </div>
        </nav>

    );
}

const datosIniciales = [
  { id: 1, nombre: 'Cuenta bancaria BBVA', tipo: 'Ahorro', subtipo: 'Cuenta corriente' },
  { id: 2, nombre: 'Plata Card', tipo: 'Gasto', subtipo: 'TDC - Tarjeta de crédito' },
  { id: 3, nombre: 'Inversión ETF', tipo: 'Inversión', subtipo: 'Cuenta de inversión' },
  { id: 4, nombre: 'Guardadito', tipo: 'Ahorro', subtipo: 'Efectivo para ahorro' },
  { id: 5, nombre: 'Banorte', tipo: 'Gasto', subtipo: 'TDD - Tarjeta de débito' },
  { id: 6, nombre: 'Efectivo', tipo: 'Gasto', subtipo: 'Efectivo para gastos' },
  { id: 7, nombre: 'Nu bank', tipo: 'Ahorro', subtipo: 'Cuenta de ahorro' },
];

export const TablaInstrumentos = () => {
    const [datos, setDatos] = useState(datosIniciales);
    const [orden, setOrden] = useState({ campo: null, asc: true });

    const tipo = "tipoInstrumento";
    const subtipo = "subtipoInstrumento";

    const handleSort = (campo) => {
        const asc = orden.campo === campo ? !orden.asc : true;
        const datosOrdenados = [...datos].sort((a, b) => {
        const valA = a[campo]?.toLowerCase();
        const valB = b[campo]?.toLowerCase();
        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
        });
        setDatos(datosOrdenados);
        setOrden({ campo, asc });
    };

    const iconoOrden = (campo) => {
        if (orden.campo !== campo) return '⇅';
        return orden.asc ? '↑' : '↓';
    };

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
            <tr>
                {['nombre', 'tipo', 'subtipo'].map((campo) => (
                    <th
                        key={campo}
                        onClick={() => handleSort(campo)}
                        className="w-[25%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {campo.charAt(0).toUpperCase() + campo.slice(1)} {iconoOrden(campo)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {datos.map((item) => (
                <tr key={item.id}>
                <td className="px-4 py-2 text-sm text-left text-gray-800 dark:text-gray-200">{item.nombre}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className={`${obtenerColorBadge(tipo, item.tipo)} font-bold text-white text-center py-1 px-2 text-xs rounded`}>{item.tipo}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className={`${obtenerColorBadge(subtipo, item.subtipo)} font-bold text-white text-center py-1 px-2 text-xs rounded`}>{item.subtipo}</span>
                </td>
                <td className="px-4 py-2 text-sm text-center space-x-2">
                    <button type="button" className="bg-green-500 hover:bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Mostrar</button>
                    <button type="button" className="bg-yellow-500 hover:bg-yellow-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Editar</button>
                    <button type="button" className="bg-red-500 hover:bg-red-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Eliminar</button>

                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

const Instrumentos = () => {
    const [instrumentos, setInstrumentos] = useState([]);
    const [catalogos, setCatalogos] = useState([]);
    const isRequesting = useRef(false);
    // const token = localStorage.getItem('token');
    // const decoded = jwtDecode(token);
    const token = "";
    const decoded = { "id": "12345", "nombre": "Andres Escala", "email": "andres@escala.com", "profile_picture": "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80", "iat": 1693708800, "exp": 1693712400 }


    const cargarInstrumentos = useCallback(async () => {
        showLoader();
        let respuesta = {
            instrumentos: [],
            catalogos: []
        }
        if (!isRequesting.current) { 
            isRequesting.current = true
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/instrumentos`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
                    return respuesta;
                } else {
                    const data = await response.json();
                    respuesta.instrumentos = data.instrumentos;
                    respuesta.catalogos = data.catalogos;
                    return respuesta;
                }
            } catch (error) {
                console.error('Error:', error);
                return respuesta;
            } finally {
                hideLoader();
            }
        } else { console.log('Solicitud en progreso, no se ejecuta la función'); return respuesta; }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await cargarInstrumentos();
            console.log('results', results);
            setInstrumentos(results.instrumentos);
            setCatalogos(results.catalogos);
        };

        fetchData();
    }, [cargarInstrumentos]);

    return (
        <div className="content-window flex h-screen w-full bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <Sidebar />
            </aside>
            {/* Main content */}
            <div className="flex flex-col flex-grow">
                {/* Navbar */}
                <div className="h-16">
                    <Navbar token={decoded} />
                </div>
                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Bienvenido a Instrumentos</h1>
                    <TablaInstrumentos />
                </div>
            </div>
        </div>
    );
};

export default Instrumentos;
