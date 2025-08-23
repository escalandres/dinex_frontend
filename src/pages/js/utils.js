import Swal from 'sweetalert2';


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