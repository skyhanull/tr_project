import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainList from "../components/list/mainList";
import { useRouter } from "next/navigation";
import fetchMock from "jest-fetch-mock";
import { urlLink } from "../utility/interface/urlLink";
// useRouter 모킹
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

fetchMock.enableMocks();

describe("MainList Component", () => {
  const mockPush = jest.fn();

  beforeEach(() => {
    fetchMock.resetMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
  });

  it("should render loading state initially", () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<MainList />);

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  it("should fetch and display images", async () => {
    const mockImages = [
      { name: "Image 1", url: "url1", lat: "0", lon: "0" },
      { name: "Image 2", url: "url2", lat: "0", lon: "0" },
    ];

    fetchMock.mockResponseOnce(JSON.stringify(mockImages));
    render(<MainList />);

    await waitFor(() => {
      expect(screen.getByText("Image 1")).toBeInTheDocument();
      expect(screen.getByText("Image 2")).toBeInTheDocument();
    });
  });

  it('should display "검색 결과가 없습니다." when no images are returned', async () => {
    fetchMock.mockResponseOnce(JSON.stringify([]));
    render(<MainList />);

    await waitFor(() => {
      expect(screen.getByText("검색 결과가 없습니다.")).toBeInTheDocument();
    });
  });

  // it("should update search query and refetch images", async () => {
  //   const mockImages = [{ name: "Image 1", url: "url1", lat: "0", lon: "0" }];
  //   fetchMock.mockResponseOnce(JSON.stringify(mockImages));
  //   render(<MainList />);

  //   const searchInput =
  //     screen.getByPlaceholderText(/여행가고 싶은 지역을 검색하세요/i);

  //   fireEvent.change(searchInput, { target: { value: "New Query" } });

  //   await waitFor(() => {
  //     expect(fetchMock).toHaveBeenCalledTimes(2);
  //     expect(fetchMock).toHaveBeenCalledWith("/api/regions?query=New%20Query");
  //   });
  // });
  // it("should update search query and refetch images", async () => {
  //   const initialResponse: urlLink[] = []; // 첫 번째 호출 응답 (쿼리 없음)
  //   const searchResponse = [
  //     { name: "Image 1", url: "url1", lat: "0", lon: "0" },
  //   ]; // 두 번째 호출 응답 (쿼리 있음)

  //   // 첫 번째와 두 번째 응답을 순차적으로 설정
  //   fetchMock.mockResponses(
  //     JSON.stringify(initialResponse), // 첫 번째 호출 응답 (기본 리스트)
  //     JSON.stringify(searchResponse) // 두 번째 호출 응답 (검색 결과)
  //   );

  //   render(<MainList />);

  //   // 첫 번째 호출 확인 (쿼리가 없을 때)
  //   expect(fetchMock).toHaveBeenCalledWith("/api/regionList");

  //   const searchInput =
  //     screen.getByPlaceholderText(/여행가고 싶은 지역을 검색하세요/i);

  //   // 검색어 변경 시도
  //   fireEvent.change(searchInput, { target: { value: "New Query" } });

  //   // 두 번째 호출 확인 (쿼리가 있을 때)
  //   await waitFor(() => {
  //     expect(fetchMock).toHaveBeenCalledTimes(1); // 두 번 호출됨
  //     expect(fetchMock).toHaveBeenCalledWith("/api/regions?query=New%20Query"); // 쿼리 포함된 호출 확인
  //   });
  // });

  it("should navigate to the correct URL when image is clicked", async () => {
    const mockImages = [{ name: "Image 1", url: "url1", lat: "10", lon: "20" }];
    fetchMock.mockResponseOnce(JSON.stringify(mockImages));

    render(<MainList />);

    await waitFor(() => {
      fireEvent.click(screen.getByText("Image 1"));
    });

    // 로그로 호출된 인수와 횟수 확인
    console.log("mockPush Calls:", mockPush.mock.calls);

    expect(mockPush).toHaveBeenCalledTimes(2);
    expect(mockPush).toHaveBeenCalledWith("/map/url1?lat=10&lon=20");
  });
});
