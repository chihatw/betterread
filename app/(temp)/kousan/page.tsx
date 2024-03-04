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

const user = "kousan";
const collections = {
  homework: "homework_kousan",
  storyboard: "storyboard_kousan",
  imagePath: "imagePath_kousan",
};
const lines_j = Articles.lisan.japanese.split("\n");
const lines_c = Articles.lisan.chinese.split("\n");
const homework = HOMEWORKS.kousan;

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
    <div>
      <CountDown opposite="lisan" />
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
        imagePaths={imagePaths || []}
        collections={collections}
        storyboardAnswers={storyboardAnswers}
      />
    </div>
  );
};

export default Page;
