// All visible text for <InquiryForm /> and the WhatsApp buttons, Indonesian and English.
// One copy of the strings means BBT, BBM and corporate can never drift apart.
// Option `value`s are stored as-is in intake.inquiries (service_interest, budget_range, timeline),
// so keep them stable; change the labels freely.

export type InquiryDivision = "bbt" | "bbm" | "partnership" | "general";
export type InquiryLocale = "id" | "en";

export interface Option {
  value: string;
  label: string;
}

export interface InquiryFormCopy {
  progress: (step: 1 | 2) => string;
  step1: {
    title: string;
    hint: string;
    next: string;
    divisions: Record<InquiryDivision, { title: string; description: string }>;
  };
  step2: {
    title: string;
    back: string;
    submit: string;
    submitting: string;
    verifying: string;
    optional: string;
  };
  fields: {
    name: string;
    email: string;
    whatsapp: string;
    whatsappHint: string;
    orgType: string;
    organization: string;
    serviceInterest: string;
    message: string;
    messageHint: string;
    budgetRange: string;
    timeline: string;
    choose: string;
  };
  orgTypes: Option[];
  services: Partial<Record<InquiryDivision, Option[]>>;
  budgets: Option[];
  timelines: Option[];
  consent: { before: string; link: string; after: string };
  success: {
    title: string;
    body: string;
    refLabel: string;
    copy: string;
    copied: string;
    commitment: string;
    again: string;
  };
  /** Keys are API error codes plus client-only form-level codes. */
  errors: Record<string, string>;
}

const id: InquiryFormCopy = {
  progress: (step) => `Langkah ${step} dari 2`,
  step1: {
    title: "Anda ingin berbicara dengan siapa?",
    hint: "Pilih satu agar permintaan Anda sampai ke tim yang tepat.",
    next: "Lanjut",
    divisions: {
      bbt: {
        title: "Teknologi",
        description: "Aplikasi web, dashboard, dan sistem internal.",
      },
      bbm: { title: "Media", description: "Dokumentasi dan produksi media." },
      partnership: {
        title: "Kemitraan",
        description: "Kolaborasi strategis dan program bersama.",
      },
      general: {
        title: "Pertanyaan umum",
        description: "Hal lain tentang perusahaan.",
      },
    },
  },
  step2: {
    title: "Ceritakan kebutuhan Anda",
    back: "Kembali",
    submit: "Kirim permintaan",
    submitting: "Mengirim…",
    verifying: "Memverifikasi…",
    optional: "opsional",
  },
  fields: {
    name: "Nama lengkap",
    email: "Email",
    whatsapp: "WhatsApp",
    whatsappHint: "Contoh: 0812 3456 7890",
    orgType: "Jenis organisasi",
    organization: "Nama organisasi",
    serviceInterest: "Kebutuhan utama",
    message: "Pesan",
    messageHint: "Jelaskan singkat tujuan, lingkup, dan target waktu Anda.",
    budgetRange: "Perkiraan anggaran",
    timeline: "Target waktu",
    choose: "Pilih…",
  },
  orgTypes: [
    { value: "government", label: "Instansi pemerintah" },
    { value: "bumn_bumd", label: "BUMN / BUMD" },
    { value: "corporate", label: "Perusahaan swasta" },
    { value: "public_figure", label: "Tokoh publik" },
    { value: "association", label: "Asosiasi / organisasi" },
    { value: "individual", label: "Perorangan" },
  ],
  services: {
    bbt: [
      { value: "web_app", label: "Aplikasi web / sistem" },
      { value: "dashboard", label: "Dashboard & integrasi data" },
      { value: "maintenance", label: "Pemeliharaan & retainer" },
      { value: "consulting", label: "Konsultasi IT" },
      { value: "other", label: "Lainnya" },
    ],
    bbm: [
      { value: "photo_video", label: "Foto & video" },
      { value: "content_production", label: "Produksi konten" },
      { value: "media_partnership", label: "Kerja sama media" },
      { value: "other", label: "Lainnya" },
    ],
    partnership: [
      { value: "strategic", label: "Kemitraan strategis" },
      { value: "joint_program", label: "Program bersama" },
      { value: "investment", label: "Investasi" },
      { value: "other", label: "Lainnya" },
    ],
  },
  budgets: [
    { value: "lt_25m", label: "Di bawah Rp 25 juta" },
    { value: "25_100m", label: "Rp 25–100 juta" },
    { value: "100_500m", label: "Rp 100–500 juta" },
    { value: "gt_500m", label: "Di atas Rp 500 juta" },
    { value: "undecided", label: "Belum ditentukan" },
  ],
  timelines: [
    { value: "asap", label: "Secepatnya" },
    { value: "1_3m", label: "1–3 bulan" },
    { value: "3_6m", label: "3–6 bulan" },
    { value: "flexible", label: "Fleksibel" },
  ],
  consent: {
    before:
      "Saya setuju data saya digunakan untuk menanggapi permintaan ini sesuai ",
    link: "Kebijakan Privasi",
    after: ".",
  },
  success: {
    title: "Permintaan Anda sudah terkirim",
    body: "Kami telah mengirim konfirmasi ke email Anda. Simpan nomor referensi ini bila perlu menghubungi kami.",
    refLabel: "Nomor referensi",
    copy: "Salin",
    copied: "Tersalin",
    commitment: "Kami menanggapi dalam 24 jam.",
    again: "Kirim permintaan lain",
  },
  errors: {
    required: "Wajib diisi.",
    too_short: "Terlalu pendek.",
    too_long: "Terlalu panjang.",
    invalid: "Isian tidak valid.",
    unexpected_field: "Isian tidak valid.",
    invalid_email: "Masukkan alamat email yang valid.",
    invalid_whatsapp:
      "Masukkan nomor WhatsApp yang valid, misalnya 0812 3456 7890.",
    invalid_division: "Pilih salah satu.",
    invalid_org_type: "Pilih jenis organisasi.",
    invalid_locale: "Isian tidak valid.",
    too_many_links: "Pesan memuat terlalu banyak tautan. Kurangi hingga 3.",
    consent_required: "Centang persetujuan agar kami dapat menanggapi.",
    captcha_required: "Tunggu verifikasi keamanan selesai, lalu coba lagi.",
    captcha_failed: "Verifikasi keamanan gagal. Silakan coba lagi.",
    captcha_load:
      "Verifikasi keamanan tidak dapat dimuat. Nonaktifkan pemblokir iklan atau hubungi kami lewat WhatsApp.",
    rate_limited: "Terlalu banyak percobaan. Silakan coba lagi nanti.",
    unavailable:
      "Layanan sedang tidak tersedia. Silakan coba lagi sebentar lagi.",
    network: "Tidak dapat terhubung. Periksa koneksi Anda lalu coba lagi.",
    server: "Terjadi kesalahan di sisi kami. Silakan coba lagi sebentar lagi.",
  },
};

