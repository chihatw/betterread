import Preview from "@/features/questions/components/Preview";
import { Articles } from "@/features/questions/constants";
import {
  getImagePaths,
  getStoryboardAnswers,
} from "@/features/questions/services/server";

const collections = {
  homework: "homework_lisan",
  storyboard: "storyboard_lisan",
  imagePath: "imagePath_lisan",
};
const lines_j = Articles.kousan.japanese.split("\n");

const LisanPreview = async () => {
  const storyboardAnswers = await getStoryboardAnswers(collections.storyboard);
  const imagePaths = await getImagePaths(collections.imagePath);
  return (
    <Preview
      opposite="kousan"
      lines_j={lines_j}
      imagePaths={imagePaths}
      storyboardAnswers={storyboardAnswers}
    />
  );
};

export default LisanPreview;
