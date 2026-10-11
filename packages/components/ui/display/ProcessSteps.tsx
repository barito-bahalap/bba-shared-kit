// Style
import "./ProcessSteps.css";

export interface ProcessStep {
  title: string;
  description: string;
  output?: string;
}

export interface ProcessStepsProps {
  steps: ProcessStep[];
  className?: string;
}

export function ProcessSteps({ steps, className }: ProcessStepsProps) {
  return (
    <ol className={["process-steps", className].filter(Boolean).join(" ")}>
      {steps.map((step, index) => (
        <li className="process-steps__item" key={step.title}>
          <span className="process-steps__index" aria-hidden="true">
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="process-steps__body">
            <h3 className="process-steps__title">{step.title}</h3>
            <p className="process-steps__text">{step.description}</p>
            {step.output ? (
              <p className="process-steps__output">
                <span>Output</span> {step.output}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}
