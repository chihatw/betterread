import Preview from "@/features/questions/components/Preview";
import { Articles, DOCID } from "@/features/questions/constants";
import { getAnswers } from "@/features/questions/services/server";

const lines_j = Articles.kousan.japanese.split("\n");

const LisanPreview = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.lisan);
  return (
    <Preview
      opposite="kousan"
      lines_j={lines_j}
      answers={answers || []}
      imagePaths={imagePaths || []}
    />
  );
};

export default LisanPreview;
