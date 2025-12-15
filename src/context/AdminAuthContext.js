import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/https";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [loading, setLoading] = useState(true);

    // Run ONCE when app loads
    useEffect(() => {
        const token = localStorage.getItem("adminToken");

        if (!token) {
            setLoading(false);
            return;
        }

        api
            .get("/admin/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setAdmin(res.data);
            })
            .catch(() => {
                localStorage.removeItem("adminToken");
                setAdmin(null);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const login = async (email, password) => {
        const res = await api.post("/admin/login", { email, password });
        localStorage.setItem("adminToken", res.data.token);
        setAdmin(res.data.admin);
    };

    const logout = () => {
        localStorage.removeItem("adminToken");
        setAdmin(null);
    };

    return (
        <AdminAuthContext.Provider
            value={{ admin, loading, login, logout }}
        >
            {children}
        </AdminAuthContext.Provider>
    );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
