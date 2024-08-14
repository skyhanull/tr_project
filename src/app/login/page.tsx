"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { AiFillMessage } from "@react-icons/all-files/ai/AiFillMessage";
export default function Page() {
  const { data: session } = useSession();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // SSR 단계에서는 아무것도 렌더링하지 않음
  }
  return (
    <div>
      {!session ? (
        <div className="flex justify-center items-center h-screen">
          <div className="border-2 border-gray-300 px-28 py-32 rounded-2xl flex flex-col justify-center items-center space-y-4">
            <div className="flex justify-center pb-10 text-3xl">Login</div>
            <div>
              <button
                onClick={() =>
                  signIn("google", {
                    callbackUrl: "/",
                  })
                }
                className="bg-white text-blue-500 flex p-3 rounded hover:bg-blue-600 border-sky-300 border-2 w-60 justify-center items-center"
              >
                <Image
                  src={"/img/googleIcon.png"}
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="pl-5">구글 로그인</span>
              </button>
            </div>
            <button
              onClick={() =>
                signIn("kakao", {
                  callbackUrl: "/",
                })
              }
              className="bg-yellow-400 text-black p-3 rounded hover:bg-yellow-600 flex items-center justify-center  px-4 w-60"
            >
              <span className="pr-5">
                <AiFillMessage />
              </span>
              <span> 카카오 로그인</span>
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button onClick={() => signOut()}>Sign out</button>
        </div>
      )}
    </div>
  );
}
