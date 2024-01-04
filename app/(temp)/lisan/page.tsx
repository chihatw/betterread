import CountDown from "@/features/temp/components/CountDown";
import Sentence from "@/features/temp/components/Sentence";
import { Articles, DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

export const dynamic = "force-dynamic";

const lines_j = Articles.kousan.japanese.split("\n");
const lines_c = Articles.lisan.chinese.split("\n");

const Page = async () => {
  const value = await getAnswers(DOCID.lisan);

  return (
    <>
      <CountDown opposite="kousan" />
      <div className="space-y-10 px-4">
        {lines_j.map((line, index) => (
          <Sentence
            japanese={line}
            chinese={lines_c[index]}
            index={index}
            key={index}
            value={value}
            docId={DOCID.lisan}
          />
        ))}
      </div>
    </>
  );
};

export default Page;
