import { useEffect, useState } from "react";
import api from "../api/https"; // ✅ correct path

export default function Products() {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
    });

    // =======================
    // LOAD PRODUCTS
    // =======================
    const load = async () => {
        const res = await api.get("/products");
        setProducts(res.data);
    };

    useEffect(() => {
        load();
    }, []);

    // =======================
    // IMAGE UPLOAD (Cloudinary)
    // =======================
    const uploadImage = (file) => {
        if (!file) return;

        const reader = new FileReader();

        reader.onloadend = async () => {
            try {
                const res = await api.post("/admin/upload", {
                    image: reader.result,
                });

                setForm((prev) => ({
                    ...prev,
                    image: res.data.url,
                }));
            } catch (err) {
                alert("Image upload failed");
            }
        };

        reader.readAsDataURL(file);
    };

    // =======================
    // CREATE PRODUCT
    // =======================
    const submit = async () => {
        if (!form.name || !form.price) {
            alert("Name and price are required");
            return;
        }

        await api.post("/admin/products", form);
        setForm({
            name: "",
            price: "",
            category: "",
            image: "",
            description: "",
        });
        load();
    };

    // =======================
    // DELETE PRODUCT
    // =======================
    const remove = async (id) => {
        await api.delete(`/admin/products/${id}`);
        load();
    };

    return (
        <>
            <h2>Products</h2>

            {/* ===== ADD PRODUCT FORM ===== */}
            <div style={{ marginBottom: 20 }}>
                <input
                    placeholder="Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <br />

                <input
                    placeholder="Price"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                />
                <br />

                <input
                    placeholder="Category"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                />
                <br />

                {/* IMAGE UPLOAD INPUT */}
                <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => uploadImage(e.target.files[0])}
                />
                <br />

                {form.image && (
                    <img
                        src={form.image}
                        alt="preview"
                        style={{ width: 100, marginTop: 10 }}
                    />
                )}
                <br />

                <textarea
                    placeholder="Description"
                    value={form.description}
                    onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                    }
                />
                <br />

                <button onClick={submit}>Add Product</button>
            </div>

            {/* ===== PRODUCT LIST ===== */}
            <table border="1" width="100%">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th>Image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((p) => (
                        <tr key={p._id}>
                            <td>{p.name}</td>
                            <td>₹{p.price}</td>
                            <td>{p.category}</td>
                            <td>
                                {p.image && (
                                    <img src={p.image} alt="" width={50} />
                                )}
                            </td>
                            <td>
                                <button onClick={() => remove(p._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
