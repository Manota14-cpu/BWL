import { motion } from 'framer-motion';

const socials = [
  {
    label: 'Sitio Web',
    href: 'https://manota14-cpu.github.io/BWL/#about',
    color: 'web',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="9" />
        <ellipse cx="12" cy="12" rx="4" ry="9" />
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/joaquin-manota-4326603a6/',
    color: 'linkedin',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/joaco.manota/',
    color: 'instagram',
    icon: (
      <svg className="social-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function SocialIcons() {
  return (
    <nav className="social-nav" aria-label="Redes sociales">
      <ul className="social-list" role="list">
        {socials.map((s, i) => (
          <motion.li
            key={s.label}
            className="social-item"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.15, duration: 0.4 }}
            role="listitem"
          >
            <a
              href={s.href}
              className={`social-btn social-btn--${s.color}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
            >
              <span className="social-tooltip" aria-hidden="true">{s.label}</span>
              {s.icon}
            </a>
          </motion.li>
        ))}
      </ul>
    </nav>
  );
}
