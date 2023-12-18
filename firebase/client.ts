import { initializeApp } from "@firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = JSON.parse(
  process.env.NEXT_PUBLIC_FIREBASE_CONFIG as string,
);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
