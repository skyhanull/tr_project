"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { RiRoadMapLine } from "@react-icons/all-files/ri/RiRoadMapLine";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const RouteHanlder = (route: string) => {
    router.push(`${route}`);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white  z-10 flex flex-row justify-between px-16">
      <div
        className="flex items-center space-x-4"
        onClick={() => RouteHanlder("/")}
      >
        <RiRoadMapLine size={50} className="text-rose-400" />
        <Image src="/img/Pide.png" alt="Logo" width={100} height={70} />
      </div>

      <div className="flex items-center space-x-4">
        {/* <span className="text-xl p-7">gtp연결</span> */}
        {/* <span className="text-xl p-7">gtp연결</span> */}
        {session ? (
          <span className="text-xl p-7" onClick={() => RouteHanlder("/share")}>
            Sharing
          </span>
        ) : null}
        {session ? (
          <span className="text-xl p-7" onClick={() => signOut()}>
            Logout
          </span>
        ) : (
          <span className="text-xl p-7" onClick={() => RouteHanlder("/login")}>
            Login
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
