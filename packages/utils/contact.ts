import { buildGoogleMapsUrl, buildWhatsAppLink } from "./links";
import { openExternalLink } from "./links";
import type { ContactInfo, WhatsAppContact } from "@ampikalteng/types";

const FULL_ADDRESS = "Jl. Imam Bonjol No. 1, Palangkaraya, Kalimantan Tengah";
const EMAIL_URL =
  "https://mail.google.com/mail/u/0/?to=ampi.kalteng@gmail.com&fs=1&tf=cm";

// Single source of truth for both numbers.
export const WHATSAPP_CONTACTS: readonly WhatsAppContact[] = [
  {
    key: "sekretariat",
    label: "Sekretariat Umum",
    number: "6282153227406",
    display: "+62 821 5322 7406",
  },
  {
    key: "kemitraan",
    label: "Kemitraan",
    number: "6282153227406",
    display: "+62 821 5322 7406",
  },
] as const;

export const CONTACT_INFO: readonly ContactInfo[] = [
  {
    key: "phone",
    iconName: "whatsapp",
    content: WHATSAPP_CONTACTS.map((c) => c.display),
    onClick: () =>
      openExternalLink(
        buildWhatsAppLink(
          "Halo, saya ingin bertanya mengenai AMPI Kalimantan Tengah.",
        ),
      ),
  },
  {
    key: "email",
    iconName: "envelope",
    content: "ampi.kalteng@gmail.com",
    onClick: () => openExternalLink(EMAIL_URL),
  },
  {
    key: "address",
    iconName: "geoAltFill",
    content: ["Jl. Imam Bonjol No. 1", "Palangka Raya, Kalimantan Tengah"],
    onClick: () => openExternalLink(buildGoogleMapsUrl(FULL_ADDRESS)),
  },
] as const;
