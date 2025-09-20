// router.js
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Dashboard from '@pages/dinex/Dashboard';
import P404 from '@pages/extras/P404';
import SignUp from '@pages/login/SignUp';
import Homepage from '@pages/home/Homepage';
import Logout from '@pages/login/Logout';
import ForgotPassword from '@pages/extras/ForgotPassword';
import ChangePassword from '@pages/extras/ChangePassword';
import GithubAuthorize from '@pages/login/components/GithubAuthMiddleware';
import AuthenticatedRoute from './AuthenticatedRoute';
import ProtectedRoute from './ProtectedRoute';
import { RequireVerifiedEmail } from './RequireVerifiedEmail';

import Savings from '@pages/dinex/pages/Savings';
import Expenses from '@pages/dinex/pages/Expenses';
import Instruments from '@pages/dinex/pages/Instruments';
import UserSettings from '@pages/dinex/pages/UserSettings';
import VerifyEmail from '@pages/login/VerifyEmail';
import VerifyRequired from '@pages/login/VerifyRequired';

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
        element: <SignUp/>
      },
      {
        path: "/verify-email",
        element: <VerifyEmail/>
      },
      {
        path: "/verify-required",
        element: <VerifyRequired/>
      },
      {
          path: '/app',
          element: (
              <ProtectedRoute>
                  <Navigate to="/app/dashboard" replace />
              </ProtectedRoute>
          ),
      },
      {
          path: '/app/dashboard',
          element: (
              <ProtectedRoute>
                  <Dashboard />
              </ProtectedRoute>
          ),
      },
      {
        path: "/app/savings",
        element: ( 
          <ProtectedRoute>
            <RequireVerifiedEmail>
              <Savings/>
            </RequireVerifiedEmail>
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/expenses",
        element: ( 
          <ProtectedRoute>
            <RequireVerifiedEmail>
              <Expenses/>
            </RequireVerifiedEmail>
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/instruments",
        element: ( 
          <ProtectedRoute>
            <RequireVerifiedEmail>
              <Instruments/>
            </RequireVerifiedEmail>
          </ProtectedRoute>
        ),
      },
      {
        path: "/app/user-settings",
        element: (
          <ProtectedRoute>
            <RequireVerifiedEmail>
              <UserSettings/>
            </RequireVerifiedEmail>
          </ProtectedRoute>
        )
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