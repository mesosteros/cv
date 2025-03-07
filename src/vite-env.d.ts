interface ImportMetaEnv {
  readonly VITE_CONTENTFUL_ACCESS_TOKEN: string;
  // Add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
