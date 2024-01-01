import Sentence from "@/features/temp/components/Sentence";
import { DOCID } from "@/features/temp/constants";
import { getAnswers } from "@/firebase/admin";

export const dynamic = "force-dynamic";

const japanese = `解決すべき問題
先週、新北市の中学校で学生が同級生にナイフで刺されて、亡くなりました。
関係者は、加害者のAと、AのクラスメイトのB、Bの親友のC、被害者のDの4人です。
事件の始まりは、BがCのクラスを訪ねた時、Cが不在で、DがBに対して「クラスが違うのに、どうして入ってくるんだ」と言ったことだそうです。
怒ったBが、Aを呼んで来て、AとDが喧嘩になって、最終的にAがナイフで10回刺して、Dは大量出血で翌日亡くなりました。
調査結果を読んで、すごくバカバカしいと思いましたが、これが中学校の日常です。
事件後、AとBは裁判所に送致されましたが、二人ともインスタに楽しそうな写真と自分達はどこも悪くないという文を載せていました。
人を傷つけたことは恥ずかしくないようです。
昔は学校で持ち物検査ができましたけど、今すると非難されます。
Bを教室から連れ出したのが先生だったら、Aは先生を刺したのでしょうか。
教師として、この事件は悲しいですが、校内で殺傷事件が起こり得る現状は早急に解決しなければいけないと感じています。`;

const chinese = `必須要解決的教育問題
上週，有一個新北市的學生在學校被另一個學生用彈簧刀攻擊，不幸身亡。
事件主角總共有四位：持刀的學生(A生)及其女生同學(B生)、對女生朋友的好朋友(C生)、身亡的學生(D生)。前兩位和後兩位是不同班級的學生。
一開始是B生為了要找C生聊天，就進到C生的教室，但是當時C生不在教室裡。D生看到別班的同學進到自己的教室，就對B生說：「妳又不是我們班的，怎麼可以進來？」
B生聽完之後心生不滿，回班上找A生幫忙出一口氣。然後A生就到現場和D生吵架，後來變成肢體衝突，最後刀就拿出來對著D生猛刺了十刀。D生當場大量失血休克，送醫後隔天不治身亡。
看到調查結果後覺得整個事件的前因後果相當荒謬，但也是現在我們國中老師的日常。
當天事件發生後，A生和B生立刻被送進少年法庭，但同時兩人的IG都上傳了看起來開心的照片和覺得自己沒有任何錯的想法。
傷害別人這件事對他們來說，好像一點都不羞恥。
在以前學校老師是可以搜學生書包的，現在如果搜書包可能都會被告。
如果今天把Ｂ生請出教室的是導師，那Ａ生會不會也把刀子刺向導師呢？
身為老師看到這個事件實在很難過，但也覺得這是個急迫必須解決的問題。`;

const lines_j = japanese.split("\n");
const lines_c = chinese.split("\n");

const Page = async () => {
  const value = await getAnswers(DOCID.lisan);

  return (
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
  );
};

export default Page;
