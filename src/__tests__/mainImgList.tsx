import { render, screen, fireEvent } from "@testing-library/react";
import ImageItem from "../components/img/mainListImg"; // 실제 경로로 변경 필요

const mockLinkHandler = jest.fn();

describe("ImageItem Component", () => {
  const mockImage = {
    name: "서울",
    src: "/test.jpg",
    lat: "10",
    lon: "20",
    country: "Korea",
  };

  beforeEach(() => {
    render(<ImageItem image={mockImage} onLinkHandler={mockLinkHandler} />);
  });

  it("should call onLinkHandler when the image is clicked", () => {
    fireEvent.click(screen.getByAltText("서울")); // 이미지를 클릭
    expect(mockLinkHandler).toHaveBeenCalledTimes(1);
    expect(mockLinkHandler).toHaveBeenCalledWith(
      mockImage.name,
      mockImage.lat,
      mockImage.lon
    );
  });
});
