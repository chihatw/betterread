import Sentence from "@/features/temp/components/Sentence";
import { DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

export const dynamic = "force-dynamic";

const japanese = `500元のコーヒー
先週、友達と一緒にコーヒーショップへ行きました。
バリスタは台湾人の女性と結婚した外国人です。
コーヒーの栽培からお店の経営まで、ゆっくり勉強してお店を開いたそうです。
今回はアイリッシュコーヒーを飲みました。
注文してから出てくるまで30分以上かかりました。
砂糖とウイスキーをゆっくりと温めて、ホットコーヒーと生クリームを入れます。
ウィスキーと砂糖の香りが高級感があって、美味しかったです。
バリスタのコーヒーを作る様子はショーのようでした。
デザートも芸術作品みたいなのに、美味しかったです。
台湾では、普通見た目がきれいなものは美味しくないので、驚きました。`;

const chinese = `500元的咖啡
上周和朋友一起去一家很特別的咖啡店
咖啡師是一位外國人,因為和台灣人結婚而留在台灣
從種咖啡開始到開咖啡店,慢慢學習當老闆
這次喝的是愛爾蘭咖啡
從點餐到喝,需要30分鐘以上的時間
把糖加上威士忌慢慢煮之後再加上熱咖啡及奶油就完成這杯500元的咖啡
真的很好喝,酒香加上糖的香味讓咖啡變的很高級
看老闆製作咖啡就像看表演一樣
店裡的甜點也很特別,像藝術品一樣,而且很美味
在台灣通常看起來好看的都不太好吃　這家店真的很令我驚訝!`;

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
