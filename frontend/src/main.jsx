import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./styles.css";

const api = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:3000`,
  withCredentials: true
});

const Icon = ({ name, size = 18 }) => {
  const paths = {
    arrow: <><path d="M5 12h14" /><path d="m13 6 6 6-6 6" /></>,
    spark: <><path d="m12 3-1.6 5.4L5 10l5.4 1.6L12 17l1.6-5.4L19 10l-5.4-1.6Z" /><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7Z" /></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h5" /></>,
    target: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3" /><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2" /></>,
    chat: <><path d="M20 15a3 3 0 0 1-3 3H8l-5 3V7a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3Z" /><path d="M8 9h8M8 13h5" /></>,
    settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.7 1.7-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5v.2h-2.4v-.2a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L8 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H6.7v-2.4h.2a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L8 8.6l1.7-1.7.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.5v-.2h2.4v.2a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.7 1.7-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.2V14h-.2a1.7 1.7 0 0 0-1.5 1Z" /></>,
    upload: <><path d="M12 16V4M7 9l5-5 5 5" /><path d="M5 20h14" /></>,
    check: <path d="m5 12 4 4L19 6" />,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">{paths[name]}</svg>;
};

function Logo() {
  return <Link className="logo" to="/"><span className="logo-mark"><Icon name="spark" size={17} /></span><span>Hire<span className="logo-accent">Lens</span></span></Link>;
}

function Landing() {
  return <div className="landing">
    <header className="marketing-nav page-width"><Logo /><nav><a href="#product">Product</a><a href="#workflow">How it works</a><a href="#principles">Why HireLens</a></nav><div className="nav-actions"><Link className="button button-ghost" to="/login">Sign in</Link><Link className="button button-primary" to="/register">Get started <Icon name="arrow" size={16} /></Link></div></header>
    <main>
      <section className="hero page-width"><div className="eyebrow"><span className="pulse-dot" /> Built for the next interview</div><h1>Turn preparation into<br /><em>your unfair advantage.</em></h1><p className="hero-copy">HireLens combines your resume, the role you want, and focused AI coaching into a clear path from “maybe” to “hired.”</p><div className="hero-actions"><Link className="button button-primary button-large" to="/register">Start preparing free <Icon name="arrow" size={17} /></Link><a className="text-link" href="#product">Explore the platform <Icon name="arrow" size={15} /></a></div><div className="hero-meta"><span><Icon name="check" size={15} /> Resume-aware coaching</span><span><Icon name="check" size={15} /> Role-specific practice</span><span><Icon name="check" size={15} /> No generic advice</span></div></section>
      <section className="preview-wrap page-width" id="product"><div className="dashboard-preview"><div className="preview-sidebar"><Logo /><div className="preview-nav"><span className="active"><Icon name="grid" size={15} /> Overview</span><span><Icon name="file" size={15} /> Resume lab</span><span><Icon name="target" size={15} /> Match score</span><span><Icon name="chat" size={15} /> Interview prep</span></div><span className="preview-user">SN <small>Sonam Narula</small></span></div><div className="preview-main"><div className="preview-top"><span>Overview</span><span className="preview-date">Your preparation cockpit <b>↗</b></span></div><h3>Good evening, Sonam.</h3><p className="muted">Here’s a clear view of your next best move.</p><div className="preview-grid"><div className="preview-card score-card"><div className="card-label">Profile strength <span>Waiting for first scan</span></div><div className="score-row"><strong>—</strong><small>/100</small><div className="ring"><span>Ready</span></div></div><div className="progress"><i style={{width:"18%"}} /></div><p>Upload a resume and target role to reveal your profile signal.</p></div><div className="preview-card"><div className="card-label">Next best action <span className="orange">Get started</span></div><div className="action-line"><span className="action-icon"><Icon name="target" size={17} /></span><div><b>Add a target role</b><p>Paste the job you want next</p></div><Icon name="arrow" size={16} /></div><div className="action-line"><span className="action-icon blue"><Icon name="file" size={17} /></span><div><b>Upload your resume</b><p>Give your story some context</p></div><Icon name="arrow" size={16} /></div></div></div></div></div></section>
      <section className="section page-width" id="principles"><div className="section-heading"><div><div className="eyebrow">One focused workspace</div><h2>Everything you need to<br /><em>show up sharper.</em></h2></div><p>Less noise. Better signal. HireLens turns scattered prep into a system you can actually follow.</p></div><div className="feature-grid"><Feature icon="target" title="Know your fit" text="See how your resume maps to the role, with the skills that matter most." /><Feature icon="chat" title="Practice with intent" text="Get questions and model answers shaped around your experience and target role." /><Feature icon="spark" title="Improve every pass" text="Turn feedback into an evolving preparation plan, not a one-off score." /></div></section>
      <section className="workflow section page-width" id="workflow"><div className="eyebrow">A better way to prepare</div><h2>From first upload to<br /><em>confident answer.</em></h2><div className="steps"><Step number="01" title="Bring your context" text="Upload your resume and paste the job you’re aiming for." /><Step number="02" title="See the signal" text="HireLens finds the overlap, gaps, and highest-leverage improvements." /><Step number="03" title="Practice forward" text="Work through a role-specific plan until the story feels like yours." /></div></section>
      <section className="cta-panel page-width"><div><div className="eyebrow">Your next opportunity starts here</div><h2>Prepare with clarity.<br /><em>Walk in with confidence.</em></h2></div><Link className="button button-light button-large" to="/register">Create your workspace <Icon name="arrow" size={17} /></Link></section>
    </main>
    <footer className="footer page-width"><Logo /><span>© 2026 HireLens. Built for ambitious careers.</span><div><a href="#product">Product</a><a href="#workflow">How it works</a><Link to="/login">Sign in</Link></div></footer>
  </div>;
}

function Feature({ icon, title, text }) { return <article className="feature-card"><span className="feature-icon"><Icon name={icon} size={19} /></span><h3>{title}</h3><p>{text}</p><span className="feature-arrow"><Icon name="arrow" size={16} /></span></article>; }
function Step({ number, title, text }) { return <article className="step"><span>{number}</span><div><h3>{title}</h3><p>{text}</p></div></article>; }

function AuthPage({ mode }) {
  const isRegister = mode === "register";
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const submit = async (event) => {
    event.preventDefault(); setError("");
    if (!form.email || !form.password || (isRegister && !form.username)) return setError("Please complete all required fields.");
    setLoading(true);
    try {
      if (isRegister) { await api.post("/api/auth/register", form); navigate("/dashboard"); }
      else { await api.post("/api/auth/login", { email: form.email, password: form.password }); navigate("/dashboard"); }
    } catch (err) {
      setError(err.response?.data?.message || "Unable to connect. Start the backend and try again.");
    }
    finally { setLoading(false); }
  };
  return <div className="auth-page"><div className="auth-visual"><Logo /><div className="auth-quote"><span className="eyebrow">The preparation advantage</span><h1>Make your next<br /><em>yes</em> easier.</h1><p>One calm, considered workspace for the work between applying and arriving.</p><div className="auth-principle"><span className="feature-icon"><Icon name="spark" size={18} /></span><b>Context over noise</b><small>Your resume and target role stay at the center of every recommendation.</small></div></div><span className="auth-copyright">HireLens / 2026</span></div><div className="auth-form-side"><Link className="back-link" to="/"><span>←</span> Back to home</Link><div className="auth-form-wrap"><div className="eyebrow">{isRegister ? "Start here" : "Welcome back"}</div><h2>{isRegister ? "Create your workspace" : "Sign in to HireLens"}</h2><p className="muted">{isRegister ? "Your interview edge starts with context." : "Pick up where your preparation left off."}</p><form onSubmit={submit}>{isRegister && <label>Full name<input value={form.username} onChange={e => setForm({...form, username:e.target.value})} placeholder="Sonam Narula" /></label>}<label>Email address<input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="you@company.com" /></label><label>Password<input type="password" value={form.password} onChange={e => setForm({...form, password:e.target.value})} placeholder="At least 8 characters" minLength="8" /></label>{error && <div className="form-error">{error}</div>}<button className="button button-primary submit-button" disabled={loading}>{loading ? "Working..." : isRegister ? <>Create account <Icon name="arrow" size={16} /></> : <>Sign in <Icon name="arrow" size={16} /></>}</button></form><p className="switch-auth">{isRegister ? "Already have an account?" : "New to HireLens?"} <Link to={isRegister ? "/login" : "/register"}>{isRegister ? "Sign in" : "Create an account"}</Link></p></div></div></div>;
}

function AuthGuard({ children }) {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  useEffect(() => {
    api.get("/api/auth/me").catch(() => navigate("/login", { replace: true })).finally(() => setChecking(false));
  }, [navigate]);
  if (checking) return <main className="loading-screen"><h1>Loading your workspace...</h1></main>;
  return children;
}

function AppShell() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const nav = [{to:"/dashboard", icon:"grid", label:"Overview"}, {to:"/resume", icon:"file", label:"Resume lab"}, {to:"/match", icon:"target", label:"Match score"}, {to:"/interview", icon:"chat", label:"Interview prep"}];
  return <div className="app-shell"><aside className={mobileOpen ? "sidebar open" : "sidebar"}><Logo /><div className="workspace-switch"><span className="workspace-avatar">S</span><span><small>Workspace</small><b>Sonam’s career lab</b></span><span>⌄</span></div><nav className="side-nav"><small className="nav-label">Workspace</small>{nav.map(item=><NavLink key={item.to} to={item.to} onClick={()=>setMobileOpen(false)}><Icon name={item.icon} size={17} />{item.label}</NavLink>)}<small className="nav-label">Account</small><NavLink to="/settings" onClick={()=>setMobileOpen(false)}><Icon name="settings" size={17} />Settings</NavLink></nav><div className="sidebar-bottom"><div className="plan-note"><span className="spark-small"><Icon name="spark" size={13} /></span><b>Build your edge</b><p>Complete your profile to unlock better insights.</p><Link to="/resume">Continue <Icon name="arrow" size={13} /></Link></div><button className="user-chip"><span>SN</span><b>Sonam Narula<small>Free workspace</small></b><span>···</span></button></div></aside><div className="app-content"><header className="app-header"><button className="mobile-menu" onClick={()=>setMobileOpen(!mobileOpen)}>☰</button><span className="breadcrumbs">Career lab <b>/</b> <strong>Overview</strong></span><div className="header-actions"><span className="status"><i /> All systems ready</span><button className="icon-button">?</button><button className="avatar">SN</button></div></header><Routes><Route path="/dashboard" element={<Dashboard />} /><Route path="/resume" element={<ResumeLab />} /><Route path="/match" element={<Match />} />  <Route path="/interview" element={<InterviewPrep />} /><Route path="/interview/:id" element={<ReportRoute />} /><Route path="/settings" element={<Settings />} /></Routes></div></div>;
}

function Dashboard() { return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Wednesday, November 12</div><h1>Good evening, Sonam.</h1><p className="muted">A focused view of your next best move.</p></div><Link className="button button-primary" to="/resume">Run a new scan <Icon name="arrow" size={16} /></Link></div><div className="stats-grid"><Stat label="Profile strength" value="—" detail="Run your first scan" icon="spark" /><Stat label="Target role" value="Not set" detail="Add a role to begin" icon="target" /><Stat label="Preparation streak" value="0 days" detail="Start today" icon="chat" /></div><div className="dashboard-columns"><section className="panel-card"><div className="panel-heading"><div><span className="eyebrow">Your workspace</span><h2>Start with context</h2></div><span className="panel-kicker">3 actions</span></div><ActionRow icon="file" title="Upload your resume" text="Give HireLens the context behind your experience." to="/resume" /><ActionRow icon="target" title="Add a target role" text="Paste a job description to see what matters." to="/match" /><ActionRow icon="chat" title="Prepare for the conversation" text="Practice questions once your profile is ready." to="/interview" /></section><section className="panel-card insight-card"><div className="panel-heading"><div><span className="eyebrow">Readiness</span><h2>Not enough signal yet</h2></div></div><div className="empty-visual"><span><Icon name="spark" size={24} /></span></div><p>Add your resume and a target role to unlock your profile strength, skill gaps, and tailored preparation plan.</p><Link className="text-link" to="/resume">Set up your profile <Icon name="arrow" size={15} /></Link></section></div></main>; }
function Stat({ label, value, detail, icon }) { return <div className="stat-card"><span className="stat-icon"><Icon name={icon} size={17} /></span><span className="stat-label">{label}</span><strong>{value}</strong><small>{detail}</small></div>; }
function ActionRow({ icon, title, text, to }) { return <Link to={to} className="action-row"><span className="action-icon"><Icon name={icon} size={18} /></span><span><b>{title}</b><small>{text}</small></span><Icon name="arrow" size={16} /></Link>; }

function ResumeLab() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [selfDescription, setSelfDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const analyze = async () => {
    if (!jobDescription.trim() || (!file && !selfDescription.trim())) return setError("Add a job description and a resume or self-description.");
    setLoading(true); setError("");
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("selfDescription", selfDescription);
    if (file) formData.append("resume", file);
    try {
      const { data } = await api.post("/api/interview", formData);
      navigate(`/interview/${data.interviewReport._id}`);
    } catch (err) {
      setError(err.response?.data?.message || "Analysis failed. Check your backend and Gemini configuration.");
    } finally { setLoading(false); }
  };
  return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Resume lab</div><h1>Make your experience legible.</h1><p className="muted">Upload once. Get a clearer story for every role.</p></div></div><div className="tool-grid"><section className="panel-card upload-card"><div className="panel-heading"><div><span className="eyebrow">Step 01</span><h2>Bring your resume</h2></div></div><label className="dropzone"><input type="file" accept=".pdf" onChange={e=>setFile(e.target.files?.[0])} /><span className="upload-symbol"><Icon name="upload" size={23} /></span><b>{file ? file.name : "Drop your PDF here"}</b><small>{file ? "Ready to analyze" : "or click to browse · PDF up to 3MB"}</small></label><label className="field-label">Target job description<textarea value={jobDescription} onChange={e=>setJobDescription(e.target.value)} placeholder="Paste the role you want..." /></label><label className="field-label">Optional context<textarea value={selfDescription} onChange={e=>setSelfDescription(e.target.value)} placeholder="Add experience or goals if useful..." /></label>{error && <div className="form-error">{error}</div>}<button className="button button-primary full-button" onClick={analyze} disabled={loading}>{loading ? "Analyzing..." : "Analyze my profile"} <Icon name="arrow" size={16} /></button></section><section className="panel-card"><div className="panel-heading"><div><span className="eyebrow">What you’ll get</span><h2>A useful first pass</h2></div></div><ul className="check-list"><li><Icon name="check" size={16} /><span><b>Role alignment</b><small>Understand which parts of your story land.</small></span></li><li><Icon name="check" size={16} /><span><b>Skill signal</b><small>See strengths and gaps worth your time.</small></span></li><li><Icon name="check" size={16} /><span><b>Actionable edits</b><small>Improve clarity without losing your voice.</small></span></li></ul></section></div></main>;
}
function Match() { const [job, setJob] = useState(""); return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Match score</div><h1>Put the role in focus.</h1><p className="muted">Paste a job description to compare its signal with your profile.</p></div></div><section className="panel-card analyzer-card"><div className="analyzer-top"><div><span className="eyebrow">Step 02</span><h2>Target job description</h2><p className="muted">No score is shown until there is real role and resume context.</p></div><span className="score-placeholder">—<small>/100</small></span></div><textarea value={job} onChange={e=>setJob(e.target.value)} placeholder="Paste the full job description here..." maxLength={5000} /><div className="textarea-meta"><span>{job.length} / 5000</span><button className="button button-primary" disabled={!job.trim()}>Analyze match <Icon name="arrow" size={16} /></button></div></section></main>; }
function InterviewPrep() { return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Interview prep</div><h1>Practice the conversation.</h1><p className="muted">Role-specific questions and feedback will live here once your profile is analyzed.</p></div></div><div className="interview-launch panel-card"><div className="launch-mark"><Icon name="chat" size={25} /></div><div><span className="eyebrow">Coming from your context</span><h2>Nothing generic.</h2><p>Upload a resume and add a role first. Your questions should sound like the interview you’re actually walking into.</p><Link className="button button-primary" to="/resume">Set up interview prep <Icon name="arrow" size={16} /></Link></div></div></main>; }
function Settings() { return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Account</div><h1>Your settings.</h1><p className="muted">Keep your career lab aligned with where you’re going.</p></div></div><section className="panel-card settings-card"><div className="setting-row"><div><b>Profile</b><p>Sonam Narula · sonam@example.com</p></div><span className="settings-badge">Connected after auth</span></div><div className="setting-row"><div><b>Career preferences</b><p>Target role and experience level</p></div><span className="settings-badge">Available after profile setup</span></div><div className="setting-row"><div><b>Session</b><p>Return to the public landing page</p></div><Link className="button button-danger" to="/">Sign out</Link></div></section></main>; }

function Report({ id }) {
  const [report, setReport] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => { api.get(`/api/interview/report/${id}`).then(({data}) => setReport(data.interviewReport)).catch(err => setError(err.response?.data?.message || "Unable to load report")); }, [id]);
  if (error) return <main className="workspace-page"><div className="form-error">{error}</div></main>;
  if (!report) return <main className="workspace-page"><h1>Loading report...</h1></main>;
  return <main className="workspace-page"><div className="page-intro"><div><div className="eyebrow">Interview report</div><h1>{report.title}</h1><p className="muted">Your profile-to-role match and preparation plan.</p></div><span className="report-score">{report.matchScore}<small>/100</small></span></div><div className="dashboard-columns"><section className="panel-card"><span className="eyebrow">Skill gaps</span><h2>Where to focus</h2>{report.skillGaps.map(gap => <div className="action-row" key={gap.skill}><span className="action-icon"><Icon name="target" size={17} /></span><span><b>{gap.skill}</b><small>{gap.severity} priority</small></span></div>)}</section><section className="panel-card"><span className="eyebrow">Preparation plan</span><h2>Your next steps</h2>{report.preparationPlan.map(day => <div className="action-row" key={day.day}><span className="action-icon blue"><b>0{day.day}</b></span><span><b>{day.focus}</b><small>{day.tasks.join(" · ")}</small></span></div>)}</section></div></main>;
}
function ReportRoute() { const { id } = useParams(); return <Report id={id} />; }

function App() { return <Routes><Route path="/" element={<Landing />} /><Route path="/login" element={<AuthPage mode="login" />} /><Route path="/register" element={<AuthPage mode="register" />} /><Route path="/*" element={<AuthGuard><AppShell /></AuthGuard>} /></Routes>; }
createRoot(document.getElementById("root")).render(<BrowserRouter><App /></BrowserRouter>);
