"use client";
import Image from "next/image";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const Header = () => {
  const router = useRouter();

  const LogoHanlder = () => {
    router.push("/");
  };
  return (
    <header>
      <div
        className="flex justify-between items-center m-8"
        onClick={LogoHanlder}
      >
        <div className="flex items-center space-x-4">
          <Image src="/icon/Vector.png" alt="Logo" width={50} height={70} />
          <Image src="/img/logo.png" alt="Logo" width={100} height={70} />
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-3xl p-7">gtp연결</span>

          <span className="text-3xl p-7">로그인</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
