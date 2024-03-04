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

const collection = "homework_kousan";
const lines_j = Articles.lisan.japanese.split("\n");
const lines_c = Articles.lisan.chinese.split("\n");
const homework = HOMEWORKS.kousan;

const Page = async () => {
  const { answers, imagePaths } = await getAnswers(DOCID.kousan);
  const rawAnswers = await getHomeworkAnswers(collection);

  const indexedHomework = buildIndexedHomework(homework);
  const { homeworkAnswers, ratio } = buildHomeworkAnswers(
    rawAnswers,
    indexedHomework,
  );

  return (
    <div>
      <CountDown opposite="lisan" />
      <HomeworkPane
        ratio={ratio}
        homework={indexedHomework}
        answers={homeworkAnswers}
        collection={collection}
      />
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
