import Image from "next/image";
import AnswerDisplay from "./AnswerDisplay";

const ImagePreview = ({
  imageSrc,
  answer,
}: {
  imageSrc: string;
  answer: string;
}) => {
  return (
    <div className="relative mx-auto flex max-w-lg justify-center">
      {imageSrc ? (
        <div className="relative">
          <AnswerDisplay answer={answer} />
          <Image
            src={imageSrc}
            alt=""
            className="rounded-lg"
            width={512}
            height={512}
            sizes="(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw"
          />
        </div>
      ) : null}
    </div>
  );
};

export default ImagePreview;
