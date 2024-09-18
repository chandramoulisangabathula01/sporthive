// src/global.d.ts

declare global {
    interface Window {
      Sentry: {
        captureException: (error: any) => void;
      };
    }
  }
  
  export {};
  