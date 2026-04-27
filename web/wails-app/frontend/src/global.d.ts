declare global {
  interface Window {
    go: {
      main: {
        App: {
          GetAppVersion: () => Promise<string>;
          Login: (username: string, password: string) => Promise<any>;
          Register: (username: string, email: string, password: string) => Promise<any>;
          GetLessons: () => Promise<any[]>;
          ChatWithAI: (message: string) => Promise<any>;
          CodeAssist: (code: string, question: string) => Promise<any>;
          OpenExternalLink: (url: string) => Promise<void>;
        }
      }
    }
  }
}

export {};