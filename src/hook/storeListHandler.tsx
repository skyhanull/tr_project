// utils/fetchMarkers.ts
import axios from "axios";

interface Pagination {
  page: number;
  limit: number;
}

export const storeListHandler = async (
  userCode: string | null,
  setCardData: (data: any) => void,
  setPagination: (pagination: any) => void,
  pagination: Pagination
) => {
  try {
    // 서버로 GET 요청 보내기
    const response = await axios.get("/api/mypost", {
      params: {
        userCode: userCode || undefined, // userCode가 있을 때만 포함
        page: pagination.page,
        limit: pagination.limit,
      },
    });

    // 데이터를 상태에 저장
    setCardData(response.data.data);

    // 페이지네이션 정보 업데이트
    setPagination({
      ...pagination,
      total: response.data.pagination.total, // 총 데이터 수
      totalPages: response.data.pagination.totalPages, // 총 페이지 수
    });
  } catch (error) {
    console.error("Error fetching markers:", error);
  }
};
