import { useState, useRef, useEffect } from "react";

// ===== パンフレット・リーフレットのダウンロードリンク設定 =====
// ※実際のファイルURLに差し替えてください（Google Drive共有リンク等）
const DOCS = {
  pamphlet: {
    label: "入学案内パンフレット",
    url: "https://www.toshin-kasukabe.com/", // ← 実際のPDF共有URLに変更
    icon: "📘",
  },
  summer: {
    label: "夏期特別招待講習リーフレット",
    url: "https://www.toshin.com/tokubetsu_shotai/", // ← 実際のPDF共有URLに変更
    icon: "☀️",
  },
};

// ===== 資料を案内するキーワード =====
const PAMPHLET_KEYWORDS = ["入学", "入塾", "申し込み", "申込", "コース", "学費", "料金", "費用", "手続き", "流れ"];
const SUMMER_KEYWORDS = ["夏期", "夏期特別", "招待講習", "無料体験", "夏休み", "夏", "招待"];

const KASUKABE_KB = `
【東進ハイスクール春日部校 基本情報】
- 校舎長: 星野 大貴
- 住所: 埼玉県春日部市中央1-52-1 春日部セントラルビル2F
- フリーダイヤル: 0120-104-508
- 直通: 048-734-5611
- 教育理念: 「独立自尊の社会・世界に貢献する人財を育成する」
- 校舎の特色: 仲間と切磋琢磨し全員で合格を目指す活気ある校舎。「こんにちは！」という元気な挨拶が溢れる明るい雰囲気。
- 開館時間: 平日 13:00〜22:00 ／ 土曜日 10:00〜22:00 ／ 日曜日 10:00〜19:00
- 長期休暇中の開館時間: 夏休み期間（7/18〜8/31）8:30〜22:00（通常より早く開館）

【近隣の主要出身高校（合格実績より）】
春日部高等学校、越谷北高等学校、開智高等学校、春日部共栄高等学校、春日部東高等学校、越谷南高等学校

【2026年春日部校 主な合格実績】
国公立: 一橋大学社会学部（春日部高）、東京科学大学生命理工学院（越谷北高）、北海道大学歯学部（開智高）、九州大学経済学部（春日部共栄高）、千葉大学文学部（春日部東高）
私立: 日本医科大学医学部（開智高）、慶応義塾大学商学部（春日部高）、早稲田大学文化構想学部（開智高）、上智大学理工学部（越谷南高）、東京理科大学薬学部（春日部共栄高）

【担任助手（大学生スタッフ）】
・早稲田大学 文化構想学部 文化構想学科（私立開智高校・男子バレーボール部卒）
・東京理科大学 薬学部 創薬科学科（私立春日部共栄高校・HIPHOP部卒）
・筑波大学 理工学域 社会工学類（私立開智高等学校・バドミントン部卒）

【2026年夏期特別招待講習（最重要イベント）】
■ 対象と無料招待講座数（高2・高1・高0生）
- 7月13日（月）までの申込 → 4講座無料招待
- 7月21日（火）までの申込 → 3講座無料招待
- 7月31日（金）までの申込 → 2講座無料招待
※高3生は7月31日（金）までの申込で1講座無料招待
※高0生とは高校生レベルの学力を持つ意欲ある中学生のこと

■ 1講座の内容
- 大学受験コース: 90分授業×5回＋講座修了判定テスト（通常21,450円相当）
- 高校別対応の個別指導コース（高2・高1生）: 60分授業×5回＋判定テスト
- 受講料・入会金・テキスト代すべて無料

■ 受講期間
- 高3生: 2026年8月10日（月）まで
- 高2・高1・高0生: 2026年8月31日（月）まで

■ 受講特典（高2・高1・高0生）
- 「高速マスター基礎力養成講座」（英単語1800等）も体験可能
- 共通テスト対応英単語1800は2026年共通テストでカバー率99.7%達成

■ 申込後の流れ
①申込 → ②学力診断・面談（現状把握・講座選定） → ③ガイダンス（入試情報・東進での学習方法説明） → ④講座決定（個別時間割作成） → ⑤受講開始

■ コースの種類
- 大学受験コース: 難関大合格を目指す先取り学習コース（高3・高2・高1・高0生対象）
- 高校別対応の個別指導コース: 学校の成績アップ・定期テスト対策（高2・高1生対象）
  ※前回の定期テストから各科目20点アップを目指す

■ 1日体験授業も無料実施中（随時受付）

■ 申込方法
- インターネット（スマホ・PC）: www.toshin.com
- 校舎窓口: 春日部校へ直接来校
- お問い合わせ: 0120-104-508

【東進の学習システム】
1. 実力講師陣の映像授業（自分のペースで受講可能・部活や学校行事に合わせて計画的に学習）
2. 高速マスター基礎力養成講座（英単語・計算などの基礎をスマホアプリでも学習）
3. 担任・担任助手によるコーチング面談（過去100万人のデータを活用した個別最適指導）
4. AI演習（志望校別・単元ジャンル演習・個人別定石問題演習など）
5. 志指導（夢・志を育み、「独立自尊の社会・世界に貢献する人財」を目指す）

【入学申込の流れ】
個人面談 → 診断テスト（入学時学力テスト） → テスト結果通知 → 合格（基準点に達しない場合は再テスト） → 入学手続き → 受講開始！

【担任指導体制】
- 担任（社員スタッフ）が志望校合格設計図を作成し、最適な学習計画を立案
- 担任助手（現役大学生）が毎日の学習後に面談し、その日の成果・課題を整理
- 月例報告・保護者説明会・親子面談など、保護者の方との連携も重視
- チームミーティング（5〜6人のグループ）でお互いに切磋琢磨
- 学習管理システム（学力POS）で登校・受講状況をリアルタイムに確認可能

【学費（2026年4月1日より適用・2026年8月31日までの願書確定分）】
※学費は①入学金 ②担任指導費 ③受講料（ユニットまたは単科） ④模試費の合計です。すべて必須です。

〔各費用の内訳〕
- 入学金: 33,000円（税込）※翌年度継続時は不要
- 通期講座1講座（単科）: 85,800円（税込）
- 志望校通期ユニット（まとめて申し込むと割引になる仕組み）:
  ユニット4（通期3講座＋高速マスター）: 315,700円
  ユニット5（通期4講座＋高速マスター）: 392,700円
  ユニット7（通期6講座＋高速マスター）: 541,200円
  ユニット9（通期8講座＋高速マスター）: 685,300円
  ユニット12（通期11講座＋高速マスター）: 893,750円
- 担任指導費: 高3生 77,000円（ユニット生）／高2生 22,000円／高0・高1生 22,000円（税込・年度ごと）
- 模試費: 高3生 22,000円／高2生 11,000円／高0・高1生 8,800円（税込・年度ごと）
- 高校別対応の個別指導コース: 高3生 198,000円／高2生 198,000円／高0・高1生 165,000円

【志望校・学年別 概算（スタート費用の目安）】
※入学金＋志望校通期ユニット＋担任指導費＋模試費の合計です。
※夏期特別招待講習（無料）から始めていただくと、入学金なしでまず東進の授業を体験できます。

〈高3生（受験生）〉
固定費用: 入学金33,000円 ＋ 担任指導費77,000円 ＋ 模試費22,000円 ＝ 132,000円

・私立文系（ユニット5 / 英・英・国・国 ＋ 高速マスター）:
  132,000円 ＋ 392,700円 ＝ 約52万5,000円〜

・私立理系（ユニット5 / 英・英・数・数 ＋ 高速マスター）:
  132,000円 ＋ 392,700円 ＝ 約52万5,000円〜

・国立文系（ユニット5 / 英・英・数・国 ＋ 高速マスター）:
  132,000円 ＋ 392,700円 ＝ 約52万5,000円〜

・国立理系（ユニット5 / 英・英・数・数 ＋ 高速マスター）:
  132,000円 ＋ 392,700円 ＝ 約52万5,000円〜

〈高2生〉
固定費用: 入学金33,000円 ＋ 担任指導費22,000円 ＋ 模試費11,000円 ＝ 66,000円

・私立文系（ユニット4 / 英・英・国 ＋ 高速マスター）:
  66,000円 ＋ 315,700円 ＝ 約38万2,000円〜

・私立理系（ユニット4 / 英・英・数 ＋ 高速マスター）:
  66,000円 ＋ 315,700円 ＝ 約38万2,000円〜

・国立文系（ユニット4 / 英・英・数・国 ＋ 高速マスター）:
  66,000円 ＋ 315,700円 ＝ 約38万2,000円〜

・国立理系（ユニット4 / 英・英・数・数 ＋ 高速マスター）:
  66,000円 ＋ 315,700円 ＝ 約38万2,000円〜

〈高1生・高0生〉
固定費用: 入学金33,000円 ＋ 担任指導費22,000円 ＋ 模試費8,800円 ＝ 63,800円

・英・英 ＋ 高速マスター（ユニット3: 239,250円）スタートの場合:
  63,800円 ＋ 239,250円 ＝ 約30万3,000円〜

※上記はあくまで目安です。お子様の現在の学力・志望校・必要な講座数により実際の費用は変わります。
※夏期特別招待講習（無料）から始める場合、入学金・受講料・テキスト代すべて無料で体験可能です。まずはお気軽にご相談ください。
※正確な費用は校舎での個別面談にてご案内いたします。

【合格スケジュール（学年別）】
・高3生（受験生）: 5月末までに通期講座修了→夏は過去問演習→秋以降は志望校別単元ジャンル演習・第一志望対策演習
・高2生（新高3生）: 7月末までに主要科目受講修了→個人別定石問題演習→12月から新高3生の学習スタート
・高1生（新高2生）: 11月末までに英語・数学・国語の共通テスト範囲を修了→12月から新高2生の学習スタート

【東進の各種コンテンツ・イベント】
- 東進模試（全国規模の模試。学習状況・志望校との距離を定期的に把握）
- 志作文コンクール
- トップリーダーと学ぶワークショップ
- 未来発見講座（将来の夢・志を育むセミナー）
- 大学学部研究会
- 東進 Global English Camp

【各種申込リンク】
資料請求: https://www.toshin.com/grade_select/?kousha_type=1&kousha_code=6
入学申込: https://www.toshin.com/form/es/form_hs.php?url_name=kasukabe&cmt=&form_action=nyugaku
体験授業: https://www.toshin.com/form/es/form_hs.php?url_name=kasukabe&cmt=&top=1&form_action=taiken
個別相談: https://www.toshin.com/grade_select/kobetsu.php?kousha_type=1&kousha_code=6
夏期招待講習（招待状請求）: https://www.toshin.com/grade_select/shotai-invitation.php?kousha_code=6&kousha_type=1
夏期招待講習（申込）: https://www.toshin.com/grade_select/shotai-apply.php?kousha_code=6&kousha_type=1
`;

