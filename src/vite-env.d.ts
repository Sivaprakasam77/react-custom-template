/// <reference types="vite/client" />

// ENV declaration
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_FIREBASE_API_KEY: string;
  readonly VITE_FIREBASE_AUTH_DOMAIN: string;
  readonly VITE_FIREBASE_PROJECT_ID: string;
  readonly VITE_FIREBASE_STORAGE_BUCKET: string;
  readonly VITE_FIREBASE_MESSAGING_SENDER_ID: string;
  readonly VITE_FIREBASE_APP_ID: string;
  readonly VITE_API_ENCRYPTION: string;
  readonly VITE_API_IP: string;
  readonly VITE_API_PORT: string;
  readonly VITE_ASSETS_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// Global types
interface children {
  children: React.ReactNode;
}

interface Window {
  accessToken: string;
}
