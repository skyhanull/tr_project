"use client";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import { storeListHandler } from "../../hook/storeListHandler";
export default function Page() {
  const userCode = localStorage.getItem(null);
  const [cardData, setCardData] = useState([]);
  useEffect(() => {
    // Call storeListHandler regardless of userCode presence
    storeListHandler(userCode || null, setCardData);
  }, []);

  return (
    <div className="justify-center  mx-20 mt-32">
      <div className="flex text-3xl">my tour List</div>

      <div className="h-screen border-2 border-gray-300">
        <div>
          <Card cardData={cardData} />
        </div>
      </div>
    </div>
  );
}
