import Sentence from "@/features/temp/components/Sentence";
import { DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

export const dynamic = "force-dynamic";

const japanese = `睡眠不足
近所で家を建てています。
毎朝、ドンドンという音が聞こえます。
そんなにうるさくはないですけど、眠れません。
今は、仕事のストレスで寝つきが悪いので、大変です。
規制があるので、休みの日はゆっくり寝られると思っていましたが、朝７時半から工事が始まりました。
工事の音が怖くなりました。
休日も工事をするなんて、どれだけ急いでいるのでしょうか。`;

const chinese = `睡眠不足
家裡附近在蓋房子
每天早上都會聽到敲打的聲音
雖然沒有很吵卻是影響了我的睡眠
工作壓力大的時候就很難入眠,現在更糟了
台灣對於施工噪音是有管制的　周末假日基本上是不能施工的　我以為假日時就可以安安靜靜的睡覺　想不到,這個工地假日也在工作而且從早上7:30就開始
我簡直要崩潰,那種敲打聲想到就害怕
到底是有多急,連假日都要施工啦`;

const lines_j = japanese.split("\n");
const lines_c = chinese.split("\n");

const Page = async () => {
  const value = await getAnswers(DOCID.kousan);

  return (
    <div className="space-y-10 px-4">
      {lines_j.map((line, index) => (
        <Sentence
          japanese={line}
          chinese={lines_c[index]}
          index={index}
          key={index}
          value={value}
          docId={DOCID.kousan}
        />
      ))}
    </div>
  );
};

export default Page;
