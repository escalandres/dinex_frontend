// router.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dinex from '@pages/dinex/Dinex';
import P404 from '@pages/extras/P404';
import SignUp from '@pages/login/SignUp';
import Homepage from '@pages/home/Homepage';
import Logout from '@pages/login/Logout';
import ForgotPassword from '@pages/extras/ForgotPassword';
import ChangePassword from '@pages/extras/ChangePassword';
import GithubAuthorize from '@pages/login/components/GithubAuthMiddleware';
import AuthenticatedRoute from './AuthenticatedRoute';
import ProtectedRoute from './ProtectedRoute';

import Savings from '@/pages/dinex/pages/Savings';
import Expenses from '@/pages/dinex/pages/Expenses';
import Instruments from '@/pages/dinex/pages/Instruments';
import UserSettings from '@pages/dinex/pages/UserSettings';

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
        path: "/signup",
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
        path: "/app/savings",
        element: <Savings/>
      },
      {
        path: "/app/expenses",
        element: <Expenses/>
      },
      {
        path: "/app/instruments",
        element: <Instruments/>
      },
      {
        path: "/app/user-settings",
        element: <UserSettings/>
      },
      {
        path: "/recovery",
        element: <ForgotPassword/>
      },
      {
        path: "/change-password",
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