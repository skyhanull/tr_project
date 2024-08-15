"use client";

import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import Select from "../../components/filterbar/select";
import Divider from "@mui/material/Divider";
import { storeListHandler } from "../../hook/storeListHandler";
import { Pagenationtype } from "../../utility/interface/pagenation";

export default function Page() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState("");
  const [pagination, setPagination] = useState<Pagenationtype>({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });

  const filters = [
    { name: "전체", code: "" },
    { name: "최신 순", code: "recent" },
    { name: "인기 순", code: "popular" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await storeListHandler(
        null,
        setCardData,
        setPagination,
        pagination,
        sort
      );
      setLoading(false);
    };

    fetchData();
  }, [pagination.page, sort]);

  return (
    <div className="justify-center mx-20 mt-32">
      <div className="h-screen">
        <div className="ml-20 mt-10 font-bold text-3xl">전체 게시글</div>
        <div className="flex justify-end mx-8 items-center">
          <Select filterList={filters} setSort={setSort} sort={sort} />
        </div>
        <Divider sx={{ my: 1 }} />
        <div>
          <Card
            cardData={cardData}
            setPagination={setPagination}
            pagination={pagination}
            loading={loading}
            state={false}
          />
        </div>
      </div>
    </div>
  );
}
