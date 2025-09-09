// hooks/useCatalog.ts
import { useQuery } from '@tanstack/react-query';
import { alerta, showLoader, hideLoader } from '@pages/assets/js/utils';

export const useCountries = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ['countries'],
        queryFn: async () => fetch(`${import.meta.env.VITE_BACKEND_URL}/catalog/countries`).then(res => res.json())
    });

    if (isLoading) showLoader();

    if (error) { 
            hideLoader();
            alerta.error('Error al cargar los países');
            return [];
    }

    hideLoader();
    return data;
}