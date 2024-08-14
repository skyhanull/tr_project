"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import Avatar from "@mui/material/Avatar";
import { useSession } from "next-auth/react";
import { storeListHandler } from "../../hook/storeListHandler";
import { Pagenationtype } from "../../utility/interface/pagenation";
import Select from "../../components/filterbar/select";
import Divider from "@mui/material/Divider";

export default function Page() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [userCode, setUserCode] = useState<string | null>(null);
  const [sort, setSort] = useState("");
  const [pagination, setPagination] = useState<Pagenationtype>({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });
  const filters = [
    { name: "전체", code: "" },
    { name: "최신 순", code: "recent" },
    { name: "인기 순", code: "popular" },
  ];

  useEffect(() => {
    const code = localStorage.getItem("userCode");
    setUserCode(code);
  }, []);
  const [cardData, setCardData] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (userCode) {
      storeListHandler(userCode, setCardData, setPagination, pagination, sort);
    }
    setLoading(false);
  }, [pagination.page, userCode, sort]);

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
        <div className="flex flex-col  my-7">
          <div className="text-2xl py-1">Name : {session?.user?.name}님</div>
          <div className="text-2xl py-1">
            E-mail : {session?.user?.email ?? ""}
          </div>
          <div className="text-2xl py-1">Code : {session?.user?.code}</div>
        </div>
      </div>

      <div className="flex mt-40 mx-24 ">
        <span className="text-3xl"> My List</span>
        {/* <span>{cardData.length}개</span> */}
      </div>
      <div className="flex justify-end mx-8 items-center">
        <Select filterList={filters} setSort={setSort} sort={sort} />
      </div>
      <Divider sx={{ my: 1 }} />
      <Card
        cardData={cardData}
        setPagination={setPagination}
        pagination={pagination}
        loading={loading}
        state={true}
      />
    </div>
  );
}
