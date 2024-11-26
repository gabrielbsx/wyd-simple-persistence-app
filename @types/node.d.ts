export declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;
      IMPORTS_FOLDER: string;
    }
  }
}
