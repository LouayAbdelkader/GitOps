export function Card({ children, className = '' }) {
  return (
    <div className={`bg-card border border-line rounded-xl ${className}`}>{children}</div>
  );
}

export function StatCard({ label, value, icon: Icon, accent = 'var(--color-amber)' }) {
  return (
    <Card className="p-5 flex items-center gap-4">
      <div
        className="w-11 h-11 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `color-mix(in srgb, ${accent} 15%, white)` }}
      >
        <Icon size={20} style={{ color: accent }} />
      </div>
      <div>
        <p className="text-2xl font-display font-semibold leading-none">{value}</p>
        <p className="text-sm text-slate mt-1">{label}</p>
      </div>
    </Card>
  );
}
