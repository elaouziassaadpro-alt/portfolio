import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";
import { experienceTags } from "../content";

export default function Experience() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="block">
      <SectionHeading index={2} label={t.nav.experience} title={t.experience.title} />

      <ol className="timeline">
        {t.experience.items.map((item, idx) => (
          <li key={item.company} className="timeline-item">
            <ScrollReveal delay={idx * 0.05} className="timeline-inner">
              <p className="timeline-period">{item.period}</p>
              <div className="timeline-body">
                <h3 className="timeline-role">{item.role}</h3>
                <p className="timeline-company">{item.company}</p>
                <p className="timeline-text">{item.desc}</p>
                <ul className="tag-list">
                  {experienceTags[idx].map((tag) => (
                    <li key={tag} className="tag">
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
