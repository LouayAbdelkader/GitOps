import { NavLink } from 'react-router-dom';
import { LayoutGrid, Users, Building2, ShieldCheck, FolderGit2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const ITEMS = [
  { to: '/dashboard', label: 'Tableau de bord', icon: LayoutGrid, tab: 'var(--color-amber)' },
  { to: '/employees', label: 'Employés', icon: Users, tab: 'var(--color-teal)' },
  { to: '/departments', label: 'Départements', icon: Building2, tab: 'var(--color-indigo)' },
  { to: '/users', label: 'Utilisateurs', icon: ShieldCheck, tab: 'var(--color-rose)', adminOnly: true },
];

export default function Sidebar({ open, onClose }) {
  const { isAdmin } = useAuth();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-ink/40 z-30 md:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-ink text-paper flex flex-col
        transition-transform duration-200 ${open ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="flex items-center gap-2 px-6 h-16 border-b border-white/10">
          <FolderGit2 size={22} style={{ color: 'var(--color-amber)' }} />
          <span className="font-display font-semibold text-lg tracking-tight">Registre</span>
        </div>

        <nav className="flex-1 py-4 overflow-y-auto">
          {ITEMS.filter((i) => !i.adminOnly || isAdmin).map(({ to, label, icon: Icon, tab }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `relative flex items-center gap-3 pl-6 pr-4 py-3 mb-1 text-sm font-medium transition-colors
                 ${isActive ? 'bg-white/10 text-white' : 'text-white/60 hover:text-white hover:bg-white/5'}`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className="absolute left-0 top-2 bottom-2 w-1 rounded-r"
                    style={{ background: isActive ? tab : 'transparent' }}
                  />
                  <Icon size={18} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="px-6 py-4 border-t border-white/10 text-xs text-white/40 font-mono">
          GitOps · v1.0
        </div>
      </aside>
    </>
  );
}
