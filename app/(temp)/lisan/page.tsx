import HomeworkPane from "@/features/homework/components/HomeworkPane";
import { HOMEWORKS } from "@/features/homework/constants";
import { getHomeworkAnswers } from "@/features/homework/services/server";
import {
  buildHomeworkAnswers,
  buildIndexedHomework,
} from "@/features/homework/services/utils";
import Questions from "@/features/questions/components";
import CountDown from "@/features/questions/components/CountDown";
import { Articles, DOCID } from "@/features/questions/constants";
import { getAnswers } from "@/features/questions/services/server";

export const dynamic = "force-dynamic";

const collection = "homework_lisan";
const lines_j = Articles.kousan.japanese.split("\n");
const lines_c = Articles.kousan.chinese.split("\n");
const homework = HOMEWORKS.lisan;

const Page = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.lisan);
  const rawAnswers = await getHomeworkAnswers(collection);

  const indexedHomework = buildIndexedHomework(homework);
  const { homeworkAnswers, ratio } = buildHomeworkAnswers(
    rawAnswers,
    indexedHomework,
  );

  return (
    <>
      <CountDown opposite="kousan" />
      <HomeworkPane
        ratio={ratio}
        homework={indexedHomework}
        answers={homeworkAnswers}
        collection={collection}
      />
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
