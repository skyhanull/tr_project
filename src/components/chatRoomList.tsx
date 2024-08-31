"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import db from "../lib/firebase";

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);

  // Firestore에서 채팅방 목록을 가져옵니다.
  useEffect(() => {
    const fetchRooms = async () => {
      const querySnapshot = await getDocs(collection(db, "rooms"));
      setRooms(
        querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };

    fetchRooms();
  }, []);

  // 새로운 채팅방을 생성합니다.
  const createRoom = async () => {
    const newRoom = await addDoc(collection(db, "rooms"), {});
    setRooms([...rooms, { id: newRoom.id }]);
  };

  return (
    <div>
      <h2>Chat Rooms</h2>
      <ul>
        {rooms.map((room) => (
          <li key={room.id}>
            <button onClick={() => onSelectRoom(room.id)}>
              Room {room.id}
            </button>
          </li>
        ))}
      </ul>
      <button onClick={createRoom}>Create New Room</button>
    </div>
  );
};

export default ChatRoomList;
