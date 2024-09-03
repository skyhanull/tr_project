"use client";
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "@firebase/firestore";
import CreateChatModal from "./Modal/createChatModal";
import db from "../lib/firebase";

const ChatRoomList = ({ onSelectRoom }) => {
  const [rooms, setRooms] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRoomName, setNewRoomName] = useState("");

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
    if (!newRoomName) {
      alert("채팅방 이름을 입력하세요.");
      return;
    }

    const newRoom = await addDoc(collection(db, "rooms"), {
      name: newRoomName, // 채팅방 이름을 Firestore에 저장
    });

    setRooms([...rooms, { id: newRoom.id, name: newRoomName }]);
    setNewRoomName(""); // 입력 필드 초기화
  };
  console.log(rooms);
  return (
    <div>
      {/* <div className="text-4xl">Chat Rooms</div> */}
      {/* <div className="flex flex-row bg-slate-50">
        <button
          onClick={() => setIsModalOpen(true)}
          className="ml-4 bg-green-500 text-white p-2 rounded"
        >
          Create New Room
        </button>
      </div> */}
      <div className="flex flex-row">
        <ul className=" h-screen bg-slate-500 rounded-2xl border-none overflow-y-auto">
          {rooms.map((room) => (
            <li key={room.id} className="p-5 bg-slate-500">
              <button onClick={() => onSelectRoom(room.id)}>
                {room.name || `Room ${room.id}`}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <CreateChatModal
        newRoomName={newRoomName}
        setNewRoomName={setNewRoomName}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={createRoom}
      />
    </div>
  );
};

export default ChatRoomList;
