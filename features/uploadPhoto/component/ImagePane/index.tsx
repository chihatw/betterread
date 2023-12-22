"use client";

import { Button } from "@/components/ui/button";
import { storage } from "@/firebase/client";
import { deleteObject, getDownloadURL, ref } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadForm from "./UploadForm";

const ImagePane = ({ filename }: { filename: string }) => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    try {
      getDownloadURL(ref(storage, filename)).then((url) => {
        setImageSrc(url || "");
      });
    } catch (e) {
      console.log(e);
    }
  }, [filename]);

  const handleReset = () => {
    // clear local state
    setImageSrc("");

    // delete remote file
    const storageRef = ref(storage, filename);
    deleteObject(storageRef);
  };
  return (
    <div className="relative mx-auto flex max-w-lg justify-center">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt=""
          className="mx-auto rounded-lg"
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
