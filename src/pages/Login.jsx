import { useState } from "react";
import { useAdminAuth } from "../context/AdminAuthContext";

export default function Login() {
    const { login } = useAdminAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const submit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await login(email, password);
        } catch {
            setError("Invalid admin credentials");
        }
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto" }}>
            <h2>Admin Login</h2>

            {error && <p style={{ color: "red" }}>{error}</p>}

            <form onSubmit={submit}>
                <input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ width: "100%", marginBottom: 10 }}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: "100%", marginBottom: 10 }}
                />

                <button type="submit" style={{ width: "100%" }}>
                    Login
                </button>
            </form>
        </div>
    );
}
