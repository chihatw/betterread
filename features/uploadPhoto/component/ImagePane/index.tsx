"use client";

import { Button } from "@/components/ui/button";
import AnswerDisplay from "@/features/questions/components/AnswerDisplay";
import { ANSWERS } from "@/features/questions/constants";
import { removeImagePath } from "@/features/questions/services/actions";
import { storage } from "@/firebase/client";
import { getDownloadURL, ref } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { removeImage } from "../../services";
import UploadForm from "./UploadForm";

/**
 * imagePath で指定された画像を cloudstorage から取得
 * 取得できなかった場合は、 upload 用の form を表示
 * navigator を使って、 mobile の場合はカメラを起動させる
 */
const ImagePane = ({
  user,
  index,
  answer,
  imagePath,
  collections,
}: {
  user: string;
  index: number;
  answer: string;
  imagePath: string;
  collections: {
    storyboard: string;
    imagePath: string;
  };
}) => {
  const pathname = usePathname();
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    if (!imagePath) {
      setImageSrc("");
      return;
    }
    const fetchData = async () => {
      try {
        const imageSrc = (await getDownloadURL(ref(storage, imagePath))) || "";
        setImageSrc(imageSrc);
      } catch (e) {
        console.error(e);
      }
    };
    fetchData();
  }, [imagePath]);

  const action = async () => {
    setImageSrc("");
    await removeImage(user, index);
    await removeImagePath(collections, index, pathname);
  };

  return (
    <div className="relative mx-auto flex max-w-lg justify-center">
      {imageSrc ? (
        <div className="relative">
          <AnswerDisplay answer={answer || ANSWERS.no} />
          <Image
            src={imageSrc}
            alt=""
            className="rounded-lg"
            width={512}
            height={512}
            sizes="(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw"
          />
        </div>
      ) : (
        <UploadForm
          user={user}
          index={index}
          answer={answer}
          collections={collections}
        />
      )}
      {imageSrc ? (
        <form action={action}>
          <Button
            type="submit"
            size="icon"
            variant={"ghost"}
            className="absolute right-2 top-2 bg-white text-red-500"
            // onClick={handleClick}
          >
            <X />
          </Button>
        </form>
      ) : null}
    </div>
  );
};

export default ImagePane;
