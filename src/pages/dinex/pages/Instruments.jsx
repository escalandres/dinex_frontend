import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader, getBadgeColor } from '../../assets/js/utils';
import { jwtDecode } from 'jwt-decode'; 
import { Sidebar } from "../components/Sidebar";

import "../dinex.css";
import "../navbar.css";

import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { AddInstruments } from "./pages-components/Instruments/AddInstruments";

export const Navbar = ({ token, catalogs }) => {

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
                    {catalogs?.instrumentTypes?.length > 0 && <AddInstruments token={token} catalogs={catalogs} />}
                </div>
            </div>
        </nav>

    );
}

const dataIniciales = [
  { id: 1, description: 'Cuenta bancaria BBVA', type: 'Ahorro', subtype: 'Cuenta corriente', type_color: '#60A5FA', subtype_color: '#FF3859' },
  { id: 2, description: 'Plata Card', type: 'Gasto', subtype: 'TDC - Tarjeta de crédito', type_color: '#6B7280', subtype_color: '#FF3859' },
  { id: 3, description: 'Inversión ETF', type: 'Inversión', subtype: 'Cuenta de inversión', type_color: '#16A34A', subtype_color: '#4F46E5' },
  { id: 4, description: 'Guardadito', type: 'Ahorro', subtype: 'Efectivo para ahorro', type_color: '#183292', subtype_color: '#4F46E5' },
  { id: 5, description: 'Banorte', type: 'Gasto', subtype: 'TDD - Tarjeta de débito', type_color: '#FF3859', subtype_color: '#4F46E5' },
  { id: 6, description: 'Efectivo', type: 'Gasto', subtype: 'Efectivo para gastos', type_color: '#751F00', subtype_color: '#4F46E5' },
  { id: 7, description: 'Nu bank', type: 'Ahorro', subtype: 'Cuenta de ahorro', type_color: '#4F46E5', subtype_color: '#4F46E5' },
];

export const InstrumentTable = () => {
    const [data, setData] = useState(dataIniciales);
    const [order, setOrder] = useState({ field: null, asc: true });

    const type = "typeInstrument";
    const subtype = "subtypeInstrument";

    const handleSort = (field) => {
        const asc = order.field === field ? !order.asc : true;
        const dataorderados = [...data].sort((a, b) => {
        const valA = a[field]?.toLowerCase();
        const valB = b[field]?.toLowerCase();
        if (valA < valB) return asc ? -1 : 1;
        if (valA > valB) return asc ? 1 : -1;
        return 0;
        });
        setData(dataorderados);
        setOrder({ field, asc });
    };

    const orderIcon = (field) => {
        if (order.field !== field) return '⇅';
        return order.asc ? '↑' : '↓';
    };

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
            <tr>
                {['description', 'type', 'subtype'].map((field) => (
                    <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="w-[25%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {field.charAt(0).toUpperCase() + field.slice(1)} {orderIcon(field)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">Acciones</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
                <tr key={item.id}>
                <td className="px-4 py-2 text-sm text-left text-gray-800 dark:text-gray-200">{item.description}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: item.type_color }}>{item.type}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: item.subtype_color }}>{item.subtype}</span>
                </td>
                <td className="px-4 py-2 text-sm text-center space-x-2">
                    <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Mostrar</button>
                    <button type="button" className="!bg-yellow-500 hover:!bg-yellow-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Editar</button>
                    <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Eliminar</button>

                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
};

const Instruments = () => {
    const [Instruments, setInstruments] = useState([]);
    const [catalogs, setCatalogs] = useState({
        instrumentType: [],
        instrumentSubtype: [],
        currencies: []
    });
    const isRequesting = useRef(false);
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const cargarInstruments = useCallback(async () => {
        showLoader();
        let respuesta = {
            Instruments: [],
            catalogos: []
        }
        if (!isRequesting.current) { 
            isRequesting.current = true
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/Instruments`, {
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
                    respuesta.Instruments = data.Instruments;
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

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const results = await cargarInstruments();
    //         console.log('results', results);
    //         setInstruments(results.Instruments);
    //         setCatalogos(results.catalogos);
    //     };

    //     fetchData();
    // }, [cargarInstruments]);

    const getCatalogs = useCallback(async () => {
        try {
            showLoader();
            // Simulación de la solicitud de autenticación al servidor
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/catalogs/instruments`);
            if (!response.ok) throw new Error('Error al obtener el catálogo de instrumentos');
            const result = await response.json();
            console.log('Catalogs fetched:', result);
            return result;
        } catch (error) {
            console.error('Error fetching instruments:', error);
            return [];
        } finally {
            hideLoader();
        }
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const theme = localStorage.theme;
                // setIsDarkMode(theme === 'dark');
                const catalogs = await getCatalogs();
                console.log('Catalogs to set:', catalogs);
                setCatalogs(catalogs);
            } catch (error) {
                console.error('Error fetching countries:', error);
            }
        };
        
        fetchData();
    }, [getCatalogs]);

        

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
                    <Navbar token={decoded} catalogs={catalogs} />
                </div>
                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Instruments</h1>
                    <InstrumentTable />
                </div>
            </div>
        </div>
    );
};

export default Instruments;
