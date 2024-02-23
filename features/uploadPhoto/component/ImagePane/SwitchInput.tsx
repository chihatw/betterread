import { Input } from "@/components/ui/input";
import { ENDDATE } from "@/features/questions/constants";
import { isMobile } from "@/utils/utils";
import { ChangeEvent } from "react";

export const SwitchInput = ({
  handleChange,
}: {
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) => {
  const now = new Date();
  const endDate = new Date(ENDDATE);
  if (isMobile()) {
    return (
      <Input
        type="file"
        capture="environment"
        accept="image/*"
        onChange={handleChange}
        disabled={endDate < now}
      />
    );
  }
  return (
    <Input
      type="file"
      accept="image/*"
      onChange={handleChange}
      disabled={endDate < now}
    />
  );
};
