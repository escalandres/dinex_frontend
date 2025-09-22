import { useState, useEffect, useCallback, useRef } from 'react';
import { jwtDecode } from 'jwt-decode';
import { alerta, showLoader, hideLoader, getBadgeColor } from '../../assets/js/utils';
import { decodeToken, updateTokens } from '@components/auth';
import { Sidebar } from "../components/Sidebar";

import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { AddInstruments } from "./pages-components/Instruments/AddInstruments";
import "../dinex.css";
import "../navbar.css";

export const Navbar = ({ token, user, catalogs, csrfToken }) => {
    const [currency, setCurrency] = useState({ id: user.country.currency_code, name: user.country.currency, flag_icon: user.country.flag_icon });
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
                    <UserMenu user={user} />
                </div>
                <div className="items-center justify-between w-full md:flex md:w-auto md:order-1 grid grid-cols-2 gap-x-3" id="navbar-sticky">
                    {catalogs?.instrumentTypes?.length > 0 && <AddInstruments token={token} currency={currency} catalogs={catalogs} csrfToken={csrfToken} />}
                </div>
            </div>
        </nav>

    );
}

export const InstrumentTable = ({ instruments, catalogs }) => {
    const [data, setData] = useState(instruments);
    const [order, setOrder] = useState({ field: null, asc: true });
    console.log('Instruments to display:', data);
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

    const getInstrumentType = (id) => {
        const type = catalogs.instrumentTypes.find((type) => type.id === id);
        return type ? type.name : '';
    };

    const getInstrumentCurrency = (id) => {
        const currency = catalogs.currencies.find((currency) => currency.id === id);
        return currency ? currency.name : '';
    };

    const getInstrumentSubtype = (id) => {
        const subtype = catalogs.instrumentSubtypes.find((subtype) => subtype.id === id);
        return subtype ? subtype.name : '';
    };

    const getInstrumentTypeColor = (id) => {
        const type = catalogs.instrumentTypes.find((type) => type.id === id);
        return type ? type.color : '';
    };

    const getInstrumentSubtypeColor = (id) => {
        const subtype = catalogs.instrumentSubtypes.find((subtype) => subtype.id === id);
        return subtype ? subtype.color : '';
    };

    useEffect(() => {
        setData(instruments);
    }, [instruments]);


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
            { data && data.length > 0 ? ( data.map((item) => (
                <tr key={item.id}>
                <td className="px-4 py-2 text-sm text-left text-gray-800 dark:text-gray-200">{item.description}</td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getInstrumentTypeColor(item.type) }}>{getInstrumentType(item.type)}</span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getInstrumentSubtypeColor(item.subtype) }}>{getInstrumentSubtype(item.subtype)}</span>
                </td>
                <td className="px-4 py-2 text-sm text-center space-x-2">
                    <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Mostrar</button>
                    <button type="button" className="!bg-yellow-500 hover:!bg-yellow-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Editar</button>
                    {/* <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">Eliminar</button> */}
                </td>
                </tr>
            ))) : (
                <tr>
                    <td colSpan="4" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">No hay instrumentos disponibles.</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

const Instruments = () => {
    const [instruments, setInstruments] = useState([]);
    const [catalogs, setCatalogs] = useState({
        instrumentType: [],
        instrumentSubtype: [],
        currencies: []
    });
    const { decoded, token, csrfToken } = decodeToken();
    if (!token) {
        window.location.href = '/login';
    }

    const getUserInstruments = useCallback(async () => {
        showLoader();
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/instruments/`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'X-CSRF-Token': csrfToken,
                }
            });
            if (!response.ok) {
                alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
                return [];
            } else {
                const data = await response.json();
                console.log('Instruments fetched:', data);
                return data;
            }
        } catch (error) {
            console.error('Error:', error);
            return [];
        } finally {
            hideLoader();
        }
    }, [token]);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         const results = await getUserInstruments();
    //         console.log('results', results);
    //         setInstruments(results.Instruments);
    //         setCatalogos(results.catalogos);
    //     };

    //     fetchData();
    // }, [getUserInstruments]);

    // const getCatalogs = useCallback(async () => {
    //     try {
    //         showLoader();
    //         // Simulación de la solicitud de autenticación al servidor
    //         const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/catalogs/instruments`);
    //         if (!response.ok) throw new Error('Error al obtener el catálogo de instrumentos');
    //         const result = await response.json();
    //         console.log('Catalogs fetched:', result);
    //         return result;
    //     } catch (error) {
    //         console.error('Error fetching instruments:', error);
    //         return [];
    //     } finally {
    //         hideLoader();
    //     }
    // }, []);

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const theme = localStorage.theme;
    //             // setIsDarkMode(theme === 'dark');
    //             const catalogs = await getCatalogs();
    //             console.log('Catalogs to set:', catalogs);
    //             setCatalogs(catalogs);
    //         } catch (error) {
    //             console.error('Error fetching countries:', error);
    //         }
    //     };
        
    //     fetchData();
    // }, [getCatalogs]);

    // const fetchAllInstrumentData = useCallback(async () => {
    //     showLoader();
    //     let respuesta = {
    //         Instruments: [],
    //         catalogos: []
    //     };

    //     if (isRequesting.current) {
    //         console.log('Solicitud en progreso, no se ejecuta la función');
    //         hideLoader();
    //         return respuesta;
    //     }

    //     isRequesting.current = true;

    //     try {
    //         const headers = {
    //         'Authorization': `Bearer ${token}`
    //         };

    //         const [instrumentRes, catalogRes] = await Promise.all([
    //         fetch(`${import.meta.env.VITE_BACKEND_URL}/catalogs/instruments`, { method: 'GET', headers }),
    //         fetch(`${import.meta.env.VITE_BACKEND_URL}/catalogs/instruments`)
    //         ]);

    //         if (!instrumentRes.ok || !catalogRes.ok) {
    //         alerta.error('No se pudo obtener los datos. Inténtelo nuevamente.');
    //         return respuesta;
    //         }

    //         const instrumentData = await instrumentRes.json();
    //         const catalogData = await catalogRes.json();

    //         respuesta.Instruments = instrumentData.Instruments || [];
    //         respuesta.catalogos = catalogData.catalogos || [];

    //         return respuesta;
    //     } catch (error) {
    //         console.error('Error en fetchAllInstrumentData:', error);
    //         return respuesta;
    //     } finally {
    //         hideLoader();
    //     }
    // }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await getUserInstruments();
            setInstruments(results.userInstruments);
            setCatalogs(results.instrumentCatalogs);
        };

        fetchData();
    }, [getUserInstruments, setInstruments, setCatalogs]);

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
                    <Navbar user={decoded.user} token={token} catalogs={catalogs} csrfToken={csrfToken} />
                </div>
                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">Welcome to Instruments</h1>
                    <InstrumentTable instruments={instruments} catalogs={catalogs} />
                </div>
            </div>
        </div>
    );
};

export default Instruments;
