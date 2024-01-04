import Preview from "@/features/temp/components/Preview";
import { Articles } from "@/features/temp/constants";

const lines_j = Articles.lisan.japanese.split("\n");

const KouSanPreview = () => {
  return <Preview opposite="lisan" lines_j={lines_j} self="kousan" />;
};

export default KouSanPreview;
