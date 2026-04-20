import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  Mail,
  Facebook,
  Send,
  GraduationCap,
  Shield,
  Cpu,
  Zap,
  Play,
  Pause,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Ibrahim Mahmud — Portfolio" },
      {
        name: "description",
        content:
          "Ibrahim Mahmud — Class 10 student exploring Cyber Security. Learning, building, and growing every day.",
      },
      { property: "og:title", content: "Ibrahim Mahmud — Portfolio" },
      {
        property: "og:description",
        content: "Class 10 Student. Exploring Cyber Security. Learning. Building. Growing.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap",
      },
    ],
  }),
});

const css = `
  .portfolio *, .portfolio *::before, .portfolio *::after { margin: 0; padding: 0; box-sizing: border-box; }

  .portfolio {
    --bg: #f5f4f0;
    --card: #18181b;
    --card2: #222228;
    --accent: #39ff14;
    --accent2: #2bdb0e;
    --text: #f5f5f5;
    --muted: #888;
    --border: #2c2c33;

    background: var(--bg);
    font-family: 'Inter', system-ui, sans-serif;
    color: #111;
    overflow-x: hidden;
    min-height: 100vh;
    scroll-behavior: smooth;
  }

  /* NAV */
  .portfolio nav {
    position: fixed; top: 0; left: 0; right: 0; z-index: 100;
    padding: 18px 48px;
    display: flex; justify-content: space-between; align-items: center;
    background: rgba(245, 244, 240, 0.88);
    backdrop-filter: blur(14px);
    border-bottom: 1px solid rgba(0,0,0,0.07);
  }
  .portfolio .nav-left { display: flex; align-items: center; gap: 10px; }
  .portfolio .nav-logo { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; color: #111; }
  .portfolio .nav-right { display: flex; align-items: center; gap: 22px; }
  .portfolio .nav-links { display: flex; gap: 30px; }
  .portfolio .nav-links a {
    font-size: 13px; color: #666; text-decoration: none;
    transition: color .2s; font-weight: 500;
  }
  .portfolio .nav-links a:hover { color: #111; }

  /* AUDIO BUTTON — small, sits next to the IM logo */
  .portfolio .audio-btn {
    width: 26px; height: 26px; border-radius: 999px;
    background: transparent; color: #111;
    border: 1px solid rgba(0,0,0,0.18);
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all .22s;
    flex-shrink: 0;
  }
  .portfolio .audio-btn:hover {
    border-color: #111;
    background: #111; color: var(--accent);
  }
  .portfolio .audio-btn.playing {
    background: #111; color: var(--accent); border-color: #111;
  }

  /* HERO */
  .portfolio .hero {
    min-height: 100vh;
    display: flex; align-items: center; justify-content: center;
    padding: 110px 24px 70px;
    position: relative; overflow: hidden;
  }
  .portfolio .hero-bg-text {
    position: absolute; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: clamp(56px, 11vw, 118px);
    font-weight: 900;
    color: rgba(0,0,0,0.038);
    white-space: nowrap;
    letter-spacing: -3px;
    pointer-events: none; user-select: none; z-index: 0;
  }
  .portfolio .hero-inner {
    position: relative; z-index: 1;
    display: flex; align-items: stretch; gap: 0;
    max-width: 840px; width: 100%;
  }
  .portfolio .hero-card {
    background: var(--card);
    border-radius: 24px;
    padding: 50px 54px;
    flex: 1;
    border: 1px solid var(--border);
    position: relative; overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.1);
  }
  .portfolio .hero-card::before {
    content: '';
    position: absolute; top: -70px; right: -70px;
    width: 200px; height: 200px;
    background: radial-gradient(circle, rgba(57,255,20,0.13), transparent 70%);
    pointer-events: none;
  }
  .portfolio .hero-card::after {
    content: '';
    position: absolute; bottom: -40px; left: -40px;
    width: 160px; height: 160px;
    background: radial-gradient(circle, rgba(57,255,20,0.06), transparent 70%);
    pointer-events: none;
  }
  .portfolio .hero-tag {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(57,255,20,0.1);
    border: 1px solid rgba(57,255,20,0.22);
    border-radius: 999px; padding: 5px 14px;
    font-size: 11.5px; color: var(--accent);
    margin-bottom: 20px; letter-spacing: 0.3px; font-weight: 600;
  }
  .portfolio .pulse-dot {
    width: 6px; height: 6px;
    background: var(--accent); border-radius: 50%;
    animation: portfolio-pulse 2s ease-in-out infinite;
  }
  @keyframes portfolio-pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }

  .portfolio .hero-name {
    font-size: clamp(30px, 5vw, 46px);
    font-weight: 800; color: var(--text);
    letter-spacing: -1.2px; line-height: 1.12;
    margin-bottom: 10px;
  }
  .portfolio .hero-subtitle {
    font-size: 17px; color: var(--accent);
    font-weight: 600; margin-bottom: 9px; letter-spacing: -0.2px;
  }
  .portfolio .hero-desc {
    font-size: 13px; color: var(--muted);
    margin-bottom: 34px; font-weight: 400;
  }
  .portfolio .hero-btns { display: flex; gap: 12px; flex-wrap: wrap; }

  .portfolio .btn-primary {
    background: var(--accent); color: #111;
    font-size: 13px; font-weight: 700;
    padding: 12px 26px; border-radius: 10px;
    border: none; cursor: pointer;
    transition: all .22s; letter-spacing: -0.1px;
    font-family: inherit;
  }
  .portfolio .btn-primary:hover { background: var(--accent2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(57,255,20,0.25); }
  .portfolio .btn-primary:active { transform: translateY(0); }

  .portfolio .btn-secondary {
    background: transparent; color: var(--text);
    font-size: 13px; font-weight: 500;
    padding: 12px 26px; border-radius: 10px;
    border: 1px solid #3a3a44; cursor: pointer;
    transition: all .22s; font-family: inherit;
  }
  .portfolio .btn-secondary:hover { border-color: rgba(57,255,20,0.5); color: var(--accent); transform: translateY(-2px); }

  /* SILHOUETTE — gentle, infinite float */
  .portfolio .silhouette-wrap {
    width: 135px; flex-shrink: 0;
    display: flex; justify-content: center; align-items: flex-end;
    padding-bottom: 14px; margin-left: -22px;
    animation: portfolio-float 3.6s ease-in-out infinite;
  }
  @keyframes portfolio-float {
    0%,100% { transform: translateY(0px); }
    50% { transform: translateY(-16px); }
  }

  /* RIGHT HAND WAVE — runs ONCE on load (~1.6s) then stops */
  .portfolio .wave-arm {
    transform-origin: 97px 50px;
    transform: rotate(0deg);
    animation: portfolio-wave 1.6s ease-in-out 0.4s 1 forwards;
  }
  @keyframes portfolio-wave {
    0%   { transform: rotate(0deg); }
    15%  { transform: rotate(-90deg); }
    30%  { transform: rotate(-70deg); }
    45%  { transform: rotate(-95deg); }
    60%  { transform: rotate(-70deg); }
    75%  { transform: rotate(-90deg); }
    100% { transform: rotate(0deg); }
  }

  /* SECTIONS */
  .portfolio .content-wrap { max-width: 840px; margin: 0 auto; padding: 0 24px; }
  .portfolio .section { padding: 88px 0 0; }

  .portfolio .section-label {
    font-size: 10.5px; font-weight: 700;
    color: var(--accent2); letter-spacing: 2.5px;
    text-transform: uppercase; margin-bottom: 9px;
  }
  .portfolio .section-title {
    font-size: clamp(22px, 3.8vw, 32px);
    font-weight: 800; color: #111;
    letter-spacing: -0.9px; margin-bottom: 8px;
  }
  .portfolio .section-sub { font-size: 13.5px; color: #666; line-height: 1.75; max-width: 460px; }

  /* ABOUT — short, clean text block */
  .portfolio .about-text {
    margin-top: 26px;
    max-width: 560px;
    font-size: 15px;
    line-height: 1.85;
    color: #555;
    font-weight: 400;
  }
  .portfolio .about-text p + p { margin-top: 14px; }

  /* ABOUT — 2-column card grid w/ one highlighted */
  .portfolio .about-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 14px; margin-top: 26px;
  }
  .portfolio .about-card-item {
    background: var(--card);
    border-radius: 16px; padding: 24px 22px;
    border: 1px solid var(--border);
    transition: all .25s;
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
    display: flex; flex-direction: column; gap: 10px;
  }
  .portfolio .about-card-item:hover {
    border-color: rgba(57,255,20,0.38);
    transform: translateY(-4px);
    background: var(--card2);
    box-shadow: 0 14px 36px rgba(0,0,0,0.16);
  }
  .portfolio .about-card-item.highlight {
    border-color: var(--accent);
    box-shadow: 0 8px 28px rgba(57,255,20,0.18), 0 0 0 1px rgba(57,255,20,0.4) inset;
  }
  .portfolio .about-icon {
    width: 40px; height: 40px; border-radius: 11px;
    background: rgba(57,255,20,0.1);
    border: 1px solid rgba(57,255,20,0.22);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent);
  }
  .portfolio .about-card-title {
    font-size: 14px; font-weight: 700; color: var(--text);
    letter-spacing: -0.2px;
  }

  /* SKILLS */
  .portfolio .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(148px, 1fr));
    gap: 13px; margin-top: 26px;
  }
  .portfolio .skill-card {
    background: var(--card);
    border-radius: 14px; padding: 22px 19px;
    border: 1px solid var(--border);
    transition: transform .25s, border-color .25s, background .25s, box-shadow .25s;
    cursor: default;
    box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  }
  .portfolio .skill-card:hover {
    border-color: rgba(57,255,20,0.38);
    transform: translateY(-4px);
    background: var(--card2);
    box-shadow: 0 12px 32px rgba(0,0,0,0.15);
  }
  .portfolio .skill-icon { font-size: 22px; margin-bottom: 10px; }
  .portfolio .skill-name { font-size: 13px; font-weight: 600; color: var(--text); margin-bottom: 5px; }
  .portfolio .badge {
    display: inline-block; font-size: 10px;
    padding: 3px 9px; border-radius: 999px; font-weight: 600;
  }
  .portfolio .badge-done { background: rgba(57,255,20,0.1); color: var(--accent); border: 1px solid rgba(57,255,20,0.2); }
  .portfolio .badge-learning { background: rgba(251,191,36,0.1); color: #fbbf24; border: 1px solid rgba(251,191,36,0.2); }

  /* PROJECTS — single Learning Dashboard card */
  .portfolio .dashboard-card {
    background: var(--card);
    border-radius: 20px; padding: 32px;
    border: 1px solid var(--border);
    margin-top: 26px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.12);
    position: relative; overflow: hidden;
  }
  .portfolio .dashboard-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }
  .portfolio .dashboard-title {
    font-size: 20px; font-weight: 700; color: var(--text);
    letter-spacing: -0.5px; margin-bottom: 4px;
  }
  .portfolio .dashboard-tag {
    font-size: 12px; color: var(--accent); font-weight: 600;
    margin-bottom: 22px;
  }

  /* GROWTH CHART */
  .portfolio .chart-wrap {
    background: rgba(57,255,20,0.04);
    border: 1px solid rgba(57,255,20,0.15);
    border-radius: 14px; padding: 18px;
    margin-bottom: 22px;
  }
  .portfolio .growth-svg { width: 100%; height: auto; display: block; }
  .portfolio .growth-line {
    stroke: var(--accent); stroke-width: 2.5;
    fill: none;
    stroke-linecap: round; stroke-linejoin: round;
    stroke-dasharray: 600;
    stroke-dashoffset: 600;
    animation: portfolio-draw 2.4s ease-out 0.4s forwards;
  }
  .portfolio .growth-fill {
    fill: url(#growthGrad);
    opacity: 0;
    animation: portfolio-fade 1s ease-out 2.2s forwards;
  }
  .portfolio .growth-dot {
    fill: var(--accent);
    opacity: 0;
    animation: portfolio-fade 0.4s ease-out forwards;
  }
  @keyframes portfolio-draw { to { stroke-dashoffset: 0; } }
  @keyframes portfolio-fade { to { opacity: 1; } }

  .portfolio .dashboard-info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 10px;
  }
  .portfolio .info-pill {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px;
  }
  .portfolio .info-label {
    font-size: 10px; color: #888; letter-spacing: 1.4px;
    text-transform: uppercase; font-weight: 600; margin-bottom: 4px;
  }
  .portfolio .info-value {
    font-size: 13px; color: var(--text); font-weight: 600;
  }

  /* CONTACT — small icon row */
  .portfolio .contact-icons {
    display: flex; justify-content: center;
    gap: 18px; margin-top: 28px;
  }
  .portfolio .contact-icon-btn {
    width: 48px; height: 48px; border-radius: 999px;
    display: flex; align-items: center; justify-content: center;
    color: #fff; text-decoration: none;
    transition: transform .25s, box-shadow .25s, filter .25s;
  }
  .portfolio .contact-icon-btn:hover {
    transform: scale(1.12) translateY(-2px);
    filter: brightness(1.1);
  }
  .portfolio .ci-email    { background: linear-gradient(135deg, #ea4335, #c5221f); }
  .portfolio .ci-email:hover    { box-shadow: 0 8px 24px rgba(234,67,53,0.45); }
  .portfolio .ci-facebook { background: linear-gradient(135deg, #1877f2, #0a4fb3); }
  .portfolio .ci-facebook:hover { box-shadow: 0 8px 24px rgba(24,119,242,0.45); }
  .portfolio .ci-telegram { background: linear-gradient(135deg, #2aabee, #229ed9); }
  .portfolio .ci-telegram:hover { box-shadow: 0 8px 24px rgba(42,171,238,0.45); }

  /* CONTACT FORM */
  .portfolio .contact-form {
    background: var(--card);
    border-radius: 20px; padding: 32px;
    border: 1px solid var(--border);
    margin-top: 28px;
    display: grid; gap: 14px;
    box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  }
  .portfolio .form-field { display: grid; gap: 6px; }
  .portfolio .form-label {
    font-size: 11px; color: #888; letter-spacing: 1.5px;
    text-transform: uppercase; font-weight: 600;
  }
  .portfolio .form-input, .portfolio .form-textarea {
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 10px; padding: 12px 14px;
    color: var(--text); font-size: 14px;
    font-family: inherit; outline: none;
    transition: border-color .2s, background .2s;
    width: 100%;
  }
  .portfolio .form-textarea { resize: vertical; min-height: 110px; }
  .portfolio .form-input:focus, .portfolio .form-textarea:focus {
    border-color: rgba(57,255,20,0.45);
    background: rgba(57,255,20,0.04);
  }
  .portfolio .form-submit {
    background: var(--accent); color: #111;
    font-size: 13px; font-weight: 700;
    padding: 13px 26px; border-radius: 10px;
    border: none; cursor: pointer;
    transition: all .22s; font-family: inherit;
    justify-self: start; margin-top: 4px;
  }
  .portfolio .form-submit:hover { background: var(--accent2); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(57,255,20,0.25); }
  .portfolio .form-submit:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }
  .portfolio .form-status { font-size: 12.5px; color: var(--accent); margin-top: 4px; }
  .portfolio .form-error { font-size: 12px; color: #ff6b6b; }

  /* SCROLL REVEAL */
  .portfolio .reveal {
    opacity: 0;
    transform: translateX(0) translateY(24px);
    transition: opacity .7s ease-out, transform .7s ease-out;
    will-change: opacity, transform;
  }
  .portfolio .reveal-left  { transform: translateX(-40px); }
  .portfolio .reveal-right { transform: translateX(40px); }
  .portfolio .reveal.is-visible {
    opacity: 1;
    transform: translateX(0) translateY(0);
  }
  @media (prefers-reduced-motion: reduce) {
    .portfolio .reveal, .portfolio .reveal-left, .portfolio .reveal-right {
      opacity: 1; transform: none; transition: none;
    }
    .portfolio .silhouette-wrap, .portfolio .wave-arm { animation: none; }
    .portfolio .growth-line { stroke-dashoffset: 0; animation: none; }
    .portfolio .growth-fill, .portfolio .growth-dot { opacity: 1; animation: none; }
  }

  /* FOOTER */
  .portfolio footer {
    text-align: center; padding: 32px; font-size: 12px; color: #999;
    border-top: 1px solid rgba(0,0,0,0.07); margin-top: 80px;
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .portfolio nav { padding: 14px 18px; }
    .portfolio .nav-right { gap: 14px; }
    .portfolio .nav-links { gap: 14px; }
    .portfolio .hero-inner { flex-direction: column; }
    .portfolio .silhouette-wrap { width: 90px; margin: 0 0 -14px; order: -1; align-self: center; }
    .portfolio .hero-card { padding: 36px 28px; }
    .portfolio .about-grid { grid-template-columns: 1fr; }
    .portfolio .dashboard-card { padding: 24px 20px; }
    .portfolio .contact-form { padding: 24px 20px; }
    .portfolio .contact-icons { gap: 14px; }
  }
`;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".portfolio .reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function Index() {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#f5f4f0";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  useScrollReveal();

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

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

  const aboutCards = [
    { icon: <Shield size={20} />, title: "Interested in Cyber Security", side: "left", highlight: true },
    { icon: <GraduationCap size={20} />, title: "Class 10 Student", side: "right", highlight: false },
    { icon: <Cpu size={20} />, title: "Passionate about Technology", side: "left", highlight: false },
    { icon: <Zap size={20} />, title: "Fast Learner", side: "right", highlight: false },
  ] as const;

  const skills = [
    { icon: "🟧", name: "HTML", badge: "Basic", badgeClass: "badge-learning", side: "left" },
    { icon: "📱", name: "Mobile Optimization", badge: "Good", badgeClass: "badge-done", side: "right" },
    { icon: "🧩", name: "Problem Solving", badge: "Developing", badgeClass: "badge-learning", side: "left" },
    { icon: "🤖", name: "AI Productivity", badge: "Experienced", badgeClass: "badge-done", side: "right" },
    { icon: "🛡️", name: "Cyber Security", badge: "Beginner", badgeClass: "badge-learning", side: "left" },
  ] as const;

  // Growth chart points (rising) — viewBox 0 0 600 180
  const points = [
    [10, 160],
    [90, 145],
    [170, 130],
    [250, 110],
    [330, 90],
    [410, 65],
    [490, 40],
    [580, 18],
  ];
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p[0]} ${p[1]}`).join(" ");
  const fillPath = `${linePath} L 580 180 L 10 180 Z`;

  return (
    <div className="portfolio">
      <style>{css}</style>
      <audio ref={audioRef} src="/quran.mp3" preload="none" onEnded={() => setPlaying(false)} />

      {/* NAV */}
      <nav>
        <span className="nav-logo">IM</span>
        <div className="nav-right">
          <div className="nav-links">
            <a href="#about">About</a>
            <a href="#skills">Skills</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
          <button
            type="button"
            className={`audio-btn${playing ? " playing" : ""}`}
            onClick={toggleAudio}
            aria-label={playing ? "Pause Quran recitation" : "Play Quran recitation"}
            title={playing ? "Pause" : "Play Quran"}
          >
            {playing ? <Pause size={15} /> : <Play size={15} style={{ marginLeft: 1 }} />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">Ibrahim Mahmud</div>
        <div className="hero-inner">
          <div className="hero-card">
            <div className="hero-tag">
              <span className="pulse-dot"></span>
              Exploring Cyber Security
            </div>
            <h1 className="hero-name">Ibrahim Mahmud</h1>
            <p className="hero-subtitle">Learning. Building. Growing.</p>
            <p className="hero-desc">Class 10 Student &nbsp;•&nbsp; Exploring Cyber Security</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                View Projects
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("contact")}>
                Contact
              </button>
            </div>
          </div>

          {/* Human Silhouette — only RIGHT hand waves once */}
          <div className="silhouette-wrap">
            <svg
              width="115"
              height="225"
              viewBox="0 0 115 225"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="57" cy="22" r="17" fill="#18181b" stroke="#39ff14" strokeWidth="1.5" />
              <rect x="50" y="37" width="14" height="10" rx="4" fill="#18181b" />
              <rect x="30" y="45" width="55" height="65" rx="11" fill="#18181b" />
              {/* Left arm — fully static */}
              <rect x="7" y="47" width="22" height="55" rx="9" fill="#18181b" />
              {/* Right arm — waves once on load */}
              <g className="wave-arm">
                <rect x="86" y="47" width="22" height="55" rx="9" fill="#18181b" />
                <circle cx="97" cy="105" r="6" fill="#18181b" stroke="#39ff14" strokeWidth="1" />
              </g>
              <rect x="31" y="107" width="20" height="72" rx="9" fill="#18181b" />
              <rect x="64" y="107" width="20" height="72" rx="9" fill="#18181b" />
              <ellipse cx="41" cy="179" rx="12" ry="6" fill="#18181b" />
              <ellipse cx="74" cy="179" rx="12" ry="6" fill="#18181b" />
              <line x1="57" y1="47" x2="57" y2="109" stroke="#39ff14" strokeWidth="0.5" opacity="0.2" />
              <line x1="30" y1="55" x2="85" y2="55" stroke="#39ff14" strokeWidth="0.4" opacity="0.15" />
            </svg>
          </div>
        </div>
      </section>

      <div className="content-wrap">
        {/* ABOUT */}
        <section id="about" className="section">
          <div className="section-label">Who I am</div>
          <h2 className="section-title">About Me</h2>
          <p className="section-sub">A few honest things about me.</p>
          <div className="about-grid">
            {aboutCards.map((c) => (
              <div
                key={c.title}
                className={`about-card-item reveal reveal-${c.side}${c.highlight ? " highlight" : ""}`}
              >
                <div className="about-icon">{c.icon}</div>
                <div className="about-card-title">{c.title}</div>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="section-label">What I know</div>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">Building my toolkit one skill at a time.</p>
          <div className="skills-grid">
            {skills.map((s) => (
              <div key={s.name} className={`skill-card reveal reveal-${s.side}`}>
                <div className="skill-icon">{s.icon}</div>
                <div className="skill-name">{s.name}</div>
                <span className={`badge ${s.badgeClass}`}>{s.badge}</span>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS — single Learning Dashboard */}
        <section id="projects" className="section">
          <div className="section-label">What I'm building</div>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">Tracking my journey, one step at a time.</p>

          <div className="dashboard-card reveal reveal-left">
            <div className="dashboard-title">Learning Dashboard</div>
            <div className="dashboard-tag">Growth has no limit</div>

            <div className="chart-wrap">
              <svg
                className="growth-svg"
                viewBox="0 0 600 180"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-label="Upward growth chart"
              >
                <defs>
                  <linearGradient id="growthGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#39ff14" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#39ff14" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {/* baseline grid */}
                <line x1="0" y1="45" x2="600" y2="45" stroke="#2c2c33" strokeWidth="0.5" strokeDasharray="3 5" />
                <line x1="0" y1="90" x2="600" y2="90" stroke="#2c2c33" strokeWidth="0.5" strokeDasharray="3 5" />
                <line x1="0" y1="135" x2="600" y2="135" stroke="#2c2c33" strokeWidth="0.5" strokeDasharray="3 5" />
                {/* fill under line */}
                <path className="growth-fill" d={fillPath} />
                {/* growth line */}
                <path className="growth-line" d={linePath} />
                {/* dots */}
                {points.map((p, i) => (
                  <circle
                    key={i}
                    className="growth-dot"
                    cx={p[0]}
                    cy={p[1]}
                    r={3.5}
                    style={{ animationDelay: `${2.4 + i * 0.08}s` }}
                  />
                ))}
              </svg>
            </div>

            <div className="dashboard-info">
              <div className="info-pill">
                <div className="info-label">Learning Progress</div>
                <div className="info-value" style={{ color: "var(--accent)" }}>Active</div>
              </div>
              <div className="info-pill">
                <div className="info-label">Projects</div>
                <div className="info-value">Coming Soon</div>
              </div>
              <div className="info-pill">
                <div className="info-label">Focus</div>
                <div className="info-value">Cyber Security</div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section" style={{ paddingBottom: 0 }}>
          <div className="section-label">Say Hello</div>
          <h2 className="section-title">Contact</h2>
          <p className="section-sub">Got a question or want to collaborate? Hit me up.</p>

          <div className="contact-icons">
            <a
              className="contact-icon-btn ci-email"
              href="mailto:ibmm923@gmail.com"
              aria-label="Email Ibrahim"
              title="Email"
            >
              <Mail size={20} />
            </a>
            <a
              className="contact-icon-btn ci-facebook"
              href="https://www.facebook.com/share/1B5pb2sDuc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a
              className="contact-icon-btn ci-telegram"
              href="https://t.me/ibrahimbd10"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram"
            >
              <Send size={20} />
            </a>
          </div>

          <ContactForm />
        </section>
      </div>

      <footer>© Ibrahim Mahmud — All rights reserved.</footer>
    </div>
  );
}

function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<{ type: "ok" | "err"; msg: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const trimmedMessage = message.trim();

    if (!trimmedName || trimmedName.length > 100) {
      setStatus({ type: "err", msg: "Please enter a valid name (max 100 chars)." });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail) || trimmedEmail.length > 255) {
      setStatus({ type: "err", msg: "Please enter a valid email address." });
      return;
    }
    if (!trimmedMessage || trimmedMessage.length > 1000) {
      setStatus({ type: "err", msg: "Message cannot be empty (max 1000 chars)." });
      return;
    }

    setSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("https://formspree.io/f/xwvwvklr", {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
          name: trimmedName,
          email: trimmedEmail,
          message: trimmedMessage,
        }),
      });
      if (res.ok) {
        setStatus({ type: "ok", msg: "Thanks! Your message has been sent." });
        setName("");
        setEmail("");
        setMessage("");
        formRef.current?.reset();
      } else {
        setStatus({ type: "err", msg: "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ type: "err", msg: "Network error. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form ref={formRef} className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-name">Name</label>
        <input
          id="cf-name"
          name="name"
          className="form-input"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={100}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-email">Email</label>
        <input
          id="cf-email"
          name="email"
          className="form-input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          maxLength={255}
          required
        />
      </div>
      <div className="form-field">
        <label className="form-label" htmlFor="cf-message">Message</label>
        <textarea
          id="cf-message"
          name="message"
          className="form-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          maxLength={1000}
          required
        />
      </div>
      <button type="submit" className="form-submit" disabled={submitting}>
        {submitting ? "Sending…" : "Send Message"}
      </button>
      {status && (
        <div className={status.type === "ok" ? "form-status" : "form-error"}>{status.msg}</div>
      )}
    </form>
  );
}
