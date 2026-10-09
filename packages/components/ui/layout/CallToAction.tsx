// Style
import "./CallToAction.css";
// Components
import { Button, Section, SectionHeader } from "@baritobahalap/components";

interface CtaAction {
  label: string;
  href: string;
}

interface CallToActionProps {
  title: string;
  body: string;
  primary: CtaAction;
  secondary?: CtaAction;
  id?: string;
}

export function CallToAction({
  title,
  body,
  primary,
  secondary,
  id,
}: CallToActionProps) {
  return (
    <Section tone="dark" width="narrow" id={id} labelledBy="cta-title">
      <div className="cta">
        <SectionHeader title={title} intro={body} id="cta-title" onDark />
        <div className="cta__actions">
          <Button variant="light" href={primary.href}>
            {primary.label}
          </Button>
          {secondary && (
            <Button variant="outline-light" href={secondary.href}>
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </Section>
  );
}
