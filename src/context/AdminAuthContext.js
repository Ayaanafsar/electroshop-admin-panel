import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/https";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Load admin from localStorage on app start
    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        const adminData = localStorage.getItem("adminUser");

        if (token && adminData) {
            setAdmin(JSON.parse(adminData));
        }

        setLoading(false);
    }, []);

    // Admin login
    const login = async (email, password) => {
        const res = await api.post("/auth/login", { email, password });

        if (!res.data.user.is_admin) {
            throw new Error("Not an admin");
        }

        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("adminUser", JSON.stringify(res.data.user));

        setAdmin(res.data.user);
    };

    // Admin logout
    const logout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider
            value={{ admin, login, logout, loading }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};

// Custom hook
export const useAdminAuth = () => useContext(AdminAuthContext);
