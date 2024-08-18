import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import LocationList from "../app/map/[local]/locationList";
import { useRecoilState } from "recoil";
import { usePathname } from "next/navigation";
import fetchMock from "jest-fetch-mock";
import { textState } from "../recoil/atoms";
import { usePlaces } from "@/hook/usePlaces";
interface RoadType {
  address: string;
  filterChip: string;
  chip: string;
  name: string;
  x: string;
  y: string;
}
// 모킹
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

jest.mock("@/hook/usePlaces", () => ({
  usePlaces: jest.fn(),
}));

jest.mock("recoil", () => ({
  useRecoilState: jest.fn(),
}));

fetchMock.enableMocks();

describe("LocationList Component", () => {
  const mockSetAddList = jest.fn();
  const mockAddList: RoadType[] = [];
  const mockUsePathname = usePathname as jest.Mock;
  const mockUsePlaces = usePlaces as jest.Mock;
  const mockUseRecoilState = useRecoilState as jest.Mock;

  beforeEach(() => {
    fetchMock.resetMocks();
    mockUseRecoilState.mockReturnValue([mockAddList, mockSetAddList]);
  });

  it("should display '데이터가 없습니다' when no places are available", () => {
    mockUsePathname.mockReturnValue("/test");
    mockUsePlaces.mockReturnValue({
      places: [],
      totalPages: 1,
      isLoading: false,
      error: null,
    });

    render(<LocationList />);

    expect(screen.getByText(/데이터가 없습니다/i)).toBeInTheDocument();
  });

  it("should display places and handle pagination", async () => {
    const mockPlaces = [
      {
        id: "1",
        place_name: "Place 1",
        place_url: "url1",
        category_group_name: "Category 1",
        category_name: "Category > Subcategory",
        road_address_name: "Address 1",
        x: "10",
        y: "20",
      },
      {
        id: "2",
        place_name: "Place 2",
        place_url: "url2",
        category_group_name: "Category 2",
        category_name: "Category > Subcategory",
        road_address_name: "Address 2",
        x: "30",
        y: "40",
      },
    ];

    mockUsePathname.mockReturnValue("/test");
    mockUsePlaces.mockReturnValue({
      places: mockPlaces,
      totalPages: 2,
      isLoading: false,
      error: null,
    });

    render(<LocationList />);

    await waitFor(() => {
      expect(screen.getByText("Place 1")).toBeInTheDocument();
      expect(screen.getByText("Place 2")).toBeInTheDocument();
    });

    // 클릭하여 페이지 변경 확인
    fireEvent.change(screen.getByRole("navigation"), {
      target: { value: "2" },
    });
    expect(screen.getByText("Place 1")).toBeInTheDocument();
  });

  it("should add a location to the list when button is clicked", async () => {
    const mockPlaces = [
      {
        id: "1",
        place_name: "Place 1",
        place_url: "url1",
        category_group_name: "Category 1",
        category_name: "Category > Subcategory",
        road_address_name: "Address 1",
        x: "10",
        y: "20",
      },
    ];

    mockUsePathname.mockReturnValue("/test");
    mockUsePlaces.mockReturnValue({
      places: mockPlaces,
      totalPages: 1,
      isLoading: false,
      error: null,
    });

    render(<LocationList />);

    await waitFor(() => {
      expect(screen.getByText("Place 1")).toBeInTheDocument();
    });

    // 클릭하여 추가 버튼이 호출되었는지 확인
    fireEvent.click(screen.getByRole("button"));
    expect(mockSetAddList).toHaveBeenCalled();
  });

  it("should toggle the popup when item is clicked", () => {
    mockUsePathname.mockReturnValue("/test");
    mockUsePlaces.mockReturnValue({
      places: [],
      totalPages: 1,
      isLoading: false,
      error: null,
    });

    render(<LocationList />);

    // 버튼 클릭하여 팝업 열기
    fireEvent.click(screen.getByText(/Place 1/i));
    expect(screen.getByText(/Popup content/i)).toBeInTheDocument(); // 팝업 내용을 적절히 확인하는 부분
  });

  it("should close the popup when close button is clicked", () => {
    mockUsePathname.mockReturnValue("/test");
    mockUsePlaces.mockReturnValue({
      places: [],
      totalPages: 1,
      isLoading: false,
      error: null,
    });

    render(<LocationList />);

    // 버튼 클릭하여 팝업 열기
    fireEvent.click(screen.getByText(/Place 1/i));
    // 팝업 닫기 버튼 클릭
    fireEvent.click(screen.getByText(/Close/i));
    expect(screen.queryByText(/Popup content/i)).toBeNull();
  });
});
