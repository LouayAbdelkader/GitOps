import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FolderGit2, Loader2, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ full_name: '', username: '', email: '', password: '' });
  const [done, setDone] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(form);
    if (res.ok) {
      setDone(true);
      setTimeout(() => navigate('/login'), 1500);
    }
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="hidden md:flex flex-col justify-between bg-ink text-paper p-10">
        <div className="flex items-center gap-2">
          <FolderGit2 size={22} style={{ color: 'var(--color-amber)' }} />
          <span className="font-display font-semibold text-lg">Registre</span>
        </div>
        <div>
          <p className="font-display text-3xl leading-tight max-w-sm">
            Chaque compte est versionné, tracé, et synchronisé avec le cluster.
          </p>
          <p className="text-white/50 text-sm mt-4 font-mono">GitOps Employee Management Platform</p>
        </div>
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} — Louay Abdelkader</p>
      </div>

      <div className="flex items-center justify-center p-6">
        {done ? (
          <div className="text-center max-w-sm">
            <CheckCircle2 size={40} className="text-teal mx-auto mb-4" />
            <h1 className="font-display text-xl font-semibold">Compte créé</h1>
            <p className="text-slate text-sm mt-2">Redirection vers la connexion…</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <h1 className="font-display text-2xl font-semibold mb-1">Créer un compte</h1>
            <p className="text-slate text-sm mb-8">Rejoignez la plateforme de gestion.</p>

            {error && (
              <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-soft text-rose text-sm">{error}</div>
            )}

            <label className="block text-sm font-medium mb-1.5">Nom complet</label>
            <input
              required
              value={form.full_name}
              onChange={(e) => setForm({ ...form, full_name: e.target.value })}
              className="w-full mb-4 px-3.5 py-2.5 rounded-lg border border-line bg-card focus:border-ink outline-none text-sm"
              placeholder="Jane Doe"
            />

            <label className="block text-sm font-medium mb-1.5">Nom d'utilisateur</label>
            <input
              required
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full mb-4 px-3.5 py-2.5 rounded-lg border border-line bg-card focus:border-ink outline-none text-sm"
              placeholder="jdoe"
            />

            <label className="block text-sm font-medium mb-1.5">Adresse e-mail</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full mb-4 px-3.5 py-2.5 rounded-lg border border-line bg-card focus:border-ink outline-none text-sm"
              placeholder="vous@entreprise.com"
            />

            <label className="block text-sm font-medium mb-1.5">Mot de passe</label>
            <input
              type="password"
              required
              minLength={6}
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full mb-6 px-3.5 py-2.5 rounded-lg border border-line bg-card focus:border-ink outline-none text-sm"
              placeholder="6 caractères minimum"
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-2.5 rounded-lg text-sm font-semibold hover:bg-ink-soft transition-colors disabled:opacity-60"
            >
              {loading && <Loader2 size={16} className="animate-spin" />}
              Créer mon compte
            </button>

            <p className="text-center text-sm text-slate mt-6">
              Déjà inscrit ?{' '}
              <Link to="/login" className="text-ink font-medium underline underline-offset-2">
                Se connecter
              </Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
