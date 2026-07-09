import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2 } from 'lucide-react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import Modal from '../components/Modal';
import { Tag } from '../components/Badge';
import api from '../api/axios';

const EMPTY_FORM = { name: '', description: '' };

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setLoading(true);
    api
      .get('/departments')
      .then(({ data }) => setDepartments(Array.isArray(data) ? data : data.departments || []))
      .catch(() => setError('Impossible de charger les départements.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(EMPTY_FORM);
    setModalOpen(true);
  };

  const openEdit = (dep) => {
    setEditing(dep);
    setForm({ name: dep.name || '', description: dep.description || '' });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/departments/${editing.id}`, form);
      } else {
        await api.post('/departments', form);
      }
      setModalOpen(false);
      load();
    } catch {
      setError("L'enregistrement a échoué.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer ce département ?')) return;
    try {
      await api.delete(`/departments/${id}`);
      setDepartments((prev) => prev.filter((d) => d.id !== id));
    } catch {
      setError('La suppression a échoué.');
    }
  };

  return (
    <Layout title="Départements">
      <div className="flex justify-end mb-6">
        <button
          onClick={openCreate}
          className="flex items-center gap-2 bg-ink text-paper px-4 py-2 rounded-lg text-sm font-semibold hover:bg-ink-soft transition-colors"
        >
          <Plus size={16} /> Nouveau département
        </button>
      </div>

      {error && <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-soft text-rose text-sm">{error}</div>}

      {loading ? (
        <div className="flex items-center justify-center py-16 text-slate">
          <Loader2 className="animate-spin mr-2" size={18} /> Chargement…
        </div>
      ) : departments.length === 0 ? (
        <p className="text-center py-16 text-slate text-sm">Aucun département à afficher.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {departments.map((dep) => (
            <Card key={dep.id} className="p-5">
              <div className="flex items-start justify-between mb-2">
                <Tag label={dep.name} />
                <div className="flex gap-1">
                  <button onClick={() => openEdit(dep)} className="p-1.5 rounded-lg hover:bg-paper" aria-label="Modifier">
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => handleDelete(dep.id)}
                    className="p-1.5 rounded-lg hover:bg-rose-soft text-rose"
                    aria-label="Supprimer"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
              <h3 className="font-display font-semibold">{dep.name}</h3>
              <p className="text-sm text-slate mt-1">{dep.description || 'Aucune description.'}</p>
            </Card>
          ))}
        </div>
      )}

      {modalOpen && (
        <Modal title={editing ? 'Modifier le département' : 'Nouveau département'} onClose={() => setModalOpen(false)}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">Nom</label>
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Description</label>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink resize-none"
              />
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
