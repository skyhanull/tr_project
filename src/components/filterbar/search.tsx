import Image from "next/image";
import { FaSearch } from "react-icons/fa";

const Header = () => {
  return (
    <header>
      <div className="flex items-center justify-center">
        <div className="relative w-4/6 mt-10 mb-5">
          <FaSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-500" />
          <input
            className="border-rose-300 border-4 rounded-xl pl-12 pr-4 py-2 w-full h-20 text-lg"
            placeholder="여행가고 싶은 지역을 검색하세요"
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
