import { useEffect, useState } from 'react';
import { Loader2, Trash2 } from 'lucide-react';
import Layout from '../components/Layout';
import { Card } from '../components/Card';
import { Avatar, Tag } from '../components/Badge';
import api from '../api/axios';

const ROLES = ['ADMIN', 'MANAGER', 'EMPLOYEE'];

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const load = () => {
    setLoading(true);
    api
      .get('/users')
      .then(({ data }) => setUsers(Array.isArray(data) ? data : data.users || []))
      .catch(() => setError('Impossible de charger les utilisateurs.'))
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleRoleChange = async (id, role) => {
    setUpdatingId(id);
    setError(null);
    try {
      const { data } = await api.put(`/users/${id}/role`, { role });
      setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, ...data } : u)));
    } catch (err) {
      setError(err.response?.data?.error || "Le changement de rôle a échoué.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleStatusToggle = async (user) => {
    setUpdatingId(user.id);
    setError(null);
    try {
      const { data } = await api.put(`/users/${user.id}/status`, { active: !user.active });
      setUsers((prev) => prev.map((u) => (u.id === user.id ? { ...u, ...data } : u)));
    } catch (err) {
      setError(err.response?.data?.error || "Le changement de statut a échoué.");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Supprimer cet utilisateur ?')) return;
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      setError(err.response?.data?.error || 'La suppression a échoué.');
    }
  };

  return (
    <Layout title="Utilisateurs">
      <p className="text-slate text-sm mb-6">
        Gérez les rôles et l'accès des comptes ayant accès à la plateforme.
      </p>

      {error && <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-soft text-rose text-sm">{error}</div>}

      <Card className="overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16 text-slate">
            <Loader2 className="animate-spin mr-2" size={18} /> Chargement…
          </div>
        ) : users.length === 0 ? (
          <p className="text-center py-16 text-slate text-sm">Aucun utilisateur à afficher.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-slate border-b border-line">
                <th className="font-medium px-5 py-3">Utilisateur</th>
                <th className="font-medium px-5 py-3">Rôle</th>
                <th className="font-medium px-5 py-3">Statut</th>
                <th className="font-medium px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className={i % 2 ? 'bg-paper/50' : ''}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={u.full_name || u.username || u.email} />
                      <div>
                        <p className="font-medium">{u.full_name || u.username || '—'}</p>
                        <p className="text-xs text-slate">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <select
                      value={u.role}
                      disabled={updatingId === u.id}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="px-2.5 py-1.5 rounded-lg border border-line bg-card text-sm outline-none focus:border-ink disabled:opacity-50"
                    >
                      {ROLES.map((r) => (
                        <option key={r} value={r}>
                          {r}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="px-5 py-3">
                    <button
                      onClick={() => handleStatusToggle(u)}
                      disabled={updatingId === u.id}
                      className="disabled:opacity-50"
                    >
                      <Tag label={u.active === false ? 'Inactif' : 'Actif'} />
                    </button>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleDelete(u.id)}
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
    </Layout>
  );
}