const en: InquiryFormCopy = {
  progress: (step) => `Step ${step} of 2`,
  step1: {
    title: "Who would you like to talk to?",
    hint: "Pick one so your inquiry reaches the right team.",
    next: "Continue",
    divisions: {
      bbt: {
        title: "Technology",
        description: "Web apps, dashboards and internal systems.",
      },
      bbm: {
        title: "Media",
        description: "Documentation and media production.",
      },
      partnership: {
        title: "Partnership",
        description: "Strategic collaboration and joint programs.",
      },
      general: {
        title: "General question",
        description: "Anything else about the company.",
      },
    },
  },
  step2: {
    title: "Tell us what you need",
    back: "Back",
    submit: "Send inquiry",
    submitting: "Sending…",
    verifying: "Verifying…",
    optional: "optional",
  },
  fields: {
    name: "Full name",
    email: "Email",
    whatsapp: "WhatsApp",
    whatsappHint: "Example: +62 812 3456 7890",
    orgType: "Organization type",
    organization: "Organization name",
    serviceInterest: "Main need",
    message: "Message",
    messageHint: "Briefly describe your goal, scope and timeline.",
    budgetRange: "Estimated budget",
    timeline: "Target timeline",
    choose: "Choose…",
  },
  orgTypes: [
    { value: "government", label: "Government agency" },
    { value: "bumn_bumd", label: "State-owned enterprise (BUMN / BUMD)" },
    { value: "corporate", label: "Private company" },
    { value: "public_figure", label: "Public figure" },
    { value: "association", label: "Association / organization" },
    { value: "individual", label: "Individual" },
  ],
  services: {
    bbt: [
      { value: "web_app", label: "Web app / system" },
      { value: "dashboard", label: "Dashboard & data integration" },
      { value: "maintenance", label: "Maintenance & retainer" },
      { value: "consulting", label: "IT consulting" },
      { value: "other", label: "Other" },
    ],
    bbm: [
      { value: "photo_video", label: "Photo & video" },
      { value: "content_production", label: "Content production" },
      { value: "media_partnership", label: "Media partnership" },
      { value: "other", label: "Other" },
    ],
    partnership: [
      { value: "strategic", label: "Strategic partnership" },
      { value: "joint_program", label: "Joint program" },
      { value: "investment", label: "Investment" },
      { value: "other", label: "Other" },
    ],
  },
  budgets: [
    { value: "lt_25m", label: "Under IDR 25 million" },
    { value: "25_100m", label: "IDR 25–100 million" },
    { value: "100_500m", label: "IDR 100–500 million" },
    { value: "gt_500m", label: "Over IDR 500 million" },
    { value: "undecided", label: "Not decided yet" },
  ],
  timelines: [
    { value: "asap", label: "As soon as possible" },
    { value: "1_3m", label: "1–3 months" },
    { value: "3_6m", label: "3–6 months" },
    { value: "flexible", label: "Flexible" },
  ],
  consent: {
    before:
      "I agree my details may be used to respond to this inquiry, as described in the ",
    link: "Privacy Policy",
    after: ".",
  },
  success: {
    title: "Your inquiry has been sent",
    body: "We have emailed you a confirmation. Keep this reference number if you need to contact us.",
    refLabel: "Reference number",
    copy: "Copy",
    copied: "Copied",
    commitment: "We respond within 24 hours.",
    again: "Send another inquiry",
  },
  errors: {
    required: "This field is required.",
    too_short: "Too short.",
    too_long: "Too long.",
    invalid: "This value is not valid.",
    unexpected_field: "This value is not valid.",
    invalid_email: "Enter a valid email address.",
    invalid_whatsapp:
      "Enter a valid WhatsApp number, for example +62 812 3456 7890.",
    invalid_division: "Please choose one.",
    invalid_org_type: "Please choose an organization type.",
    invalid_locale: "This value is not valid.",
    too_many_links: "The message contains too many links. Please keep it to 3.",
    consent_required: "Please tick the consent box so we can respond.",
    captcha_required: "Wait for the security check to finish, then try again.",
    captcha_failed: "The security check failed. Please try again.",
    captcha_load:
      "The security check could not load. Disable your ad blocker or contact us on WhatsApp.",
    rate_limited: "Too many attempts. Please try again later.",
    unavailable:
      "The service is temporarily unavailable. Please try again shortly.",
    network: "Could not connect. Check your connection and try again.",
    server: "Something went wrong on our side. Please try again shortly.",
  },
};

