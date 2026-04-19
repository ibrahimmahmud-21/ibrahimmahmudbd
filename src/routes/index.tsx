import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Mail, Facebook, Send, ShieldCheck } from "lucide-react";

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
  .portfolio .nav-logo { font-size: 15px; font-weight: 700; letter-spacing: -0.3px; color: #111; }
  .portfolio .nav-links { display: flex; gap: 30px; }
  .portfolio .nav-links a {
    font-size: 13px; color: #666; text-decoration: none;
    transition: color .2s; font-weight: 500;
  }
  .portfolio .nav-links a:hover { color: #111; }

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

  /* SILHOUETTE */
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

  /* ABOUT */
  .portfolio .about-card {
    background: var(--card);
    border-radius: 20px; padding: 38px 42px;
    margin-top: 26px; border: 1px solid var(--border);
    display: grid; grid-template-columns: 1.3fr 1fr;
    gap: 34px; align-items: center;
    box-shadow: 0 20px 60px rgba(0,0,0,0.12);
  }
  .portfolio .about-text { font-size: 13.5px; color: #bbb; line-height: 1.9; }
  .portfolio .about-text p { margin-bottom: 13px; }
  .portfolio .about-text p:last-child { margin-bottom: 0; }
  .portfolio .about-stats { display: grid; gap: 13px; }
  .portfolio .stat-item {
    background: rgba(57,255,20,0.06);
    border: 1px solid rgba(57,255,20,0.14);
    border-radius: 12px; padding: 16px 19px;
    transition: border-color .2s;
  }
  .portfolio .stat-item:hover { border-color: rgba(57,255,20,0.3); }
  .portfolio .stat-num { font-size: 28px; font-weight: 800; color: var(--accent); line-height: 1; }
  .portfolio .stat-label { font-size: 11.5px; color: #666; margin-top: 4px; }

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
    transition: all .25s; cursor: default;
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

  /* PROJECTS */
  .portfolio .projects-grid {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 15px; margin-top: 26px;
  }
  .portfolio .project-card {
    background: var(--card);
    border-radius: 18px; padding: 32px 28px;
    border: 1px solid var(--border);
    min-height: 205px;
    display: flex; flex-direction: column; justify-content: space-between;
    transition: all .25s; position: relative; overflow: hidden;
    box-shadow: 0 8px 28px rgba(0,0,0,0.1);
  }
  .portfolio .project-card::after {
    content: ''; position: absolute;
    bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--accent), transparent);
  }
  .portfolio .project-card:hover { border-color: rgba(57,255,20,0.32); transform: translateY(-4px); box-shadow: 0 16px 44px rgba(0,0,0,0.18); }
  .portfolio .project-soon {
    display: inline-flex; align-items: center; gap: 6px;
    background: rgba(57,255,20,0.08);
    border: 1px solid rgba(57,255,20,0.2);
    color: var(--accent); font-size: 10.5px; font-weight: 700;
    padding: 5px 12px; border-radius: 999px;
    letter-spacing: 0.5px; width: fit-content;
  }
  .portfolio .project-title {
    font-size: 20px; font-weight: 700; color: var(--text);
    margin: 16px 0 8px; letter-spacing: -0.5px;
  }
  .portfolio .project-desc { font-size: 13px; color: #666; line-height: 1.65; }

  /* CONTACT */
  .portfolio .contact-card {
    background: var(--card);
    border-radius: 20px; padding: 40px;
    border: 1px solid var(--border);
    margin-top: 26px;
    display: flex; gap: 15px; flex-wrap: wrap;
    box-shadow: 0 16px 48px rgba(0,0,0,0.12);
  }
  .portfolio .contact-item {
    flex: 1; min-width: 200px;
    background: rgba(255,255,255,0.03);
    border: 1px solid var(--border);
    border-radius: 14px; padding: 22px 24px;
    transition: all .22s; cursor: pointer;
    text-decoration: none; display: block;
  }
  .portfolio .contact-item:hover { border-color: rgba(57,255,20,0.42); transform: translateY(-3px); background: rgba(57,255,20,0.04); }
  .portfolio .contact-label { font-size: 10.5px; color: #555; margin-bottom: 6px; letter-spacing: 1.5px; text-transform: uppercase; }
  .portfolio .contact-value { font-size: 14px; color: var(--text); font-weight: 500; word-break: break-all; }
  .portfolio .contact-arrow { font-size: 17px; color: var(--accent); margin-top: 12px; display: block; }
  .portfolio .contact-icon {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(57,255,20,0.1);
    border: 1px solid rgba(57,255,20,0.22);
    display: flex; align-items: center; justify-content: center;
    color: var(--accent); margin-bottom: 14px;
  }

  /* CONTACT FORM */
  .portfolio .contact-form {
    background: var(--card);
    border-radius: 20px; padding: 32px;
    border: 1px solid var(--border);
    margin-top: 15px;
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
  .portfolio .form-status { font-size: 12.5px; color: var(--accent); margin-top: 4px; }
  .portfolio .form-error { font-size: 12px; color: #ff6b6b; }

  /* FOOTER */
  .portfolio footer {
    text-align: center; padding: 32px; font-size: 12px; color: #999;
    border-top: 1px solid rgba(0,0,0,0.07); margin-top: 80px;
  }

  /* RESPONSIVE */
  @media (max-width: 640px) {
    .portfolio nav { padding: 16px 20px; }
    .portfolio .hero-inner { flex-direction: column; }
    .portfolio .silhouette-wrap { width: 90px; margin: 0 0 -14px; order: -1; align-self: center; }
    .portfolio .hero-card { padding: 36px 28px; }
    .portfolio .about-card { grid-template-columns: 1fr; padding: 28px 24px; }
    .portfolio .projects-grid { grid-template-columns: 1fr; }
    .portfolio .contact-card { padding: 26px 20px; }
    .portfolio .contact-form { padding: 24px 20px; }
    .portfolio .nav-links { gap: 16px; }
  }
`;

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function Index() {
  useEffect(() => {
    const prev = document.body.style.background;
    document.body.style.background = "#f5f4f0";
    return () => {
      document.body.style.background = prev;
    };
  }, []);

  return (
    <div className="portfolio">
      <style>{css}</style>

      {/* NAV */}
      <nav>
        <span className="nav-logo">IM</span>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg-text">Ibrahim Mahmud</div>
        <div className="hero-inner">
          <div className="hero-card">
            <div className="hero-tag">
              <span className="pulse-dot"></span>
              Future Software Engineer
            </div>
            <h1 className="hero-name">Ibrahim Mahmud</h1>
            <p className="hero-subtitle">Learning. Building. Growing.</p>
            <p className="hero-desc">Class 10 Student &nbsp;•&nbsp; Future Software Engineer</p>
            <div className="hero-btns">
              <button className="btn-primary" onClick={() => scrollTo("projects")}>
                View Projects
              </button>
              <button className="btn-secondary" onClick={() => scrollTo("contact")}>
                Contact
              </button>
            </div>
          </div>

          {/* Human Silhouette */}
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
              <rect x="7" y="47" width="22" height="55" rx="9" fill="#18181b" />
              <rect x="86" y="47" width="22" height="55" rx="9" fill="#18181b" />
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
          <div className="about-card">
            <div className="about-text">
              <p>
                Hey! I'm Ibrahim Mahmud — a Class 10 student with one big dream: becoming a
                software engineer. I spend my free time learning web development and building
                things from scratch.
              </p>
              <p>
                I believe in the grind. Every line of code is a step forward. Currently mastering
                HTML, CSS, and JavaScript before diving deeper into the world of software.
              </p>
              <p>
                One day I'll build things that actually matter. Until then? I keep learning, keep
                building, keep growing.
              </p>
            </div>
            <div className="about-stats">
              <div className="stat-item">
                <div className="stat-num">10</div>
                <div className="stat-label">Grade in School</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">6+</div>
                <div className="stat-label">Skills in Progress</div>
              </div>
              <div className="stat-item">
                <div className="stat-num">∞</div>
                <div className="stat-label">Curiosity Level</div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="section">
          <div className="section-label">What I know</div>
          <h2 className="section-title">Skills</h2>
          <p className="section-sub">Building my toolkit one skill at a time.</p>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">🟧</div>
              <div className="skill-name">HTML</div>
              <span className="badge badge-done">Comfortable</span>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <div className="skill-name">CSS</div>
              <span className="badge badge-done">Comfortable</span>
            </div>
            <div className="skill-card">
              <div className="skill-icon">⚡</div>
              <div className="skill-name">JavaScript</div>
              <span className="badge badge-learning">Learning</span>
            </div>
            <div className="skill-card">
              <div className="skill-icon">📱</div>
              <div className="skill-name">Responsive Design</div>
              <span className="badge badge-done">Comfortable</span>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🧩</div>
              <div className="skill-name">Problem Solving</div>
              <span className="badge badge-done">Developing</span>
            </div>
            <div className="skill-card">
              <div className="skill-icon">⚙️</div>
              <div className="skill-name">Mobile Optimization</div>
              <span className="badge badge-learning">Exploring</span>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="section">
          <div className="section-label">What I'm building</div>
          <h2 className="section-title">Projects</h2>
          <p className="section-sub">Big things are being cooked. Stay tuned.</p>
          <div className="projects-grid">
            <div className="project-card">
              <div className="project-soon">⏳ Coming Soon</div>
              <div>
                <div className="project-title">Project One</div>
                <div className="project-desc">
                  Something exciting is brewing. This project will showcase my HTML &amp; CSS
                  skills in a real-world context.
                </div>
              </div>
            </div>
            <div className="project-card">
              <div className="project-soon">⏳ Coming Soon</div>
              <div>
                <div className="project-title">Project Two</div>
                <div className="project-desc">
                  A JavaScript project in progress. Building interactive experiences one function
                  at a time.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="section" style={{ paddingBottom: 0 }}>
          <div className="section-label">Say Hello</div>
          <h2 className="section-title">Contact</h2>
          <p className="section-sub">Got a question or want to collaborate? Hit me up.</p>
          <div className="contact-card">
            <a className="contact-item" href="mailto:ibrahim@example.com">
              <div className="contact-label">Email</div>
              <div className="contact-value">ibrahim@example.com</div>
              <span className="contact-arrow">↗</span>
            </a>
            <a
              className="contact-item"
              href="https://facebook.com/ibrahim"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-label">Facebook</div>
              <div className="contact-value">Ibrahim Mahmud</div>
              <span className="contact-arrow">↗</span>
            </a>
          </div>
        </section>
      </div>

      <footer>Made with curiosity &amp; code — Ibrahim Mahmud © 2025</footer>
    </div>
  );
}
