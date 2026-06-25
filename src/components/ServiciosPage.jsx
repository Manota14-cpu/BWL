import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroCanvas from './HeroCanvas';
import '../styles/global.css';

const services = [
  {
    id: 1,
    num: '01',
    title: 'Frontend',
    desc: 'Interfaces modernas, rápidas y responsivas. React, Next.js, TypeScript y animaciones cuidadas.',
    tag: 'React · Next.js · TypeScript · CSS',
    color: 'magenta',
    expandDesc: 'Construimos interfaces que tus usuarios van a amar. Rápidas, accesibles y con atención a cada detalle visual.',
    features: ['React, Next.js, HTML/CSS', 'Animaciones y microinteracciones', 'Diseño responsive pixel-perfect', 'Integración Figma → código', 'Core Web Vitals optimizados'],
  },
  {
    id: 2,
    num: '02',
    title: 'Backend',
    desc: 'APIs robustas, bases de datos y lógica de negocio. Node.js, Python, PostgreSQL y más.',
    tag: 'Node.js · Python · APIs · Bases de datos',
    color: 'magenta',
    expandDesc: 'La columna vertebral de tu producto. Sistemas escalables, seguros y documentados.',
    features: ['APIs REST y GraphQL', 'PostgreSQL, MongoDB, Redis', 'Autenticación y autorización', 'Arquitectura limpia y testeable', 'Documentación Swagger/OpenAPI'],
  },
  {
    id: 3,
    num: '03',
    title: 'Apps Móviles',
    desc: 'Apps nativas para iOS y Android con una sola base de código. React Native y Flutter.',
    tag: 'React Native · Flutter · iOS · Android',
    color: 'green',
    expandDesc: 'Llevá tu producto a los dispositivos móviles de tus usuarios con apps rápidas y confiables.',
    features: ['React Native (JS) o Flutter (Dart)', 'GPS, pagos, notificaciones push', 'Sincronización offline', 'Publicación en App Store y Play Store'],
  },
  {
    id: 4,
    num: '04',
    title: 'Diseño Digital',
    desc: 'Interfaces, branding y sistemas de diseño. De Figma al código sin perder calidad.',
    tag: 'Figma · Branding · UI/UX · Design Systems',
    color: 'blue',
    expandDesc: 'Diseñamos la identidad visual y la experiencia de usuario de tu producto digital.',
    features: ['Diseño de interfaces en Figma', 'Identidad visual y logo', 'Sistemas de diseño (Design Systems)', 'Prototipado interactivo'],
  },
];

const projects = [
  { id: 1, num: '01', title: 'Proyecto Alpha', tag: 'Frontend · UX', desc: 'Dashboard financiero en tiempo real para una fintech. Interfaz completa desde Figma hasta deploy.', color: 'magenta', large: true },
  { id: 2, num: '02', title: 'Proyecto Beta', tag: 'Backend · API', desc: 'API para e-commerce con catálogo, carrito y pagos. Stack Node.js + PostgreSQL.', color: 'blue', large: false },
  { id: 3, num: '03', title: 'Proyecto Gamma', tag: 'App · Mobile', desc: 'App iOS/Android con mapa en tiempo real y sistema de reservas. React Native + Mapbox.', color: 'green', large: false },
  { id: 4, num: '04', title: 'Proyecto Delta', tag: 'Diseño · Branding', desc: 'Identidad visual y UI para una startup de salud. Logo, paleta y componentes en Figma.', color: 'magenta', large: false },
];

const testimonials = [
  { text: 'BWL transformó nuestra plataforma en tiempo récord. La comunicación fue directa y el resultado superó todas las expectativas.', author: 'Martín García', role: 'CEO · FinFlow', initials: 'MG' },
  { text: 'Nunca había trabajado con un equipo tan ágil. Entregaron la API en 3 semanas y quedó perfecta, sin bugs en producción.', author: 'Sofía Ríos', role: 'CTO · ShopNow', initials: 'SR' },
  { text: 'El diseño de nuestra app quedó exactamente como lo habíamos imaginado. Mucho criterio y foco en los detalles que importan.', author: 'Juan Pablo Torres', role: 'Founder · Mappit', initials: 'JP' },
  { text: 'Trabajo con ellos desde hace 2 años. Cada proyecto es mejor que el anterior. Se nota que les importa lo que hacen.', author: 'Laura Acosta', role: 'Directora · Salud+', initials: 'LA' },
];

