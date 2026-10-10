// Style
import "./Accordion.css";

export interface AccordionItem {
  question: string;
  answer: string;
}

export interface AccordionProps {
  items: AccordionItem[];
  className?: string;
}

export function Accordion({ items, className }: AccordionProps) {
  return (
    <div className={["accordion", className].filter(Boolean).join(" ")}>
      {items.map((item) => (
        <details className="accordion__item" key={item.question}>
          <summary className="accordion__summary">{item.question}</summary>
          <p className="accordion__answer">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
