import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Search, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import Modal from '../components/Modal';
import { Avatar, Tag } from '../components/Badge';
import api from '../api/axios';

const EMPTY_FORM = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  position: '',
  salary: '',
  hire_date: '',
  department_id: '',
};

export default function Employees() {
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    Promise.all([api.get('/employees'), api.get('/departments')])
      .then(([empRes, depRes]) => {
        setEmployees(Array.isArray(empRes.data) ? empRes.data : empRes.data.employees || []);
        setDepartments(Array.isArray(depRes.data) ? depRes.data : depRes.data.departments || []);
      })
      .catch(() => setError('Impossible de charger les employés.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (emp) => {
    setEditing(emp);
    setForm({
      first_name: emp.first_name || '',
      last_name: emp.last_name || '',
      email: emp.email || '',
      phone: emp.phone || '',
      position: emp.position || '',
      salary: emp.salary ?? '',
      hire_date: emp.hire_date ? emp.hire_date.slice(0, 10) : '',
      department_id: emp.department_id ?? '',
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    const payload = {
      ...form,
      salary: form.salary === '' ? null : Number(form.salary),
      department_id: form.department_id === '' ? null : Number(form.department_id),
    };
    try {
      if (editing) {
        await api.put(`/employees/${editing.id}`, payload);
      } else {
        await api.post('/employees', payload);
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.message || "L'enregistrement a échoué.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet employé ?')) return;
    try {
      await api.delete(`/employees/${id}`);
      setEmployees((prev) => prev.filter((e) => e.id !== id));
    } catch {
      setError('La suppression a échoué.');
    }
  };

  const fullName = (emp) => `${emp.first_name || ''} ${emp.last_name || ''}`.trim();

  const filtered = employees.filter((e) =>
    `${fullName(e)} ${e.email} ${e.department_name || ''}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Layout title="Employés">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div className="relative w-full sm:w-72">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-light" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un employé…"
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
          />
        </div>
        <button
          onClick={openCreate}
          className="flex items-center justify-center gap-2 bg-ink text-paper px-4 py-2 rounded-lg text-sm font-semibold hover:bg-ink-soft transition-colors"
        >
          <Plus size={16} /> Nouvel employé
        </button>
      </div>

      {error && <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-soft text-rose text-sm">{error}</div>}

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate">
            <Loader2 className="animate-spin mr-2" size={18} /> Chargement…
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-center py-16 text-slate text-sm">Aucun employé à afficher.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-line">
                <th className="font-medium px-5 py-3">Employé</th>
                <th className="font-medium px-5 py-3 hidden sm:table-cell">Poste</th>
                <th className="font-medium px-5 py-3">Département</th>
                <th className="font-medium px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp, i) => (
                <tr key={emp.id} className={i % 2 ? 'bg-paper/50' : ''}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={fullName(emp)} />
                      <div>
                        <p className="font-medium">{fullName(emp)}</p>
                        <p className="text-xs text-slate">{emp.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 hidden sm:table-cell text-slate">{emp.position || '—'}</td>
                  <td className="px-5 py-3">{emp.department_name && <Tag label={emp.department_name} />}</td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => openEdit(emp)} className="p-2 rounded-lg hover:bg-paper" aria-label="Modifier">
                        <Pencil size={15} />
                      </button>
                      <button
                        onClick={() => handleDelete(emp.id)}
                        className="p-2 rounded-lg hover:bg-rose-soft text-rose"
                        aria-label="Supprimer"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>

      {modalOpen && (
        <Modal title={editing ? "Modifier l'employé" : 'Nouvel employé'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Prénom</label>
                <input
                  required
                  value={form.first_name}
                  onChange={(e) => setForm({ ...form, first_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Nom</label>
                <input
                  required
                  value={form.last_name}
                  onChange={(e) => setForm({ ...form, last_name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Téléphone</label>
                <input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Poste</label>
                <input
                  value={form.position}
                  onChange={(e) => setForm({ ...form, position: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1.5">Salaire</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.salary}
                  onChange={(e) => setForm({ ...form, salary: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Date d'embauche</label>
                <input
                  type="date"
                  value={form.hire_date}
                  onChange={(e) => setForm({ ...form, hire_date: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Département</label>
              <select
                required
                value={form.department_id}
                onChange={(e) => setForm({ ...form, department_id: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
              >
                <option value="" disabled>
                  Choisir un département
                </option>
                {departments.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-2.5 rounded-lg text-sm font-semibold hover:bg-ink-soft transition-colors disabled:opacity-60"
            >
              {saving && <Loader2 size={16} className="animate-spin" />}
              Enregistrer
            </button>
          </form>
        </Modal>
      )}
    </Layout>
  );
}
