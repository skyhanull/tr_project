import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MainList from "../components/list/mainList";
import { useRouter } from "next/navigation";
import fetchMock from "jest-fetch-mock";

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
});
