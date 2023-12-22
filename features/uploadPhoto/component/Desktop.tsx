"use client";

import { Button } from "@/components/ui/button";
import { storage } from "@/firebase/client";
import { deleteObject, getDownloadURL, ref } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import UploadForm from "./UploadForm";

const FILENAME = "Desktop";

const Desktop = () => {
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    try {
      getDownloadURL(ref(storage, FILENAME)).then((url) => {
        setImageSrc(url || "");
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const handleReset = () => {
    // clear local state
    setImageSrc("");

    // delete remote file
    const storageRef = ref(storage, FILENAME);
    deleteObject(storageRef);
  };

  return (
    <div className="relative mx-auto flex max-w-lg justify-center">
      {imageSrc ? (
        <Image src={imageSrc} alt="" width={640} height={320} />
      ) : (
        <UploadForm filename={FILENAME} />
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

export default Desktop;
