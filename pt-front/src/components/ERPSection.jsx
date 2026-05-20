import { useState, useEffect } from "react";

const Svg = ({ d, size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const ICONS = {
  check: "M20 6L9 17l-5-5",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  layers: ["M12 2L2 7l10 5 10-5-10-5z","M2 17l10 5 10-5","M2 12l10 5 10-5"],
  cpu: ["M18 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2z","M9 9h6v6H9z","M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3"],
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2","M23 21v-2a4 4 0 0 0-3-3.87","M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z","M16 3.13a4 4 0 0 1 0 7.75"],
  settings: ["M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z","M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"],
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.77h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.38v-.46z",
  x: ["M18 6L6 18","M6 6l12 12"]
};

const packages = [
  {
    id: "starter",
    tag: "For small businesses",
    name: "Starter ERP",
    tagline: "Your first step into smart management.",
    description: "A focused, affordable ERP that covers the essentials — finance and inventory — to help small businesses get organized and grow with confidence.",
    icon: "zap",
    popular: false,
    features: [
      "Financial Management & Ledger",
      "Invoicing & Billing",
      "Inventory & Stock Control",
      "Basic Dashboard & Reports",
      "Up to 5 users",
      "Email support",
      "Cloud or on-premise",
    ],
    cta: "Book a Free Demo",
  },
  {
    id: "business",
    tag: "Most Popular",
    name: "Business ERP",
    tagline: "The complete toolkit for growing teams.",
    description: "Our most popular package. Covers every core function your mid-size business needs — finance, HR, CRM, and inventory — all in one unified platform.",
    icon: "layers",
    popular: true,
    features: [
      "All Starter features",
      "HR & Payroll Management",
      "Customer Relationship (CRM)",
      "Sales & Purchase Orders",
      "Advanced BI & Reporting",
      "Multi-user & Role-based Access",
      "Priority support",
      "Cloud or on-premise",
    ],
    cta: "Book a Free Demo",
  },
  {
    id: "enterprise",
    tag: "For large organizations",
    name: "Enterprise ERP",
    tagline: "The full suite for every department.",
    description: "Everything in Business ERP plus manufacturing, supply chain, project management, and deep customization — built for organizations that demand the best.",
    icon: "cpu",
    popular: false,
    features: [
      "All Business features",
      "Manufacturing & Production",
      "Supply Chain & Logistics",
      "Project Management",
      "Multi-branch & Multi-currency",
      "API integrations",
      "Dedicated account manager",
      "SLA-backed support",
    ],
    cta: "Book a Free Demo",
  },
  {
    id: "custom",
    tag: "Fully bespoke",
    name: "Custom ERP",
    tagline: "Built exactly to your requirements.",
    description: "Have unique workflows that off-the-shelf solutions can't handle? We design and build your ERP from the ground up, integrated with your existing systems.",
    icon: "settings",
    popular: false,
    features: [
      "Full requirements analysis",
      "Custom module development",
      "Integration with existing tools",
      "Unique workflow automation",
      "Complete documentation",
      "Staff training included",
      "Long-term maintenance",
      "Dedicated dev team",
    ],
    cta: "Book a Free Demo",
  },
];

export default function ERPSection({ Ico }) {
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", company: "", notes: "" });
  const [success, setSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (selectedPkg) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e) => {
        if (e.key === "Escape") setSelectedPkg(null);
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [selectedPkg]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1200);
  };

  const handleClose = () => {
    setSelectedPkg(null);
    setSuccess(false);
    setFormData({ name: "", email: "", phone: "", company: "", notes: "" });
  };

  return (
    <section id="erp" className="section-padding section-bordered erp-section">
      <div className="section-wrap">
        {/* Header */}
        <div className="erp-header">
          <div className="section-tag">ERP Packages</div>
          <h2 className="display-heading" style={{ marginBottom: 20 }}>
            Manage your business<br /><em>smarter, not harder.</em>
          </h2>
          <p className="erp-intro">
            Our ERP solutions are built specifically for Ethiopian businesses — from lean startups to large enterprises. Choose the package that fits your scale and grow from there.
          </p>
        </div>

        {/* Cards grid */}
        <div className="erp-grid">
          {packages.map((pkg) => (
            <article
              key={pkg.id}
              id={`erp-${pkg.id}`}
              className={`erp-card${pkg.popular ? " erp-card--popular" : ""}`}
            >
              {pkg.popular && (
                <div className="erp-popular-badge">
                  <Svg d={ICONS.star} size={11} strokeWidth={2} />
                  Most Popular
                </div>
              )}

              <div className="erp-card-top">
                <div className="erp-card-icon">
                  <Svg d={ICONS[pkg.icon]} size={20} strokeWidth={1.6} />
                </div>
                <div className="erp-card-tag">{pkg.tag}</div>
                <h3 className="erp-card-name">{pkg.name}</h3>
                <p className="erp-card-tagline">{pkg.tagline}</p>
                <p className="erp-card-desc">{pkg.description}</p>
              </div>

              <div className="erp-divider" />

              <ul className="erp-features">
                {pkg.features.map((f, i) => (
                  <li key={i} className="erp-feature-item">
                    <span className="erp-feature-check">
                      <Svg d={ICONS.check} size={13} strokeWidth={2.5} />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <div className="erp-card-footer">
                <button
                  type="button"
                  onClick={() => setSelectedPkg(pkg)}
                  className={`erp-cta-btn${pkg.popular ? " erp-cta-btn--primary" : ""}`}
                  style={{ width: "100%", justifyContent: "center", border: "none", cursor: "pointer" }}
                >
                  {pkg.cta}
                  <Svg d={ICONS.arrowRight} size={14} strokeWidth={2} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom note */}
        <div className="erp-bottom-note">
          <div className="erp-note-icons">
            <span className="erp-note-icon"><Svg d={ICONS.users} size={16} strokeWidth={1.6} /></span>
            <span className="erp-note-icon"><Svg d={ICONS.briefcase} size={16} strokeWidth={1.6} /></span>
            <span className="erp-note-icon"><Svg d={ICONS.phone} size={16} strokeWidth={1.6} /></span>
          </div>
          <p className="erp-note-text">
            All packages include implementation support, staff training, and local after-sales service.
            Not sure which fits you? <a href="#contact" className="erp-note-link">Talk to our team →</a>
          </p>
        </div>
      </div>

      {/* STUNNING POPUP MODAL */}
      {selectedPkg && (
        <div
          className="erp-modal-overlay"
          onClick={(e) => {
            if (e.target.classList.contains("erp-modal-overlay")) handleClose();
          }}
          role="dialog"
          aria-modal="true"
        >
          <div className="erp-modal-container">
            <div className="erp-modal-header">
              <div className="erp-modal-title-wrap">
                <span className="erp-modal-tag">{selectedPkg.tag}</span>
                <h3 className="erp-modal-title">Book a Free Demo</h3>
              </div>
              <button
                type="button"
                className="erp-modal-close-btn"
                onClick={handleClose}
                aria-label="Close modal"
              >
                <Svg d={ICONS.x} size={16} strokeWidth={2.2} />
              </button>
            </div>

            <div className="erp-modal-body">
              {!success ? (
                <form onSubmit={handleFormSubmit} className="erp-modal-form">
                  <div className="erp-form-note">
                    Let's explore how the <strong>{selectedPkg.name}</strong> can streamline your business workflows.
                  </div>

                  <div className="erp-form-group">
                    <label className="erp-form-label">Full Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Abebe Kebede"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="erp-form-group">
                    <label className="erp-form-label">Business Email</label>
                    <input
                      type="email"
                      className="input-field"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="erp-form-group">
                    <label className="erp-form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="input-field"
                      placeholder="+251 911 00 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="erp-form-group">
                    <label className="erp-form-label">Company Name</label>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Possible Tech PLC"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="erp-form-group">
                    <label className="erp-form-label">Additional requirements / Notes</label>
                    <textarea
                      className="input-field"
                      rows={3}
                      placeholder="Tell us about your team size, custom needs..."
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      disabled={submitting}
                      style={{ resize: "vertical" }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="erp-submit-btn"
                    disabled={submitting}
                  >
                    {submitting ? "Booking Demo..." : "Book Demo Walkthrough"}
                    <Svg d={ICONS.arrowRight} size={15} strokeWidth={2} />
                  </button>
                </form>
              ) : (
                <div className="erp-success-wrap">
                  <div className="erp-success-icon-box">
                    <Svg d={ICONS.check} size={30} strokeWidth={2.2} />
                  </div>
                  <h4 className="erp-success-title">Demo Request Sent!</h4>
                  <p className="erp-success-text">
                    Thank you, <strong>{formData.name}</strong>! We've received your request for a live <strong>{selectedPkg.name}</strong> walkthrough.
                  </p>
                  <p className="erp-success-text" style={{ fontSize: 13, marginTop: -8 }}>
                    Our ERP solutions architect will contact you shortly at <strong>{formData.email}</strong> or <strong>{formData.phone}</strong> to confirm your walkthrough schedule.
                  </p>
                  <button
                    type="button"
                    className="btn-primary erp-success-btn"
                    onClick={handleClose}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
