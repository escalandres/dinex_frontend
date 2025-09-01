// router.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dinex from '../pages/dinex/Dinex';
import P404 from '../pages/extras/P404';
import SignUp from '../pages/login/SignUp';
import ProtectedRoute from './ProtectedRoute';
import Homepage from '../pages/home/Homepage';
import AuthenticatedRoute from './AuthenticatedRoute';
import Logout from '../pages/login/Logout';
import ForgotPassword from '../pages/extras/ForgotPassword';
import ChangePassword from '../pages/extras/ChangePassword';
import GithubAuthorize from '../pages/login/components/auth/GithubAuthMiddleware';

import Ahorros from '../pages/dinex/pages/Ahorros';
import Gastos from '../pages/dinex/pages/Gastos';
import Instrumentos from '../pages/dinex/pages/Instrumentos';

const Router = createBrowserRouter(
    [
      {
        path: "/",
        element: <Homepage/>,
      },
      {
        path: "/login",
        element: <AuthenticatedRoute/>,
      },
      {
        path: "/registro",
        element: <SignUp/>,
        errorElement: <P404/>
      },
      {
          path: '/app',
          element: (
              <ProtectedRoute>
                  <Dinex />
              </ProtectedRoute>
          ),
      },
      {
        path: "/dinex",
        element: <Dinex/>
      },
      {
        path: "/app/ahorros",
        element: <Ahorros/>
      },
      {
        path: "/app/gastos",
        element: <Gastos/>
      },
      {
        path: "/app/instrumentos",
        element: <Instrumentos/>
      },
      {
        path: "/recuperacion",
        element: <ForgotPassword/>
      },
      {
        path: "/cambiar-contrasena",
        element: <ChangePassword/>
      },
      {
        path: "/page-not-found",
        element: <P404/>,
        errorElement: <P404/>
      },
      {
        path: "/logout",
        element: <Logout/>,
      },
      {
        path: "/auth/github",
        element: <GithubAuthorize/>,
      },

      {
        path: "*",
        element: <Navigate to="/page-not-found" replace />
      }
    ]
  );

export default Router;