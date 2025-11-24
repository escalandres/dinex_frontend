import { useState, useEffect, useCallback, useRef } from 'react';
import { alerta, showLoader, hideLoader, formatCurrency, generateColors } from '@pages/assets/js/utils';
import { decodeToken, getUserPreferences } from '@components/auth';
import { Sidebar } from "../components/Sidebar";
import { VARIABLES } from '@pages/assets/js/utils';
import { UserMenu } from "../components/UserMenu";
import { Notification } from "../components/Notification";
import { useTranslations } from '@translations/translations';
import { DonutChart, DonutChartWithFilters } from '@pages/dinex/components/Charts/DonutChart';
import { HorizontalBarChart } from '@pages/dinex/components/Charts/HorizontalBarChart';
import { PieChart } from '@pages/dinex/components/Charts/PieChart';
import {
    isDateInCurrentMonth,
    hasOccurrenceInMonth
} from '@utils/date';
import { AddSavings } from "./pages-components/Savings/AddSavings";
import { EditSavings } from "./pages-components/Savings/EditSavings";
import "../dinex.css";
import "../navbar.css";

const userPreferences = getUserPreferences();

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
                    {catalogs?.incomeSources?.length > 0 && <AddSavings tokens={tokens} currency={currency} catalogs={catalogs} userPreferences={userPreferences} />}
                </div>
            </div>
        </nav>

    );
}

