import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";
import { isAuthenticated } from "./auth";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const auth = isAuthenticated();

    if (!auth) {
        // User is not authenticated → redirect to login
        return <Navigate to="/login" replace />;
    }

    // User is authenticated → render protected content
    return <>{children}</>;
};

export default ProtectedRoute;