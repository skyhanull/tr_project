"use client";
import React, { useEffect } from "react";
import { getSession } from "next-auth/react";
import MainList from "@/components/list/mainList";

export default function Main() {
  useEffect(() => {
    const storeUserCode = async () => {
      const session = await getSession();

      if (session && session.user && session.user.code) {
        localStorage.setItem("userCode", session.user.code);
      }
    };

    storeUserCode();
  }, []);
  return (
    <div className="justify-center mr-60 ml-60 mt-40">
      <MainList />
    </div>
  );
}
