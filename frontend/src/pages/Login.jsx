import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FolderGit2, Loader2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const { login, loading, error } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(form.email, form.password);
    if (res.ok) navigate('/dashboard');
  };

  return (
    <div className="min-h-screen grid md:grid-cols-2">
      {/* Left: brand panel */}
      <div className="hidden md:flex flex-col justify-between bg-ink text-paper p-10">
        <div className="flex items-center gap-2">
          <FolderGit2 size={22} style={{ color: 'var(--color-amber)' }} />
          <span className="font-display font-semibold text-lg">Registre</span>
        </div>
        <div>
          <p className="font-display text-3xl leading-tight max-w-sm">
            Un dossier unique pour chaque employé, chaque département, chaque déploiement.
          </p>
          <p className="text-white/50 text-sm mt-4 font-mono">GitOps Employee Management Platform</p>
        </div>
        <p className="text-white/30 text-xs">© {new Date().getFullYear()} — Louay Abdelkader</p>
      </div>

      {/* Right: form */}
      <div className="flex items-center justify-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-sm">
          <h1 className="font-display text-2xl font-semibold mb-1">Connexion</h1>
          <p className="text-slate text-sm mb-8">Accédez à votre espace de gestion.</p>

          {error && (
            <div className="mb-4 px-4 py-2.5 rounded-lg bg-rose-soft text-rose text-sm">{error}</div>
          )}

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
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="w-full mb-6 px-3.5 py-2.5 rounded-lg border border-line bg-card focus:border-ink outline-none text-sm"
            placeholder="••••••••"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-ink text-paper py-2.5 rounded-lg text-sm font-semibold hover:bg-ink-soft transition-colors disabled:opacity-60"
          >
            {loading && <Loader2 size={16} className="animate-spin" />}
            Se connecter
          </button>

          <p className="text-center text-sm text-slate mt-6">
            Pas encore de compte ?{' '}
            <Link to="/register" className="text-ink font-medium underline underline-offset-2">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
