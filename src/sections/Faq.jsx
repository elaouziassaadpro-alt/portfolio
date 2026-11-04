import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";

// Plain questions with self-contained answers: what people and AI assistants
// actually ask. The same items feed the FAQPage schema in scripts/prerender.mjs.
export default function Faq() {
  const { t } = useLanguage();

  return (
    <section id="faq" className="block">
      <SectionHeading index={5} label={t.nav.faq} title={t.faq.heading} />

      <div className="faq">
        {t.faq.items.map((item, i) => (
          <ScrollReveal key={item.q} delay={i * 0.05} className="faq-item glow-card">
            <h3 className="faq-question">{item.q}</h3>
            <p className="faq-answer">{item.a}</p>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
