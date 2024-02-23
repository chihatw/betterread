import { dbAdmin } from "@/firebase/admin";
import { COLLECTION } from "../constants";
import { UserProps } from "../schema";

export const getAnswers = async (
  docId: string,
): Promise<{ answers: undefined; imagePaths: undefined } | UserProps> => {
  const snapshot = await dbAdmin.collection(COLLECTION).doc(docId).get();
  if (snapshot.exists) {
    const { answers, imagePaths } = snapshot.data() as UserProps;
    return { answers, imagePaths };
  }
  return { answers: [], imagePaths: [] };
};
