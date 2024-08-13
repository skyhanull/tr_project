// // lib/auth.js
// import { getSession } from "next-auth/react";

// const protect = async (req, res, next) => {
//   const session = await getSession({ req });

//   if (!session) {
//     return res.status(401).json({ success: false, message: "Not authorized" });
//   }

//   req.user = session.user;
//   next();
// };

// export default protect;
// import { NextApiRequest, NextApiResponse } from "next";
// import { getSession } from "next-auth/react";
// import { getToken } from "next-auth/jwt";

// const protect = (
//   handler: (req: NextApiRequest, res: NextApiResponse) => void
// ) => {
//   return async (req: NextApiRequest, res: NextApiResponse) => {
//     const session = await getSession({ req });
//     const token = await getToken({ req: request, secret: process.env.SECRET });
//     console.log("token", token); // log를 확인
//     console.log(session);
//     if (!session) {
//       return res
//         .status(401)
//         .json({ success: false, message: "Not authorized" });
//     }

//     req.user = session.user;
//     return handler(req, res);
//   };
// };

// export default protect;
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { getToken } from "next-auth/jwt";

type CustomNextApiRequest = NextApiRequest & {
  user?: any; // 필요한 사용자 타입으로 변경 가능
};

const protect = (
  handler: (req: CustomNextApiRequest, res: NextApiResponse) => void
) => {
  return async (req: CustomNextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req });
    const token = await getToken({
      req,
      secret: process.env.AUTH_CLIENT_SECRET,
    });

    // if (!token) {
    //   return res.status(401).json({ success: false, message: token });
    // }
    if (token) {
      return res.status(200).json({ success: false, message: token });
    }

    // req.user = session.user;
    return handler(req, res);
  };
};

export default protect;
