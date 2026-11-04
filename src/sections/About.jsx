import { MapPin } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";
import { profile } from "../content";

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="block">
      <SectionHeading index={1} label={t.nav.about} title={t.about.title} />

      <div className="bento">
        <ScrollReveal className="bento-text glow-card">
          <p className="lead">{t.about.p1}</p>
          <p className="lead">{t.about.p2}</p>
        </ScrollReveal>

        <ScrollReveal className="bento-photo glow-card" delay={0.1}>
          <img src={profile.photo} alt={profile.name} width="383" height="566" loading="lazy" />
          <div className="bento-photo-caption">
            <span className="bento-photo-name">{profile.name}</span>
            <span className="bento-photo-place">
              <MapPin size={14} aria-hidden="true" /> {t.about.basedLabel} {t.contact.location}
            </span>
          </div>
        </ScrollReveal>

        <div className="bento-stats">
          {t.about.stats.map((stat, i) => (
            <ScrollReveal key={stat.label} className="bento-stat glow-card" delay={0.15 + i * 0.08}>
              <dl>
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </dl>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
