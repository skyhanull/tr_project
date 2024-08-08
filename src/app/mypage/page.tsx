"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Card from "../../components/Card/card";
import { storeListHandler } from "../../hook/storeListHandler";
export default function Page() {
  const { data: session } = useSession();
  const userCode = localStorage.getItem("userCode");
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    if (userCode) {
      storeListHandler(userCode, setCardData);
    }
  }, []);

  console.log(session);
  return (
    <div className="justify-center mr-60 ml-60 mt-40">
      <div className="w-full h-48 border-2 border-gray-300">
        <Image src="/img/Pide.png" alt="Logo" width={100} height={70} />
        {/* <div>{session.email}</div> */}
      </div>
      <div className="flex text-3xl">my tour List</div>
      <div>
        <Card cardData={cardData} />
      </div>
    </div>
  );
}
