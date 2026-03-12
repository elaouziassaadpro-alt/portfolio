import React, { useState, useEffect } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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
            <a href="#vision" className="nav-link">Vision</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
        </div>
      </nav>
  )
}