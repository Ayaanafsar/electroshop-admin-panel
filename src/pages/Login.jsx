import api from "../api/https";

const login = async () => {
    const res = await api.post("/auth/login", {
        email,
        password
    });

    if (res.data.user.role !== "admin") {
        alert("Not an admin");
        return;
    }

    localStorage.setItem("adminToken", res.data.token);
};
