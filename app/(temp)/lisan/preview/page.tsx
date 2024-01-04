import Preview from "@/features/temp/components/Preview";
import { Articles } from "@/features/temp/constants";

const lines_j = Articles.kousan.japanese.split("\n");

const LisanPreview = () => {
  return <Preview opposite="kousan" lines_j={lines_j} self="lisan" />;
};

export default LisanPreview;
