import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET_ID as string,
    }),
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_KEY as string,
      clientSecret: process.env.KAKAO_CLIENT_SECRET_KEY as string,
    }),
  ],
  // session: {
  //   strategy: "jwt",
  //   // Seconds - How long until an idle ses
  //   maxAge: 60 * 60 * 24 * 30, // 30 days
  // },
  session: {
    strategy: "jwt", // JWT 기반의 세션 전략 사용
    maxAge: 60 * 60 * 24 * 30, // 30일 동안 토큰 유효
  },
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    async jwt({ token, account, profile, user }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        // token.id = profile.id
        if (user) {
          token.id = user.id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      await dbConnect();
      const dbUser = await User.findById(token.id);
      if (dbUser) {
        session.user.code = dbUser.code;
      }
      return session;
    },

    async signIn({ user, account, profile }) {
      try {
        await dbConnect();
        const existingUser = await User.findOne({ email: user.email });

        if (existingUser) {
          existingUser.name = user.name;
          existingUser.image = user.image;
          await existingUser.save();
          user.id = existingUser._id;
        } else {
          const newUser = new User({
            email: user.email,
            name: user.name,
            image: user.image,
            code: `${Math.random().toString(36).substr(2, 11)}`,
          });
          await newUser.save();
          user.id = newUser._id;
        }
        return true;
      } catch (error) {
        console.error("SignIn Callback Error:", error);
        return false;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});
