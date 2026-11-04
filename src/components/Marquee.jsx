// Endless strip of technologies. The list is rendered twice and slid by
// -50% so the loop is seamless; the copy is hidden from screen readers.
export default function Marquee({ items, label }) {
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee-track">
        {[0, 1].map((copy) => (
          <ul key={copy} className="marquee-group" aria-hidden={copy === 1}>
            {items.map((item) => (
              <li key={item}>
                {item}
                <span className="marquee-sep" aria-hidden="true">
                  ✦
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