const SYSTEM_PROMPT = `あなたは「東進ハイスクール春日部校」の保護者サポート窓口のAIアシスタントです。
以下の知識ベースを最優先で参照して回答してください。

${KASUKABE_KB}

【応対方針】
- 相手は生徒の保護者様です。終始、丁寧語・敬語で、落ち着いた安心感のある対応をしてください。
- 春日部校に関する質問には、上記の知識ベースをもとに具体的・正確に答えてください。
- 知識ベースにない詳細（個別スケジュール・成績など）は、「詳細はお電話（0120-104-508）または校舎にて担当者がご案内いたします」と添えてください。
- アクセス・連絡先・リンク先を積極的に案内してください。
- 回答は簡潔に3〜5文程度にまとめ、必要に応じて箇条書きを使ってください。
- 入学・申込に関する質問には、入学案内パンフレットもご案内ください。
- 夏期特別招待講習に関する質問には、夏期特別招待講習リーフレットもご案内ください。
- 回答中に「**」「__」などのMarkdown記法は一切使用しないでください。強調したい箇所は「」や〔〕で囲むか、文章表現で工夫してください。

【料金に関する質問への対応フロー】
保護者様から「料金を知りたい」「学費はいくらか」などの質問があった場合、以下の順序で対応してください。

ステップ1：学年と志望校の方向性をお聞きする
「お子様の学年」と「志望校の方向性（私立文系・私立理系・国立文系・国立理系）」の2点を丁寧にお伺いしてください。まだどちらか一方しかわかっていない場合は、わかっている方だけでも教えていただくよう促してください。

ステップ2：簡易料金目安をお伝えする
学年と志望校の方向性が揃ったら、知識ベースの「志望校・学年別 簡易年間費用目安」をもとに該当する概算をお伝えしてください。必ず「あくまでも目安」であることを明記してください。

ステップ3：校舎への来校・面談を強くお勧めする
料金をお伝えした後は、必ず以下の内容を加えてください：
・概算はお子様の現在の学力や必要な講座数によって変わるため、正確な費用は校舎での個別面談でご案内できること
・特に、校舎長の星野大貴が直接ご対応する「個別面談」を強くお勧めすること。校舎長との面談では、お子様の志望校・現状の学力・最適な学習プランを踏まえた上で、より正確な費用と学習計画をご提案できること
・お電話（0120-104-508）またはウェブからいつでもご予約いただけること
・まずは無料の「1日体験授業」や「夏期特別招待講習（無料）」から始めることもできること`;

