import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";

export default function Exploring() {
  const { t } = useLanguage();

  return (
    <section id="exploring" className="block">
      <SectionHeading index={4} label={t.nav.exploring} title={t.exploring.heading} />

      <ScrollReveal className="note glow-card">
        <p className="lead">{t.exploring.p1}</p>
        <ul className="tag-list">
          {t.exploring.tags.map((tag) => (
            <li key={tag} className="tag">
              {tag}
            </li>
          ))}
        </ul>
      </ScrollReveal>
    </section>
  );
}
