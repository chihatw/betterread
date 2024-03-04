import Preview from "@/features/questions/components/Preview";
import { Articles } from "@/features/questions/constants";
import {
  getImagePaths,
  getStoryboardAnswers,
} from "@/features/questions/services/server";

const collections = {
  homework: "homework_kousan",
  storyboard: "storyboard_kousan",
  imagePath: "imagePath_kousan",
};

const lines_j = Articles.lisan.japanese.split("\n");

const KouSanPreview = async () => {
  const storyboardAnswers = await getStoryboardAnswers(collections.storyboard);
  const imagePaths = await getImagePaths(collections.imagePath);
  return (
    <Preview
      opposite="lisan"
      lines_j={lines_j}
      imagePaths={imagePaths}
      storyboardAnswers={storyboardAnswers}
    />
  );
};

export default KouSanPreview;
