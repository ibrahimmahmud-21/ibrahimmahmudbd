import { useEffect, useRef, useState } from "react";

const styles = `
  .nb {
    --paper:#eef1ee;
    --paper-2:#e6e9e2;
    --ink:#151c2c;
    --ink-soft:#4a5266;
    --line:#c7cdc2;
    --amber:#dc9f2e;
    --teal:#1f6f68;
    --coral:#d1502f;
    --rule:rgba(21,28,44,0.12);
    background:var(--paper);
    color:var(--ink);
    font-family:'IBM Plex Sans', sans-serif;
    font-size:16px;
    line-height:1.6;
    -webkit-font-smoothing:antialiased;
    overflow-x:hidden;
    min-height:100vh;
    position:relative;
  }
  html{scroll-behavior:smooth;}
  .nb *{margin:0;padding:0;box-sizing:border-box;}
  .nb ::selection{background:var(--amber);color:var(--ink);}

  .nb-texture{
    position:fixed;inset:0;
    background-image:repeating-linear-gradient(transparent, transparent 27px, var(--rule) 28px);
    opacity:.35;
    pointer-events:none;
    z-index:0;
  }

  .nb .wrap{ max-width:1120px; margin:0 auto; padding:0 32px 0 96px; position:relative; }

  .nb .spine{ position:fixed; top:0; bottom:0; left:0; width:64px; z-index:50; pointer-events:none; }
  .nb .spine-line{ position:absolute; left:56px; top:0; bottom:0; width:1px;
    background:repeating-linear-gradient(to bottom, var(--ink) 0 6px, transparent 6px 14px); opacity:.25; }
  .nb .ring{ position:absolute; left:22px; width:26px;height:26px; border-radius:50%;
    background:radial-gradient(circle at 35% 30%, #fff, transparent 40%), var(--paper-2);
    box-shadow: inset 0 0 0 2px var(--ink-soft), inset 0 0 0 6px var(--paper), 2px 2px 0 rgba(0,0,0,.05); }

  .nb header{ position:sticky; top:0; z-index:40; background:var(--paper); border-bottom:1px solid var(--rule); }
  .nb .header-inner{ display:flex; align-items:center; justify-content:space-between;
    padding:20px 32px 20px 96px; max-width:1120px; margin:0 auto; }
  .nb .brand{ font-family:'Space Grotesk', sans-serif; font-weight:700; font-size:20px;
    display:flex; align-items:center; gap:10px; letter-spacing:.02em; }
  .nb .brand .dot{ width:9px;height:9px;border-radius:50%; background:var(--coral); box-shadow:0 0 0 3px rgba(209,80,47,.18); }
  .nb .audio-btn{ width:30px;height:30px;border-radius:50%; border:1.5px solid var(--ink);
    background:transparent; color:var(--ink); cursor:pointer; display:flex; align-items:center;
    justify-content:center; font-size:11px; transition:.15s; margin-left:4px; padding:0; }
  .nb .audio-btn:hover{ background:var(--ink); color:var(--paper); }
  .nb .audio-btn.playing{ background:var(--teal); border-color:var(--teal); color:var(--paper); }

  .nb nav.tabs{ display:flex; gap:2px; }
  .nb nav.tabs a{ font-family:'IBM Plex Mono', monospace; font-size:12.5px; letter-spacing:.06em;
    text-transform:uppercase; text-decoration:none; color:var(--ink-soft); padding:9px 16px;
    border:1px solid transparent; border-bottom:none; border-radius:6px 6px 0 0; position:relative; top:1px; transition:.18s ease; }
  .nb nav.tabs a:hover{ color:var(--ink); background:var(--paper-2); border-color:var(--rule); }
  .nb .menu-btn{ display:none; background:none; border:1px solid var(--ink); border-radius:4px; width:38px;height:34px; cursor:pointer; }
  .nb .menu-btn span{ display:block; width:16px; height:1.5px; background:var(--ink); margin:3.5px auto; }

  .nb section{ position:relative; z-index:1; }

  .nb .entry{ display:flex; align-items:baseline; gap:10px; font-family:'IBM Plex Mono', monospace;
    font-size:12px; letter-spacing:.12em; text-transform:uppercase; color:var(--teal); margin-bottom:14px; }
  .nb .entry::before{ content:"§"; color:var(--coral); }

  .nb h1,.nb h2,.nb h3{ font-family:'Space Grotesk', sans-serif; }

  .nb .hero{ padding:88px 0 64px; }
  .nb .stamp{ display:inline-flex; align-items:center; gap:8px; font-family:'IBM Plex Mono', monospace;
    font-size:11.5px; letter-spacing:.1em; text-transform:uppercase; padding:6px 12px;
    border:1.5px solid var(--coral); color:var(--coral); border-radius:3px; transform:rotate(-2deg); margin-bottom:28px; }
  .nb .stamp .pulse{ width:6px;height:6px;border-radius:50%;background:var(--coral); animation:nb-pulse 1.8s infinite; }
  @keyframes nb-pulse{0%,100%{opacity:1}50%{opacity:.25}}

  .nb .hero h1{ font-size:clamp(44px, 8vw, 88px); font-weight:700; line-height:.98; letter-spacing:-.02em; max-width:820px; }
  .nb .hero h1 .line{ display:block; }
  .nb .hero h1 .accent{ color:var(--paper); -webkit-text-stroke:1.5px var(--ink); }
  .nb .hero .tagline{ font-family:'IBM Plex Mono', monospace; font-size:18px; color:var(--teal);
    margin-top:22px; border-left:3px solid var(--teal); padding-left:14px; }
  .nb .hero .meta{ margin-top:14px; color:var(--ink-soft); font-size:14.5px; }
  .nb .hero-actions{ display:flex; gap:14px; margin-top:38px; flex-wrap:wrap; }
  .nb .btn{ font-family:'IBM Plex Mono', monospace; font-size:13px; letter-spacing:.04em; text-transform:uppercase;
    padding:14px 26px; border-radius:3px; text-decoration:none; cursor:pointer;
    display:inline-flex; align-items:center; gap:8px; transition:transform .15s ease, box-shadow .15s ease; }
  .nb .btn-primary{ background:var(--ink); color:var(--paper); border:1px solid var(--ink); }
  .nb .btn-primary:hover{ transform:translate(-2px,-2px); box-shadow:4px 4px 0 var(--amber); }
  .nb .btn-ghost{ background:transparent; color:var(--ink); border:1.5px solid var(--ink); }
  .nb .btn-ghost:hover{ transform:translate(-2px,-2px); box-shadow:4px 4px 0 var(--ink); }

  .nb .hero-figure{ margin-top:64px; border:1px solid var(--rule); background:var(--paper-2); border-radius:4px;
    padding:22px 26px; display:flex; gap:28px; flex-wrap:wrap; font-family:'IBM Plex Mono', monospace;
    font-size:12px; color:var(--ink-soft); }
  .nb .hero-figure div{ min-width:140px; }
  .nb .hero-figure b{ display:block; color:var(--ink); font-size:15px; margin-top:4px; font-family:'Space Grotesk',sans-serif; }

  .nb .page{ padding:80px 0; border-top:1px dashed var(--rule); }
  .nb .page-head{ max-width:640px; margin-bottom:44px; }
  .nb .page-head h2{ font-size:clamp(30px,4vw,42px); font-weight:700; letter-spacing:-.01em; margin-top:6px;}
  .nb .page-head p{ color:var(--ink-soft); margin-top:12px; font-size:16px; }

  .nb .about-grid{ display:grid; grid-template-columns: 1fr 260px; gap:48px; align-items:start; }
  .nb .about-grid p{ font-size:17px; color:var(--ink-soft); max-width:56ch; line-height:1.85; }
  .nb .about-grid p + p{ margin-top:16px; }
  .nb .about-grid strong{ color:var(--ink); font-weight:600;}
  .nb .sidenote{ border:1px solid var(--rule); border-left:3px solid var(--amber); padding:18px;
    font-family:'IBM Plex Mono', monospace; font-size:12.5px; color:var(--ink-soft);
    background:var(--paper-2); border-radius:0 4px 4px 0; }
  .nb .sidenote b{ color:var(--ink); display:block; margin-bottom:6px; text-transform:uppercase; letter-spacing:.08em; font-size:11px;}

  .nb .card-grid{ display:grid; grid-template-columns:repeat(auto-fill, minmax(190px,1fr)); gap:16px; }
  .nb .skill{ border:1px solid var(--rule); background:var(--paper-2); border-radius:4px; padding:20px 18px;
    position:relative; overflow:hidden; opacity:0; transform:translateY(18px); transition:opacity .6s ease, transform .6s ease; }
  .nb .skill.in-view{ opacity:1; transform:translateY(0); }
  .nb .skill::after{ content:""; position:absolute; top:0; right:0; width:0; height:0; border-style:solid;
    border-width:0 22px 22px 0; border-color:transparent var(--paper) transparent transparent; }
  .nb .skill h4{ font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:600; margin-bottom:12px; }
  .nb .level{ display:inline-flex; align-items:center; gap:6px; font-family:'IBM Plex Mono', monospace;
    font-size:10.5px; letter-spacing:.08em; text-transform:uppercase; padding:4px 9px; border-radius:20px; }
  .nb .level::before{ content:""; width:6px;height:6px;border-radius:50%; }
  .nb .lvl-1{ background:rgba(209,80,47,.12); color:var(--coral); } .nb .lvl-1::before{ background:var(--coral); }
  .nb .lvl-2{ background:rgba(220,159,46,.15); color:#8a6113; } .nb .lvl-2::before{ background:var(--amber); }
  .nb .lvl-3{ background:rgba(31,111,104,.13); color:var(--teal); } .nb .lvl-3::before{ background:var(--teal); }
  .nb .lvl-4{ background:rgba(21,28,44,.09); color:var(--ink); } .nb .lvl-4::before{ background:var(--ink); }
  .nb .skill-bar{ height:4px; background:var(--rule); border-radius:2px; margin-top:14px; overflow:hidden; }
  .nb .skill-bar i{ display:block; height:100%; background:var(--ink); border-radius:2px;
    transform-origin:left; transform:scaleX(0); transition:transform 1s cubic-bezier(.4,0,.2,1); }
  .nb .skill.in-view .skill-bar i{ transform:scaleX(var(--pct)); }

  .nb .console{ border:1px solid var(--ink); border-radius:6px; background:var(--ink); color:var(--paper); overflow:hidden; }
  .nb .console-bar{ display:flex; align-items:center; gap:8px; padding:12px 16px;
    border-bottom:1px solid rgba(238,241,238,.15); font-family:'IBM Plex Mono', monospace;
    font-size:11.5px; color:rgba(238,241,238,.6); }
  .nb .console-bar .dots{ display:flex; gap:6px; margin-right:8px; }
  .nb .console-bar .dots span{ width:9px;height:9px;border-radius:50%; }
  .nb .console-bar .dots span:nth-child(1){ background:var(--coral); }
  .nb .console-bar .dots span:nth-child(2){ background:var(--amber); }
  .nb .console-bar .dots span:nth-child(3){ background:var(--teal); }
  .nb .console-body{ padding:30px; }
  .nb .console-body h3{ font-size:24px; font-weight:600; }
  .nb .console-body .status{ color:#8fd6c9; font-family:'IBM Plex Mono',monospace; font-size:12.5px; margin-top:6px; }
  .nb .chart-wrap{ margin-top:26px; border:1px solid rgba(238,241,238,.14); border-radius:4px; padding:20px; background:rgba(238,241,238,.03); }
  .nb .chart-wrap svg{ width:100%; height:auto; display:block; }
  .nb .chart-line{ stroke-dasharray:600; stroke-dashoffset:600; transition:stroke-dashoffset 1.8s ease; }
  .nb .console.in-view .chart-line{ stroke-dashoffset:0; }
  .nb .console-stats{ display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:1px;
    background:rgba(238,241,238,.14); margin-top:22px; border:1px solid rgba(238,241,238,.14); border-radius:4px; overflow:hidden; }
  .nb .console-stats div{ background:var(--ink); padding:16px 18px; }
  .nb .console-stats span{ display:block; font-family:'IBM Plex Mono',monospace; font-size:10.5px;
    letter-spacing:.08em; text-transform:uppercase; color:rgba(238,241,238,.5); }
  .nb .console-stats b{ font-family:'Space Grotesk',sans-serif; font-size:16px; font-weight:600; margin-top:6px; display:block; color:#8fd6c9; }

  .nb .postcard{ border:1px solid var(--ink); border-radius:4px; display:grid; grid-template-columns:1fr 1px 1fr; background:var(--paper-2); }
  .nb .postcard-left{ padding:36px; }
  .nb .postcard-left h3{ font-size:22px; font-weight:600; }
  .nb .postcard-left p{ color:var(--ink-soft); margin-top:10px; font-size:14.5px; }
  .nb .postcard-div{ background:repeating-linear-gradient(to bottom, var(--ink) 0 5px, transparent 5px 11px); opacity:.35; }
  .nb .social-row{ display:flex; gap:10px; margin-top:26px; }
  .nb .social-row a{ width:38px;height:38px; border-radius:50%; display:flex; align-items:center; justify-content:center;
    border:1.5px solid var(--ink); color:var(--ink); text-decoration:none;
    font-family:'IBM Plex Mono',monospace; font-size:13px; transition:.15s; }
  .nb .social-row a:hover{ background:var(--ink); color:var(--paper); }
  .nb .stamp-box{ margin-top:32px; width:74px; height:88px; border:2px dashed var(--ink-soft);
    display:flex; align-items:center; justify-content:center; font-family:'IBM Plex Mono',monospace;
    font-size:9.5px; text-align:center; color:var(--ink-soft); transform:rotate(3deg); }
  .nb .postcard-right{ padding:36px; }
  .nb .field{ margin-bottom:18px; }
  .nb .field label{ display:block; font-family:'IBM Plex Mono',monospace; font-size:10.5px;
    letter-spacing:.1em; text-transform:uppercase; color:var(--ink-soft); margin-bottom:6px; }
  .nb .field input, .nb .field textarea{ width:100%; background:transparent; border:none;
    border-bottom:1.5px solid var(--line); padding:9px 2px; font-family:'IBM Plex Sans',sans-serif;
    font-size:15px; color:var(--ink); outline:none; transition:border-color .15s; resize:none; }
  .nb .field input:focus, .nb .field textarea:focus{ border-color:var(--ink); }
  .nb .field textarea{ min-height:80px; }
  .nb .send-btn{ width:100%; background:var(--ink); color:var(--paper); border:none; padding:14px;
    border-radius:3px; font-family:'IBM Plex Mono',monospace; font-size:13px; letter-spacing:.05em;
    text-transform:uppercase; cursor:pointer; margin-top:6px; transition:.15s; }
  .nb .send-btn:hover{ background:var(--coral); }
  .nb .send-btn:disabled{ opacity:.6; cursor:not-allowed; }
  .nb .form-note{ font-family:'IBM Plex Mono',monospace; font-size:11.5px; margin-top:12px; color:var(--teal); }
  .nb .form-note.err{ color:var(--coral); }

  .nb footer{ padding:36px 0 48px; text-align:center; font-family:'IBM Plex Mono',monospace;
    font-size:11.5px; color:var(--ink-soft); border-top:1px dashed var(--rule); }

  .nb .reveal{ opacity:0; transform:translateY(18px); transition:opacity .7s ease, transform .7s ease; }
  .nb .reveal.in-view{ opacity:1; transform:translateY(0); }

  @media(max-width:860px){
    .nb .wrap{ padding:0 20px 0 64px; }
    .nb .header-inner{ padding:18px 20px 18px 64px; }
    .nb .spine{ width:44px; }
    .nb .ring{ left:14px; width:20px;height:20px; }
    .nb .spine-line{ left:38px; }
    .nb nav.tabs{ display:none; position:absolute; top:64px; left:0; right:0; background:var(--paper);
      flex-direction:column; border-bottom:1px solid var(--rule); padding:8px 20px 16px; gap:4px; }
    .nb nav.tabs.open{ display:flex; }
    .nb nav.tabs a{ border-radius:4px; padding:10px 12px; }
    .nb .menu-btn{ display:block; }
    .nb .about-grid{ grid-template-columns:1fr; }
    .nb .postcard{ grid-template-columns:1fr; }
    .nb .postcard-div{ display:none; }
  }
`;

