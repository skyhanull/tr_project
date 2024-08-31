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

const ChatRoom = ({ roomId }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

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
    await addDoc(collection(db, `rooms/${roomId}/messages`), {
      text: message,
      timestamp: Timestamp.now(),
    });
    setMessage("");
  };

  return (
    <div>
      <h2>Chat Room {roomId}</h2>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>{msg.text}</p>
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
