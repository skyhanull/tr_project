"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { RiRoadMapLine } from "@react-icons/all-files/ri/RiRoadMapLine";

const Header = () => {
  const router = useRouter();

  const LogoHanlder = () => {
    router.push("/");
  };
  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow z-10 flex flex-row justify-between px-16">
      <div className="flex items-center space-x-4" onClick={LogoHanlder}>
        <RiRoadMapLine size={50} className="text-rose-400" />
        <Image src="/img/logo.png" alt="Logo" width={100} height={70} />
      </div>

      <div className="flex items-center space-x-4">
        {/* <span className="text-xl p-7">gtp연결</span> */}

        <span className="text-xl p-7">Login</span>
      </div>
    </header>
  );
};

export default Header;
