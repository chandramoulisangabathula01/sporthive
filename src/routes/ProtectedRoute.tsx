import { Navigate, useLocation } from "react-router-dom";

// exports ProtectedRoute childern

export default function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { pathname } = useLocation()

//   trying to authenticated

  const authenticated = !!localStorage.getItem("authToken");
  if (authenticated) {
    return <>{children}</>;
  }
//   returns signin page
  return <Navigate to="/signin" replace  state={{ referrer: pathname }} />;
}