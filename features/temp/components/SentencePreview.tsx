import { storage } from "@/firebase/client";
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
  // debug
  console.log(imageSrc);

  if (!index) {
    return (
      <div className="flex gap-4">
        <div className="basis-2 text-right text-xs">{index + 1}</div>
        <div className="flex-1 space-y-2">
          <div className="text-sm font-extrabold">{japanese}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex gap-4">
      <div className="basis-2 text-right text-xs">{index + 1}</div>
      <div className="flex-1 space-y-2">
        <div className="text-sm font-extrabold">{japanese}</div>
        {imageSrc ? (
          <div className="space-y-2 rounded-lg bg-white bg-opacity-60 p-3">
            <ImagePreview imageSrc={imageSrc} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default SentencePreview;
