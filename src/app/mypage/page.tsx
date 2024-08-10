"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import Avatar from "@mui/material/Avatar";
import { signOut, useSession } from "next-auth/react";
import { storeListHandler } from "../../hook/storeListHandler";
import { Pagenationtype } from "../../utility/interface/pagenation";
export default function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [userCode, setUserCode] = useState<string | null>(null);
  const [pagination, setPagination] = useState<Pagenationtype>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    // Fetch userCode from localStorage and update state
    const code = localStorage.getItem("userCode");
    setUserCode(code);
  }, []);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (userCode) {
      storeListHandler(userCode, setCardData, setPagination, pagination);
    }
    setLoading(false);
  }, [pagination.page, userCode]);

  return (
    <div className="justify-center mr-52 ml-52 mt-40">
      <div className="w-full h-48 border-2 border-gray-300 rounded-xl bg-gray-50  flex flex-row">
        <div className="flex items-center">
          <Avatar
            alt="Remy Sharp"
            src={session?.user?.image as string}
            sx={{ width: 100, height: 100 }}
            className="mx-20"
          />
        </div>
        <div className="flex flex-col  my-10">
          <div className="text-2xl">name : {session?.user?.name}님</div>
          {session?.user?.email && (
            <div className="text-2xl">e-mail : {session?.user?.email}</div>
          )}
          <div className="text-2xl">code : {session?.user?.code}</div>
        </div>
      </div>
      <div className="flex text-3xl justify-center mt-40">My List</div>

      <Card
        cardData={cardData}
        setPagination={setPagination}
        pagination={pagination}
        loading={loading}
      />
    </div>
  );
}
