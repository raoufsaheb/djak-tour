/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENV: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_DEFAULT_LANGUAGE: string;
  readonly VITE_DEFAULT_CURRENCY: string;
  readonly VITE_ENABLE_KYC: string;
  readonly VITE_ENABLE_PAYMENTS: string;
  readonly VITE_ENABLE_NOTIFICATIONS: string;
  readonly VITE_TIMEZONE: string;
  readonly VITE_DATE_FORMAT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
