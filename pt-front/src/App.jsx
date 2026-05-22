import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import CustomCursor from "./components/CustomCursor.jsx";
import HeroStats from "./components/HeroStats.jsx";
import ProductsSection from "./components/ProductsSection.jsx";
import ServicesShowcase from "./components/ServicesShowcase.jsx";

import LogoViewer from "./components/Logoviewer.jsx";
import LocationCard from "./components/LocationCard.jsx";
import ERPSection from "./components/ERPSection.jsx";
import AIAgent from "./components/AIAgent.jsx";
import PortfolioPage from "./pages/PortfolioPage.jsx";
import CareersPage from "./pages/CareersPage.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import {
  EMAIL,
  PHONE_MAIN,
  PHONE_MAIN_DISPLAY,
  serviceOptions,
} from "./data/siteData.js";


// ─── Lucide-style SVG icon components (premium, no emojis) ───────────────────
const Icon = ({ d, size = 18, strokeWidth = 1.6, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  sun: "M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 5a7 7 0 1 0 0 14A7 7 0 0 0 12 5z",
  moon: "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M16 3.13a4 4 0 0 1 0 7.75"],
  infinity: "M12 12c-2-2.5-4-4-6-4a4 4 0 0 0 0 8c2 0 4-1.5 6-4zm0 0c2 2.5 4 4 6 4a4 4 0 0 0 0-8c-2 0-4 1.5-6 4z",
  chevronRight: "M9 18l6-6-6-6",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  externalLink: ["M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", "M15 3h6v6", "M10 14L21 3"],
  code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
  shield: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
  barChart: ["M18 20V10", "M12 20V4", "M6 20v-6"],
  globe: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M2 12h20", "M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10A15.3 15.3 0 0 1 12 2z"],
  headphones: ["M3 18v-6a9 9 0 0 1 18 0v6", "M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"],
  terminal: ["M4 17l6-6-6-6", "M12 19h8"],
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  cpu: ["M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z", "M9 9h6v6H9z", "M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"],
  layers: ["M12 2L2 7l10 5 10-5-10-5z", "M2 17l10 5 10-5", "M2 12l10 5 10-5"],
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.77h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.38v-.46z",
  mapPin: ["M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z", "M12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  clock: ["M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2z", "M12 6v6l4 2"],
  linkedin: ["M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z", "M2 9h4v12H2z", "M4 6a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"],
  twitter: "M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z",
  tiktok: "M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5",
  instagram: ["M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z", "M17.5 6.5h.01", "M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5z"],
  check: "M20 6L9 17l-5-5",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  menu: ["M3 12h18", "M3 6h18", "M3 18h18"],
  x: ["M18 6L6 18", "M6 6l12 12"],
  userPlus: ["M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M20 8v6M23 11h-6"],
  list: ["M8 6h13", "M8 12h13", "M8 18h13", "M3 6h.01", "M3 12h.01", "M3 18h.01"],
  coffee: ["M18 8h1a4 4 0 0 1 0 8h-1", "M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z", "M6 1v3M10 1v3M14 1v3"],
  monitor: ["M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z", "M8 21h8M12 17v4"],
  trendingUp: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
  truck: ["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2", "M15 18H9", "M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14", "M14 18v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3", "M14 9V7"],
  sparkles: ["M12 3l1.2 3.6L17 7.8l-3.6 1.2L12 12.6 10.6 9l-3.6-1.2L10.8 6.6 12 3z", "M5 14l.8 2.4L8 17.2l-2.4.8L5 20.4 3.6 18l-2.4-.8L3.2 16.4 5 14z", "M19 14l.8 2.4L22 17.2l-2.4.8L19 20.4l-1.4-2.4-2.4-.8 2.4-.8 1.4-2.4z"],
};

const Ico = ({ name, size = 18, strokeWidth = 1.6, className = "" }) => {
  const d = icons[name];
  if (!d) return null;
  return <Icon d={d} size={size} strokeWidth={strokeWidth} className={className} />;
};




function VisitTracker() {
  useEffect(() => {
    const logged = sessionStorage.getItem("pt_visit_logged");
    if (logged) return;
    fetch("https://possible-1-zua9.onrender.com/api/admin/visits", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "{}",
    }).catch(() => {});
    sessionStorage.setItem("pt_visit_logged", "1");
  }, []);
  return null;
}

const contactInfo = [
  { icon: "mail", label: "Email", value: EMAIL, href: `mailto:${EMAIL}` },
  { icon: "phone", label: "Phone", value: PHONE_MAIN_DISPLAY, href: `tel:${PHONE_MAIN}` },
  { icon: "clock", label: "Hours", value: "Mon–Fri: 9am – 6pm" },
];

