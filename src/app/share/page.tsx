"use client";
import { useEffect, useState } from "react";
import Card from "../../components/card/card";
import { storeListHandler } from "../../hook/storeListHandler";
import { Pagenationtype } from "../../utility/interface/pagenation";
import Select from "../../components/filterbar/select";

export default function Page() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
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
      setLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태로 설정
      await storeListHandler(
        null,
        setCardData,
        setPagination,
        pagination,
        sort
      );
      setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
    };

    fetchData();
  }, [pagination.page, sort]);

  return (
    <div className="justify-center mx-20 mt-32">
      <div className="h-screen">
        <div className="flex justify-between mx-8 items-center">
          <div className="ml-10">전체 리스트</div>
          <Select filterList={filters} setSort={setSort} sort={sort} />
        </div>
        <div>
          <Card
            cardData={cardData}
            setPagination={setPagination}
            pagination={pagination}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
}
