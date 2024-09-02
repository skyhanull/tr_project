"use client";
import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "@firebase/firestore";
import db from "../lib/firebase";

// 사용자 정보를 입력받는 프롭스로 추가합니다.
const ChatRoom = ({ roomId, senderId, senderName }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  // 실시간 메시지 구독
  useEffect(() => {
    const q = query(
      collection(db, `rooms/${roomId}/messages`),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(querySnapshot.docs.map((doc) => doc.data()));
    });

    return () => unsubscribe();
  }, [roomId]);

  const sendMessage = async (e) => {
    e.preventDefault();

    if (!message || !senderId || !senderName) {
      console.error(
        "Missing required fields: message, senderId, or senderName"
      );
      return;
    }

    await addDoc(collection(db, `rooms/${roomId}/messages`), {
      text: message,
      timestamp: Timestamp.now(),
      senderId, // senderId를 동적으로 설정
      senderName, // senderName을 동적으로 설정
    });

    setMessage("");
  };

  return (
    <div className="bg-rose-50 w-full p-4">
      <h2 className="text-2xl mb-4">Chat Room {roomId}</h2>
      <div className="flex flex-col space-y-2">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              msg.senderId === senderId ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`${
                msg.senderId === senderId
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-black"
              } p-2 rounded-lg max-w-xs`}
            >
              <p className="text-sm font-semibold">{msg.senderName}</p>
              <p>{msg.text}</p>
            </div>
          </div>
        ))}
      </div>
      <form
        onSubmit={sendMessage}
        className="w-full p-2 border border-gray-300 rounded flex items-end mt-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
          placeholder="Send a message"
        />
        <button
          type="submit"
          className="ml-2 bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatRoom;
