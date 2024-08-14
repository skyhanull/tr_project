import NextAuth from "next-auth";

declare module "next-auth" {
  // Session 인터페이스 확장
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      code?: string | null; // `code` 속성을 추가합니다.
    };
  }

  // User 인터페이스 확장
  interface User {
    id: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
    code?: string | null; // `code` 속성을 추가합니다.
  }
}
