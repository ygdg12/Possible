import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Ico = ({ d, size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
  arrowRight: "M5 12h14M12 5l7 7-7 7",
  check: "M20 6L9 17l-5-5",
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M16 3.13a4 4 0 0 1 0 7.75"],
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  code: ["M16 18l6-6-6-6", "M8 6l-6 6 6 6"],
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  star: "M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z",
  zap: "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
  monitor: ["M20 3H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1z", "M8 21h8M12 17v4"],
  trendingUp: ["M23 6l-9.5 9.5-5-5L1 18", "M17 6h6v6"],
  x: ["M18 6L6 18", "M6 6l12 12"],
  phone: "M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.77h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17.38v-.46z",
};

const API = "https://possible-1-zua9.onrender.com/api/admin";

const perks = [
  { icon: "zap", title: "Growth Mindset", desc: "Continuous learning budget, conferences, and mentorship programs." },
  { icon: "users", title: "Collaborative Culture", desc: "Work with a tight-knit team of passionate engineers and creators." },
  { icon: "star", title: "Competitive Pay", desc: "Fair compensation that matches your skills and experience." },
  { icon: "monitor", title: "Flexible Setup", desc: "Remote-friendly with a modern office in the heart of Addis Ababa." },
];

export default function CareersPage() {
  const [showForm, setShowForm] = useState(false);
  const [applyFor, setApplyFor] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [application, setApplication] = useState({ name: "", email: "", phone: "", message: "" });
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetch(`${API}/jobs`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load jobs");
        return r.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setJobs(data);
        } else {
          setJobs([]);
        }
      })
      .catch(() => {
        setJobs([]);
      });
  }, []);

  const openApplication = (jobTitle) => {
    setApplyFor(jobTitle);
    setApplication({ name: "", email: "", phone: "", message: "" });
    setSubmitted(false);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${API}/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobTitle: applyFor,
          name: application.name,
          email: application.email,
          phone: application.phone,
          message: application.message,
        }),
      });
    } catch {}
    setSubmitted(true);
  };

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="section-wrap">
          <Link to="/" className="portfolio-back-link">
            <Ico d={icons.arrowLeft} size={14} />
            Back to Home
          </Link>
          <div className="section-tag">Join Us</div>
          <h1 className="display-heading" style={{ marginTop: 16 }}>
            Careers at<br /><em>Possible Technology.</em>
          </h1>
          <p className="portfolio-intro">
            We're always looking for talented people who love solving real problems. If you're passionate about technology and want to make an impact, we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="section-wrap">
          <div style={{ marginBottom: 60 }}>
            <div className="section-tag">Why Work With Us</div>
            <h2 className="display-heading" style={{ marginBottom: 32 }}>
              Built by engineers,<br /><em>for engineers.</em>
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
              {perks.map((p, i) => (
                <div key={i} className="card" style={{ padding: 28 }}>
                  <div style={{ color: "var(--fg)", marginBottom: 14 }}>
                    <Ico d={icons[p.icon]} size={20} />
                  </div>
                  <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{p.title}</div>
                  <div style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="section-tag">Open Positions</div>
            <h2 className="display-heading" style={{ marginBottom: 32 }}>
              Join our<br /><em>growing team.</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {Array.isArray(jobs) && jobs.length > 0 ? (
                jobs.map((job) => (
                  <div key={job._id} className="card" style={{ padding: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
                    <div style={{ flex: 1, minWidth: 240 }}>
                      <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{job.title}</div>
                      <div style={{ display: "flex", gap: 16, fontSize: 12, color: "var(--muted)", marginBottom: 8 }}>
                        <span>{job.type}</span>
                        <span>{job.location}</span>
                      </div>
                      <div style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.6 }}>{job.desc}</div>
                    </div>
                    <button type="button" className="btn-primary" style={{ whiteSpace: "nowrap", flexShrink: 0, border: "none", cursor: "pointer" }} onClick={() => openApplication(job.title)}>
                      Apply Now <Ico d={icons.arrowRight} size={14} />
                    </button>
                  </div>
                ))
              ) : (
                <div style={{ textAlign: "center", padding: "40px 20px", color: "var(--muted)", border: "1px dashed var(--border)", borderRadius: 12 }}>
                  No open positions at the moment. Feel free to send a general application below!
                </div>
              )}
            </div>
          </div>

          <div style={{ marginTop: 60, padding: 40, background: "var(--subtle-bg)", borderRadius: 12, border: "1px solid var(--border)", textAlign: "center" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 500, marginBottom: 12 }}>
              Don't see the right role?
            </h3>
            <p style={{ fontSize: 14, color: "var(--muted)", marginBottom: 20, maxWidth: 480, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
              We're always open to hearing from talented people. Send us your resume and tell us how you can contribute.
            </p>
            <button type="button" className="btn-primary" style={{ border: "none", cursor: "pointer" }} onClick={() => openApplication("General Application")}>
              Send your resume <Ico d={icons.arrowRight} size={14} />
            </button>
          </div>
        </div>
      </section>

      {showForm && (
        <div className="erp-modal-overlay" onClick={(e) => { if (e.target.classList.contains("erp-modal-overlay")) setShowForm(false); }}>
          <div className="erp-modal-container">
            <div className="erp-modal-header">
              <div className="erp-modal-title-wrap">
                <span className="erp-modal-tag">{applyFor}</span>
                <h3 className="erp-modal-title">Submit Your Application</h3>
              </div>
              <button type="button" className="erp-modal-close-btn" onClick={() => setShowForm(false)} aria-label="Close">
                <Ico d={icons.x} size={16} strokeWidth={2.2} />
              </button>
            </div>
            <div className="erp-modal-body">
              {!submitted ? (
                <form onSubmit={handleSubmit} className="erp-modal-form">
                  <div className="erp-form-note">
                    Apply for <strong>{applyFor}</strong>. We'll review your application and get back to you.
                  </div>
                  <div className="erp-form-group">
                    <label className="erp-form-label">Full Name</label>
                    <input type="text" className="input-field" placeholder="Abebe Kebede" value={application.name} onChange={(e) => setApplication({ ...application, name: e.target.value })} required />
                  </div>
                  <div className="erp-form-group">
                    <label className="erp-form-label">Email</label>
                    <input type="email" className="input-field" placeholder="you@example.com" value={application.email} onChange={(e) => setApplication({ ...application, email: e.target.value })} required />
                  </div>
                  <div className="erp-form-group">
                    <label className="erp-form-label">Phone</label>
                    <input type="tel" className="input-field" placeholder="+251 911 00 0000" value={application.phone} onChange={(e) => setApplication({ ...application, phone: e.target.value })} required />
                  </div>
                  <div className="erp-form-group">
                    <label className="erp-form-label">Why are you a good fit?</label>
                    <textarea className="input-field" rows={4} placeholder="Tell us about your experience, skills, and what excites you about this role..." value={application.message} onChange={(e) => setApplication({ ...application, message: e.target.value })} required style={{ resize: "vertical" }} />
                  </div>
                  <button type="submit" className="erp-submit-btn">
                    Submit Application <Ico d={icons.arrowRight} size={14} />
                  </button>
                </form>
              ) : (
                <div className="erp-success-wrap">
                  <div className="erp-success-icon-box">
                    <Ico d={icons.check} size={30} strokeWidth={2.2} />
                  </div>
                  <h4 className="erp-success-title">Application Submitted!</h4>
                  <p className="erp-success-text">
                    Thank you, <strong>{application.name}</strong>! We've received your application for <strong>{applyFor}</strong>.
                  </p>
                  <p className="erp-success-text" style={{ fontSize: 13, marginTop: -8 }}>
                    Our hiring team will review your application and reach out if there's a match.
                  </p>
                  <button type="button" className="btn-primary erp-success-btn" onClick={() => setShowForm(false)}>
                    Done
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
