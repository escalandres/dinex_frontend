import { Navigate } from "react-router-dom";
import { isEmailVerified } from "./auth";

export const RequireVerifiedEmail = ({ children }: { children: React.ReactNode }) => {
  if (!isEmailVerified()) {
    return <Navigate to="/verify-email" replace />;
  }

  return <>{children}</>;
};