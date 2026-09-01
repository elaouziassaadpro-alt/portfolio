import { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Server,
  ShieldCheck,
  Database,
  Activity,
  ChevronDown,
  Terminal,
  Layers,
  Cpu,
  AirVent,
  AirplayIcon,
  Plane,
  User,
  Phone,
  Locate,
  PlaneLanding,
  CitrusIcon,
  LocateIcon
} from "lucide-react";
import "./App.css";
import FollowCursor from "./cursor";
import NeuralGlow from "./neural-glow";
import GlobeDemo from "./Globe";
import Button from "./Gradient";
import Navbar from "./navbar";
import ScrollReveal from "./components/ScrollReveal";
import { useLanguage } from "./contexts/LanguageContext";

const experienceIcons = [
  <ShieldCheck size={28} color="var(--accent-primary)" />,
  <Terminal size={28} color="var(--accent-secondary)" />,
  <Activity size={28} color="var(--accent-primary)" />,
  <Plane size={28} color="var(--accent-secondary)" />,
  <Layers size={28} color="var(--accent-primary)" />,
];

const aboutCardIcons = [
  { Icon: Server, color: "var(--accent-primary)" },
  { Icon: Cpu, color: "var(--accent-secondary)" },
  { Icon: Database, color: "var(--text-primary)" },
  { Icon: Layers, color: "var(--accent-primary)" },
];

const techStack = ["Laravel", "PHP", "Livewire", "React.js", "React Native", "Node.js", "Express.js", "SQL", "Java", "Python", "Git"];

const projectVisuals = [
  { Icon: ShieldCheck, tags: ["Laravel", "PHP", "Livewire", "MySQL"] },
  { Icon: Activity, tags: ["Laravel", "React.js", "Docker"] },
  { Icon: Terminal, tags: ["Laravel", "PHP", "SQL"] },
  { Icon: Plane, tags: ["React.js", "JavaScript"] },
  { Icon: Layers, tags: ["Java", "JavaFX"] },
];

const projectDelays = [0, 0.2, 0.1, 0.1, 0.1];

