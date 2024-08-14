"use client";

interface MapLayoutProps {
  setTab: React.Dispatch<React.SetStateAction<string>>;
}
const tabs = [
  { name: "검색", id: "0" },
  { name: "길찾기", id: "1" },
];

const MapLayout = ({ setTab }: MapLayoutProps) => {
  return (
    <nav className=" bg-white border-2 border-gray-200 flex items-center flex-col">
      {tabs.map((tab) => (
        <div
          key={`tabs-${tab.name}`}
          className="hover:bg-pink-100 text-gray-500 py-12 w-24 flex justify-center"
          onClick={() => setTab(tab.id)}
        >
          {tab.name}
        </div>
      ))}
    </nav>
  );
};

export default MapLayout;
