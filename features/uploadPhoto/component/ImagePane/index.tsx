"use client";

import { Button } from "@/components/ui/button";
import AnswerDisplay from "@/features/questions/components/AnswerDisplay";
import { ANSWERS } from "@/features/questions/constants";
import { storage } from "@/firebase/client";
import { getDownloadURL, ref } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadForm from "./UploadForm";

/**
 * imagePath で指定された画像を cloudstorage から取得
 * 取得できなかった場合は、 upload 用の form を表示
 * navigator を使って、 mobile の場合はカメラを起動させる
 */
const ImagePane = ({
  answer,
  imagePath,
  uploadImage,
  removeImage,
}: {
  answer: string;
  imagePath: string;
  uploadImage: (file: File) => void;
  removeImage: () => void;
}) => {
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
        <UploadForm answer={answer} uploadImage={uploadImage} />
      )}
      {imageSrc ? (
        <Button
          size="icon"
          variant={"ghost"}
          className="absolute right-2 top-2 bg-white text-red-500"
          onClick={removeImage}
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
};

export default ImagePane;
