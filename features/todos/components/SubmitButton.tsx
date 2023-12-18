import ServerActionPendingButton from "@/components/ServerActionPendingButton";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TodoSchema } from "./TodoForm";

const SubmitButton = ({ form }: { form: UseFormReturn<TodoSchema> }) => {
  const titleValue = useWatch({ name: "title", control: form.control });
  return (
    <div className="grid">
      <ServerActionPendingButton
        label="Create New Todo"
        disabled={!titleValue}
      />
    </div>
  );
};

export default SubmitButton;
