export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      IMPORTS_FOLDER: string;
      ENV: string;
      BASIC_AUTH_USERNAME: string;
      BASIC_AUTH_PASSWORD: string;
    }
  }
}
