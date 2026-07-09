import { tagColor, initials } from '../utils/tagColor';

export function Avatar({ name, size = 36 }) {
  const c = tagColor(name);
  return (
    <div
      className="flex items-center justify-center rounded-full font-display font-semibold shrink-0"
      style={{ background: c.bg, color: c.fg, width: size, height: size, fontSize: size * 0.38 }}
    >
      {initials(name)}
    </div>
  );
}

export function Tag({ label }) {
  const c = tagColor(label);
  return (
    <span
      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium"
      style={{ background: c.bg, color: c.fg }}
    >
      {label}
    </span>
  );
}
