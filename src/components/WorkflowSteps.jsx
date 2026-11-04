import { useState } from "react";

// Small interactive explainer: click a step to read what happens there.
export default function WorkflowSteps({ heading, steps }) {
  const [step, setStep] = useState(0);

  return (
    <div className="flow">
      <p className="flow-heading">{heading}</p>
      <ol className="flow-steps">
        {steps.map((s, i) => (
          <li key={s.title}>
            <button
              type="button"
              className={i === step ? "active" : i < step ? "done" : ""}
              aria-pressed={i === step}
              onClick={() => setStep(i)}
            >
              <span className="flow-num">{i + 1}</span>
              {s.title}
            </button>
          </li>
        ))}
      </ol>
      <div className="flow-track" aria-hidden="true">
        <span style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
      </div>
      <p className="flow-text" aria-live="polite">
        {steps[step].text}
      </p>
    </div>
  );
}
