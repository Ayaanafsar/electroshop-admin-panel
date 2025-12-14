export default function ProductModal({ product, onClose, onSave }) {
    const [form, setForm] = useState(product || {});

    return (
        <div className="modal">
            <input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
            <input value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
            <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
            <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} />
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />

            <button onClick={() => onSave(form)}>Save</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}