export const inquiryCopy: Record<InquiryLocale, InquiryFormCopy> = { id, en };

/** Division-specific click-to-chat labels and prefilled messages. */
export const whatsappCopy: Record<
  InquiryLocale,
  {
    label: Record<InquiryDivision, string>;
    message: Record<InquiryDivision, string>;
  }
> = {
  id: {
    label: {
      bbt: "Chat tim Teknologi",
      bbm: "Chat tim Media",
      partnership: "Chat soal kemitraan",
      general: "Chat lewat WhatsApp",
    },
    message: {
      bbt: "Halo Barito Bahalap Technology, saya ingin berdiskusi tentang kebutuhan teknologi kami.",
      bbm: "Halo Barito Bahalap Media, saya ingin berdiskusi tentang kebutuhan media kami.",
      partnership:
        "Halo Barito Bahalap Agency, saya ingin membahas peluang kemitraan.",
      general: "Halo Barito Bahalap Agency, saya ingin bertanya.",
    },
  },
  en: {
    label: {
      bbt: "Chat with Technology",
      bbm: "Chat with Media",
      partnership: "Chat about partnerships",
      general: "Chat on WhatsApp",
    },
    message: {
      bbt: "Hello Barito Bahalap Technology, I'd like to discuss our technology needs.",
      bbm: "Hello Barito Bahalap Media, I'd like to discuss our media needs.",
      partnership:
        "Hello Barito Bahalap Agency, I'd like to discuss a partnership.",
      general: "Hello Barito Bahalap Agency, I have a question.",
    },
  },
};
