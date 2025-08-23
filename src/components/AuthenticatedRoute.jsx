// ProtectedRoute.jsx
import { isAuthenticated } from '../auth';
import Login from '../pages/Login';
import App from '../pages/Login';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = () => {
    if (!isAuthenticated()) {
        // Si el usuario no está autenticado, redirige a la página de inicio de sesión
        return <Login/>;
    }

    // Si está autenticado, renderiza el componente hijo
    return <Navigate to="/app" />;
};

export default AuthenticatedRoute;