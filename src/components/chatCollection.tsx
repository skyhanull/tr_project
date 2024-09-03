"use client";
import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "@firebase/firestore";
import db from "../lib/firebase";

/**
 * @description
 * 채팅 목록 컴포넌트
 * firebase-firestore에서 채팅 데이터 목록을 보여줍니다.
 */
const ChatCollection = () => {
  // 채팅 목록 데이터
  const [chatData, setChatData] = useState<any[]>([]);

  //
  /**
   * @description
   * 채팅 목록 데이터를 조회합니다. onSnapShot을 데이터가 실시간으 확인될 수 있도록 해줍니다.
   * 페이지가 사라질 때, 실시간 연결을 해지해주기 위해 실시간 파이어베이스 연결 함수를 반환해줍니다.
   * @param cb setState로 data를 설정해주기위한 함수 인자
   * @return unsubscribe 실시간 파이어베이스 연결 함수
   */
  function getChatList(cb: (data: any[]) => void) {
    const q = collection(db, "chat");
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const data = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      cb(data);
    });

    return unsubscribe;
  }

  // 마운트될 때, 실시간 파이어베이스 스트어와 연결해주며 조회하도록 해주고 페이지가 사라질 때 해지하도록 설정해줍니다.
  // useEffect(() => {
  //   const unsubscribe = getChatList((data) => setChatData(data));
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  useEffect(() => {
    const unsubscribe = getChatList((data) => {
      console.log(data); // 불러온 데이터를 콘솔에 출력
      setChatData(data);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  console.log(chatData);
  return (
    <div>
      {chatData.map((chat, index) => (
        <p key={index} className="text-slate-950">
          {chat.text}
        </p>
      ))}
    </div>
  );
};

export default ChatCollection;
