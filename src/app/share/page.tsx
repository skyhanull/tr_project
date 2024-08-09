"use client";
import { useEffect, useState } from "react";
import Card from "../../components/Card/card";
import { storeListHandler } from "../../hook/storeListHandler";
import Pagination from "@mui/material/Pagination";

export default function Page() {
  const [cardData, setCardData] = useState([]);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [pagination, setPagination] = useState({
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // 데이터를 가져오기 시작할 때 로딩 상태로 설정
      await storeListHandler(null, setCardData, setPagination, pagination);
      setLoading(false); // 데이터 가져오기 완료 후 로딩 상태 해제
    };

    fetchData();
  }, [pagination.page]); // 페이지 변경 시마다 데이터 다시 가져오기

  return (
    <div className="justify-center mx-20 mt-32">
      <div className="h-screen">
        <div>
          <Card
            cardData={cardData}
            setPagination={setPagination}
            pagination={pagination}
            loading={loading} // 로딩 상태 전달
          />
        </div>
      </div>
    </div>
  );
}
