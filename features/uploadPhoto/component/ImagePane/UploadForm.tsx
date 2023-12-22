"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { storage } from "@/firebase/client";
import { ref, uploadBytes } from "@firebase/storage";
import { X } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { setLocalPreview } from "../..";

const UploadForm = ({ filename }: { filename: string }) => {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  // ファイルが選択された時
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    // 1つ目のファイルを取得
    const file = files ? files[0] : null;

    // ファイルがない場合
    if (!file) {
      formRef.current!.reset();
      setImageSrc("");
      return;
    }

    setLocalPreview(file, setImageSrc);

    /**
     * remote: ファイルをアップロード
     */
    const storageRef = ref(storage, filename);
    uploadBytes(storageRef, file);
  };

  const handleReset = () => {
    const form = formRef.current;
    if (!form) return;
    form.reset();
    setImageSrc("");
  };

  return (
    <form className="relative mx-auto max-w-lg flex-1" ref={formRef}>
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
        <Input type="file" accept="image/*" onChange={handleChange} />
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
    </form>
  );
};

export default UploadForm;
