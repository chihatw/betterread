import { Input } from "@/components/ui/input";
import { isMobile } from "@/utils/utils";
import { ChangeEvent } from "react";

export const SwitchInput = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  if (isMobile()) {
    return (
      <Input
        type="file"
        capture="environment"
        accept="image/*"
        onChange={handleChange}
      />
    );
  }
  return <Input type="file" accept="image/*" onChange={handleChange} />;
};
