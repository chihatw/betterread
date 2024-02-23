import Preview from "@/features/questions/components/Preview";
import { Articles, DOCID } from "@/features/questions/constants";
import { getAnswers } from "@/features/questions/services/server";

const lines_j = Articles.lisan.japanese.split("\n");

const KouSanPreview = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.kousan);
  return (
    <Preview
      opposite="lisan"
      lines_j={lines_j}
      answers={answers || []}
      imagePaths={imagePaths || []}
    />
  );
};

export default KouSanPreview;
