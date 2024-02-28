import Questions from "@/features/questions/components";
import CountDown from "@/features/questions/components/CountDown";
import { Articles, DOCID } from "@/features/questions/constants";
import { getAnswers } from "@/features/questions/services/server";

// export const dynamic = "force-dynamic";

const lines_j = Articles.lisan.japanese.split("\n");
const lines_c = Articles.lisan.chinese.split("\n");

const Page = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.kousan);

  return (
    <div>
      <CountDown opposite="lisan" />
      <Questions
        docId={DOCID.kousan}
        chinese={lines_c}
        japanese={lines_j}
        answers={answers || []}
        imagePaths={imagePaths || []}
      />
    </div>
  );
};

export default Page;
