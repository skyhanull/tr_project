// components/MapLayout.js
"use client";

import Link from "next/link";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

const tabs = [
  { name: "Tab1", href: "/map/p", id: 0 },
  { name: "Tab2", href: "/map/p", id: 1 },
  { name: "Tab3", href: "/map/[", id: 2 },
];

const MapLayout = ({}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(0); // 초기 탭 인덱스 설정

  const handleTabClick = (tabId) => {
    // // 기존 쿼리 파라미터를 유지하고, 클릭된 탭의 ID를 추가합니다.
    // const newParams = new URLSearchParams(searchParams);
    // newParams.set("name", "value");
    // console.log(newParams);
    // router.push(
    //   {
    //     pathname: router,
    //     query: newParams,
    //   },
    //   undefined,
    //   { shallow: true }
    // );
  };
  console.log(router);
  return (
    <div>
      <nav>
        {tabs.map((tab) => (
          <div
            key={tab.name}
            href={tab.href}
            style={{
              margin: "0 10px",
              color: pathname === tab.href ? "blue" : "black",
            }}
            onClick={() => handleTabClick(tab.id)}
          >
            {tab.name}
          </div>
        ))}
      </nav>
      {/* <div>{children}</div> */}
    </div>
  );
};

export default MapLayout;
