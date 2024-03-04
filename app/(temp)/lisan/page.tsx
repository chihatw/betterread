import HomeworkPane from "@/features/homework/components/HomeworkPane";
import { HOMEWORKS } from "@/features/homework/constants";
import { getHomeworkAnswers } from "@/features/homework/services/server";
import {
  buildHomeworkAnswers,
  buildIndexedHomework,
} from "@/features/homework/services/utils";
import Questions from "@/features/questions/components";
import CountDown from "@/features/questions/components/CountDown";
import { Articles } from "@/features/questions/constants";
import {
  getImagePaths,
  getStoryboardAnswers,
} from "@/features/questions/services/server";

export const dynamic = "force-dynamic";

const user = "lisan";
const collections = {
  homework: "homework_lisan",
  storyboard: "storyboard_lisan",
  imagePath: "imagePath_lisan",
};
const lines_j = Articles.kousan.japanese.split("\n");
const lines_c = Articles.kousan.chinese.split("\n");
const homework = HOMEWORKS.lisan;

const Page = async () => {
  const storyboardAnswers = await getStoryboardAnswers(collections.storyboard);
  const imagePaths = await getImagePaths(collections.imagePath);

  const _homeworkAnswers = await getHomeworkAnswers(collections.homework);

  const indexedHomework = buildIndexedHomework(homework);
  const { homeworkAnswers, ratio } = buildHomeworkAnswers(
    _homeworkAnswers,
    indexedHomework,
  );

  return (
    <>
      <CountDown opposite="kousan" />
      <HomeworkPane
        ratio={ratio}
        homework={indexedHomework}
        answers={homeworkAnswers}
        collection={collections.homework}
      />
      <Questions
        user={user}
        chinese={lines_c}
        japanese={lines_j}
        imagePaths={imagePaths}
        collections={collections}
        storyboardAnswers={storyboardAnswers}
      />
    </>
  );
};

export default Page;