const DEFAULT_KEYWORDS = ["入学", "入塾", "退塾", "申し込み", "申込", "解約", "返金", "クレーム", "至急", "緊急", "転塾"];

const QUICK_QUESTIONS = [
  "入学までの流れを教えてください",
  "学費・料金はどのくらいですか？",
  "夏期特別招待講習について教えてください",
  "春日部校の場所・開館時間を教えてください",
  "担任指導とはどのような指導ですか？",
];

// 質問内容からどの資料を案内すべか判定
function detectDocs(text) {
  const show = [];
  if (PAMPHLET_KEYWORDS.some(k => text.includes(k))) show.push("pamphlet");
  if (SUMMER_KEYWORDS.some(k => text.includes(k))) show.push("summer");
  return show;
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "お問い合わせありがとうございます。\n東進ハイスクール春日部校 保護者サポート窓口でございます。\n\nお子様の学習・校舎についてご不明な点がございましたら、お気軽にお申しつけください。",
      urgent: false,
      docs: [],
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [pwInput, setPwInput] = useState("");
  const [pwError, setPwError] = useState(false);
  const [log, setLog] = useState([]);
  const [cfg, setCfg] = useState({
    recipient: "",
    serviceId: "",
    templateId: "",
    publicKey: "",
    keywords: DEFAULT_KEYWORDS.join("、"),
    pamphletUrl: DOCS.pamphlet.url,
    summerUrl: DOCS.summer.url,
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const keywordList = () => cfg.keywords.split(/[、,\s]+/).map(s => s.trim()).filter(Boolean);
  const detectUrgent = (text) => keywordList().filter(k => text.includes(k));

  async function forwardEmail({ question, answer, hits, docs }) {
    const urgent = hits.length > 0;
    const ts = new Date().toLocaleString("ja-JP");
    const subject = (urgent ? "【緊急】" : "【通常】") + "春日部校チャットボット転送";
    const docsNote = docs.length > 0 ? `\n\n【案内した資料】\n${docs.map(d => DOCS[d].label).join("、")}` : "";
    const body = `${urgent ? "■ 緊急通知（検出ワード: " + hits.join("、") + "）\n\n" : ""}受信日時: ${ts}\n\n【ご質問】\n${question}\n\n【AI回答】\n${answer}${docsNote}`;
    const entry = { ts, urgent, hits, question, docs, status: "" };
    const ok = cfg.recipient && cfg.serviceId && cfg.templateId && cfg.publicKey;
    if (ok) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service_id: cfg.serviceId, template_id: cfg.templateId, user_id: cfg.publicKey,
            template_params: { to_email: cfg.recipient, subject, priority: urgent ? "緊急" : "通常", question, answer, timestamp: ts } }),
        });
        entry.status = res.ok ? "送信成功" : `送信失敗(${res.status})`;
      } catch { entry.status = "送信失敗（通信不可）"; }
    } else { entry.status = "未送信（設定未入力）"; }
    entry.mailto = `mailto:${encodeURIComponent(cfg.recipient || "")}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setLog(p => [entry, ...p].slice(0, 20));
  }

  async function send(text) {
    const q = (text || input).trim();
    if (!q || loading) return;
    const hits = detectUrgent(q);
    const docs = detectDocs(q);
    const next = [...messages, { role: "user", content: q, urgent: hits.length > 0, docs: [] }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const raw = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim()
        || "申し訳ございません。しばらく経ってから再度お試しください。";
      const answer = raw.replace(/\*\*(.+?)\*\*/g, "$1").replace(/__(.+?)__/g, "$1");


      setMessages(p => [...p, { role: "assistant", content: answer, urgent: hits.length > 0, docs }]);
      forwardEmail({ question: q, answer, hits, docs });
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "通信に問題が発生いたしました。お電話（0120-104-508）でもご対応いたします。", urgent: false, docs: [] }]);
    } finally { setLoading(false); }
  }

  const navy = "#0A2A6B", blue = "#0B4DA2", accent = "#1565D8", red = "#D32011", amber = "#E65100";
  const bg = "#F4F6FB", line = "#DDE3F0", ink = "#1A2233", sub = "#5A6478";

  // 資料バナーコンポーネント
  const DocBanner = ({ docKey }) => {
    const doc = DOCS[docKey];
    const url = docKey === "pamphlet" ? cfg.pamphletUrl : cfg.summerUrl;
    const color = docKey === "summer" ? amber : navy;
    return (
      <a href={url} target="_blank" rel="noopener noreferrer"
        style={{
          display: "flex", alignItems: "center", gap: 10, background: `${color}10`,
          border: `1px solid ${color}40`, borderRadius: 10, padding: "9px 13px",
          textDecoration: "none", marginTop: 8,
        }}>
        <span style={{ fontSize: 20 }}>{doc.icon}</span>
        <div>
          <div style={{ fontSize: 12, color: sub, marginBottom: 1 }}>関連資料をご確認ください</div>
          <div style={{ fontSize: 13, fontWeight: 700, color }}>{doc.label}</div>
          <div style={{ fontSize: 11, color: sub }}>タップして開く →</div>
        </div>
      </a>
    );
  };

  return (
    <div style={{ fontFamily: "'Noto Sans JP', system-ui, sans-serif", background: bg, color: ink, borderRadius: 16, overflow: "hidden", border: `1px solid ${line}`, maxWidth: 780, margin: "0 auto" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');`}</style>

      {/* ヘッダー */}
      <div style={{ background: `linear-gradient(135deg, ${navy} 0%, ${blue} 100%)`, padding: "14px 20px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#fff", color: navy, fontWeight: 900, fontSize: 13, width: 48, height: 48, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1.2, letterSpacing: -0.5 }}>
            <span>東進</span><span style={{ fontSize: 10, fontWeight: 700 }}>春日部</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 0.4 }}>東進ハイスクール 春日部校</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>保護者サポート窓口 / ☎ 0120-104-508</div>
          </div>
        </div>
        <button onClick={() => {
          if (showSettings) {
            setShowSettings(false); setAdminUnlocked(false); setPwInput(""); setPwError(false);
          } else {
            setShowSettings(true);
          }
        }} style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.35)", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          {showSettings ? "閉じる" : "管理設定"}
        </button>
      </div>

      {/* 設定パネル */}
      {showSettings && (
        <div style={{ background: "#fff", borderBottom: `1px solid ${line}`, padding: "16px 20px" }}>
          {/* パスワード認証 */}
          {!adminUnlocked && (
            <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
              <div style={{ fontSize: 13, color: navy, fontWeight: 700, marginBottom: 10 }}>🔒 スタッフ専用エリア</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
                <input
                  type="password" value={pwInput} placeholder="パスワードを入力"
                  onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                  onKeyDown={e => { if (e.key === "Enter") { if (pwInput === "0327") { setAdminUnlocked(true); setPwError(false); } else { setPwError(true); setPwInput(""); } } }}
                  style={{ padding: "8px 12px", border: `1px solid ${pwError ? red : line}`, borderRadius: 8, fontSize: 14, width: 180, fontFamily: "inherit", textAlign: "center" }}
                />
                <button onClick={() => { if (pwInput === "0327") { setAdminUnlocked(true); setPwError(false); } else { setPwError(true); setPwInput(""); } }}
                  style={{ background: navy, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                  認証
                </button>
              </div>
              {pwError && <div style={{ color: red, fontSize: 12, marginTop: 6 }}>パスワードが正しくありません</div>}
            </div>
          )}
          {/* 認証後のみ表示 */}
          {adminUnlocked && (<div>
          <div style={{ fontWeight: 700, fontSize: 13, color: navy, marginBottom: 10 }}>メール転送設定（EmailJS）</div>
          {[["転送先メールアドレス","recipient","staff@example.com"],["Service ID","serviceId","service_xxx"],["Template ID","templateId","template_xxx"],["Public Key","publicKey","xxxxxxxx"]].map(([label,k,ph]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>{label}</div>
              <input value={cfg[k]} placeholder={ph} onChange={e => setCfg({...cfg,[k]:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ fontWeight: 700, fontSize: 13, color: navy, margin: "14px 0 10px" }}>資料URLの設定</div>
          {[["入学案内パンフレットのURL","pamphletUrl","https://..."],["夏期招待講習リーフレットのURL","summerUrl","https://..."]].map(([label,k,ph]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>{label}</div>
              <input value={cfg[k]} placeholder={ph} onChange={e => setCfg({...cfg,[k]:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>緊急ワード（読点・カンマ区切り）</div>
            <input value={cfg.keywords} onChange={e => setCfg({...cfg,keywords:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
          <p style={{ fontSize: 11, color: sub, lineHeight: 1.6, margin: "8px 0 0" }}>
            資料URLはGoogle DriveやDropboxの共有リンクを設定してください。入学・夏期講習に関連するご質問では自動で案内されます。
          </p>
          {/* 転送ログ（管理設定内のみ表示） */}
          {log.length > 0 && (
            <div style={{ marginTop: 16, borderTop: `1px solid ${line}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: navy, marginBottom: 8 }}>📨 転送ログ</div>
              {log.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sub, padding: "5px 0", borderBottom: i < log.length - 1 ? `1px dashed ${line}` : "none" }}>
                  {l.urgent && <span style={{ background: red, color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 4, flexShrink: 0 }}>緊急</span>}
                  {l.docs && l.docs.length > 0 && <span style={{ background: amber, color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 4, flexShrink: 0 }}>資料案内</span>}
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.ts}｜{l.question}</span>
                  <span style={{ color: l.status.includes("成功") ? "#1B7F3B" : l.status.includes("失敗") ? red : sub, flexShrink: 0 }}>{l.status}</span>
                  <a href={l.mailto} style={{ color: accent, textDecoration: "none", flexShrink: 0 }}>手動転送</a>
                </div>
              ))}
            </div>
          )}
          </div>)}
        </div>
      )}

      {/* チャット本体 */}
      <div ref={scrollRef} style={{ height: 400, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: 8, background: navy, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 2 }}>東進</div>
            )}
            <div style={{ maxWidth: "74%" }}>
              <div style={{
                whiteSpace: "pre-wrap", lineHeight: 1.75, fontSize: 14, padding: "11px 14px", borderRadius: 14,
                background: m.role === "user" ? blue : "#fff",
                color: m.role === "user" ? "#fff" : ink,
                border: m.role === "user" ? "none" : `1px solid ${line}`,
                borderTopRightRadius: m.role === "user" ? 4 : 14,
                borderTopLeftRadius: m.role === "user" ? 14 : 4,
              }}>
                {m.content}
              </div>
              {/* 資料バナー */}
              {m.role === "assistant" && m.docs && m.docs.length > 0 && (
                <div style={{ marginTop: 4 }}>
                  {m.docs.map(d => <DocBanner key={d} docKey={d} />)}
                </div>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: navy, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>東進</div>
            <div style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 14, borderTopLeftRadius: 4, padding: "10px 14px", fontSize: 13, color: sub }}>入力中…</div>
          </div>
        )}
      </div>

      {/* よくある質問 */}
      <div style={{ borderTop: `1px solid ${line}`, background: "#fff", padding: "10px 16px" }}>
        <div style={{ fontSize: 11, color: sub, marginBottom: 6, fontWeight: 500 }}>よくあるご質問</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => send(q)} disabled={loading}
              style={{ background: `${navy}10`, color: navy, border: `1px solid ${navy}30`, borderRadius: 20, padding: "5px 11px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, whiteSpace: "nowrap" }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 資料一覧ショートカット */}
      <div style={{ borderTop: `1px solid ${line}`, background: `${navy}05`, padding: "10px 16px", display: "flex", gap: 8 }}>
        <div style={{ fontSize: 11, color: sub, alignSelf: "center", flexShrink: 0, fontWeight: 500 }}>資料：</div>
        {Object.entries(DOCS).map(([key, doc]) => {
          const url = key === "pamphlet" ? cfg.pamphletUrl : cfg.summerUrl;
          return (
            <a key={key} href={url} target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 5, background: "#fff", border: `1px solid ${line}`, borderRadius: 8, padding: "5px 10px", textDecoration: "none", color: ink, fontSize: 12, fontWeight: 500 }}>
              <span>{doc.icon}</span>{doc.label}
            </a>
          );
        })}
      </div>

      {/* 入力欄 */}
      <div style={{ borderTop: `1px solid ${line}`, background: "#fff", padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="ご質問を入力してください（Enterで送信 / Shift+Enterで改行）" rows={1}
          style={{ flex: 1, resize: "none", border: `1px solid ${line}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", color: ink, outline: "none", maxHeight: 100, boxSizing: "border-box" }} />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#9DB2D6" : accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
          送信
        </button>
      </div>

      {/* フッター情報 */}
      <div style={{ background: `${navy}08`, borderTop: `1px solid ${line}`, padding: "10px 20px", display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="https://www.toshin-kasukabe.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>🏫 春日部校サイト</a>
        <a href="https://www.toshin.com/grade_select/kobetsu.php?kousha_type=1&kousha_code=6" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>📋 個別相談申込</a>
        <a href="https://www.toshin.com/grade_select/shotai-invitation.php?kousha_code=6&kousha_type=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>☀️ 夏期招待講習</a>
        <span style={{ fontSize: 12, color: sub, marginLeft: "auto" }}>☎ 0120-104-508</span>
      </div>


    </div>
  );
}
