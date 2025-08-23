// ProtectedRoute.jsx
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated()) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        return <Navigate to="/login" />;
    }

    // Si está autenticado, renderiza el componente hijo
    return children;
};

// Validación de las propiedades
ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,  // Valida que children sea un nodo de React y sea requerido
};

export default ProtectedRoute;