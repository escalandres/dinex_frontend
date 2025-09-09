import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './auth';
import Login from "@pages/login/Login";

const AuthenticatedRoute = () => {
    if (!isAuthenticated()) {
        // if user is not authenticated, redirect to login page
        return <Login />;
    }

    // if user is authenticated, render child component
    return <Navigate to="/app" />;
};

export default AuthenticatedRoute;