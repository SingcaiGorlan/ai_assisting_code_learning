declare global {
  interface Window {
    go: {
      main: {
        App: {
          Login(email: string, password: string): Promise<{ success: boolean; message: string; token?: string; user?: any }>;
          Register(username: string, email: string, password: string): Promise<{ success: boolean; message: string }>;
          GetLessons(): Promise<any[]>;
          GetLessonDetail(id: number): Promise<any>;
          CompleteLesson(id: number): Promise<any>;
          ChatWithAI(message: string): Promise<{ success: boolean; reply: string; message: string }>;
        };
      };
    };
  };
}

export {};