import { Link, Outlet } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function Sidebar() {
    const { logout } = useAdminAuth();

    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <aside style={{ width: 200, padding: 20, background: "#eee" }}>
                <h3>Admin</h3>
                <nav>
                    <p><Link to="/">Dashboard</Link></p>
                    <p><Link to="/products">Products</Link></p>
                    <p><Link to="/orders">Orders</Link></p>
                    <p><Link to="/users">Users</Link></p>
                </nav>
                <button onClick={logout}>Logout</button>
            </aside>

            <main style={{ flex: 1, padding: 20 }}>
                <Outlet />
            </main>
        </div>
    );
}
