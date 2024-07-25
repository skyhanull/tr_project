"use client";

import React, { useState } from "react";
import MapLayout from "../../../components/layout/nav";
import LocationList from "./locationList";
import DirectionList from "./directionList";

export default function Home() {
  const [tab, setTab] = useState("0");

  return (
    <div className="relative flex  flex-row p-0  mt-20">
      <MapLayout setTab={setTab} />
      <div className=" w-px-55 bg-slate-50   overflow-auto ">
        <div>{tab === "0" ? <LocationList /> : <DirectionList />}</div>
      </div>
    </div>
  );
}
