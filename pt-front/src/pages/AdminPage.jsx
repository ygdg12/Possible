import { useState, useEffect, useCallback } from "react";

const API = "http://localhost:5000/api/admin";

const Ico = ({ d, size = 18, strokeWidth = 1.6 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth={strokeWidth}
    strokeLinecap="round" strokeLinejoin="round">
    {Array.isArray(d) ? d.map((p, i) => <path key={i} d={p} />) : <path d={d} />}
  </svg>
);

const icons = {
  mail: ["M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z", "M22 6l-10 7L2 6"],
  lock: "M12 15v2m-6 4h12a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2zm10-8V7a4 4 0 0 0-8 0v4",
  plus: "M12 5v14M5 12h14",
  x: ["M18 6L6 18", "M6 6l12 12"],
  check: "M20 6L9 17l-5-5",
  briefcase: "M20 7H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zM16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2",
  users: ["M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2", "M23 21v-2a4 4 0 0 0-3-3.87", "M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z", "M16 3.13a4 4 0 0 1 0 7.75"],
  logOut: ["M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", "M16 17l5-5-5-5", "M21 12H9"],
  trash: ["M3 6h18M8 6V4a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"],
  eye: ["M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z", "M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"],
  arrowLeft: "M19 12H5M12 19l-7-7 7-7",
};

function LoginForm({ onLogin, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="admin-login-wrap">
      <div className="admin-login-card">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--brand)", color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
            <Ico d={icons.lock} size={20} strokeWidth={2} />
          </div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", fontWeight: 500 }}>Admin Login</h1>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 8 }}>Sign in to manage job listings and applications</p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Email</label>
            <input type="email" className="input-field" placeholder="admin@possibletechplc.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Password</label>
            <input type="password" className="input-field" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          {error && (
            <div style={{ fontSize: 13, color: "#e74c3c", background: "rgba(231, 76, 60, 0.08)", padding: "10px 14px", borderRadius: 8 }}>{error}</div>
          )}
          <button type="submit" className="btn-primary" style={{ justifyContent: "center", marginTop: 4 }}>
            Sign In <Ico d={icons.arrowLeft} size={14} />
          </button>
        </form>
      </div>
    </div>
  );
}

function JobForm({ onSubmit, initial }) {
  const [title, setTitle] = useState(initial?.title || "");
  const [type, setType] = useState(initial?.type || "Full-time");
  const [location, setLocation] = useState(initial?.location || "Addis Ababa");
  const [desc, setDesc] = useState(initial?.desc || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, type, location, desc });
    if (!initial) {
      setTitle(""); setType("Full-time"); setLocation("Addis Ababa"); setDesc("");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Job Title</label>
        <input className="input-field" placeholder="e.g. Senior Full Stack Developer" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Type</label>
          <select className="input-field" value={type} onChange={(e) => setType(e.target.value)}>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Internship</option>
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Location</label>
          <input className="input-field" placeholder="Addis Ababa" value={location} onChange={(e) => setLocation(e.target.value)} required />
        </div>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>Description</label>
        <textarea className="input-field" rows={4} placeholder="Describe the role, responsibilities, and requirements..." value={desc} onChange={(e) => setDesc(e.target.value)} required style={{ resize: "vertical" }} />
      </div>
      <button type="submit" className="btn-primary" style={{ justifyContent: "center", alignSelf: "flex-start" }}>
        {initial ? "Update Job" : "Post Job"} <Ico d={icons.plus} size={14} />
      </button>
    </form>
  );
}

