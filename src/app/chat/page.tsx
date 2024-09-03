// import ChatCollection from "@/components/chatCollection";
// import ChatInput from "@/components/chat";

// interface Chat {
//   id: string;
//   text: string;
// }

// /**
//  * @description
//  * 채팅 페이지 컴포넌트입니다.
//  */
// export default async function Chat() {
//   return (
//     <div className="flex justify-center mt-80 ml-80">
//       <div className="bg-slate-100">
//         <div>aa</div>
//         <h1>Chat Messages</h1>
//         {/* 채팅 데이터 목록 컴포넌트*/}
//         <ChatCollection />
//         {/* 채팅 작성 인풋*/}
//         <ChatInput />
//       </div>
//     </div>
//   );
// }
"use client";
import React, { useState } from "react";
import ChatRoomList from "../../components/chatRoomList";
import ChatRoom from "../../components/chatroom";

export default function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className=" mt-24 ml-20">
      {/* {selectedRoomId ? (
        <ChatRoom roomId={selectedRoomId} />
      ) : (
        <ChatRoomList onSelectRoom={(roomId) => setSelectedRoomId(roomId)} />
      )} */}
      <div>
        <div className="flex  bg-slate-50 p-3 justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 bg-green-500 text-white p-2 rounded flex"
          >
            + ADD
          </button>
        </div>
        <div className="flex">
          <ChatRoomList onSelectRoom={(roomId) => setSelectedRoomId(roomId)} />
          <ChatRoom roomId={selectedRoomId} />
        </div>
      </div>
    </div>
  );
}
