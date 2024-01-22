import { storage } from "@/firebase/client";
import { buildChineseDigits } from "@/utils/utils";
import { getDownloadURL, ref } from "@firebase/storage";
import ImagePreview from "./ImagePreview";

const SentencePreview = async ({
  index,
  japanese,
  docId,
}: {
  index: number;
  japanese: string;
  docId: string;
}) => {
  let imageSrc = "";
  try {
    const filename = `${docId}/${index}`;
    imageSrc = await getDownloadURL(ref(storage, filename));
  } catch (e) {}

  if (!index) {
    return (
      <div>
        <PreviewRowIndex index={index} />
        <div className="flex gap-4 ">
          <div className="flex-1 space-y-2">
            <div className="text-sm font-extrabold">{japanese}</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PreviewRowIndex index={index} />
      <div className="flex gap-4">
        <div className="flex-1 space-y-2">
          <div className="text-sm font-extrabold">{japanese}</div>
          {imageSrc ? (
            <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
              <ImagePreview imageSrc={imageSrc} />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SentencePreview;

const PreviewRowIndex = ({ index }: { index: number }) => {
  return (
    <div className="basis-10 text-sm text-gray-500">{`第${buildChineseDigits(
      index + 1,
    )}行`}</div>
  );
};