export default function AdminPage() {
  const [token, setToken] = useState(() => localStorage.getItem("admin_token"));
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState("jobs");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [editingJob, setEditingJob] = useState(null);
  const [viewingApp, setViewingApp] = useState(null);
  const [showPostForm, setShowPostForm] = useState(false);

  const headers = useCallback(() => ({
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  }), [token]);

  const fetchJobs = useCallback(async () => {
    try {
      const res = await fetch(`${API}/jobs`, { headers: headers() });
      if (res.ok) setJobs(await res.json());
    } catch {}
  }, [headers]);

  const fetchApps = useCallback(async () => {
    try {
      const res = await fetch(`${API}/applications`, { headers: headers() });
      if (res.ok) setApplications(await res.json());
    } catch {}
  }, [headers]);

  useEffect(() => {
    if (token) {
      fetchJobs();
      fetchApps();
    }
  }, [token, fetchJobs, fetchApps]);

  const handleLogin = async (email, password) => {
    try {
      const res = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        localStorage.setItem("admin_token", data.token);
        setLoginError("");
      } else {
        setLoginError(data.error || "Login failed");
      }
    } catch {
      setLoginError("Could not connect to server");
    }
  };

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem("admin_token");
  };

  const handleAddJob = async (job) => {
    try {
      const res = await fetch(`${API}/jobs`, {
        method: "POST",
        headers: headers(),
        body: JSON.stringify(job),
      });
      if (res.ok) {
        const created = await res.json();
        setJobs([created, ...jobs]);
        setShowPostForm(false);
      }
    } catch {}
  };

  const handleUpdateJob = async (updated) => {
    try {
      const res = await fetch(`${API}/jobs/${editingJob._id}`, {
        method: "PUT",
        headers: headers(),
        body: JSON.stringify(updated),
      });
      if (res.ok) {
        const saved = await res.json();
        setJobs(jobs.map((j) => (j._id === editingJob._id ? saved : j)));
        setEditingJob(null);
      }
    } catch {}
  };

  const handleDeleteJob = async (id) => {
    if (!confirm("Delete this job listing?")) return;
    try {
      const res = await fetch(`${API}/jobs/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      if (res.ok) setJobs(jobs.filter((j) => j._id !== id));
    } catch {}
  };

  const handleDeleteApp = async (id) => {
    if (!confirm("Delete this application?")) return;
    try {
      const res = await fetch(`${API}/applications/${id}`, {
        method: "DELETE",
        headers: headers(),
      });
      if (res.ok) setApplications(applications.filter((a) => a._id !== id));
    } catch {}
  };

  if (!token) {
    return (
      <div className="admin-page">
        <LoginForm onLogin={handleLogin} error={loginError} />
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-dashboard">
        <div className="admin-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: "var(--brand)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Ico d={icons.briefcase} size={16} strokeWidth={2} />
            </div>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Admin Dashboard</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>Manage jobs & applications</div>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="btn-ghost" style={{ fontSize: 12 }}>
            <Ico d={icons.logOut} size={13} /> Logout
          </button>
        </div>

        <div className="admin-tabs">
          <button type="button" className={`admin-tab${tab === "jobs" ? " is-active" : ""}`} onClick={() => { setTab("jobs"); setShowPostForm(false); setEditingJob(null); }}>
            <Ico d={icons.briefcase} size={13} /> Job Listings ({jobs.length})
          </button>
          <button type="button" className={`admin-tab${tab === "apps" ? " is-active" : ""}`} onClick={() => { setTab("apps"); setViewingApp(null); }}>
            <Ico d={icons.users} size={13} /> Applications ({applications.length})
          </button>
        </div>

        <div className="admin-content">
          {tab === "jobs" && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 500 }}>Job Listings</h3>
                <button type="button" className="btn-primary" style={{ fontSize: 12 }} onClick={() => { setShowPostForm(!showPostForm); setEditingJob(null); }}>
                  <Ico d={icons.plus} size={12} /> {showPostForm ? "Cancel" : "New Job"}
                </button>
              </div>
              {showPostForm && (
                <div className="admin-card" style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Post New Job</h4>
                  <JobForm onSubmit={handleAddJob} />
                </div>
              )}
              {editingJob && (
                <div className="admin-card" style={{ marginBottom: 24 }}>
                  <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 16 }}>Edit Job</h4>
                  <JobForm onSubmit={handleUpdateJob} initial={editingJob} />
                </div>
              )}
              {jobs.length === 0 ? (
                <div className="admin-empty"><p>No job listings yet. Click "New Job" to post one.</p></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {jobs.map((job) => (
                    <div key={job._id} className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                      <div style={{ flex: 1, minWidth: 200 }}>
                        <div style={{ fontWeight: 600, fontSize: 14 }}>{job.title}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 12, marginTop: 4 }}>
                          <span>{job.type}</span>
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <div style={{ display: "flex", gap: 8 }}>
                        <button type="button" className="btn-ghost" style={{ fontSize: 12, padding: "8px 14px" }} onClick={() => { setEditingJob(job); setShowPostForm(false); }}>
                          <Ico d={icons.eye} size={12} /> Edit
                        </button>
                        <button type="button" className="btn-ghost" style={{ fontSize: 12, padding: "8px 14px", color: "#e74c3c" }} onClick={() => handleDeleteJob(job._id)}>
                          <Ico d={icons.trash} size={12} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {tab === "apps" && (
            <>
              {viewingApp ? (
                <div>
                  <button type="button" className="btn-ghost" style={{ fontSize: 12, marginBottom: 20 }} onClick={() => setViewingApp(null)}>
                    <Ico d={icons.arrowLeft} size={12} /> Back to Applications
                  </button>
                  <div className="admin-card">
                    <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{viewingApp.name}</h4>
                    <div style={{ fontSize: 13, color: "var(--muted)", marginBottom: 16 }}>
                      Applied for: <strong>{viewingApp.jobTitle}</strong>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13 }}>
                      <div><span style={{ color: "var(--muted)" }}>Email:</span> {viewingApp.email}</div>
                      <div><span style={{ color: "var(--muted)" }}>Phone:</span> {viewingApp.phone}</div>
                      <div><span style={{ color: "var(--muted)" }}>Message:</span></div>
                      <div style={{ background: "var(--subtle-bg)", padding: 16, borderRadius: 8, lineHeight: 1.7, whiteSpace: "pre-wrap" }}>{viewingApp.message}</div>
                      <div style={{ fontSize: 11, color: "var(--muted)" }}>Submitted: {new Date(viewingApp.createdAt).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 500, marginBottom: 24 }}>Submitted Applications</h3>
                  {applications.length === 0 ? (
                    <div className="admin-empty"><p>No applications submitted yet.</p></div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {applications.map((app) => (
                        <div key={app._id} className="admin-card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                          <div style={{ flex: 1, minWidth: 200 }}>
                            <div style={{ fontWeight: 600, fontSize: 14 }}>{app.name}</div>
                            <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 12, marginTop: 4 }}>
                              <span>{app.jobTitle}</span>
                              <span>{app.email}</span>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8 }}>
                            <button type="button" className="btn-ghost" style={{ fontSize: 12, padding: "8px 14px" }} onClick={() => setViewingApp(app)}>
                              <Ico d={icons.eye} size={12} /> View
                            </button>
                            <button type="button" className="btn-ghost" style={{ fontSize: 12, padding: "8px 14px", color: "#e74c3c" }} onClick={() => handleDeleteApp(app._id)}>
                              <Ico d={icons.trash} size={12} /> Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
