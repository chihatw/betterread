"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getUser } from "@/features/auth";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

import { removeTodoAction } from "@/app/_actions";
import { Todo } from "../schema";

const RemoveButton = ({ todo }: { todo: Todo }) => {
  const { data } = useSession();

  const { uid, admin } = getUser(data);

  // 非表示処理
  if (!admin && uid !== todo.uid) {
    return null;
  }

  const handleSubmit = async (data: FormData) => {
    const id = data.get("id") as string;
    removeTodoAction(id);
  };

  return (
    <form action={handleSubmit}>
      <Input type="hidden" name="id" defaultValue={todo.id} />
      <Button type="submit" size="icon" variant="ghost">
        <Trash2 size={20} className={admin ? "text-red-500" : ""} />
      </Button>
    </form>
  );
};

export default RemoveButton;
