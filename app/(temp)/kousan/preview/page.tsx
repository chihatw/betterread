import Preview from "@/features/temp/components/Preview";
import { Articles, DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

const lines_j = Articles.lisan.japanese.split("\n");

const KouSanPreview = async () => {
  const value = await getAnswers(DOCID.kousan);
  return (
    <Preview opposite="lisan" lines_j={lines_j} self="kousan" answers={value} />
  );
};

export default KouSanPreview;
