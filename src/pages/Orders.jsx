import { useEffect, useState } from "react";
import api from "../api/http";

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const load = async () => {
        const res = await api.get("/admin/orders");
        setOrders(res.data);
    };

    useEffect(() => { load(); }, []);

    const updateStatus = async (id, status) => {
        await api.patch(`/admin/orders/${id}/status`, { status });
        load();
    };

    return (
        <>
            <h2>Orders</h2>

            {orders.map(o => (
                <div key={o._id} style={{ border: "1px solid #ccc", marginBottom: 10, padding: 10 }}>
                    <p>User: {o.userId.email}</p>
                    <p>Total: ₹{o.total}</p>
                    <p>UTR: {o.transaction_id}</p>

                    <select
                        value={o.payment_status}
                        onChange={e => updateStatus(o._id, e.target.value)}
                    >
                        <option>pending</option>
                        <option>confirmed</option>
                        <option>shipped</option>
                        <option>delivered</option>
                    </select>
                </div>
            ))}
        </>
    );
}
