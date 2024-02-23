import { cert, getApps, initializeApp } from "firebase-admin/app";
import { initializeFirestore } from "firebase-admin/firestore";

const serviceAccount = JSON.parse(
  process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

// https://zenn.dev/mktu/articles/55b3bfee839cfc
const app = !getApps()[0]
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApps()[0];

// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.firestoresettings.md#firestoresettings_interface
export const dbAdmin = initializeFirestore(app, { preferRest: true });
