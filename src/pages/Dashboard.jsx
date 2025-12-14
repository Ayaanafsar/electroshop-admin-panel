import { useEffect, useState } from "react";
import api from "../api/http";

export default function Dashboard() {
    const [stats, setStats] = useState({});

    useEffect(() => {
        api.get("/admin/stats").then((res) => {
            setStats(res.data);
        });
    }, []);

    return (
        <>
            <h2>Dashboard</h2>
            <p>Total Users: {stats.users}</p>
            <p>Total Orders: {stats.orders}</p>
            <p>Pending Orders: {stats.pending}</p>
        </>
    );
}
