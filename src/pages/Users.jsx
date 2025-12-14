import { useEffect, useState } from "react";
import api from "../api/https";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadUsers = async () => {
        const res = await api.get("/admin/users");
        setUsers(res.data);
        setLoading(false);
    };

    useEffect(() => {
        loadUsers();
    }, []);

    if (loading) {
        return <p>Loading users...</p>;
    }

    return (
        <>
            <h2>Users</h2>

            <table border="1" width="100%" cellPadding="8">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u) => (
                        <tr key={u._id}>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.is_admin ? "YES" : "NO"}</td>
                            <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
