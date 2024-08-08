// utils/fetchMarkers.ts
import axios from "axios";

export const storeListHandler = async (
  userCode: string | null,
  setCardData: (data: any) => void
) => {
  try {
    // Prepare query parameters conditionally
    const params: any = {};
    if (userCode) {
      params.userCode = userCode;
    }

    // 서버로 GET 요청 보내기
    const response = await axios.get("/api/mypost", {
      params, // Only include userCode if it is provided
    });

    console.log("Response:", response.data);
    setCardData(response.data.data);
  } catch (error) {
    console.error("Error fetching markers:", error);
  }
};
