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

export const getBadgeColor = (color) => {
    console.log(color);
    if (!color) return '!bg-gray-500';
    return `!bg-[${color}]`;
}

export const formatCurrency = (value, currency = 'USD', language = 'en', country = 'US') => {
    const locale = `${language}-${country}`;
    return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(value);
}

export const generateColors = (count, randomize = false) => {
    // Paleta de colores base (20 colores únicos)
    const baseColors = [
        "#1C64F2", "#16BDCA", "#FDBA8C", "#E74694", "#9061F9",
        "#10B981", "#F59E0B", "#EF4444", "#8B5CF6", "#06B6D4",
        "#84CC16", "#F97316", "#EC4899", "#6366F1", "#14B8A6",
        "#A855F7", "#22C55E", "#EAB308", "#DC2626", "#0EA5E9"
    ];

    // Función Fisher-Yates shuffle (mezcla sin duplicados)
    const shuffleArray = (array) => {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    };

    // Mezclar si es necesario
    let colors = randomize ? shuffleArray(baseColors) : [...baseColors];

    // Si necesitamos menos o igual colores, devolver los primeros N
    if (count <= colors.length) {
        return colors.slice(0, count);
    }

    // Si necesitamos más de 20 colores, generar usando distribución uniforme
    // Esto garantiza que los colores sean visualmente distintos
    const additionalCount = count - colors.length;
    const hueStep = 360 / additionalCount; // Distribuir uniformemente en el círculo cromático
    
    for (let i = 0; i < additionalCount; i++) {
        const hue = (i * hueStep + Math.random() * (hueStep / 2)) % 360; // Añade algo de aleatoriedad
        const saturation = 65 + (i % 3) * 10; // Varía entre 65-85%
        const lightness = 50 + (i % 4) * 8; // Varía entre 50-74%
        colors.push(`hsl(${Math.round(hue)}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
};