function App() {
  const { t, isChanging } = useLanguage();

  return (
    <div
      className="min-h-screen"
      style={{
        opacity: isChanging ? 0 : 1,
        filter: isChanging ? "blur(6px)" : "blur(0px)",
        transition: "opacity 0.24s ease, filter 0.24s ease",
      }}
    >
      <FollowCursor color="#d85a30" />
      <NeuralGlow />

      {/* Navigation */}
      <Navbar />

      <main>
      {/* Hero Section */}
      <section
        id="home"
        className="section"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          background: "none",
          position: "relative",
          zIndex: 10,
          paddingTop: "120px"
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          flexWrap: "wrap",
          gap: "2rem"
        }}>
          <div style={{ maxWidth: "600px", flex: 1 }} className="animate-fade-in">

            <h1
              style={{
                fontSize: "clamp(2.5rem, 8vw, 4.5rem)",
                marginBottom: "1rem",
                lineHeight: "1.1",
              }}
            >
              {t.hero.titleBefore} <span className="gradient-text">{t.hero.titleAccent}</span>
            </h1>
            <p
              style={{
                fontSize: "1.2rem",
                color: "var(--text-secondary)",
                marginBottom: "2.5rem",
                maxWidth: "600px",
                lineHeight: "1.8",
              }}
            >
              {t.hero.subtitle}
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-premium">
                {t.hero.ctaProjects}
              </a>
              <a href="#contact" className="btn btn-outline">
                {t.hero.ctaContact} <Mail size={18} />
              </a>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem" }}>
              <a
                href="https://github.com/elaouziassaadpro-alt"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Github size={24} />
              </a>
              <a
                href="https://www.linkedin.com/in/assaad-elaouzi-8b95bb211/"
                style={{
                  color: "var(--text-secondary)",
                  transition: "color 0.3s",
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.color = "var(--text-primary)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.color = "var(--text-secondary)")
                }
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: "300px", display: "flex", justifyContent: "center" }}>
            <div className="animate-float" style={{
              position: "relative",
              width: "400px",
              height: "500px",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid var(--border-color)",
              boxShadow: "var(--shadow-lg)",
              background: "var(--surface-color)",
            }}>
              <img
                src="/profile.png"
                alt="Assaad Elaouzi"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.9) contrast(1.1)"
                }}
              />
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to top, var(--overlay-dark), transparent)",
                pointerEvents: "none"
              }} />
              <div style={{
                position: "absolute",
                bottom: "20px",
                left: "20px",
                right: "20px",
                padding: "1.2rem",
                backdropFilter: "blur(12px)",
                background: "var(--overlay-plate)",
                borderRadius: "16px",
                border: "1px solid rgba(244, 241, 234, 0.18)",
                textAlign: "left"
              }}>
                <div style={{ fontWeight: "800", color: "var(--text-light)", fontSize: "1.2rem", fontFamily: "Outfit" }}>Assaad Elaouzi</div>
                <div style={{ fontSize: "0.85rem", color: "var(--accent-secondary)", fontWeight: "600", letterSpacing: "0.5px" }}>{t.hero.photoRole}</div>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
            animation: "float 2s infinite",
            zIndex: 10
          }}
        >
          <ChevronDown size={32} color="var(--text-secondary)" />
        </div>
      </section>

      {/* About Section & Skills */}
      <section id="about" className="section" style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}>
        <ScrollReveal>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span className="section-index">
              01.
            </span>
            {t.about.heading}
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <ScrollReveal direction="right" delay={0.2}>
            <div>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginBottom: "1rem",
                  lineHeight: "1.8",
                }}
              >
                {t.about.p1}
              </p>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                  lineHeight: "1.8",
                }}
              >
                {t.about.p2}
              </p>

              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                  color: "var(--text-primary)",
                  fontFamily: "Outfit",
                }}
              >
                {t.about.expertiseHeading}
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem" }}>
                {techStack.map((tech) => (
                  <span key={tech} className="pill">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.4}>
            <div
              className="glass-card animate-float"
              style={{
                position: "relative",
                height: "400px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background:
                  "linear-gradient(135deg, var(--accent-wash), var(--gold-wash))",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", opacity: 0.8 }}>
                {aboutCardIcons.map(({ Icon, color }, idx) => (
                  <div key={t.about.cards[idx]} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                    <Icon size={60} color={color} />
                    <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{t.about.cards[idx]}</span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  position: "absolute",
                  inset: "0",
                  border: "2px solid var(--accent-primary)",
                  borderRadius: "16px",
                  transform: "translate(20px, 20px)",
                  zIndex: -1,
                  opacity: 0.3,
                }}
              ></div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}>
        <ScrollReveal>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span className="section-index">
              02.
            </span>
            {t.experience.heading}
          </h2>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {t.experience.items.map((item, idx) => (
             <ScrollReveal key={item.company} delay={idx * 0.1}>
               <div className="glass-card" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.5rem 2rem" }}>
                 <div className="icon-plate">
                   {experienceIcons[idx]}
                 </div>
                 <div>
                   <div style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", justifyContent: "space-between", gap: "0.5rem" }}>
                     <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{item.role} — {item.company}</h3>
                     <span style={{ fontSize: "0.85rem", color: "var(--accent-text)", fontFamily: "Outfit", fontWeight: 600, whiteSpace: "nowrap" }}>{item.period}</span>
                   </div>
                   <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
                 </div>
               </div>
             </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="section"
        style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}
      >
        <ScrollReveal>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span className="section-index">
              03.
            </span>
            {t.projects.heading}
          </h2>
        </ScrollReveal>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          {t.projects.items.map((project, idx) => {
            const { Icon, tags } = projectVisuals[idx];
            const imageFirst = idx % 2 === 0;

            const imageBlock = (
              <div
                style={{
                  background: "var(--surface-color)",
                  minHeight: "300px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon size={80} color="var(--text-secondary)" opacity={0.3} />
              </div>
            );

            const textBlock = (
              <div
                style={{
                  padding: "2rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: imageFirst ? "stretch" : "flex-start",
                }}
              >
                <span className="eyebrow">{project.eyebrow}</span>
                <h3 style={{ fontSize: "1.8rem", margin: "0.5rem 0 1rem 0" }}>
                  {project.title}
                </h3>
                <p
                  className="callout"
                  style={{
                    marginBottom: "1.5rem",
                    zIndex: 2,
                    ...(imageFirst ? { marginLeft: "-50px" } : { marginRight: "-50px" }),
                  }}
                >
                  {project.desc}
                </p>
                {project.bullets && (
                  <ul
                    style={{
                      listStyle: "none",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.6rem",
                      marginBottom: "1.5rem",
                      color: "var(--text-secondary)",
                      fontSize: "0.95rem",
                    }}
                  >
                    {project.bullets.map((line) => (
                      <li
                        key={line}
                        style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}
                      >
                        <span
                          style={{
                            width: "6px",
                            height: "6px",
                            borderRadius: "50%",
                            background: "var(--accent-primary)",
                            flexShrink: 0,
                          }}
                        />
                        {line}
                      </li>
                    ))}
                  </ul>
                )}
                <div
                  style={{
                    display: "flex",
                    gap: "1rem",
                    color: "var(--text-secondary)",
                    fontSize: "0.9rem",
                    marginBottom: "1.5rem",
                    fontFamily: "Outfit",
                  }}
                >
                  {tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              </div>
            );

            return (
              <ScrollReveal key={idx} direction={imageFirst ? "right" : "left"} delay={projectDelays[idx]}>
                <div
                  className="glass-card"
                  style={{
                    display: "grid",
                    gridTemplateColumns: imageFirst ? "1.2fr 1fr" : "1fr 1.2fr",
                    gap: "2rem",
                    padding: "0",
                    overflow: "hidden",
                  }}
                >
                  {imageFirst ? (
                    <>
                      {imageBlock}
                      {textBlock}
                    </>
                  ) : (
                    <>
                      {textBlock}
                      {imageBlock}
                    </>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
      {/* Vision Section */}
      <section id="vision" className="section" style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}>
        <ScrollReveal>
          <h2
            style={{
              fontSize: "2.5rem",
              marginBottom: "3rem",
              display: "flex",
              alignItems: "center",
              gap: "1rem",
            }}
          >
            <span className="section-index">
              04.
            </span>
            {t.vision.heading}
          </h2>
        </ScrollReveal>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <ScrollReveal direction="right">
            <div className="animate-fade-in">
              <p
                style={{
                  fontSize: "1.1rem",
                  color: "var(--text-secondary)",
                  marginBottom: "2rem",
                  lineHeight: "1.8",
                }}
              >
                {t.vision.p1}
              </p>

              <h3
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "1.5rem",
                  color: "var(--text-primary)",
                  fontFamily: "Outfit",
                }}
              >
                {t.vision.expertiseHeading}
              </h3>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem" }}>
                {t.vision.tags.map((tech) => (
                  <span key={tech} className="pill pill-gold">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="left" delay={0.2}>
            <div
              className="glass-card animate-float"
              style={{
                height: "500px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "radial-gradient(circle at center, var(--gold-wash), transparent)",
                overflow: "hidden"
              }}
            >
              <GlobeDemo />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Contact Section */}
      <ScrollReveal>
        <section
          id="contact"
          className="section"
          style={{
            paddingTop: "150px",
            paddingBottom: "150px",
            textAlign: "center",
            maxWidth: "600px",
            zIndex: 10,
            position: "relative"
          }}
        >
          <h2 className="section-index" style={{ marginBottom: "1rem" }}>
            05. {t.contact.eyebrow}
          </h2>
          <h3 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
            {t.contact.heading}
          </h3>
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "1.1rem",
              marginBottom: "3rem",
              lineHeight: "1.8",
            }}
          >
            {t.contact.p1}
          </p>

          {/* Contact Card */}
          <div
            className="glass-card"
            style={{
              textAlign: "left",
              marginBottom: "3rem",
              padding: "2rem",
              display: "grid",
              gap: "1.5rem",
              borderLeft: "4px solid var(--accent-primary)"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--accent-primary)" }}><User size={24} /></div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>{t.contact.fullNameLabel}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>ELAOUZI Assaad</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--accent-primary)" }}><Mail size={24} /></div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>{t.contact.emailLabel}</div>
                <a href="mailto:elaouzi.assaadpro@gmail.com" style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)", transition: "color 0.3s" }}>elaouzi.assaadpro@gmail.com</a>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--accent-primary)" }}><Phone size={24} /></div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>{t.contact.phoneLabel}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>+212 645 609 313</div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ color: "var(--accent-primary)" }}><LocateIcon size={24} /></div>
              <div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>{t.contact.locationLabel}</div>
                <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>{t.contact.location}</div>
              </div>
            </div>
          </div>

          <Button />
        </section>
      </ScrollReveal>
      </main>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem",
          textAlign: "center",
          color: "var(--text-secondary)",
          fontSize: "0.9rem",
          fontFamily: "Outfit",
          zIndex: 10,
          position: "relative"
        }}
      >
        <p>{t.footer} &copy; {new Date().getFullYear()}</p>
      </footer>

      <style>{`
        .nav-link {
          position: relative;
          color: var(--text-primary);
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-text);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--accent-primary);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

export default App;
