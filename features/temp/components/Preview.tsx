import { Button } from "@/components/ui/button";
import Link from "next/link";
import SentencePreview from "./SentencePreview";

const Preview = ({
  opposite,
  lines_j,
  self,
}: {
  opposite: string;
  lines_j: string[];
  self: string;
}) => {
  return (
    <>
      <div className="flex justify-center py-5">
        <Button>
          <Link href={`/${opposite}`}>{`戻る`}</Link>
        </Button>
      </div>
      <div className="space-y-10 px-4">
        {lines_j.map((line, index) => (
          <SentencePreview
            index={index}
            japanese={line}
            key={index}
            docId={self}
          />
        ))}
      </div>
    </>
  );
};

export default Preview;
