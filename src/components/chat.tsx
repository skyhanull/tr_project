"use client";
import React, { useState } from "react";
import { addDoc, collection } from "@firebase/firestore";
import db from "../lib/firebase";

/**
 * @description
 * 채팅 작성 인풋 컴포넌트입니다.
 */
const ChatInput = () => {
  // 채팅 인풋 값
  const [message, setMessage] = useState("");

  // 채팅 메시지를 DB에 전송하고 전송되면 메시지 인풋 값을 초기화해줍니다.
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await addDoc(collection(db, "chat"), {
      text: message,
    });
    setMessage("");
  }
  return (
    <div>
      <form onSubmit={onSubmit}>
        <div>
          <input
            type="text"
            name="chat"
            id="chat"
            placeholder="Send your Message"
            value={message}
            className="bg-slate-50"
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="bg-slate-400">전송</button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
