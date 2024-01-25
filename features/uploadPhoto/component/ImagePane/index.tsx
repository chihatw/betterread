"use client";

import { removeRemoteImage } from "@/actions";
import { Button } from "@/components/ui/button";
import AnswerDisplay from "@/features/temp/components/AnswerDisplay";
import { X } from "lucide-react";
import Image from "next/image";
import UploadForm from "./UploadForm";

/**
 * filename で指定された画像を cloudstorage から取得
 * 取得できなかった場合は、 upload 用の form を表示
 * navigator を使って、 mobile の場合はカメラを起動させる
 */
const ImagePane = ({
  filename,
  imageSrc,
  path,
  answer,
}: {
  filename: string;
  imageSrc: string;
  path: string;
  answer: string;
}) => {
  const handleReset = async () => {
    await removeRemoteImage(filename, path);
  };

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
      ) : (
        <UploadForm filename={filename} answer={answer} />
      )}
      {imageSrc ? (
        <Button
          size="icon"
          variant={"ghost"}
          className="absolute right-2 top-2 bg-white text-red-500"
          onClick={handleReset}
        >
          <X />
        </Button>
      ) : null}
    </div>
  );
};

export default ImagePane;
