"use client";

import { Desktop, Mobile } from "@/features/uploadPhoto";
import { isMobile } from "@/utils/utils";

const Page = () => {
  const result = isMobile();
  if (isMobile()) {
    return <Mobile />;
  }
  return <Desktop />;
};

export default Page;
