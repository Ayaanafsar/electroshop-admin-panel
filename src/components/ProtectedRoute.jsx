import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedRoute({ children }) {
    const { admin, loading } = useAdminAuth();

    if (loading) return null;

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return children ? children : <Outlet />;
}
