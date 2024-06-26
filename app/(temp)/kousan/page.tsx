import HomeWorkProgressPies from "@/features/homework/components/HomeWorkProgressPies";
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
import { getVFXRatio } from "@/features/questions/services/utils";

// export const dynamic = "force-dynamic";

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
    lines_j,
    imagePaths,
  );

  const ratio_vfx = getVFXRatio(imagePaths, storyboardAnswers);

  return (
    <div>
      <CountDown opposite="lisan" />
      <HomeWorkProgressPies ratio={ratio} ratio_vfx={ratio_vfx} />
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
      <HomeWorkProgressPies ratio={ratio} ratio_vfx={ratio_vfx} />
    </div>
  );
};

export default Page;
