import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCCNsv2t2ivhNT4fGz-ZAPOLm3MmK6GMz8",
  authDomain: "term-sen.firebaseapp.com",
  projectId: "term-sen",
  storageBucket: "term-sen.firebasestorage.app",
  messagingSenderId: "830723240510",
  appId: "1:830723240510:web:6575f5c87fd14c11b6976f"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export default app;
