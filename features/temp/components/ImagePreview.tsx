import Image from "next/image";

const ImagePreview = ({ imageSrc }: { imageSrc: string }) => {
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
      ) : null}
    </div>
  );
};

export default ImagePreview;
