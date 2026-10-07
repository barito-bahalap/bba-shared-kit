/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  readonly VITE_CONTACT_EMAIL?: string;
  readonly VITE_BBT_URL?: string;
  readonly VITE_BBM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
