// Style
import "./CTABand.css";
// Components
import { Button } from "@ampikalteng/components";
// Utils
import { buildWhatsAppLink } from "@ampikalteng/utils";

type CTABandProps = {
  heading: string;
  body: string;
  primaryCta: { label: string; to: string };
  secondaryCta?: { label: string };
  whatsAppMessage?: string;
};

export function CTABand({
  heading,
  body,
  primaryCta,
  secondaryCta,
  whatsAppMessage = "Halo, saya ingin bertanya tentang pendaftaran mitra AMPI Kalimantan Tengah.",
}: CTABandProps) {
  return (
    <section className="cta-band padded md stack col center gap-4">
      <h2 className="cta-band__title text on-dark heading">{heading}</h2>
      <p className="cta-band__subtitle text on-dark soft">{body}</p>

      <div className="cta-band__actions stack row center-start gap-3">
        <Button label={primaryCta.label} to={primaryCta.to} />

        {secondaryCta && (
          <Button
            label={secondaryCta.label}
            href={buildWhatsAppLink(whatsAppMessage)}
            variant="outline"
          />
        )}
      </div>
    </section>
  );
}
