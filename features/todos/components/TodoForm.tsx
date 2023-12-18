"use client";

import { addTodoAction } from "@/app/_actions";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUser } from "@/features/auth";

import { trpc } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { nanoid } from "nanoid";
import { useSession } from "next-auth/react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Todo } from "..";
import SubmitButton from "./SubmitButton";

const TodoSchema = z.object({
  title: z.string(),
});

export type TodoSchema = z.infer<typeof TodoSchema>;

const TodoForm = () => {
  const { data } = useSession();
  const { uid } = getUser(data);

  const greet = trpc.greet.useQuery(undefined, {
    initialData: "trpc not connected",
  });
  console.log(`"%c${greet.data}" on client side`, "color:green");

  const form = useForm<TodoSchema>({
    resolver: zodResolver(TodoSchema),
    defaultValues: { title: "" },
  });

  const onSubmit = async (data: TodoSchema) => {
    const newTodo: Todo = {
      id: nanoid(4),
      uid,
      title: data.title,
    };
    await addTodoAction(newTodo);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  className="h-10 bg-white"
                  disabled={!uid}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <SubmitButton form={form} />
      </form>
    </Form>
  );
};

export default TodoForm;