export const LiquidityTable = ({ tokens, savings, catalogs, translations, userPreferences }) => {
    const [data, setData] = useState(savings);
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

    const getIncomeSource = (id) => {
        const source = catalogs.incomeSources.find((source) => source.id === id);
        return source ? source.source : '';
    };

    const getIncomeCurrency = (id) => {
        const currency = catalogs.currencies.find((currency) => currency.id === id);
        return currency ? { flag: VARIABLES.icons.flags + currency.flag_icon, name: currency.name } : {};
    };

    const getIncomeFrequency = (id) => {
        const frequency = catalogs.incomeFrequencies.find((frequency) => frequency.id === id);
        return frequency ? frequency.description : '';
    };

    useEffect(() => {
        setData(savings);
    }, [savings]);

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
            <tr>
                {['name', 'source', 'amount', 'frequency', 'currency'].map((field) => (
                    <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="w-[17%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {/* {field.charAt(0).toUpperCase() + field.slice(1)} {orderIcon(field)} */}
                        {translations(`savings.table.${field}`)} {orderIcon(field)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">{translations("savings.actions.title")}</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            { data && data.length > 0 ? ( data.map((item) => (
                <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-left">{item.description}</td>
                    <td className="px-4 py-2 text-sm">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeSourceColor(item.type) }}>{getIncomeSource(item.type)}</span> */}
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">{getIncomeSource(item.source)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <span className="text-center py-1 px-2 text-xs rounded">{formatCurrency(item.amount, item.currency, userPreferences.language, userPreferences.country)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeFrequencyColor(item.subtype) }}>{getIncomeFrequency(item.subtype)}</span> */}
                        <span className="text-center py-1 px-2 text-xs rounded">{getIncomeFrequency(item.frequency)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <div className="inline-block w-6 h-6 mr-1">
                            <img src={getIncomeCurrency(item.currency).flag} alt={item.currency} className="inline-block w-6 h-6 ml-1" />
                        </div>
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">
                            {item.currency}
                        </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center space-x-2">
                        {/* <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("savings.actions.view")}</button> */}
                        <EditIncomes income={item} catalogs={catalogs} tokens={tokens} currency={{ id: item.currency, flag_icon: () => getIncomeCurrency(item.currency) }} />
                        {/* <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("menus.delete")}</button> */}
                    </td>
                </tr>
            ))) : (
                <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{translations("savings.no_savings")}</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export const FrozenTable = ({ tokens, savings, catalogs, translations, userPreferences }) => {
    const [data, setData] = useState(savings);
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

    const getIncomeSource = (id) => {
        const source = catalogs.incomeSources.find((source) => source.id === id);
        return source ? source.source : '';
    };

    const getIncomeCurrency = (id) => {
        const currency = catalogs.currencies.find((currency) => currency.id === id);
        return currency ? { flag: VARIABLES.icons.flags + currency.flag_icon, name: currency.name } : {};
    };

    const getIncomeFrequency = (id) => {
        const frequency = catalogs.incomeFrequencies.find((frequency) => frequency.id === id);
        return frequency ? frequency.description : '';
    };

    // const getIncomeSourceColor = (id) => {
    //     const source = catalogs.incomeSources.find((source) => source.id === id);
    //     return source ? source.color : '';
    // };

    // const getIncomeFrequencyColor = (id) => {
    //     const frequency = catalogs.incomeFrequencies.find((frequency) => frequency.id === id);
    //     return frequency ? frequency.color : '';
    // };

    useEffect(() => {
        setData(savings);
    }, [savings]);

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
            <tr>
                {['name', 'source', 'amount', 'frequency', 'currency'].map((field) => (
                    <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="w-[17%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {/* {field.charAt(0).toUpperCase() + field.slice(1)} {orderIcon(field)} */}
                        {translations(`savings.table.${field}`)} {orderIcon(field)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">{translations("savings.actions.title")}</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            { data && data.length > 0 ? ( data.map((item) => (
                <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-left">{item.description}</td>
                    <td className="px-4 py-2 text-sm">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeSourceColor(item.type) }}>{getIncomeSource(item.type)}</span> */}
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">{getIncomeSource(item.source)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <span className="text-center py-1 px-2 text-xs rounded">{formatCurrency(item.amount, item.currency, userPreferences.language, userPreferences.country)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeFrequencyColor(item.subtype) }}>{getIncomeFrequency(item.subtype)}</span> */}
                        <span className="text-center py-1 px-2 text-xs rounded">{getIncomeFrequency(item.frequency)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <div className="inline-block w-6 h-6 mr-1">
                            <img src={getIncomeCurrency(item.currency).flag} alt={item.currency} className="inline-block w-6 h-6 ml-1" />
                        </div>
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">
                            {item.currency}
                        </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center space-x-2">
                        {/* <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("savings.actions.view")}</button> */}
                        <EditIncomes income={item} catalogs={catalogs} tokens={tokens} currency={{ id: item.currency, flag_icon: () => getIncomeCurrency(item.currency) }} />
                        {/* <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("menus.delete")}</button> */}
                    </td>
                </tr>
            ))) : (
                <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{translations("savings.no_savings")}</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

export const RetirementTable = ({ tokens, savings, catalogs, translations, userPreferences }) => {
    const [data, setData] = useState(savings);
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

    const getIncomeSource = (id) => {
        const source = catalogs.incomeSources.find((source) => source.id === id);
        return source ? source.source : '';
    };

    const getIncomeCurrency = (id) => {
        const currency = catalogs.currencies.find((currency) => currency.id === id);
        return currency ? { flag: VARIABLES.icons.flags + currency.flag_icon, name: currency.name } : {};
    };

    const getIncomeFrequency = (id) => {
        const frequency = catalogs.incomeFrequencies.find((frequency) => frequency.id === id);
        return frequency ? frequency.description : '';
    };

    // const getIncomeSourceColor = (id) => {
    //     const source = catalogs.incomeSources.find((source) => source.id === id);
    //     return source ? source.color : '';
    // };

    // const getIncomeFrequencyColor = (id) => {
    //     const frequency = catalogs.incomeFrequencies.find((frequency) => frequency.id === id);
    //     return frequency ? frequency.color : '';
    // };

    useEffect(() => {
        setData(savings);
    }, [savings]);

    return (
        <div className="overflow-x-auto rounded-lg shadow-md">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="">
            <tr>
                {['name', 'source', 'amount', 'frequency', 'currency'].map((field) => (
                    <th
                        key={field}
                        onClick={() => handleSort(field)}
                        className="w-[17%] px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer select-none"
                    >
                        {/* {field.charAt(0).toUpperCase() + field.slice(1)} {orderIcon(field)} */}
                        {translations(`savings.table.${field}`)} {orderIcon(field)}
                    </th>
                ))}
                <th className="px-4 py-2 text-center text-sm font-medium text-gray-700 dark:text-gray-300">{translations("savings.actions.title")}</th>
            </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            { data && data.length > 0 ? ( data.map((item) => (
                <tr key={item.id}>
                    <td className="px-4 py-2 text-sm text-left">{item.description}</td>
                    <td className="px-4 py-2 text-sm">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeSourceColor(item.type) }}>{getIncomeSource(item.type)}</span> */}
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">{getIncomeSource(item.source)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <span className="text-center py-1 px-2 text-xs rounded">{formatCurrency(item.amount, item.currency, userPreferences.language, userPreferences.country)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        {/* <span className="font-bold text-white text-center py-1 px-2 text-xs rounded" style={{ backgroundColor: getIncomeFrequencyColor(item.subtype) }}>{getIncomeFrequency(item.subtype)}</span> */}
                        <span className="text-center py-1 px-2 text-xs rounded">{getIncomeFrequency(item.frequency)}</span>
                    </td>
                    <td className="px-4 py-2 text-sm text-gray-800 dark:text-gray-200">
                        <div className="inline-block w-6 h-6 mr-1">
                            <img src={getIncomeCurrency(item.currency).flag} alt={item.currency} className="inline-block w-6 h-6 ml-1" />
                        </div>
                        <span className="font-bold text-center py-1 px-2 text-xs rounded">
                            {item.currency}
                        </span>
                    </td>
                    <td className="px-4 py-2 text-sm text-center space-x-2">
                        {/* <button type="button" className="!bg-green-500 hover:!bg-green-600 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("savings.actions.view")}</button> */}
                        <EditIncomes income={item} catalogs={catalogs} tokens={tokens} currency={{ id: item.currency, flag_icon: () => getIncomeCurrency(item.currency) }} />
                        {/* <button type="button" className="!bg-red-500 hover:!bg-red-700 py-2 px-4 text-sm font-medium text-white border border-transparent rounded-lg focus:outline-none">{translations("menus.delete")}</button> */}
                    </td>
                </tr>
            ))) : (
                <tr>
                    <td colSpan="6" className="px-4 py-2 text-center text-gray-500 dark:text-gray-400">{translations("savings.no_savings")}</td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
    );
};

const Savings = () => {
    const translations = useTranslations();
    const [savings, setIncomes] = useState([]);
    const [catalogs, setCatalogs] = useState({});
    const [monthlyTotal, setMonthlyTotal] = useState(0);
    const [totalIncomes, setTotalIncomes] = useState(0);
    const { decoded, token, csrfToken } = decodeToken();
    if (!token) {
        window.location.href = '/login';
    }
    const tokens = {
        authToken: token,
        csrfToken: csrfToken
    }
    return (
        <div className="content-window flex h-screen w-full bg-gray-50 dark:bg-gray-900">
            {/* Sidebar */}
            <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
                <Sidebar />
            </aside>
            {/* Main content */}
            <div className="flex flex-col flex-grow">
                {/* Navbar */}
                <div className="h-16 z-1000">
                    <Navbar user={decoded.user} tokens={tokens} catalogs={catalogs} />
                </div>
                {/* Scrollable content */}
                <div className="flex-grow overflow-y-auto p-4">
                    <h1 className="text-2xl font-bold mb-4">{translations("savings.title")}</h1>
                    {/* <div className="grid grid-cols-2 gap-4 mb-4">
                        <DonutChart
                            title={translations("savings.headers.this_month_savings")}
                            series={series}
                            labels={labels}
                            colors={generateColors(series.length)}
                            totalLabel={translations("savings.headers.total_savings")}
                            valueFormatter={(value) => formatCurrency(
                                value,
                                userPreferences.currency.code,
                                userPreferences.language,
                                userPreferences.country
                            )}
                            totalFormatter={(sum) => formatCurrency(
                                sum,
                                userPreferences.currency.code,
                                userPreferences.language,
                                userPreferences.country
                            )}
                            timeRangeLabel="This month"
                            actionLabel="Full Report"
                            onDownload={() => alert('Downloading sales data...')}
                            onActionClick={() => alert('Opening full report...')}
                        />
                        <PieChart
                            title="Ingresos por Divisa"
                            series={seriesCurrency}
                            labels={labelsCurrency}
                            colors={generateColors(seriesCurrency.length, true)}
                            timeRangeLabel="Mes actual"
                            actionLabel="Ver detalles"
                            showPercentage={true}
                        />
                    </div>
                    <div className="grid grid-cols-1 mb-4">
                        <HorizontalBarChart
                            title="Ingresos de Noviembre"
                            data={incomeData}
                            colors={generateColors(incomeData.length)}
                            valueFormatter={(value) => formatCurrency(
                                value,
                                userPreferences.currency.code,
                                userPreferences.language,
                                userPreferences.country
                            )}
                            timeRangeLabel="Mes actual"
                            actionLabel="Ver todos los ingresos"
                            onBarClick={(item, index) => {
                                console.log('Clicked on:', item);
                                alert(`Seleccionaste: ${item.label} - ${formatCurrency(item.value)}`);
                            }}
                            onDownload={(data) => {
                                console.log('Downloading data:', data);
                                alert('Descargando datos...');
                            }}
                            className="lg:col-span-2"
                            />
                    </div> */}
                    <SavingsTable savings={savings} catalogs={catalogs} translations={translations} tokens={tokens} userPreferences={userPreferences} />
                </div>
            </div>
        </div>
    );
};

export default Savings;
