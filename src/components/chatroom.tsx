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

    // senderId나 senderName이 undefined인지 확인
    if (!message) {
      console.error(
        "Missing required fields: message, senderId, or senderName"
      );
      return;
    }

    await addDoc(collection(db, `rooms/${roomId}/messages`), {
      text: message,
      timestamp: Timestamp.now(),
      senderId: "senderId", // 확실하게 senderId가 정의된 값임을 보장
      senderName: "senderName", // 확실하게 senderName이 정의된 값임을 보장
    });

    setMessage("");
  };
  console.log(messages);
  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.senderName}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Send a message"
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
