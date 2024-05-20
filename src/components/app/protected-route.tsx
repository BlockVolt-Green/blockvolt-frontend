import { useAuth } from "@/hooks/auth-hook";
import { Navigate, Route, RouteProps } from "react-router-dom";

export default function ProtectedRoute(props: RouteProps) {
  const { isLoggedIn } = useAuth();

  console.log(isLoggedIn);

  return (
    <Route
      element={isLoggedIn ? props.children : <Navigate to="/login" />}
      {...props}
    />
  );
}
