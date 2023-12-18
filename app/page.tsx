"server only";

import { TodoForm, TodoList } from "@/features/todos";

import { serverClient } from "@/trpc/serverClient";

export default async function Home() {
  const greet = await serverClient.greet();
  console.log(`"${greet}" on server side.`);
  return (
    <main className="mx-auto w-full  max-w-md space-y-4 pb-40 pt-10">
      <div className="grid  place-items-center gap-y-8 ">
        <div className="w-full max-w-sm space-y-6">
          <TodoList />
          <TodoForm />
        </div>
      </div>
    </main>
  );
}
