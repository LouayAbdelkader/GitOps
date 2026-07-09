import { useState } from 'react';
import { Menu, ChevronDown, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Avatar } from './Badge';

export default function Topbar({ title, onMenuClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const displayName = user?.full_name || user?.name || user?.username || user?.email || 'Compte';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-20 h-16 flex items-center justify-between px-4 md:px-8 bg-paper/90 backdrop-blur border-b border-line">
      <div className="flex items-center gap-3">
        <button className="md:hidden p-2 -ml-2" onClick={onMenuClick} aria-label="Ouvrir le menu">
          <Menu size={20} />
        </button>
        <h1 className="font-display font-semibold text-xl">{title}</h1>
      </div>

      <div className="relative">
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-ink/5 transition-colors"
        >
          <Avatar name={displayName} size={32} />
          <span className="hidden sm:block text-sm font-medium">{displayName}</span>
          <ChevronDown size={16} className="text-slate" />
        </button>

        {menuOpen && (
          <>
            <div className="fixed inset-0 z-10" onClick={() => setMenuOpen(false)} />
            <div className="absolute right-0 mt-2 w-48 bg-card border border-line rounded-lg shadow-lg z-20 overflow-hidden">
              <div className="px-4 py-3 border-b border-line">
                <p className="text-sm font-semibold truncate">{displayName}</p>
                {user?.role && <p className="text-xs text-slate capitalize">{user.role}</p>}
              </div>
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-rose hover:bg-rose-soft transition-colors"
              >
                <LogOut size={16} />
                Se déconnecter
              </button>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
