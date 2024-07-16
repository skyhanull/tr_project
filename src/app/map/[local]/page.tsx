"use client";

import Map from "../../../components/map";
import Bar from "../../../components/selectBar";
import FilterSelect from "../../../components/filterbar/fieldSelect";
import SearchBar from "../../../components/filterbar/search";
import SelectFilter from "../../../components/filterbar/fieldSelect";
import Maplist from "./@map_list/page";
import Image from "next/image";
import { useState, useEffect } from "react";
import MapLayout from "../../../components/layout/nav";
import Link from "next/link";
import KaKaoMap from "../../../components/kakaomap";
import Menu from "./mapCilent";
// import React, { useState } from "react";

export default function ProductDetails({
  params,
  searchParams,
}: // users: React.ReactNode;
{
  params: { productId: string };
  searchParams: { country: string };
}) {
  return (
    <div className="flex h-screen flex-row w-screen p-0">
      <Menu />
      <KaKaoMap />
    </div>
  );
}
