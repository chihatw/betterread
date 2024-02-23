"use client";
import AnswerDisplay from "@/features/questions/components/AnswerDisplay";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChangeEvent, useRef, useState } from "react";
import { setLocalPreview } from "../../services";

// navigator 使用
const SwitchInput = dynamic(
  () => import("./SwitchInput").then((mod) => mod.SwitchInput),
  { ssr: false },
);

const UploadForm = ({
  answer,
  uploadImage,
}: {
  answer: string;
  uploadImage: (file: File) => void;
}) => {
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

    // local
    setLocalPreview(file, setImageSrc);

    // remote
    uploadImage(file);
  };

  return (
    <form className="relative mx-auto max-w-lg flex-1" ref={formRef}>
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
        <SwitchInput handleChange={handleChange} />
      )}
    </form>
  );
};

export default UploadForm;
