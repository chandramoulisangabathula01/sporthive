interface ImportMetaEnv {
    VITE_GEMINI_API_KEY: any;
    VITE_GEMINI_ENDPOINT: any;
    readonly VITE_API_ENDPOINT: string;
    // Add other environment variables here
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }