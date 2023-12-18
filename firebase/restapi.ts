// note restapi の in の条件は 30項まで

import { Todo } from "@/features/todos";
import { buildFetchRequestOption } from "@/utils/buildFetchRequestOption";
import { COLLECTIONS, REVALIDATE_TAGS } from "./constants";

const PROJECT_ID = "office-scranton";

const PROJECT_PATH = `projects/${PROJECT_ID}/databases/(default)/documents`;

export const getBaseUrl = () => {
  const isDev = process.env.NODE_ENV === "development";

  // note pnpm build のときは isDev が false 、つまり本番環境から fetch される
  // pnpm build の書き込み先の default は　local なので、書き込み先と読み込み先の統一が必要
  const pathname = isDev
    ? "http://localhost:8080"
    : "https://firestore.googleapis.com";
  return `${pathname}/v1/${PROJECT_PATH}`;
};

// note structuredQuery を使わずに取得すると、 revalidate されない
export const documentURL_declare = (collection: string, docId: string) =>
  `${getBaseUrl()}/${collection}/${docId}`;

const fetchRequestURL = `${getBaseUrl()}:runQuery`;

export const getTodos = async (): Promise<{
  todos: Todo[];
  readTime: number;
}> => {
  const res = await fetch(
    fetchRequestURL,
    buildFetchRequestOption({
      collectionId: COLLECTIONS.todos,
      tags: [REVALIDATE_TAGS.todos],
    }),
  );
  const { docs, readTime, readCount } = await getDocs(res);
  global.readCount += readCount;

  console.log("getTodos", docs.length, `readCount: `, global.readCount);

  const todos = docs.map((doc) => buildTodo(doc));

  return { todos, readTime };
};

const getDocs = async (res: Response) => {
  // https://developer.mozilla.org/ja/docs/Web/API/Response
  if (!res.ok) {
    console.error(res.statusText);
    return { docs: [], readTime: 0, readCount: 1 };
  }
  const json = await res.json();
  const docs = (json as any[])
    .filter((item) => !!item.document)
    .map((item) => item.document);

  const readTime = (json as any[]).at(0)?.readTime || 0;

  return {
    docs,
    readTime,
    readCount: (json as any[]).length,
  };
};

const buildTodo = (document: any): Todo => {
  const id = document.name.split("/").at(-1) || "";
  const fields = document.fields;
  return {
    id,
    title: fields.title.stringValue,
    uid: fields.uid.stringValue,
  };
};
