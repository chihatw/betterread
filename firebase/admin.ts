import { COLLECTION } from "@/features/temp/constants";
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
const dbAdmin = initializeFirestore(app, { preferRest: true });

// noto 読み込みレコード削減のため admin を使って、 restapi は使わない
export const getDocumentCount = async (collection: string) => {
  const snapshot = await dbAdmin.collection(collection).count().get();

  return snapshot.data().count;
};

export const getAnswers = async (docId: string) => {
  const snapshot = await dbAdmin.collection(COLLECTION).doc(docId).get();
  if (snapshot.exists) {
    const { string } = snapshot.data() as any;
    const remote = JSON.parse(string);
    return remote;
  }
};
