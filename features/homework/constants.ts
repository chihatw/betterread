import { Homework } from "./schema";

const common: Homework[] = [
  {
    sentence: "請填寫「？」的部分",
    questions: ["遠景？", "中景？", "近景？"],
    sentenceImagePaths: ["/images/picnic.jpeg", "/images/guitar.jpeg"],
    questionImagePaths: [["/images/couple.jpeg"]],
  },
  {
    sentence: "請填寫「？」的部分",
    questions: ["遠景？", "中景？", "近景？"],
    sentenceImagePaths: [],
    questionImagePaths: [["/images/airport.jpeg"]],
  },
  {
    sentence: "想一想，你在紅燈停車的時候，看到的是什麼？",
    questions: ["遠景？", "中景？", "近景？"],
    sentenceImagePaths: [],
    questionImagePaths: [],
  },
  {
    sentence: "A和B,哪一幅圖片中球員離藍框比較遠？",
    questions: ["哪一幅圖？", "怎麼判斷？"],
    sentenceImagePaths: [],
    questionImagePaths: [["/images/basketball.jpeg"]],
  },
  {
    sentence: `你是個電影製作人，有負責製作費用管理。

    你挑選了賈静雯飾演主角後，招聘了一位外籍導演。
    在導演腦袋裡有上面這樣的畫面，但語言溝通不順。

    最後，你要導演畫分鏡圖。`,
    questions: [
      "為了算一算拍攝成本，想知道什麼？",
      "上面A～E哪一幅分鏡圖，比較容易知道拍攝成本？",
      "為什麼？",
    ],
    sentenceImagePaths: ["/images/airport_image.jpeg"],
    questionImagePaths: [
      [],
      [
        "/images/airport_a.jpeg",
        "/images/airport_b.jpeg",
        "/images/airport_c.jpeg",
        "/images/airport_d.jpeg",
        "/images/airport_e.jpeg",
      ],
    ],
  },
  {
    sentence: `小孩在客廳玩了半天打仗遊戲，心想：

「生活在二戰後世代的許多人們，曾以為人類在經歷兩次大規模互相殘殺的戰爭悲劇後，能夠體認到戰爭的殘酷、以及和平的可貴，會更珍惜、更謹慎保護得來不易的寧靜歲月。

然而卻不然，歷史總是不斷重演，為了爭奪資源、為了榮光使命、為了歷史定位、為了意氣之爭，為了各種原因，人們總是一再將自己推入戰爭的漩渦。

在這其中，最可憐的就屬手無寸鐵、痛失家園、從此顛沛流離的人民。

兩次世界大戰黑白紀錄片中帶著家當、揹著棉被和鍋碗瓢盆、拖著一家大小逃難的難民身影，到了今年烏俄戰爭，彩色清晰的電視或網路直播畫面，不變的仍是拖著家當行李、腋下夾著孩子的玩偶、趕著一家大小逃難的難民身影，看得令人無奈，看得令人感嘆自身的渺小無力。」

背後的媽媽看到的是什麼？`,
    questions: ["遠景？", "中景？", "近景？"],
    sentenceImagePaths: ["/images/game.jpeg"],
    questionImagePaths: [],
  },
];
export const HOMEWORKS: { [key: string]: Homework[] } = {
  lisan: common,
  kousan: common,
};
