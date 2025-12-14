import { Link, Outlet, useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("adminToken");
        navigate("/login");
    };

    return (
        <div style={{ display: "flex" }}>
            <aside style={{ width: 220, padding: 20, background: "#111", color: "#fff" }}>
                <h3>Admin</h3>
                <Link to="/" style={link}>Dashboard</Link>
                <Link to="/products" style={link}>Products</Link>
                <Link to="/orders" style={link}>Orders</Link>
                <Link to="/users" style={link}>Users</Link>
                <button onClick={logout}>Logout</button>
            </aside>
            <main style={{ padding: 20, width: "100%" }}>
                <Outlet />
            </main>
        </div>
    );
}

const link = { display: "block", color: "#fff", marginBottom: 10 };
