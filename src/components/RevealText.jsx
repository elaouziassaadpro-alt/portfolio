// Letters rise out of a mask, one after another. Plain CSS so the name animates
// from the pre-rendered HTML, without waiting for JavaScript. Screen readers get
// the text through the parent's aria-label.
export default function RevealText({ text, delay = 0, className = "" }) {
  return (
    <span className={`reveal-word ${className}`} aria-hidden="true">
      {[...text].map((char, i) => (
        <span key={i} className="reveal-char" style={{ animationDelay: `${delay + i * 0.04}s` }}>
          {char}
        </span>
      ))}
    </span>
  );
}
