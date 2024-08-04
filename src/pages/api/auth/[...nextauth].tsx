import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "이메일",
          type: "text",
          placeholder: "이메일 주소 입력 요망",
        },
        password: { label: "비밀번호", type: "password" },
      },

      async authorize(credentials, req) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: credentials?.username,
            password: credentials?.password,
          }),
        });
        const user = await res.json();
        console.log(user);

        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      // clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_KEY,
      // clientSecret: process.env.KAKAO_CLIENT_SECRET_KEY,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },

    async session({ session, token }) {
      session.user = token as any;
      return session;
    },
    async signIn({ user, account, profile }) {
      await dbConnect();
      const existingUser = await User.findOne({ email: user.email });

      if (existingUser) {
        // 기존 사용자 정보가 있는 경우, 필요에 따라 정보를 업데이트할 수 있습니다.
        existingUser.name = user.name;
        existingUser.image = user.image;
        await existingUser.save();
        return true;
      } else {
        // 새로운 사용자 정보가 없는 경우
        const newUser = new User({
          email: user.email,
          name: user.name,
          image: user.image,
          code: `${Math.random().toString(36).substr(2, 11)}`,
        });
        await newUser.save();
        return true;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl + "/share"; // 로그인 성공 후 리다이렉션 경로 설정
    },
  },
  // secret: process.env.AUTH_CLIENT_SECRET,
});
