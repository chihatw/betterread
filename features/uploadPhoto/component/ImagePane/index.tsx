"use client";

import { Button } from "@/components/ui/button";
import { storage } from "@/firebase/client";
import { deleteObject, getDownloadURL, ref } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadForm from "./UploadForm";
/**
 * filename で指定された画像を cloudstorage から取得
 * 取得できなかった場合は、 upload 用の form を表示
 * navigator を使って、 mobile の場合はカメラを起動させる
 */
const ImagePane = ({ filename }: { filename: string }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    getDownloadURL(ref(storage, filename)).then((url) => {
      setImageSrc(url || "");
    });
  }, [filename]);

  const handleReset = () => {
    // local
    setImageSrc("");

    // remote
    const storageRef = ref(storage, filename);
    deleteObject(storageRef);
  };

  return (
    <div className="relative mx-auto flex max-w-lg justify-center">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          className="rounded-lg"
          width={512}
          height={512}
          sizes="(max-width: 768px) 100vw, (max-height: 1200px) 50vw, 50vw"
        />
      ) : (
        <UploadForm filename={filename} />
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
