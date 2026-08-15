declare module "nuxt/schema" {
  interface AppConfig {
    appName: string;
    contactEmail: string;
    contactPhone: string;
    ui: {
      colors: {
        primary: string;
        neutral: string;
      };
    };
    icon: {
      mode: string;
      cssLayer: string;
    };
  }
}

// It is always important to ensure you import/export something when augmenting a type
export {};
