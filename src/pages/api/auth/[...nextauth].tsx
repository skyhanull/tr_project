import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from "../../../lib/mongodb";
import User from "../../../models/User";

export default NextAuth({
  providers: [
    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     // username: {
    //     //   label: "이메일",
    //     //   type: "text",
    //     //   placeholder: "이메일 주소 입력 요망",
    //     // },
    //     // password: { label: "비밀번호", type: "password" },
    //   },

    //   async authorize(credentials, req) {
    //     const res = await fetch(`${process.env.AUTH_URL}/api/login`, {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       // body: JSON.stringify({
    //       //   username: credentials?.username,
    //       //   password: credentials?.password,
    //       // }),
    //     });
    //     const user = await res.json();

    //     if (user) {
    //       // Any object returned will be saved in `user` property of the JWT
    //       return user;
    //     } else {
    //       // If you return null then an error will be displayed advising the user to check their details.
    //       return null;

    //       // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
    //     }
    //   },
    // }),
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
    // async jwt({ token, user }) {
    //   console.log("JWT Callback - user:", user);
    //   console.log("JWT Callback - token before:", token);
    //   if (user) {
    //     token.id = user.id; // 예를 들어, 사용자 ID와 같은 필요한 정보만 저장
    //     token.email = user.email;
    //     token.name = user.name;
    //     token.iat = user.iat; // 예를 들어, 사용자 ID와 같은 필요한 정보만 저장
    //     token.exp = user.exp;
    //     token.sub = user.sub;
    //     // jti는 저장하지 않음
    //   }
    //   return token;
    // },
    // async session({ session, token }) {
    //   session.user = token as any;
    //   return session;
    // },

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

    // async redirect({ url, baseUrl }) {
    //   return baseUrl + "/share"; // 로그인 성공 후 리다이렉션 경로 설정
    // },
  },
  secret: process.env.AUTH_CLIENT_SECRET,
});
