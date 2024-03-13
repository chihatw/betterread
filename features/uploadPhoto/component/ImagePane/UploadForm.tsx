"use client";
import AnswerDisplay from "@/features/questions/components/AnswerDisplay";
import { setImagePath } from "@/features/questions/services/actions";
import dynamic from "next/dynamic";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChangeEvent, useRef, useState } from "react";
import { setLocalPreview, uploadImage } from "../../services";

// navigator 使用
const SwitchInput = dynamic(
  () => import("./SwitchInput").then((mod) => mod.SwitchInput),
  { ssr: false },
);

const UploadForm = ({
  user,
  index,
  answer,
  collections,
}: {
  user: string;
  index: number;
  answer: string;
  collections: {
    storyboard: string;
    imagePath: string;
  };
}) => {
  const pathname = usePathname();
  const form = useRef<HTMLFormElement | null>(null);
  const [imageSrc, setImageSrc] = useState("");

  // ファイルが選択された時
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // action を発火させる
    form.current!.requestSubmit();
  };

  const action = async (formData: FormData) => {
    const file = formData.get("image");
    if (!file) {
      form.current!.reset();
      setImageSrc("");
      return;
    }

    setLocalPreview(file as File, setImageSrc);

    // storage
    await uploadImage(user, index, file as File);

    // remote
    await setImagePath(collections, index, user, pathname);
  };

  return (
    <form
      className="relative mx-auto max-w-lg flex-1"
      ref={form}
      action={action}
    >
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
