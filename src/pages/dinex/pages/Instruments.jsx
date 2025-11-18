import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader, getBadgeColor } from '../../assets/js/utils';
import { decodeToken } from '@components/auth';
import { Sidebar } from "../components/Sidebar";
import { VARIABLES } from '@pages/assets/js/utils';
import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { AddInstruments } from "./pages-components/Instruments/AddInstruments";
import { EditInstruments } from "./pages-components/Instruments/EditInstruments";
import { useTranslations } from '@translations/translations';
// import translations from "@translations"; // Asegúrate de que la configuración de i18n se cargue
import "../dinex.css";
import "../navbar.css";

export const Navbar = ({ tokens, user, catalogs }) => {
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
                    {catalogs?.instrumentTypes?.length > 0 && <AddInstruments tokens={tokens} currency={currency} catalogs={catalogs} />}
                </div>
            </div>
        </nav>

    );
}

export const InstrumentsTable = ({ tokens, instruments, catalogs, translations }) => {
    const [data, setData] = useState(instruments);
    const [order, setOrder] = useState({ field: null, asc: true });
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
        return currency ? { flag: VARIABLES.icons.flags + currency.flag_icon, name: currency.name } : {};
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
                {['name', 'type', 'subtype', 'currency'].map((field) => (
                    <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="w-[20%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {/* {field.charAt(0).toUpperCase() + field.slice(1)} {orderIcon(field)} */}
                        {translations(`instruments.table.${field}`)} {orderIcon(field)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">{translations("instruments.actions.title")}</th>
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
                <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                    <div className="inline-block w-6 h-6 mr-1">
                        <img src={getInstrumentCurrency(item.currency).flag} alt={item.currency} className="inline-block w-6 h-6 ml-1" />
                    </div>
                    <span className="font-bold text-center py-1 px-2 text-xs rounded">
                        {item.currency}
                    </span>
                </td>
                <td className="px-4 py-2 text-sm text-center space-x-2">
                    {/* <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("instruments.actions.view")}</button> */}
                    <EditInstruments instrument={item} catalogs={catalogs} tokens={tokens} currency={{ id: item.currency, flag_icon: () => getInstrumentCurrency(item.currency) }} />
                    {/* <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("menus.delete")}</button> */}
                </td>
                </tr>
            ))) : (
                <tr>
                    <td colSpan="5" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{translations("instruments.no_instruments")}</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

const Instruments = () => {
    const translations = useTranslations();

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
    const tokens = {
        authToken: token,
        csrfToken: csrfToken
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
                alerta.error('Error al obtener sus instrumentos. Inténtelo nuevamente.');
                console.error('Error fetching instruments:', response.statusText);
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
                    <Navbar user={decoded.user} tokens={tokens} catalogs={catalogs} />
                </div>
                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">{translations("instruments.title")}</h1>
                    <InstrumentsTable instruments={instruments} catalogs={catalogs} translations={translations} tokens={tokens} />
                </div>
            </div>
        </div>
    );
};

export default Instruments;
