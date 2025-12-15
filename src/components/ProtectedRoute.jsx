import { Navigate, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function ProtectedRoute() {
    const { admin, loading } = useAdminAuth();

    if (loading) {
        return <p style={{ padding: 20 }}>Loading...</p>;
    }

    if (!admin) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
