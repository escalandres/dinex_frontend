import { useState, useEffect, useCallback, useRef } from 'react';
import Header from './App/components/Header';
import LeftSection from './App/components/LeftSection';
import './App/css/app.css';
import { alerta, showLoader, hideLoader } from './js/general';
import { jwtDecode } from 'jwt-decode'; // Esto puede ser incorrecto, asegúrate de que la importación es correcta

import RightSection from './App/components/RightSection';

const Dinex = () => {
    const [container, setContainer] = useState('');
    const [containers, setContainers] = useState([]);
    const [companies, setCompanies] = useState([]);
    const isRequesting = useRef(false); // Usar ref en lugar de state para evitar renderizados innecesarios
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);

    const getUserContainers = useCallback(async () => {
        console.log('Obteniendo contenedores de usuario'); 
        showLoader();
        if (!isRequesting.current) { 
            isRequesting.current = true
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/app/get-info`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                
                if (!response.ok) {
                    alerta.error('No se pudo obtener sus rastreadores. Inténtelo nuevamente.');
                    return { user_containers: [], shipment_companies: [] };
                } else {
                    const data = await response.json();
                    return data.results;
                }
            } catch (error) {
                console.error('Error:', error);
                return { user_containers: [], shipment_companies: [] };
            } finally {
                hideLoader();
            }
        } else { console.log('Solicitud en progreso, no se ejecuta la función'); return { user_containers: [], shipment_companies: [] }; }
    }, [token]);

    useEffect(() => {
        const fetchData = async () => {
            const results = await getUserContainers();
            console.log('results', results);
            setContainers(results.user_containers);
            setCompanies(results.shipment_companies);
        };

        fetchData();
    }, [getUserContainers]);

    return (
        <div className='bg-gray-10 dark:bg-gray-50 flex flex-col h-screen'>
            <Header token={decoded}/>
            <div className="flex-grow app__container text-black px-4 py-4 overflow-auto">
                <div className="column-20">
                    <LeftSection setContainer={setContainer} containers={containers} companies={companies} />
                </div>
                <div className="column-80">
                    <RightSection token={token} container={container} />
                </div>
            </div>
        </div>
    );
};

export default Dinex;
