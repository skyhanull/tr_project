// import { Server } from "socket.io";

// export default function handler(req, res) {
//   if (res.socket.server.io) {
//     console.log("Socket.io server already running");
//   } else {
//     console.log("Starting Socket.io server...");
//     const io = new Server(res.socket.server, {
//       cors: {
//         origin: "http://localhost:3000", // 클라이언트의 주소를 설정합니다
//         methods: ["GET", "POST"],
//       },
//     });
//     res.socket.server.io = io;

//     io.on("connection", (socket) => {
//       console.log("New client connected");

//       socket.on("message", (msg) => {
//         io.emit("message", msg);
//       });

//       socket.on("disconnect", () => {
//         console.log("Client disconnected");
//       });
//     });
//   }
//   res.end();
// }
