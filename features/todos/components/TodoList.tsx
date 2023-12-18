"server only";

import RevalidatePane from "@/components/RevalidatePane";
import { getTodos } from "@/firebase/restapi";
import RemoveButton from "./RemoveButton";

const TodoList = async () => {
  const { todos, readTime } = await getTodos();
  return (
    <div className="w-full max-w-sm space-y-4">
      <div className="text-center text-2xl font-extrabold">TodoList</div>
      <RevalidatePane readTime={readTime} pathname="/" />
      <div className="space-y-2">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex h-12 items-center justify-between rounded-lg bg-white pl-4 font-extralight shadow-lg"
          >
            <div>{todo.title}</div>
            <RemoveButton todo={todo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;
