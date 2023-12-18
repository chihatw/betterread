"use client";

import Sentence from "@/features/temp/components/Sentence";
import { QUESTIONS } from "@/features/temp/constants";
import { db } from "@/firebase/client";
import { doc, getDoc, updateDoc } from "@firebase/firestore";
import { useEffect, useState } from "react";

const japanese = `スーパー高校生
嘉義のバンドフェスティバルに4年ぶりに学生を連れて行ってきました。
今年は、コロナが終息してから初めて日本の高校の吹奏楽部がたくさん演奏するので、前回聞いた習志野高校をもう一度聴きに行くことにしました。
日曜日でしたけど、強豪校の舞台がまた見れることが楽しみでした。
習志野高校の学生は演奏したり、歌ったり、踊ったり、観客を音楽に乗せたりしてくれました。
定番の「凱旋行進曲」の時、前回と同じように、20人くらいの金管楽器奏者が会場の後ろで演奏して、音質と音量に圧倒されられました。
それに、司会者が日本語の2人と中国語の1人の3人でした。
中国語はちょっと分かりにくかったですけど、日本語は9割くらい聞き取れて、嬉しかったです。
とにかく、どのパフォーマンスもすごく華やかで、全員が全力を尽くす姿はとても感動的でした。
あのスーパー高校生はどれくらい練習したのか知りたいです。`;

const chinese = `超級高中生
睽違四年又帶著學生參加嘉義管樂節了。
今年是疫情後第一次有這麼多日本高中管樂團來台灣演出。我們最後選擇了四年前就聽過的習志野高校管樂團。
雖然是星期天加班，但是能再次欣賞強校的管樂表演，仍然相當期待。
高中生們又吹樂器、又唱、又跳、又帶觀眾們跟著音樂一起律動。
其中有一首每次都會演奏的「凱旋進行曲」，這次又再次聽到。和上次一樣，這次也他們安排了二十個銅管樂手站在我們後面吹奏，直接被音色和音質震撼到不行。
還有，這次他們安排了兩位說日文和一位說中文的主持人。
說中文的主持人說的中文雖然不太好理解，但說日文的主持人說的日文大概聽懂了九成，超開心的。
總之，每一段表演都非常華麗精彩，每個人都傾盡全力演出的樣子令人覺得佩服。
超想知道這些超級高中生到底花了多少時間在這些練習上面。`;

const lines_j = japanese.split("\n");
const lines_c = chinese.split("\n");

const Page = () => {
  const [value, setValue] = useState<string[][]>([]);

  useEffect(() => {
    const initialValue = lines_j.map((line) => QUESTIONS.map((q) => "沒興趣"));
    setValue(initialValue);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDoc(doc(db, "temp", "lisan"));
      if (snapshot.exists()) {
        const { string } = snapshot.data();
        const remote = JSON.parse(string);
        setValue(remote);
      }
    };
    fetchData();
  }, []);

  const handleUpdate = (value: string[][]) => {
    updateDoc(doc(db, "temp", "lisan"), { string: JSON.stringify(value) });
  };

  return (
    <div className="space-y-10 px-4">
      {lines_j.map((line, index) => (
        <Sentence
          japanese={line}
          chinese={lines_c[index]}
          index={index}
          key={index}
          value={value}
          handleUpdate={handleUpdate}
        />
      ))}
    </div>
  );
};

export default Page;