function ServiceCard({ service, index }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      className="service-card"
      data-color={service.color}
      data-open={open ? 'true' : 'false'}
      onClick={() => setOpen(!open)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="service-num">{service.num}</div>
      <div className="service-icon" style={{ color: `var(--${service.color})` }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          {service.id === 1 && <><polyline points="16,18 22,12 16,6" /><polyline points="8,6 2,12 8,18" /></>}
          {service.id === 2 && <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>}
          {service.id === 3 && <><rect x="5" y="2" width="14" height="20" rx="2" ry="2" /><line x1="12" y1="18" x2="12.01" y2="18" /></>}
          {service.id === 4 && <><path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" /></>}
        </svg>
      </div>
      <div className="service-header"><h3>{service.title}</h3></div>
      <p>{service.desc}</p>
      <div className="service-tag">{service.tag}</div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            className="service-expand"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: 'hidden' }}
          >
            <div className="service-expand-body">
              <p className="service-expand-desc">{service.expandDesc}</p>
              <ul className="service-features">
                {service.features.map((f, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >{f}</motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty('--mx', `${x}px`);
    cardRef.current.style.setProperty('--my', `${y}px`);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      className={`project-card${project.large ? ' large' : ''}`}
      data-color={project.color}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -4 }}
    >
      <div className="project-bg-num">{project.num}</div>
      <div className="project-info">
        <span className="project-tag">{project.tag}</span>
        <h3>{project.title}</h3>
        <p>{project.desc}</p>
        <span className="project-cta">Ver caso <motion.span
          initial={{ x: 0 }}
          whileHover={{ x: 4 }}
        >→</motion.span></span>
      </div>
      <div className="project-glow" />
    </motion.div>
  );
}

export default function ServiciosPage() {
  const [scrollPct, setScrollPct] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
      setScrollPct(Math.min(pct * 100, 100));
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const nextTestimonial = () => setTestimonialIdx((i) => (i + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((i) => (i - 1 + testimonials.length) % testimonials.length);

  const trackX = -(testimonialIdx * 340);

  return (
    <>
      <div className="scroll-progress" style={{ width: `${scrollPct}%` }} />

      {/* NAV */}
      <motion.nav
        id="navbar"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="nav-logo-img">
          <a href="/"><img src="/bwl.png" alt="BWL" width="120" height="34" /></a>
        </div>
        <ul className="nav-links">
          <li><a href="/">Inicio</a></li>
          <li><a href="#servicios-detalle">Servicios</a></li>
          <li><a href="#contact">Contacto</a></li>
        </ul>
        <a href="#contact" className="nav-cta">Hablemos</a>
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="mobile-overlay open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="mobile-menu open"
              initial={{ x: 280 }}
              animate={{ x: 0 }}
              exit={{ x: 280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <ul>
                <li><a href="/" className="mobile-link" onClick={() => setMenuOpen(false)}>Inicio</a></li>
                <li><a href="#servicios-detalle" className="mobile-link" onClick={() => setMenuOpen(false)}>Servicios</a></li>
                <li><a href="#contact" className="mobile-link" onClick={() => setMenuOpen(false)}>Contacto</a></li>
              </ul>
              <a href="#contact" className="btn-primary mobile-cta" onClick={() => setMenuOpen(false)}>Hablemos →</a>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* HERO */}
      <section className="hero">
        <HeroCanvas />
        <div className="hero-grain" />
        <div className="hero-content">
          <motion.p
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="eyebrow-dot" />
            BWL · Servicios Premium
          </motion.p>
          <motion.h1
            className="hero-heading"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            Todo lo que necesitás para <span style={{ color: 'var(--magenta)' }}>crecer digitalmente</span>
          </motion.h1>
          <motion.p
            className="hero-sub"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Desde el diseño hasta el desarrollo y despliegue. Un equipo chico, estándares grandes.
          </motion.p>
          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a href="#servicios-detalle" className="btn-primary">Ver servicios</a>
            <a href="#contact" className="btn-ghost">Contactanos</a>
          </motion.div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services" id="servicios-detalle">
        <div className="container">
          <motion.div
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >// 001 — Servicios</motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >Soluciones completas</motion.h2>
          <div className="services-grid">
            {services.map((s, i) => (
              <ServiceCard key={s.id} service={s} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="projects" id="proyectos-detalle">
        <div className="container">
          <motion.div
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >// 002 — Proyectos</motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >Trabajo reciente</motion.h2>
          <motion.p
            style={{ color: 'var(--gray-text)', marginBottom: '2.5rem', fontSize: '0.95rem', maxWidth: '560px' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >Cada proyecto es único. Estos son algunos de los que más orgullo nos dan.</motion.p>
          <div className="projects-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials" id="clientes-detalle">
        <div className="container">
          <motion.div
            className="section-label"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >// 003 — Clientes</motion.div>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >Lo que dicen de nosotros</motion.h2>
        </div>
        <div className="testimonials-slider-wrap">
          <motion.div
            className="testimonials-track"
            animate={{ x: trackX }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="testimonial-card"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="testimonial-quote">&quot;</div>
                <p className="testimonial-text">{t.text}</p>
                <div className="testimonial-author">
                  <motion.div
                    className="testimonial-avatar"
                    whileHover={{ scale: 1.1 }}
                    style={{ '--accent': 'var(--magenta)' }}
                  >{t.initials}</motion.div>
                  <div>
                    <strong>{t.author}</strong>
                    <span>{t.role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          <div className="testimonials-controls">
            <motion.button
              className="testimonial-btn"
              onClick={prevTestimonial}
              aria-label="Anterior"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >←</motion.button>
            <div className="testimonials-dots">
              {testimonials.map((_, i) => (
                <span
                  key={i}
                  className={i === testimonialIdx ? 'active' : ''}
                  onClick={() => setTestimonialIdx(i)}
                />
              ))}
            </div>
            <motion.button
              className="testimonial-btn"
              onClick={nextTestimonial}
              aria-label="Siguiente"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >→</motion.button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="contact" id="contact">
        <div className="container" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >¿Listo para arrancar?</motion.h2>
          <motion.p
            style={{ color: 'var(--gray-text)', marginBottom: '2rem' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >Contanos tu idea y te mandamos un presupuesto claro en 24hs.</motion.p>
          <motion.a
            href="#contact"
            className="btn-primary"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >Hablemos →</motion.a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo-img"><img loading="lazy" src="/bwl.png" alt="BWL" /></span>
              <p className="footer-tagline">Código con cuidado. Diseño con propósito.</p>
            </div>
            <div className="footer-nav-col">
              <p className="footer-col-title">Navegación</p>
              <a href="/">Inicio</a>
              <a href="#servicios-detalle">Servicios</a>
              <a href="#proyectos-detalle">Proyectos</a>
              <a href="#clientes-detalle">Clientes</a>
            </div>
            <div className="footer-nav-col">
              <p className="footer-col-title">Servicios</p>
              <a href="#servicios-detalle">Frontend</a>
              <a href="#servicios-detalle">Backend</a>
              <a href="#servicios-detalle">Apps Móviles</a>
              <a href="#servicios-detalle">Diseño Digital</a>
            </div>
            <div className="footer-nav-col">
              <p className="footer-col-title">Social</p>
              <a href="#">Instagram</a>
              <a href="#">LinkedIn</a>
              <a href="#">GitHub</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span className="footer-copy">© 2026 BWL. Todos los derechos reservados.</span>
            <span className="footer-made">Hecho con cuidado.</span>
          </div>
        </div>
      </footer>

      {/* SCROLL TOP */}
      <motion.button
        className={`scroll-top${showScrollTop ? ' visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Volver arriba"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >↑</motion.button>
    </>
  );
}
