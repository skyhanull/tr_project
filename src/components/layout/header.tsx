"use client";
import Image from "next/image";
import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiMapPin2Fill } from "@react-icons/all-files/ri/RiMapPin2Fill";
import {
  IoIosArrowDown,
  IoIosArrowForward,
  IoIosArrowUp,
} from "react-icons/io";
const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const RouteHanlder = (route: string) => {
    router.push(`${route}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white  z-10 flex flex-row justify-between px-16">
      <div
        className="flex items-center space-x-2 justify-center"
        onClick={() => RouteHanlder("/")}
      >
        <RiMapPin2Fill size={30} className="text-Highlight_Rose" />
        <Image
          src="/img/Pide.png"
          alt="Logo"
          width="0"
          height="0"
          sizes="10vw"
          style={{ width: "40%", height: "auto" }}
          priority
        />
      </div>

      <div className="flex items-center space-x-4">
        {session ? (
          <span
            className="text-xl p-7 hover:bg-slate-200 hover:rounded-2xl"
            onClick={() => RouteHanlder("/share")}
          >
            게시글
          </span>
        ) : null}
        {session ? (
          <span className="text-xl p-7 space-x-2 ">
            <span
              onClick={() => setIsOpen(!isOpen)}
              className=" flex items-center"
            >
              <Avatar
                alt="Remy Sharp"
                src={session.user?.image as string}
                className="h-5 w-5 mr-2"
              />

              {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
            </span>
          </span>
        ) : (
          <span className="text-xl p-7" onClick={() => RouteHanlder("/login")}>
            Login
          </span>
        )}
      </div>
      {isOpen && (
        <div className="absolute top-20 justify-end right-24 border-2 border-slate-200 p-5 rounded-2xl w-44 bg-white">
          <div
            className="flex items-center justify-between"
            // onClick={handleMyPageClick}
            onClick={() => RouteHanlder("/mypage")}
          >
            마이페이지 <IoIosArrowForward />
          </div>
          <div className="border-2 border-gray-200 mt-3 mb-3"></div>
          <div onClick={() => signOut({ callbackUrl: "/" })}>로그아웃</div>
        </div>
      )}
    </header>
  );
};

export default Header;
