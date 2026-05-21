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
  x: ["M18 6L6 18","M6 6l12 12"],
  truck: ["M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2","M15 18H9","M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14","M14 18v-3a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v3","M14 9V7"],
  wifi: ["M5 12.55a11 11 0 0 1 14.08 0","M1.42 9a16 16 0 0 1 21.16 0","M8.53 16.11a6 6 0 0 1 6.95 0","M12 20h.01"],
  sparkles: ["M12 3l1.2 3.6L17 7.8l-3.6 1.2L12 12.6 10.6 9l-3.6-1.2L10.8 6.6 12 3z","M5 14l.8 2.4L8 17.2l-2.4.8L5 20.4 3.6 18l-2.4-.8L3.2 16.4 5 14z","M19 14l.8 2.4L22 17.2l-2.4.8L19 20.4l-1.4-2.4-2.4-.8 2.4-.8 1.4-2.4z"]
};

const packages = [
  {
    id: "business",
    tag: "Enterprise Resource Planning",
    name: "ERP Solution",
    tagline: "The complete toolkit for your business.",
    description: "Our ERP solution covers every core function your business needs — finance, HR, CRM, inventory, and more — all in one unified platform built specifically for Ethiopian businesses.",
    icon: "layers",
    popular: true,
    features: [
      "Financial Management & Ledger",
      "HR & Payroll Management",
      "Customer Relationship (CRM)",
      "Inventory & Stock Control",
      "Sales & Purchase Orders",
      "Advanced BI & Reporting",
      "Multi-user & Role-based Access",
      "Cloud or on-premise",
    ],
    cta: "Book a Free Demo",
  },
  {
    id: "rfid-fleet",
    tag: "Fleet & Logistics",
    name: "RFID Fleet Management",
    tagline: "Track every vehicle. Automatically. In real time.",
    description: "A system that uses RFID technology to automatically track, monitor, and manage your entire vehicle fleet in real time — reducing manual overhead and improving operational visibility.",
    icon: "truck",
    popular: false,
    features: [
      "Real-time RFID vehicle tracking",
      "Automated entry & exit logging",
      "Live fleet location dashboard",
      "Fuel & maintenance records",
      "Driver assignment & scheduling",
      "Alerts & incident reporting",
      "Custom reporting & analytics",
    ],
    cta: "Get a Demo",
  },
  {
    id: "nfc-system",
    tag: "Contactless Technology",
    name: "NFC Chip Integrated System",
    tagline: "Secure, instant, contactless — built for your business.",
    description: "A system that leverages NFC chips for secure short-range communication — enabling contactless payments, smart attendance tracking, and seamless access control at your premises.",
    icon: "wifi",
    popular: false,
    features: [
      "Contactless payment processing",
      "NFC-based attendance tracking",
      "Smart access control gates",
      "Encrypted chip authentication",
      "Integration with HR & payroll",
      "Mobile app compatibility",
      "Custom NFC card provisioning",
    ],
    cta: "Get a Demo",
  },
  {
    id: "ai-agents",
    tag: "Artificial Intelligence",
    name: "AI Agents for Hospitals & Schools",
    tagline: "Intelligent assistants that run your operations.",
    description: "Intelligent AI-powered software agents that automate repetitive tasks, answer questions around the clock, and help hospitals and schools manage complex operations more efficiently.",
    icon: "sparkles",
    popular: false,
    features: [
      "24/7 AI-powered front desk assistant",
      "Automated appointment scheduling",
      "Student & patient Q&A chatbot",
      "Smart document management",
      "Admin workflow automation",
      "Multi-language support (Amharic & English)",
      "Seamless integration with existing systems",
    ],
    cta: "Get a Demo",
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
          <div className="section-tag">What We Offer</div>
          <h2 className="display-heading" style={{ marginBottom: 20 }}>
            Powerful solutions built<br /><em>for your business.</em>
          </h2>
          <p className="erp-intro">
            From enterprise ERP to AI agents and smart hardware integrations — our solutions are built specifically for Ethiopian businesses. Choose what fits your needs and grow from there.
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
