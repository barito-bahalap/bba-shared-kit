// Style
import "./LegalDocument.css";
// Components
import { Section, SectionHeader } from "@barito-bahalap/components";

export interface LegalSectionData {
  id: string;
  heading: string;
  paragraphs?: string[];
  items?: string[];
}

interface LegalDocumentProps {
  title: string;
  updated: string;
  intro?: string;
  sections: LegalSectionData[];
}

export function LegalDocument({
  title,
  updated,
  intro,
  sections,
}: LegalDocumentProps) {
  return (
    <Section width="narrow" tone="canvas" labelledBy="legal-title">
      <SectionHeader as="h1" id="legal-title" title={title} intro={intro} />
      <p className="legal__updated">Last updated: {updated}</p>

      <nav className="legal__toc" aria-label="Contents">
        <ol>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="legal__body">
        {sections.map((section) => (
          <article key={section.id} id={section.id} className="legal__block">
            <h2 className="legal__heading">{section.heading}</h2>
            {section.paragraphs?.map((text) => (
              <p key={text}>{text}</p>
            ))}
            {section.items && (
              <ul>
                {section.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>
    </Section>
  );
}
