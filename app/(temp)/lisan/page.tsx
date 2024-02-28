import Questions from "@/features/questions/components";
import CountDown from "@/features/questions/components/CountDown";
import { Articles, DOCID } from "@/features/questions/constants";
import { getAnswers } from "@/features/questions/services/server";

// export const dynamic = "force-dynamic";

const lines_j = Articles.kousan.japanese.split("\n");
const lines_c = Articles.kousan.chinese.split("\n");

const Page = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.lisan);
  return (
    <>
      <CountDown opposite="kousan" />
      <Questions
        docId={DOCID.lisan}
        chinese={lines_c}
        japanese={lines_j}
        answers={answers || []}
        imagePaths={imagePaths || []}
      />
    </>
  );
};

export default Page;
