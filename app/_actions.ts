"use server";

import { Todo } from "@/features/todos";

import { addTodo, removeTodo } from "@/firebase/admin";
import { revalidatePath } from "next/cache";

export const removeTodoAction = async (id: string) => {
  removeTodo(id);
  revalidatePath("/");
};

export const addTodoAction = async (todo: Todo) => {
  await addTodo(todo);
  revalidatePath("/");
};
