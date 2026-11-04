import { useEffect, useRef, useState } from "react";
import { Check, Copy } from "lucide-react";

const RESET_MS = 1800;

// Email address with a one-click copy button that confirms in place.
export default function CopyEmail({ email, copyLabel, copiedLabel }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), RESET_MS);
    } catch {
      // Clipboard blocked (insecure context, permissions) — open the mail app instead.
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="email-row">
      <a href={`mailto:${email}`} className="email-link">
        {email}
      </a>
      <button type="button" className="copy-btn" onClick={copy} data-copied={copied}>
        {copied ? <Check size={16} /> : <Copy size={16} />}
        <span aria-live="polite">{copied ? copiedLabel : copyLabel}</span>
      </button>
    </div>
  );
}