const skills = [
  { name: "HTML", level: "Basic", cls: "lvl-1", pct: 0.35 },
  { name: "Mobile Optimization", level: "Good", cls: "lvl-3", pct: 0.6 },
  { name: "Problem Solving", level: "Developing", cls: "lvl-2", pct: 0.55 },
  { name: "AI Productivity", level: "Experienced", cls: "lvl-4", pct: 0.85 },
  { name: "Cyber Security", level: "Beginner", cls: "lvl-1", pct: 0.2 },
];

function Spine() {
  const [count, setCount] = useState(20);
  useEffect(() => {
    const calc = () =>
      setCount(Math.ceil(Math.max(document.body.scrollHeight, window.innerHeight) / 64));
    calc();
    window.addEventListener("resize", calc);
    const t = setTimeout(calc, 600);
    return () => {
      window.removeEventListener("resize", calc);
      clearTimeout(t);
    };
  }, []);
  return (
    <div className="spine">
      <div className="spine-line" />
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="ring" style={{ top: i * 64 + 20 }} />
      ))}
    </div>
  );
}

function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("https://formspree.io/f/xwvwvklr", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (!res.ok) throw new Error("failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="cf-name">Name</label>
        <input id="cf-name" name="name" type="text" placeholder="Your name" required />
      </div>
      <div className="field">
        <label htmlFor="cf-email">Email</label>
        <input id="cf-email" name="email" type="email" placeholder="you@example.com" required />
      </div>
      <div className="field">
        <label htmlFor="cf-msg">Message</label>
        <textarea id="cf-msg" name="message" placeholder="What's on your mind?" required />
      </div>
      <button className="send-btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : status === "sent" ? "Sent ✓" : "Send Message"}
      </button>
      {status === "sent" && <p className="form-note">Thanks — your message has been sent.</p>}
      {status === "error" && (
        <p className="form-note err">Something went wrong. Please email ibmm923@gmail.com.</p>
      )}
    </form>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in-view");
        }),
      { threshold: 0.15 },
    );
    document.querySelectorAll(".reveal, .skill, .console").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const toggleAudio = () => {
    const el = audioRef.current;
    if (!el) return;
    if (el.paused) {
      el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    } else {
      el.pause();
      setPlaying(false);
    }
  };

  return (
    <div className="nb">
      <style>{styles}</style>
      <div className="nb-texture" />
      <Spine />
      <audio ref={audioRef} src="/quran.mp3" preload="none" onEnded={() => setPlaying(false)} />

      <header>
        <div className="header-inner">
          <div className="brand">
            <span className="dot" />
            Ibrahim Mahmud
            <button
              className={`audio-btn${playing ? " playing" : ""}`}
              onClick={toggleAudio}
              aria-label={playing ? "Pause Quran recitation" : "Play Quran recitation"}
              title={playing ? "Pause" : "Play Quran recitation"}
            >
              {playing ? "❚❚" : "▶"}
            </button>
          </div>
          <nav className={`tabs${menuOpen ? " open" : ""}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>01 · About</a>
            <a href="#skills" onClick={() => setMenuOpen(false)}>02 · Skills</a>
            <a href="#projects" onClick={() => setMenuOpen(false)}>03 · Projects</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>04 · Contact</a>
          </nav>
          <button
            className="menu-btn"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span /><span /><span />
          </button>
        </div>
      </header>

      <div className="wrap">
        <section className="hero">
          <div className="stamp"><span className="pulse" />Status: In Progress</div>
          <h1>
            <span className="line">Ibrahim</span>
            <span className="line accent">Mahmud</span>
          </h1>
          <div className="tagline">Learning. Building. Growing.</div>
          <div className="meta">Class 10 Student — Exploring Cyber Security</div>
          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">View Projects →</a>
            <a href="#contact" className="btn btn-ghost">Get in Touch</a>
          </div>
          <div className="hero-figure">
            <div>Current focus<b>Cyber Security</b></div>
            <div>Skills logged<b>5 entries</b></div>
            <div>Projects<b>1 in progress</b></div>
          </div>
        </section>

        <section className="page reveal" id="about">
          <div className="entry">Entry 01 — Who I Am</div>
          <div className="page-head"><h2>About Me</h2></div>
          <div className="about-grid">
            <div>
              <p>
                I'm <strong>Ibrahim Mahmud</strong>, a Class 10 student exploring technology and
                cyber security.
              </p>
              <p>
                I enjoy learning new things, solving problems, and improving my skills every day.
              </p>
            </div>
            <div className="sidenote">
              <b>Field note</b>
              Every skill on this page started at zero and moves one line at a time.
            </div>
          </div>
        </section>

        <section className="page reveal" id="skills">
          <div className="entry">Entry 02 — What I Know</div>
          <div className="page-head">
            <h2>Skills Log</h2>
            <p>Rated honestly. Building my toolkit one skill at a time.</p>
          </div>
          <div className="card-grid">
            {skills.map((s) => (
              <div
                key={s.name}
                className="skill"
                style={{ "--pct": s.pct } as React.CSSProperties}
              >
                <h4>{s.name}</h4>
                <span className={`level ${s.cls}`}>{s.level}</span>
                <div className="skill-bar"><i /></div>
              </div>
            ))}
          </div>
        </section>

        <section className="page reveal" id="projects">
          <div className="entry">Entry 03 — What I'm Building</div>
          <div className="page-head">
            <h2>Projects</h2>
            <p>Tracking my journey, one step at a time.</p>
          </div>
          <div className="console">
            <div className="console-bar">
              <div className="dots"><span /><span /><span /></div>
              ~/ibrahim/learning-dashboard — running
            </div>
            <div className="console-body">
              <h3>Learning Dashboard</h3>
              <div className="status">✓ growth has no limit</div>
              <div className="chart-wrap">
                <svg viewBox="0 0 600 200" preserveAspectRatio="none">
                  <line x1="0" y1="50" x2="600" y2="50" stroke="rgba(238,241,238,.08)" />
                  <line x1="0" y1="100" x2="600" y2="100" stroke="rgba(238,241,238,.08)" />
                  <line x1="0" y1="150" x2="600" y2="150" stroke="rgba(238,241,238,.08)" />
                  <path
                    className="chart-line"
                    d="M10,170 C120,160 180,140 260,110 C340,80 420,55 590,25"
                    fill="none"
                    stroke="#8fd6c9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <div className="console-stats">
                <div><span>Learning Progress</span><b>Active</b></div>
                <div><span>Projects</span><b>Coming Soon</b></div>
                <div><span>Focus</span><b>Cyber Security</b></div>
              </div>
            </div>
          </div>
        </section>

        <section className="page reveal" id="contact">
          <div className="entry">Entry 04 — Say Hello</div>
          <div className="page-head">
            <h2>Contact</h2>
            <p>Got a question or want to collaborate? Hit me up.</p>
          </div>
          <div className="postcard">
            <div className="postcard-left">
              <h3>Send a note</h3>
              <p>I read everything that lands here.</p>
              <div className="social-row">
                <a href="mailto:ibmm923@gmail.com" aria-label="Email" title="ibmm923@gmail.com">✉</a>
                <a
                  href="https://www.facebook.com/share/1B5pb2sDuc/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  f
                </a>
                <a
                  href="https://t.me/ibrahimbd10"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  title="Telegram"
                >
                  ➤
                </a>
              </div>
              <div className="stamp-box">POSTED FROM<br />BANGLADESH</div>
            </div>
            <div className="postcard-div" />
            <div className="postcard-right">
              <ContactForm />
            </div>
          </div>
        </section>

        <footer>© Ibrahim Mahmud — All rights reserved.</footer>
      </div>
    </div>
  );
}
