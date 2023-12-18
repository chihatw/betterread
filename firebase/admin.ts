import { Todo } from "@/features/todos";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import {
  FirestoreDataConverter,
  initializeFirestore,
} from "firebase-admin/firestore";
import { COLLECTIONS } from "./constants";

if (typeof global.readCount !== "number") {
  global.readCount = 0;
}

const serviceAccount = JSON.parse(
  process.env.NEXT_FIREBASE_SERVICE_ACCOUNT_KEY as string,
);

// https://zenn.dev/mktu/articles/55b3bfee839cfc
const app = !getApps()[0]
  ? initializeApp({ credential: cert(serviceAccount) })
  : getApps()[0];

export const authAdmin = getAuth();
// export const dbAdmin = getFirestore();

// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore
// https://firebase.google.com/docs/reference/admin/node/firebase-admin.firestore.firestoresettings.md#firestoresettings_interface
const dbAdmin = initializeFirestore(app, { preferRest: true });

// debug
export const getTodosAdmin = async () => {
  const snapshot = await dbAdmin
    .collection(COLLECTIONS.todos)
    .withConverter(todoConverter)
    .get();
  return snapshot.docs.map((doc) => doc.data());
};

export const addTodo = async (todo: Todo) => {
  await dbAdmin
    .collection(COLLECTIONS.todos)
    .withConverter(todoConverter)
    .doc(todo.id)
    .set(todo);
};

export const removeTodo = async (id: string) => {
  await dbAdmin.collection(COLLECTIONS.todos).doc(id).delete();
};

const todoConverter: FirestoreDataConverter<Todo> = {
  fromFirestore(snapshot) {
    const data = snapshot.data();
    return {
      uid: data.uid,
      title: data.title,
      id: snapshot.id,
    };
  },
  toFirestore(todo) {
    return todo;
  },
};
