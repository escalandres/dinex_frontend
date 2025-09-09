import Swal from 'sweetalert2';

export const VARIABLES = {
    icons: {
        flags: '/icons/flags/',
    }
};

export const isAuthenticated = () => {
    // Verifica si existe el token en el localStorage
    return !!localStorage.getItem('token');
};

export const alerta = {
    success: (mensaje,titulo = '¡Éxito!') => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'success',
            confirmButtonText: 'Aceptar'
        });
    },
    error: (mensaje,titulo = 'Error') => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'error',
            confirmButtonText: 'Aceptar'
        });
    },
    question: (mensaje,titulo) => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'question',
            confirmButtonText: 'Aceptar'
        });
    },
    info: (mensaje,titulo) => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'info',
            confirmButtonText: 'Aceptar'
        });
    },
    autoSuccess: (mensaje,titulo = '¡Éxito!') => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'success',
            showConfirmButton: false,
            timer: 2500
        });
    },
    autoError: (mensaje,titulo = 'Error') => {
        Swal.fire({
            title: titulo,
            text: mensaje,
            icon: 'error',
            showConfirmButton: false,
            timer: 2500
        });
    },
}

export const showLoader = () => {
    const loader = document.getElementById('panel');
    loader.style.display = 'flex';
}

export const hideLoader = () => {
    const loader = document.getElementById('panel');
    loader.style.display = 'none';
}

export const getBadgeColor = (type, item) => {
    const instrumentTypesColor = {
        'Ahorro': 'bg-blue-400',
        'Gasto': 'bg-red-600',
        'Inversión': 'bg-green-600'
    };
    const subInstrumentColors = {
        'Cuenta de ahorro': 'bg-yellow-500',
        'Cuenta corriente': 'bg-gray-500',
        'Efectivo para ahorro': 'bg-purple-400',
        'TDC - Tarjeta de crédito': 'bg-orange-600',
        'TDD - Tarjeta de débito': 'bg-indigo-600',
        'Efectivo para gastos': 'bg-gray-800',
        'Cuenta de inversión': 'bg-green-600'
    };
    if (type === 'typeInstrument') {
        return instrumentTypesColor[item] || 'bg-gray-500';
    }
    return subInstrumentColors[item] || 'bg-gray-500';
}
