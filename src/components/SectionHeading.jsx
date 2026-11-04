import ScrollReveal from "./ScrollReveal";

// "01 — Label" eyebrow over a large serif title whose last word is set in
// accent italic.
export default function SectionHeading({ index, label, title, align = "left" }) {
  const words = title.split(" ");
  const last = words.pop();

  return (
    <ScrollReveal className={`section-heading section-heading-${align}`}>
      <p className="section-label">
        <span className="section-index">{String(index).padStart(2, "0")}</span>
        <span className="section-rule" aria-hidden="true" />
        {label}
      </p>
      <h2 className="section-title">
        {words.join(" ")} <em>{last}</em>
      </h2>
    </ScrollReveal>
  );
}
