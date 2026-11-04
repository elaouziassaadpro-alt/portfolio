import { ArrowUpRight, Check, Github, Lock } from "lucide-react";
import ScrollReveal from "../components/ScrollReveal";
import SectionHeading from "../components/SectionHeading";
import WorkflowSteps from "../components/WorkflowSteps";
import { useLanguage } from "../contexts/LanguageContext";
import { FEATURED_COUNT, projectMeta } from "../content";

function ProjectLinks({ links, labels }) {
  if (!links.live && !links.repo && !links.private) return null;

  return (
    <div className="case-links">
      {links.live && (
        <a href={links.live} target="_blank" rel="noopener noreferrer" className="text-link">
          {labels.live} <ArrowUpRight size={15} />
        </a>
      )}
      {links.repo && (
        <a href={links.repo} target="_blank" rel="noopener noreferrer" className="text-link">
          {labels.code} <Github size={15} />
        </a>
      )}
      {links.private && (
        <span className="case-private">
          <Lock size={14} /> {labels.private}
        </span>
      )}
    </div>
  );
}

function Tags({ tags, label }) {
  return (
    <ul className="tag-list" aria-label={label}>
      {tags.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  );
}

export default function Projects() {
  const { t } = useLanguage();
  const { labels, flow, items } = t.projects;
  const featured = items.slice(0, FEATURED_COUNT);
  const others = items.slice(FEATURED_COUNT);

  return (
    <section id="projects" className="block">
      <SectionHeading index={3} label={t.nav.projects} title={t.projects.heading} />

      <div className="cases">
        {featured.map((project, idx) => {
          const meta = projectMeta[idx];
          return (
            <ScrollReveal key={project.title}>
              <article className="case glow-card">
                <div className="case-aside">
                  <span className="case-index">{String(idx + 1).padStart(2, "0")}</span>
                  <p className="eyebrow">{project.sector}</p>
                  <p className="case-context">{project.context}</p>
                  <Tags tags={meta.tags} label={labels.stack} />
                </div>

                <div className="case-main">
                  <h3 className="case-title">{project.title}</h3>
                  {meta.image && (
                    <img className="case-image" src={meta.image} alt={project.title} loading="lazy" width="1200" height="750" />
                  )}
                  <p className="case-summary">{project.summary}</p>

                  {project.points.length > 0 && (
                    <>
                      <h4 className="case-label">{labels.built}</h4>
                      <ul className="checks">
                        {project.points.map((point) => (
                          <li key={point}>
                            <Check size={16} aria-hidden="true" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {meta.flow && <WorkflowSteps heading={flow.heading} steps={flow.steps} />}
                  <ProjectLinks links={meta.links} labels={labels} />
                </div>
              </article>
            </ScrollReveal>
          );
        })}
      </div>

      {others.length > 0 && (
        <>
          <h3 className="sub-heading">{t.projects.otherHeading}</h3>
          <ul className="others">
            {others.map((project, i) => {
              const meta = projectMeta[FEATURED_COUNT + i];
              return (
                <li key={project.title}>
                  <ScrollReveal delay={i * 0.06} className="other glow-card">
                    <p className="eyebrow">{project.sector}</p>
                    <h4 className="other-title">{project.title}</h4>
                    <p className="case-context">{project.context}</p>
                    <p className="other-text">{project.summary}</p>
                    <Tags tags={meta.tags} label={labels.stack} />
                    <ProjectLinks links={meta.links} labels={labels} />
                  </ScrollReveal>
                </li>
              );
            })}
          </ul>
        </>
      )}
    </section>
  );
}
