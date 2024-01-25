import Preview from "@/features/temp/components/Preview";
import { Articles, DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

const lines_j = Articles.kousan.japanese.split("\n");

const LisanPreview = async () => {
  const value = await getAnswers(DOCID.lisan);
  return (
    <Preview opposite="kousan" lines_j={lines_j} self="lisan" answers={value} />
  );
};

export default LisanPreview;
