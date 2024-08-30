// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAaFZ8R5zdzJgjKXldsrt1Q8UitGEre0mg",
  authDomain: "pide-e5488.firebaseapp.com",
  projectId: "pide-e5488",
  storageBucket: "pide-e5488.appspot.com",
  messagingSenderId: "110811395084",
  appId: "1:110811395084:web:cdb6cf7c37b536387f2a29",
  measurementId: "G-N5RHZQV6C2",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // 올바르게 Firestore 인스턴스를 가져와야 합니다.

export default db;
