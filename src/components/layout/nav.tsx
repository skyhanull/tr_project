"use client";

import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const tabs = [
  { name: "검색", href: "/map/p", id: "0" },
  { name: "길찾기", href: "/map/p", id: "1" },
  { name: "Tab3", href: "/map/[", id: "2" },
];

const MapLayout = ({ setTab }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <nav className="w-40 bg-white border-2 border-gray-200 ">
      {tabs.map((tab) => (
        <div
          key={tab.name}
          style={{
            padding: "50px 10px",
            // color: pathname === tab.href ? "blue" : "black",
            textAlign: "center",
            fontSize: "20px",
          }}
          className="hover:bg-sky-700"
          onClick={() => setTab(tab.id)}
        >
          {tab.name}
        </div>
      ))}
    </nav>
  );
};

export default MapLayout;