// ─── Main component ──────────────────────────────────────────────────────────
function HomePage({ dark, setDark, menuOpen, setMenuOpen, scrolled, formData, setFormData, formSent, handleFormSubmit, bg, fg, muted, border, cardBg, cardBorder, subtleBg, navLinks }) {
  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section id="home" className="hero-section hero-split">
        <div className="hero-grid-bg" />

        <div className="hero-p-glow" />

        <div className="hero-split-inner">

          <div className="hero-text-col">

            <div className="pill-badge hero-badge-anim">
              <Ico name="zap" size={12} />
              Possible Technology · Addis Ababa
            </div>

            <h1 className="display-heading hero-split-h1 hero-h1-anim">
              Making Technology<br /><em>Work For You.</em>
            </h1>

            <div className="hero-divider hero-divider-anim" />

            <p className="hero-split-lead hero-lead-anim" style={{ color: muted }}>
              We help businesses grow with smart IT solutions  expert teams,
              real ownership, and technology that actually serves your goals.
            </p>

            <div className="hero-split-actions hero-actions-anim">
              <a href="#contact" className="btn-primary">
                Get Started <Ico name="arrowRight" size={14} />
              </a>
              <Link to="/portfolio" className="btn-ghost">Our Portfolio</Link>
            </div>

            <div className="hero-meta hero-meta-anim">
              <span className="hero-meta-item"><span className="hero-meta-dot" />Since 2009</span>
              <span className="hero-meta-sep" />
              <span className="hero-meta-item"><span className="hero-meta-dot" />10+ Engineers</span>
              <span className="hero-meta-sep" />
              <span className="hero-meta-item"><span className="hero-meta-dot" />Addis Ababa</span>
            </div>
          </div>

          <div className="hero-viewer-col">
            <div className="hero-viewer-ring" />
            <LogoViewer width="100%" height={560} />
          </div>

        </div>
      </section>

      <HeroStats Ico={Ico} />

      <section id="about" className="section-padding">
        <div className="section-wrap">
          <div className="about-grid">
            <div>
              <div className="section-tag">Who We Are</div>
              <h2 className="display-heading" style={{ marginBottom: 20 }}>Your trusted technology<br /><em>partner since 2009.</em></h2>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.8, marginBottom: 28 }}>
                At Possible Technology, we believe technology should help you, not confuse you. We're a team of engineers and strategists who love solving real problems and making businesses better with smart, practical solutions.
              </p>
              <p style={{ fontSize: 15, color: muted, lineHeight: 1.8, marginBottom: 36 }}>
                Whether you're a growing startup or an established enterprise, we take the time to understand your needs and craft solutions that actually work  and last.
              </p>
              {[
                "Clear communication — no confusing tech talk",
                "Custom solutions built specifically for your goals",
                "Round-the-clock support when you need help most",
                "Transparent, fair pricing with no hidden surprises",
              ].map((t, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 12 }}>
                  <div style={{ marginTop: 2, color: fg }}>
                    <Ico name="check" size={15} strokeWidth={2.2} />
                  </div>
                  <span style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>

            <div className="about-cards-grid">
              {[
                { icon: "zap", title: "Innovation Driven", desc: "We stay ahead so your business does too." },
                { icon: "shield", title: "Security First", desc: "Built-in protection at every layer." },
                { icon: "users", title: "People-Centric", desc: "Technology that serves humans, not machines." },
                { icon: "layers", title: "Full-Stack Teams", desc: "End-to-end ownership from concept to deploy." },
              ].map((item, i) => (
                <div key={i} className="card" style={{ padding: 24 }}>
                  <div style={{ color: fg, marginBottom: 14 }}>
                    <Ico name={item.icon} size={20} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{item.title}</div>
                  <div style={{ fontSize: 13, color: muted, lineHeight: 1.6 }}>{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ProductsSection Ico={Ico} subtleBg={subtleBg} />

      <section id="services" className="offerings-section offerings-section--services">
        <div className="section-wrap">
          <ServicesShowcase Ico={Ico} />
        </div>
      </section>

      <section id="why-us" className="section-padding section-bordered">
        <div className="section-wrap">
          <div className="why-grid">
            <div>
              <div className="section-tag">Why Choose Us</div>
              <h2 className="display-heading">What makes us<br /><em>different.</em></h2>
              <p style={{ marginTop: 20, fontSize: 15, color: muted, lineHeight: 1.8 }}>
                Dozens of IT firms exist. We differentiate on the things that matter: clarity, speed, honesty, and being genuinely invested in your outcome.
              </p>
              <a href="#contact" className="btn-primary" style={{ marginTop: 32, display: "inline-flex" }}>
                Work with us <Ico name="arrowRight" size={14} />
              </a>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { num: "01", title: "Simple & Clear", desc: "We explain everything in plain language. No jargon, no obfuscation — just clear communication from day one.", icon: "list" },
                { num: "02", title: "Fast Results", desc: "We move with urgency and get things done. Your time is valuable and we treat it that way.", icon: "zap" },
                { num: "03", title: "Always Here", desc: "Round-the-clock support. When something breaks at midnight, we're already on it.", icon: "headphones" },
                { num: "04", title: "Fair Pricing", desc: "No hidden fees, no surprises. You'll always know exactly what you're paying for and why.", icon: "star" },
              ].map((item, i) => (
                <div key={i} className={`card why-us-card${i >= 2 ? " why-us-card--white" : ""}`} style={{ padding: 28 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                    <span className="why-us-num">{item.num}</span>
                    <div style={{ color: fg }}>
                      <Ico name={item.icon} size={17} strokeWidth={1.5} />
                    </div>
                  </div>
                  <h4 className="why-us-title">{item.title}</h4>
                  <p className="why-us-desc">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ERPSection Ico={Ico} />

      <section id="contact" className="section-padding section-contact">
        <div className="section-wrap">
          <div className="section-tag">Let's Talk</div>
          <h2 className="display-heading" style={{ marginBottom: 16 }}>
            Ready to improve your<br /><em>business with better technology?</em>
          </h2>
          <p style={{ fontSize: 15, color: muted, marginBottom: 56, lineHeight: 1.8, maxWidth: 480 }}>
            Get in touch and let's make it happen. We usually respond within one business day.
          </p>

          <div className="contact-grid">
            <div className="contact-info-col">
              {contactInfo.map((c, i) => (
                <div key={i} className="contact-card">
                  <div className="icon-box">
                    <Ico name={c.icon} size={16} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div style={{ fontSize: 11, color: muted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 4 }}>{c.label}</div>
                    {c.href ? (<a href={c.href} className="contact-link">{c.value}</a>) : (<div style={{ fontSize: 14, lineHeight: 1.5 }}>{c.value}</div>)}
                  </div>
                </div>
              ))}
              <div className="contact-location-wrap">
                <div style={{ fontSize: 11, color: muted, letterSpacing: "0.08em", textTransform: "uppercase", fontWeight: 600, marginBottom: 8 }}>Our Office</div>
                <LocationCard />
              </div>
            </div>

            <div className="card form-card">
              {formSent ? (
                <div style={{ textAlign: "center", padding: "40px 0" }}>
                  <div style={{ color: fg, marginBottom: 16 }}>
                    <Ico name="check" size={32} strokeWidth={2} />
                  </div>
                  <div className="form-sent-title">Message sent!</div>
                  <div style={{ fontSize: 14, color: muted }}>We'll be in touch shortly.</div>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="contact-form">
                  <div className="form-row-2">
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Your Name</label>
                      <input className="input-field" placeholder="Abebe Kebede" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                    </div>
                    <div>
                      <label style={{ display: "block", fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Email Address</label>
                      <input className="input-field" type="email" placeholder="you@example.com" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} required />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Service</label>
                    <select className="input-field" value={formData.service} onChange={e => setFormData({ ...formData, service: e.target.value })}>
                      <option value="">Choose a service…</option>
                      {serviceOptions.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 12, color: muted, marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Tell us more</label>
                    <textarea className="input-field" rows={4} placeholder="Describe what you need…" value={formData.message} onChange={e => setFormData({ ...formData, message: e.target.value })} style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="btn-primary" style={{ marginTop: 4, justifyContent: "center" }}>
                    Send Message <Ico name="arrowRight" size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Layout({ dark, setDark, menuOpen, setMenuOpen, scrolled, children, navLinks, muted }) {
  return (
    <>
      <CustomCursor />
      <AIAgent />

      <button
        type="button"
        id="theme-toggle-btn"
        className="theme-toggle-fab"
        onClick={() => setDark(!dark)}
        title="Toggle theme"
        aria-label="Toggle theme"
      >
        <Ico name={dark ? "sun" : "moon"} size={15} />
      </button>

      <nav className={`nav-bar${scrolled ? " is-scrolled" : ""}${menuOpen ? " is-menu-open" : ""}`}>
        <div className="nav-float">
          <Link to="/" className="nav-logo" aria-label="Possible Technology — Home">
            <img
              src={dark ? "/logo-dark.png" : "/logo.png"}
              alt="Possible Technology"
              className="nav-logo-img"
              width={420}
              height={132}
            />
          </Link>

          <div className="nav-cluster">
            <div className="desktop-nav">
              {navLinks.map(([label, href]) => (
                href.includes("#") ? (
                  <a key={label} href={href} className="nav-link nav-pill">{label}</a>
                ) : (
                  <Link key={label} to={href} className="nav-link nav-pill">{label}</Link>
                )
              ))}
            </div>

            <div className="nav-actions">
              <a href="#contact" className="nav-link nav-pill nav-pill--cta nav-cta">
                Contact Us
              </a>
              <button
                type="button"
                className="nav-pill nav-pill--icon mobile-menu-btn"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <Ico name={menuOpen ? "x" : "menu"} size={16} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {menuOpen && (
        <div className="mobile-menu">
          {navLinks.map(([label, href]) => (
            href.includes("#") ? (
              <a key={label} href={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</a>
            ) : (
              <Link key={label} to={href} className="nav-link" onClick={() => setMenuOpen(false)}>{label}</Link>
            )
          ))}
          <a href="#contact" className="btn-primary" onClick={() => setMenuOpen(false)}>
            Get Started <Ico name="arrowRight" size={14} />
          </a>
        </div>
      )}

      {children}

      <footer className="site-footer">
        <div className="section-wrap">
          <div className="footer-grid">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                <img
                  src="/logo-mark.png"
                  alt="Possible Technology Logo"
                  style={{
                    width: 30,
                    height: 30,
                    objectFit: "contain",
                    borderRadius: 6,
                    filter: dark ? "invert(1) brightness(1.2)" : "none"
                  }}
                />
                <span className="footer-brand-name">Possible Technology</span>
              </div>
              <p style={{ fontSize: 13, color: muted, lineHeight: 1.75, maxWidth: 260 }}>
                Making technology work for you. Simple solutions, real results. Proudly based in Addis Ababa, Ethiopia.
              </p>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>Quick Links</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Home", "/"], ["Careers", "/careers"], ["Services", "/#services"], ["What We Offer", "/#erp"], ["Contact", "/#contact"]].map(([l, h]) => (
                  h.includes("#") ? (
                    <a key={l} href={h} className="footer-link">{l}</a>
                  ) : (
                    <Link key={l} to={h} className="footer-link">{l}</Link>
                  )
                ))}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>Services</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {["Cloud Services", "Cyber Security", "IT Consulting", "Web Development"].map(l => <a key={l} href="#services" className="footer-link">{l}</a>)}
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: muted, marginBottom: 16 }}>Connect</div>
              <div style={{ display: "flex", gap: 10 }}>
                {[
                  { icon: "linkedin", href: "#" },
                  { icon: "twitter", href: "#" },
                  { icon: "tiktok", href: "https://www.tiktok.com/@possible.technology" },
                  { icon: "instagram", href: "#" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Ico name={s.icon} size={14} strokeWidth={1.5} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="divider" style={{ marginBottom: 24 }} />

          <div className="footer-bottom">
            <div style={{ fontSize: 12, color: muted }}>© 2026 Possible Technology. All rights reserved.</div>
            <a href={`tel:${PHONE_MAIN}`} className="footer-phone-link">
              <Ico name="phone" size={12} />
              {PHONE_MAIN_DISPLAY}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", service: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 769px)");
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const bg = "var(--bg)";
  const fg = "var(--fg)";
  const muted = "var(--muted)";
  const border = "var(--border)";
  const cardBg = "var(--card-bg)";
  const cardBorder = "var(--card-border)";
  const subtleBg = "var(--subtle-bg)";

  const navLinks = [
    ["Home","/"],
    ["Careers","/careers"],
    ["Products","/#products"],

    ["What We Offer","/#erp"],
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 4000);
    setFormData({ name: "", email: "", service: "", message: "" });
  };

  return (
    <BrowserRouter>
      <VisitTracker />
      <Routes>
        <Route path="/admin" element={
          <AdminPage />
        } />
        <Route path="/careers" element={
          <Layout dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} navLinks={navLinks} muted={muted}>
            <CareersPage />
          </Layout>
        } />
        <Route path="/portfolio" element={
          <Layout dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} navLinks={navLinks} muted={muted}>
            <PortfolioPage dark={dark} />
          </Layout>
        } />
        <Route path="/" element={
          <Layout dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled} navLinks={navLinks} muted={muted}>
            <HomePage dark={dark} setDark={setDark} menuOpen={menuOpen} setMenuOpen={setMenuOpen} scrolled={scrolled}
              formData={formData} setFormData={setFormData} formSent={formSent} handleFormSubmit={handleFormSubmit}
              bg={bg} fg={fg} muted={muted} border={border} cardBg={cardBg} cardBorder={cardBorder} subtleBg={subtleBg}
              navLinks={navLinks} />
          </Layout>
        } />
      </Routes>
    </BrowserRouter>
  );
}
