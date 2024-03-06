"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { isValidEmail, sleep } from "@/utils/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";

type Props = {
  disabled: boolean;
  errMsg: string;
};

const INITIAL_STATE: Props = {
  disabled: true,
  errMsg: "",
};

const DummyForm = () => {
  const router = useRouter();
  const form = useRef<null | HTMLFormElement>(null);
  const [state, setState] = useState(INITIAL_STATE);
  const [isPending, startTransition] = useTransition();

  const handleChange = () => {
    const formData = new FormData(form.current!);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";
    const disabled = !isValidEmail(email) || password.length < 6;
    setState({ errMsg: "", disabled });
  };

  const action = async (formData: FormData) => {
    startTransition(async () => {
      const email = formData.get("email")?.toString() || "";
      const password = formData.get("password")?.toString() || "";
      await sleep(200);
      if (email !== "guest@gmail.com") {
        setState((prev) => ({ ...prev, errMsg: "wrong email" }));
        return;
      }

      if (password !== "12345678") {
        setState((prev) => ({ ...prev, errMsg: "wrong password" }));
        return;
      }
      setState(INITIAL_STATE);
      router.push("/kousan");
    });
  };

  return (
    <form
      ref={form}
      action={action}
      className="mx-auto grid max-w-sm gap-8 pt-10"
      onChange={handleChange}
      autoComplete="off"
    >
      <Input
        placeholder="email"
        className="bg-white"
        type="text"
        name="email"
      />
      <Input
        placeholder="password"
        className="bg-white"
        type="password"
        name="password"
      />
      <div className="grid gap-2">
        <Button disabled={state.disabled || isPending} className="flex gap-2">
          <span>登入</span>
          {isPending ? <Loader2 className="animate-spin" /> : null}
        </Button>
        {state.errMsg ? (
          <div className="text-xs text-red-500">{state.errMsg}</div>
        ) : null}
      </div>
    </form>
  );
};

export default DummyForm;
