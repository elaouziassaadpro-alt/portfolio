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

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen">
      <FollowCursor color="#3b82f6" />
      <NeuralGlow />

      {/* Navigation */}
      <nav
        style={{
          position: "fixed",
          width: "100%",
          padding: "20px 0",
          zIndex: 100,
          background: scrolled ? "var(--surface-color)" : "transparent",
          backdropFilter: scrolled ? "var(--glass-blur)" : "none",
          borderBottom: scrolled ? "1px solid var(--border-color)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 20px",
          }}
        >
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "800",
              fontFamily: "Outfit",
            }}
          >
            <span className="gradient-text"><img src="/logo.png" alt="logo" style={{ width: "50px", height: "50px" }} /></span>
          </div>
          <div style={{ display: "flex", gap: "2rem", fontWeight: "500", fontSize: "0.95rem" }}>
            <a href="#about" className="nav-link">About</a>
            <a href="#experience" className="nav-link">Experience</a>
            <a href="#projects" className="nav-link">Projects</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>

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
              IT Generalist & <br/><span className="gradient-text">Laravel Developer</span>
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
              I specialize in designing and building secure, scalable backend systems 
              and modern enterprise web applications. My work bridges the gap between 
              robust IT infrastructure and high-performance software solutions.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#projects" className="btn-premium">
                View Enterprise Projects
              </a>
              <a
                href="#contact"
                className="btn-premium"
                style={{ background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--border-color)" }}
              >
                Contact Me <Mail size={18} />
              </a>
            </div>
            
            <div style={{ display: "flex", gap: "1.5rem", marginTop: "3rem" }}>
              <a
                href="#"
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
                href="#"
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
            <GlobeDemo />
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
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              color: "var(--accent-primary)",
              fontFamily: "Inter",
            }}
          >
            01.
          </span>
          About Me & Core Skills
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "4rem",
            alignItems: "start",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginBottom: "1rem",
                lineHeight: "1.8",
              }}
            >
              I am an IT Generalist with a strong specialization in Laravel development and enterprise web applications. My professional journey revolves around solving complex architectural challenges, ensuring seamless system operations, and delivering robust full-stack solutions.
            </p>
            <p
              style={{
                fontSize: "1.1rem",
                color: "var(--text-secondary)",
                marginBottom: "2rem",
                lineHeight: "1.8",
              }}
            >
              My work focuses heavily on developing secure backend systems, integrating complex databases, and maintaining compliance across financial and industrial platforms. Having a broad IT background allows me to manage the full lifecycle of an application—from infrastructure and system administration to deploying modern React interfaces.
            </p>

            <h3
              style={{
                fontSize: "1.2rem",
                marginBottom: "1.5rem",
                color: "var(--text-primary)",
                fontFamily: "Outfit",
              }}
            >
              Core Expertise & Technologies:
            </h3>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.8rem", marginBottom: "2rem" }}>
              {["Laravel", "PHP", "MySQL", "Livewire", "React.js", "Docker","Database Architecture"].map((tech) => (
                <span key={tech} style={{
                  padding: "0.5rem 1rem",
                  background: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: "20px",
                  color: "var(--accent-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="glass-card animate-float"
            style={{
              position: "relative",
              height: "400px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.05))",
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", opacity: 0.8 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <Server size={60} color="var(--accent-primary)" />
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Backend Arch</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <Cpu size={60} color="var(--accent-secondary)" />
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>IT Infrastructure</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <Database size={60} color="var(--text-primary)" />
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Database Design</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
                <Layers size={60} color="var(--accent-primary)" />
                <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Full-Stack</span>
              </div>
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
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section" style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              color: "var(--accent-primary)",
              fontFamily: "Inter",
            }}
          >
            02.
          </span>
          Professional Experience
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {[
            {
              title: "KYC & Compliance Platform Development",
              desc: "Developed a secure, scalable KYC compliance platform for a financial company, ensuring strict adherence to regulatory standards while also managing core IT infrastructure and system administration tasks",
              icon: <ShieldCheck size={28} color="var(--accent-primary)" />
            },
            {
              title: "Laboratory Management System",
              desc: "Engineered robust industrial systems to connect manufacturing factories directly with analytical laboratories for seamless data flow.",
              icon: <Activity size={28} color="var(--accent-secondary)" />
            },
            {
              title: "Project Evaluation & Monitoring Platform",
              desc: "Built a fully-fledged tracking platform designed to evaluate active projects and monitor continuous deployments.",
              icon: <Terminal size={28} color="var(--accent-primary)" />
            },
            {
              title: "Front-End application",
              desc: "Created modern React.js interfaces for enterprise web applications, including a tourist guide web platform developed using React.js and Firebase.",
              icon: <Plane size={28} color="var(--accent-secondary)" />
            }
          ].map((item, idx) => (
             <div key={idx} className="glass-card" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start", padding: "1.5rem 2rem" }}>
               <div style={{ padding: "1rem", background: "rgba(59, 130, 246, 0.1)", borderRadius: "12px" }}>
                 {item.icon}
               </div>
               <div>
                 <h3 style={{ fontSize: "1.3rem", marginBottom: "0.5rem", color: "var(--text-primary)" }}>{item.title}</h3>
                 <p style={{ color: "var(--text-secondary)", lineHeight: "1.6" }}>{item.desc}</p>
               </div>
             </div>
          ))}
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="section"
        style={{ paddingTop: "100px", zIndex: 10, position: "relative" }}
      >
        <h2
          style={{
            fontSize: "2.5rem",
            marginBottom: "3rem",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <span
            style={{
              fontSize: "1rem",
              color: "var(--accent-primary)",
              fontFamily: "Inter",
            }}
          >
            03.
          </span>
          Featured Enterprise Systems
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
          <div
            className="glass-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr",
              gap: "2rem",
              padding: "0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                background: "var(--surface-color)",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShieldCheck
                size={80}
                color="var(--text-secondary)"
                opacity={0.3}
              />
            </div>
            <div
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  color: "var(--accent-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  letterSpacing: "1px",
                }}
              >
                Financial Sector
              </span>
              <h3 style={{ fontSize: "1.8rem", margin: "0.5rem 0 1rem 0" }}>
                Enterprise KYC Platform
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  zIndex: 2,
                  marginLeft: "-50px",
                  backdropFilter: "blur(10px)",
                }}
              >
                A highly secure platform engineered for a financial company to manage 
                complex KYC (Know Your Customer) operations. It ensures critical 
                regulatory compliance, secure data storage, and efficient user verification workflows.
              </p>
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
                <span>Laravel</span>
                <span>PHP</span>
                <span>Livewire</span>
                <span>MySQL</span>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="#" style={{ color: "var(--text-primary)" }}>
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
          </div>

          <div
            className="glass-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.2fr",
              gap: "2rem",
              padding: "0",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                padding: "2rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
              }}
            >
              <span
                style={{
                  color: "var(--accent-primary)",
                  fontSize: "0.9rem",
                  fontWeight: "bold",
                  fontFamily: "Outfit",
                  letterSpacing: "1px",
                }}
              >
                Industrial Sector
              </span>
              <h3 style={{ fontSize: "1.8rem", margin: "0.5rem 0 1rem 0" }}>
                Laboratory Management System
              </h3>
              <p
                style={{
                  color: "var(--text-secondary)",
                  marginBottom: "1.5rem",
                  backgroundColor: "rgba(15, 23, 42, 0.6)",
                  padding: "1.5rem",
                  borderRadius: "8px",
                  zIndex: 2,
                  marginRight: "-50px",
                  backdropFilter: "blur(10px)",
                }}
              >
                An integrated system bridging the gap between manufacturing factories 
                and analytical laboratories. Providing real-time monitoring, streamlined 
                reporting capabilities, and centralized system administration.
              </p>
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
                <span>Laravel</span>
                <span>React.js</span>
                <span>Docker</span>
              </div>
              <div style={{ display: "flex", gap: "1rem" }}>
                <a href="#" style={{ color: "var(--text-primary)" }}>
                  <ExternalLink size={20} />
                </a>
              </div>
            </div>
            <div
              style={{
                background: "var(--surface-color)",
                minHeight: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Activity size={80} color="var(--text-secondary)" opacity={0.3} />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
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
        <h2
          style={{
            fontSize: "1rem",
            color: "var(--accent-primary)",
            fontFamily: "Inter",
            marginBottom: "1rem",
          }}
        >
          04. What's Next?
        </h2>
        <h3 style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>
          Get In Touch
        </h3>
        <p
          style={{
            color: "var(--text-secondary)",
            fontSize: "1.1rem",
            marginBottom: "3rem",
            lineHeight: "1.8",
          }}
        >
          Whether you need to architect a new enterprise backend, streamline your IT infrastructure, or discuss scalable web applications, my inbox is always open. Let's build something robust together.
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
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Full Name</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>ELAOUZI Assaad</div>
            </div>
          </div>
          
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ color: "var(--accent-primary)" }}><Mail size={24} /></div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Email Address</div>
              <a href="mailto:elaouzi.assaadpro@gmail.com" style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)", transition: "color 0.3s" }}>elaouzi.assaadpro@gmail.com</a>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ color: "var(--accent-primary)" }}><Phone size={24} /></div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Phone Number</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>+212 645609313</div>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <div style={{ color: "var(--accent-primary)" }}><LocateIcon size={24} /></div>
            <div>
              <div style={{ fontSize: "0.8rem", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "1px" }}>Location</div>
              <div style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)" }}>Casablanca-Rabat</div>
            </div>
          </div>
        </div>

        <Button />
      </section>

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
        <p>Architected by Assaad Elaouzi &copy; {new Date().getFullYear()}</p>
      </footer>

      <style>{`
        .nav-link {
          position: relative;
          color: var(--text-primary);
          padding: 0.5rem 0;
          transition: color 0.3s ease;
        }
        .nav-link:hover {
          color: var(--accent-primary);
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
