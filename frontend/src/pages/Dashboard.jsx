import { useEffect, useState } from 'react';
import { Users, Building2, ShieldCheck, AlertCircle } from 'lucide-react';
import Layout from '../components/Layout';
import { StatCard, Card } from '../components/Card';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/dashboard')
      .then(({ data }) => setStats(data))
      .catch(() => setError("Impossible de charger les statistiques."))
      .finally(() => setLoading(false));
  }, []);

  const totalEmployees = stats?.totalEmployees ?? stats?.employees ?? '—';
  const totalDepartments = stats?.totalDepartments ?? stats?.departments ?? '—';
  const totalUsers = stats?.totalUsers ?? stats?.users ?? '—';

  return (
    <Layout title="Tableau de bord">
      <p className="text-slate text-sm mb-6">
        Bienvenue, <span className="font-medium text-ink">{user?.full_name || user?.name || user?.username || user?.email}</span>.
      </p>

      {error && (
        <div className="mb-6 flex items-center gap-2 px-4 py-3 rounded-lg bg-rose-soft text-rose text-sm">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard label="Employés" value={loading ? '…' : totalEmployees} icon={Users} accent="var(--color-teal)" />
        <StatCard label="Départements" value={loading ? '…' : totalDepartments} icon={Building2} accent="var(--color-indigo)" />
        <StatCard label="Utilisateurs" value={loading ? '…' : totalUsers} icon={ShieldCheck} accent="var(--color-amber)" />
      </div>

      <Card className="mt-8 p-6">
        <h2 className="font-display font-semibold text-lg mb-2">Déploiement</h2>
        <p className="text-sm text-slate">
          Cette interface consomme l'API REST du backend Express. En production, elle sera servie
          par un pod Kubernetes dédié, construit à partir de l'image Docker de ce dossier
          <code className="font-mono text-xs bg-paper px-1.5 py-0.5 rounded mx-1">frontend/</code>
          et synchronisé automatiquement via ArgoCD ou FluxCD.
        </p>
      </Card>
    </Layout>
  );
}
