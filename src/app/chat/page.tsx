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
import ChatRoomList from "@/components/ChatRoomList";
import ChatRoom from "@/components/ChatRoom";

export default function Chat() {
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  return (
    <div>
      {selectedRoomId ? (
        <ChatRoom roomId={selectedRoomId} />
      ) : (
        <ChatRoomList onSelectRoom={(roomId) => setSelectedRoomId(roomId)} />
      )}
    </div>
  );
}
