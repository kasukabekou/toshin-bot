import { useState, useRef, useEffect } from "react";

// ===== 繝代Φ繝輔Ξ繝・ヨ繝ｻ繝ｪ繝ｼ繝輔Ξ繝・ヨ縺ｮ繝繧ｦ繝ｳ繝ｭ繝ｼ繝峨Μ繝ｳ繧ｯ險ｭ螳・=====
// 窶ｻ螳滄圀縺ｮ繝輔ぃ繧､繝ｫURL縺ｫ蟾ｮ縺玲崛縺医※縺上□縺輔＞・・oogle Drive蜈ｱ譛峨Μ繝ｳ繧ｯ遲会ｼ・const DOCS = {
  pamphlet: {
    label: "蜈･蟄ｦ譯亥・繝代Φ繝輔Ξ繝・ヨ",
    url: "https://www.toshin-kasukabe.com/", // 竊・螳滄圀縺ｮPDF蜈ｱ譛蔚RL縺ｫ螟画峩
    icon: "祷",
  },
  summer: {
    label: "螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ偵Μ繝ｼ繝輔Ξ繝・ヨ",
    url: "https://www.toshin.com/tokubetsu_shotai/", // 竊・螳滄圀縺ｮPDF蜈ｱ譛蔚RL縺ｫ螟画峩
    icon: "笘・・,
  },
};

// ===== 雉・侭繧呈｡亥・縺吶ｋ繧ｭ繝ｼ繝ｯ繝ｼ繝・=====
const PAMPHLET_KEYWORDS = ["蜈･蟄ｦ", "蜈･蝪ｾ", "逕ｳ縺苓ｾｼ縺ｿ", "逕ｳ霎ｼ", "繧ｳ繝ｼ繧ｹ", "蟄ｦ雋ｻ", "譁咎≡", "雋ｻ逕ｨ", "謇狗ｶ壹″", "豬√ｌ"];
const SUMMER_KEYWORDS = ["螟乗悄", "螟乗悄迚ｹ蛻･", "諡帛ｾ・ｬ帷ｿ・, "辟｡譁吩ｽ馴ｨ・, "螟丈ｼ代∩", "螟・, "諡帛ｾ・];

const KASUKABE_KB = `
縲先擲騾ｲ繝上う繧ｹ繧ｯ繝ｼ繝ｫ譏･譌･驛ｨ譬｡ 蝓ｺ譛ｬ諠・ｱ縲・- 譬｡闊朱聞: 譏滄㍽ 螟ｧ雋ｴ
- 菴乗園: 蝓ｼ邇臥恁譏･譌･驛ｨ蟶ゆｸｭ螟ｮ1-52-1 譏･譌･驛ｨ繧ｻ繝ｳ繝医Λ繝ｫ繝薙Ν2F
- 繝輔Μ繝ｼ繝繧､繝､繝ｫ: 0120-104-508
- 逶ｴ騾・ 048-734-5611
- 謨呵ご逅・ｿｵ: 縲檎峡遶玖・蟆翫・遉ｾ莨壹・荳也阜縺ｫ雋｢迪ｮ縺吶ｋ莠ｺ雋｡繧定ご謌舌☆繧九・- 譬｡闊弱・迚ｹ濶ｲ: 莉ｲ髢薙→蛻・｣狗世逎ｨ縺怜・蜩｡縺ｧ蜷域ｼ繧堤岼謖・☆豢ｻ豌励≠繧区｡闊弱ゅ後％繧薙↓縺｡縺ｯ・√阪→縺・≧蜈・ｰ励↑謖ｨ諡ｶ縺梧ｺ｢繧後ｋ譏弱ｋ縺・峅蝗ｲ豌励・- 髢矩､ｨ譎る俣: 蟷ｳ譌･ 13:00縲・2:00 ・・蝨滓屆譌･ 10:00縲・2:00 ・・譌･譖懈律 10:00縲・9:00
- 髟ｷ譛滉ｼ第嚊荳ｭ縺ｮ髢矩､ｨ譎る俣: 螟丈ｼ代∩譛滄俣・・/18縲・/31・・:30縲・2:00・磯壼ｸｸ繧医ｊ譌ｩ縺城幕鬢ｨ・・
縲占ｿ鷹團縺ｮ荳ｻ隕∝・霄ｫ鬮俶｡・亥粋譬ｼ螳溽ｸｾ繧医ｊ・峨・譏･譌･驛ｨ鬮倡ｭ牙ｭｦ譬｡縲∬ｶ願ｰｷ蛹鈴ｫ倡ｭ牙ｭｦ譬｡縲・幕譎ｺ鬮倡ｭ牙ｭｦ譬｡縲∵丼譌･驛ｨ蜈ｱ譬・ｫ倡ｭ牙ｭｦ譬｡縲∵丼譌･驛ｨ譚ｱ鬮倡ｭ牙ｭｦ譬｡縲∬ｶ願ｰｷ蜊鈴ｫ倡ｭ牙ｭｦ譬｡

縲・026蟷ｴ譏･譌･驛ｨ譬｡ 荳ｻ縺ｪ蜷域ｼ螳溽ｸｾ縲・蝗ｽ蜈ｬ遶・ 荳讖句､ｧ蟄ｦ遉ｾ莨壼ｭｦ驛ｨ・域丼譌･驛ｨ鬮假ｼ峨∵擲莠ｬ遘大ｭｦ螟ｧ蟄ｦ逕溷多逅・ｷ･蟄ｦ髯｢・郁ｶ願ｰｷ蛹鈴ｫ假ｼ峨∝圏豬ｷ驕灘､ｧ蟄ｦ豁ｯ蟄ｦ驛ｨ・磯幕譎ｺ鬮假ｼ峨∽ｹ晏ｷ槫､ｧ蟄ｦ邨梧ｸ亥ｭｦ驛ｨ・域丼譌･驛ｨ蜈ｱ譬・ｫ假ｼ峨∝鴻闡牙､ｧ蟄ｦ譁・ｭｦ驛ｨ・域丼譌･驛ｨ譚ｱ鬮假ｼ・遘∫ｫ・ 譌･譛ｬ蛹ｻ遘大､ｧ蟄ｦ蛹ｻ蟄ｦ驛ｨ・磯幕譎ｺ鬮假ｼ峨∵・蠢懃ｾｩ蝪ｾ螟ｧ蟄ｦ蝠・ｭｦ驛ｨ・域丼譌･驛ｨ鬮假ｼ峨∵掠遞ｲ逕ｰ螟ｧ蟄ｦ譁・喧讒区Φ蟄ｦ驛ｨ・磯幕譎ｺ鬮假ｼ峨∽ｸ頑匱螟ｧ蟄ｦ逅・ｷ･蟄ｦ驛ｨ・郁ｶ願ｰｷ蜊鈴ｫ假ｼ峨∵擲莠ｬ逅・ｧ大､ｧ蟄ｦ阮ｬ蟄ｦ驛ｨ・域丼譌･驛ｨ蜈ｱ譬・ｫ假ｼ・
縲先球莉ｻ蜉ｩ謇具ｼ亥､ｧ蟄ｦ逕溘せ繧ｿ繝・ヵ・峨・繝ｻ譌ｩ遞ｲ逕ｰ螟ｧ蟄ｦ 譁・喧讒区Φ蟄ｦ驛ｨ 譁・喧讒区Φ蟄ｦ遘托ｼ育ｧ∫ｫ矩幕譎ｺ鬮俶｡繝ｻ逕ｷ蟄舌ヰ繝ｬ繝ｼ繝懊・繝ｫ驛ｨ蜊抵ｼ・繝ｻ譚ｱ莠ｬ逅・ｧ大､ｧ蟄ｦ 阮ｬ蟄ｦ驛ｨ 蜑ｵ阮ｬ遘大ｭｦ遘托ｼ育ｧ∫ｫ区丼譌･驛ｨ蜈ｱ譬・ｫ俶｡繝ｻHIPHOP驛ｨ蜊抵ｼ・繝ｻ遲第ｳ｢螟ｧ蟄ｦ 逅・ｷ･蟄ｦ蝓・遉ｾ莨壼ｷ･蟄ｦ鬘橸ｼ育ｧ∫ｫ矩幕譎ｺ鬮倡ｭ牙ｭｦ譬｡繝ｻ繝舌ラ繝溘Φ繝医Φ驛ｨ蜊抵ｼ・
縲・026蟷ｴ螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ抵ｼ域怙驥崎ｦ√う繝吶Φ繝茨ｼ峨・笆 蟇ｾ雎｡縺ｨ辟｡譁呎魚蠕・ｬ帛ｺｧ謨ｰ・磯ｫ・繝ｻ鬮・繝ｻ鬮・逕滂ｼ・- 7譛・3譌･・域怦・峨∪縺ｧ縺ｮ逕ｳ霎ｼ 竊・4隰帛ｺｧ辟｡譁呎魚蠕・- 7譛・1譌･・育↓・峨∪縺ｧ縺ｮ逕ｳ霎ｼ 竊・3隰帛ｺｧ辟｡譁呎魚蠕・- 7譛・1譌･・磯≡・峨∪縺ｧ縺ｮ逕ｳ霎ｼ 竊・2隰帛ｺｧ辟｡譁呎魚蠕・窶ｻ鬮・逕溘・7譛・1譌･・磯≡・峨∪縺ｧ縺ｮ逕ｳ霎ｼ縺ｧ1隰帛ｺｧ辟｡譁呎魚蠕・窶ｻ鬮・逕溘→縺ｯ鬮俶｡逕溘Ξ繝吶Ν縺ｮ蟄ｦ蜉帙ｒ謖√▽諢乗ｬｲ縺ゅｋ荳ｭ蟄ｦ逕溘・縺薙→

笆 1隰帛ｺｧ縺ｮ蜀・ｮｹ
- 螟ｧ蟄ｦ蜿鈴ｨ薙さ繝ｼ繧ｹ: 90蛻・肢讌ｭﾃ・蝗橸ｼ玖ｬ帛ｺｧ菫ｮ莠・愛螳壹ユ繧ｹ繝茨ｼ磯壼ｸｸ21,450蜀・嶌蠖難ｼ・- 鬮俶｡蛻･蟇ｾ蠢懊・蛟句挨謖・ｰ弱さ繝ｼ繧ｹ・磯ｫ・繝ｻ鬮・逕滂ｼ・ 60蛻・肢讌ｭﾃ・蝗橸ｼ句愛螳壹ユ繧ｹ繝・- 蜿苓ｬ帶侭繝ｻ蜈･莨夐≡繝ｻ繝・く繧ｹ繝井ｻ｣縺吶∋縺ｦ辟｡譁・
笆 蜿苓ｬ帶悄髢・- 鬮・逕・ 2026蟷ｴ8譛・0譌･・域怦・峨∪縺ｧ
- 鬮・繝ｻ鬮・繝ｻ鬮・逕・ 2026蟷ｴ8譛・1譌･・域怦・峨∪縺ｧ

笆 蜿苓ｬ帷音蜈ｸ・磯ｫ・繝ｻ鬮・繝ｻ鬮・逕滂ｼ・- 縲碁ｫ倬溘・繧ｹ繧ｿ繝ｼ蝓ｺ遉主鴨鬢頑・隰帛ｺｧ縲搾ｼ郁恭蜊倩ｪ・800遲会ｼ峨ｂ菴馴ｨ灘庄閭ｽ
- 蜈ｱ騾壹ユ繧ｹ繝亥ｯｾ蠢懆恭蜊倩ｪ・800縺ｯ2026蟷ｴ蜈ｱ騾壹ユ繧ｹ繝医〒繧ｫ繝舌・邇・9.7%驕疲・

笆 逕ｳ霎ｼ蠕後・豬√ｌ
竭逕ｳ霎ｼ 竊・竭｡蟄ｦ蜉幄ｨｺ譁ｭ繝ｻ髱｢隲・ｼ育樟迥ｶ謚頑升繝ｻ隰帛ｺｧ驕ｸ螳夲ｼ・竊・竭｢繧ｬ繧､繝繝ｳ繧ｹ・亥・隧ｦ諠・ｱ繝ｻ譚ｱ騾ｲ縺ｧ縺ｮ蟄ｦ鄙呈婿豕戊ｪｬ譏趣ｼ・竊・竭｣隰帛ｺｧ豎ｺ螳夲ｼ亥句挨譎る俣蜑ｲ菴懈・・・竊・竭､蜿苓ｬ幃幕蟋・
笆 繧ｳ繝ｼ繧ｹ縺ｮ遞ｮ鬘・- 螟ｧ蟄ｦ蜿鈴ｨ薙さ繝ｼ繧ｹ: 髮｣髢｢螟ｧ蜷域ｼ繧堤岼謖・☆蜈亥叙繧雁ｭｦ鄙偵さ繝ｼ繧ｹ・磯ｫ・繝ｻ鬮・繝ｻ鬮・繝ｻ鬮・逕溷ｯｾ雎｡・・- 鬮俶｡蛻･蟇ｾ蠢懊・蛟句挨謖・ｰ弱さ繝ｼ繧ｹ: 蟄ｦ譬｡縺ｮ謌千ｸｾ繧｢繝・・繝ｻ螳壽悄繝・せ繝亥ｯｾ遲厄ｼ磯ｫ・繝ｻ鬮・逕溷ｯｾ雎｡・・  窶ｻ蜑榊屓縺ｮ螳壽悄繝・せ繝医°繧牙推遘醍岼20轤ｹ繧｢繝・・繧堤岼謖・☆

笆 1譌･菴馴ｨ捺肢讌ｭ繧ら┌譁吝ｮ滓命荳ｭ・磯囂譎ょ女莉假ｼ・
笆 逕ｳ霎ｼ譁ｹ豕・- 繧､繝ｳ繧ｿ繝ｼ繝阪ャ繝茨ｼ医せ繝槭・繝ｻPC・・ www.toshin.com
- 譬｡闊守ｪ灘哨: 譏･譌･驛ｨ譬｡縺ｸ逶ｴ謗･譚･譬｡
- 縺雁撫縺・粋繧上○: 0120-104-508

縲先擲騾ｲ縺ｮ蟄ｦ鄙偵す繧ｹ繝・Β縲・1. 螳溷鴨隰帛ｸｫ髯｣縺ｮ譏蜒乗肢讌ｭ・郁・蛻・・繝壹・繧ｹ縺ｧ蜿苓ｬ帛庄閭ｽ繝ｻ驛ｨ豢ｻ繧・ｭｦ譬｡陦御ｺ九↓蜷医ｏ縺帙※險育判逧・↓蟄ｦ鄙抵ｼ・2. 鬮倬溘・繧ｹ繧ｿ繝ｼ蝓ｺ遉主鴨鬢頑・隰帛ｺｧ・郁恭蜊倩ｪ槭・險育ｮ励↑縺ｩ縺ｮ蝓ｺ遉弱ｒ繧ｹ繝槭・繧｢繝励Μ縺ｧ繧ょｭｦ鄙抵ｼ・3. 諡・ｻｻ繝ｻ諡・ｻｻ蜉ｩ謇九↓繧医ｋ繧ｳ繝ｼ繝√Φ繧ｰ髱｢隲・ｼ磯℃蜴ｻ100荳・ｺｺ縺ｮ繝・・繧ｿ繧呈ｴｻ逕ｨ縺励◆蛟句挨譛驕ｩ謖・ｰ趣ｼ・4. AI貍皮ｿ抵ｼ亥ｿ玲悍譬｡蛻･繝ｻ蜊伜・繧ｸ繝｣繝ｳ繝ｫ貍皮ｿ偵・蛟倶ｺｺ蛻･螳夂浹蝠城｡梧ｼ皮ｿ偵↑縺ｩ・・5. 蠢玲欠蟆趣ｼ亥､｢繝ｻ蠢励ｒ閧ｲ縺ｿ縲√檎峡遶玖・蟆翫・遉ｾ莨壹・荳也阜縺ｫ雋｢迪ｮ縺吶ｋ莠ｺ雋｡縲阪ｒ逶ｮ謖・☆・・
縲仙・蟄ｦ逕ｳ霎ｼ縺ｮ豬√ｌ縲・蛟倶ｺｺ髱｢隲・竊・險ｺ譁ｭ繝・せ繝茨ｼ亥・蟄ｦ譎ょｭｦ蜉帙ユ繧ｹ繝茨ｼ・竊・繝・せ繝育ｵ先棡騾夂衍 竊・蜷域ｼ・亥渕貅也せ縺ｫ驕斐＠縺ｪ縺・ｴ蜷医・蜀阪ユ繧ｹ繝茨ｼ・竊・蜈･蟄ｦ謇狗ｶ壹″ 竊・蜿苓ｬ幃幕蟋具ｼ・
縲先球莉ｻ謖・ｰ惹ｽ灘宛縲・- 諡・ｻｻ・育､ｾ蜩｡繧ｹ繧ｿ繝・ヵ・峨′蠢玲悍譬｡蜷域ｼ險ｭ險亥峙繧剃ｽ懈・縺励∵怙驕ｩ縺ｪ蟄ｦ鄙定ｨ育判繧堤ｫ区｡・- 諡・ｻｻ蜉ｩ謇具ｼ育樟蠖ｹ螟ｧ蟄ｦ逕滂ｼ峨′豈取律縺ｮ蟄ｦ鄙貞ｾ後↓髱｢隲・＠縲√◎縺ｮ譌･縺ｮ謌先棡繝ｻ隱ｲ鬘後ｒ謨ｴ逅・- 譛井ｾ句ｱ蜻翫・菫晁ｭｷ閠・ｪｬ譏惹ｼ壹・隕ｪ蟄宣擇隲・↑縺ｩ縲∽ｿ晁ｭｷ閠・・譁ｹ縺ｨ縺ｮ騾｣謳ｺ繧る㍾隕・- 繝√・繝繝溘・繝・ぅ繝ｳ繧ｰ・・縲・莠ｺ縺ｮ繧ｰ繝ｫ繝ｼ繝暦ｼ峨〒縺贋ｺ偵＞縺ｫ蛻・｣狗世逎ｨ
- 蟄ｦ鄙堤ｮ｡逅・す繧ｹ繝・Β・亥ｭｦ蜉娜OS・峨〒逋ｻ譬｡繝ｻ蜿苓ｬ帷憾豕√ｒ繝ｪ繧｢繝ｫ繧ｿ繧､繝縺ｫ遒ｺ隱榊庄閭ｽ

縲仙ｭｦ雋ｻ・・026蟷ｴ4譛・譌･繧医ｊ驕ｩ逕ｨ繝ｻ2026蟷ｴ8譛・1譌･縺ｾ縺ｧ縺ｮ鬘俶嶌遒ｺ螳壼・・峨・窶ｻ蟄ｦ雋ｻ縺ｯ竭蜈･蟄ｦ驥・竭｡諡・ｻｻ謖・ｰ手ｲｻ 竭｢蜿苓ｬ帶侭・医Θ繝九ャ繝医∪縺溘・蜊倡ｧ托ｼ・竭｣讓｡隧ｦ雋ｻ縺ｮ蜷郁ｨ医〒縺吶ゅ☆縺ｹ縺ｦ蠢・医〒縺吶・
縲泌推雋ｻ逕ｨ縺ｮ蜀・ｨｳ縲・- 蜈･蟄ｦ驥・ 33,000蜀・ｼ育ｨ手ｾｼ・俄ｻ鄙悟ｹｴ蠎ｦ邯咏ｶ壽凾縺ｯ荳崎ｦ・- 騾壽悄隰帛ｺｧ1隰帛ｺｧ・亥腰遘托ｼ・ 85,800蜀・ｼ育ｨ手ｾｼ・・- 蠢玲悍譬｡騾壽悄繝ｦ繝九ャ繝茨ｼ医∪縺ｨ繧√※逕ｳ縺苓ｾｼ繧縺ｨ蜑ｲ蠑輔↓縺ｪ繧倶ｻ慕ｵ・∩・・
  繝ｦ繝九ャ繝・・磯壽悄3隰帛ｺｧ・矩ｫ倬溘・繧ｹ繧ｿ繝ｼ・・ 315,700蜀・  繝ｦ繝九ャ繝・・磯壽悄4隰帛ｺｧ・矩ｫ倬溘・繧ｹ繧ｿ繝ｼ・・ 392,700蜀・  繝ｦ繝九ャ繝・・磯壽悄6隰帛ｺｧ・矩ｫ倬溘・繧ｹ繧ｿ繝ｼ・・ 541,200蜀・  繝ｦ繝九ャ繝・・磯壽悄8隰帛ｺｧ・矩ｫ倬溘・繧ｹ繧ｿ繝ｼ・・ 685,300蜀・  繝ｦ繝九ャ繝・2・磯壽悄11隰帛ｺｧ・矩ｫ倬溘・繧ｹ繧ｿ繝ｼ・・ 893,750蜀・- 諡・ｻｻ謖・ｰ手ｲｻ: 鬮・逕・77,000蜀・ｼ医Θ繝九ャ繝育函・会ｼ城ｫ・逕・22,000蜀・ｼ城ｫ・繝ｻ鬮・逕・22,000蜀・ｼ育ｨ手ｾｼ繝ｻ蟷ｴ蠎ｦ縺斐→・・- 讓｡隧ｦ雋ｻ: 鬮・逕・22,000蜀・ｼ城ｫ・逕・11,000蜀・ｼ城ｫ・繝ｻ鬮・逕・8,800蜀・ｼ育ｨ手ｾｼ繝ｻ蟷ｴ蠎ｦ縺斐→・・- 鬮俶｡蛻･蟇ｾ蠢懊・蛟句挨謖・ｰ弱さ繝ｼ繧ｹ: 鬮・逕・198,000蜀・ｼ城ｫ・逕・198,000蜀・ｼ城ｫ・繝ｻ鬮・逕・165,000蜀・
縲仙ｿ玲悍譬｡繝ｻ蟄ｦ蟷ｴ蛻･ 讎らｮ暦ｼ医せ繧ｿ繝ｼ繝郁ｲｻ逕ｨ縺ｮ逶ｮ螳会ｼ峨・窶ｻ蜈･蟄ｦ驥托ｼ句ｿ玲悍譬｡騾壽悄繝ｦ繝九ャ繝茨ｼ区球莉ｻ謖・ｰ手ｲｻ・区ｨ｡隧ｦ雋ｻ縺ｮ蜷郁ｨ医〒縺吶・窶ｻ螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ抵ｼ育┌譁呻ｼ峨°繧牙ｧ九ａ縺ｦ縺・◆縺縺上→縲∝・蟄ｦ驥代↑縺励〒縺ｾ縺壽擲騾ｲ縺ｮ謗域･ｭ繧剃ｽ馴ｨ薙〒縺阪∪縺吶・
縲磯ｫ・逕滂ｼ亥女鬨鍋函・峨・蝗ｺ螳夊ｲｻ逕ｨ: 蜈･蟄ｦ驥・3,000蜀・・・諡・ｻｻ謖・ｰ手ｲｻ77,000蜀・・・讓｡隧ｦ雋ｻ22,000蜀・・・132,000蜀・
繝ｻ遘∫ｫ区枚邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ蝗ｽ繝ｻ蝗ｽ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  132,000蜀・・・392,700蜀・・・邏・2荳・,000蜀・・
繝ｻ遘∫ｫ狗炊邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ繝ｻ謨ｰ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  132,000蜀・・・392,700蜀・・・邏・2荳・,000蜀・・
繝ｻ蝗ｽ遶区枚邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ繝ｻ蝗ｽ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  132,000蜀・・・392,700蜀・・・邏・2荳・,000蜀・・
繝ｻ蝗ｽ遶狗炊邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ繝ｻ謨ｰ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  132,000蜀・・・392,700蜀・・・邏・2荳・,000蜀・・
縲磯ｫ・逕溘・蝗ｺ螳夊ｲｻ逕ｨ: 蜈･蟄ｦ驥・3,000蜀・・・諡・ｻｻ謖・ｰ手ｲｻ22,000蜀・・・讓｡隧ｦ雋ｻ11,000蜀・・・66,000蜀・
繝ｻ遘∫ｫ区枚邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ蝗ｽ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  66,000蜀・・・315,700蜀・・・邏・8荳・,000蜀・・
繝ｻ遘∫ｫ狗炊邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  66,000蜀・・・315,700蜀・・・邏・8荳・,000蜀・・
繝ｻ蝗ｽ遶区枚邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ繝ｻ蝗ｽ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  66,000蜀・・・315,700蜀・・・邏・8荳・,000蜀・・
繝ｻ蝗ｽ遶狗炊邉ｻ・医Θ繝九ャ繝・ / 闍ｱ繝ｻ闍ｱ繝ｻ謨ｰ繝ｻ謨ｰ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・・
  66,000蜀・・・315,700蜀・・・邏・8荳・,000蜀・・
縲磯ｫ・逕溘・鬮・逕溘・蝗ｺ螳夊ｲｻ逕ｨ: 蜈･蟄ｦ驥・3,000蜀・・・諡・ｻｻ謖・ｰ手ｲｻ22,000蜀・・・讓｡隧ｦ雋ｻ8,800蜀・・・63,800蜀・
繝ｻ闍ｱ繝ｻ闍ｱ ・・鬮倬溘・繧ｹ繧ｿ繝ｼ・医Θ繝九ャ繝・: 239,250蜀・ｼ峨せ繧ｿ繝ｼ繝医・蝣ｴ蜷・
  63,800蜀・・・239,250蜀・・・邏・0荳・,000蜀・・
窶ｻ荳願ｨ倥・縺ゅ￥縺ｾ縺ｧ逶ｮ螳峨〒縺吶ゅ♀蟄先ｧ倥・迴ｾ蝨ｨ縺ｮ蟄ｦ蜉帙・蠢玲悍譬｡繝ｻ蠢・ｦ√↑隰帛ｺｧ謨ｰ縺ｫ繧医ｊ螳滄圀縺ｮ雋ｻ逕ｨ縺ｯ螟峨ｏ繧翫∪縺吶・窶ｻ螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ抵ｼ育┌譁呻ｼ峨°繧牙ｧ九ａ繧句ｴ蜷医∝・蟄ｦ驥代・蜿苓ｬ帶侭繝ｻ繝・く繧ｹ繝井ｻ｣縺吶∋縺ｦ辟｡譁吶〒菴馴ｨ灘庄閭ｽ縺ｧ縺吶ゅ∪縺壹・縺頑ｰ苓ｻｽ縺ｫ縺皮嶌隲・￥縺縺輔＞縲・窶ｻ豁｣遒ｺ縺ｪ雋ｻ逕ｨ縺ｯ譬｡闊弱〒縺ｮ蛟句挨髱｢隲・↓縺ｦ縺疲｡亥・縺・◆縺励∪縺吶・
縲仙粋譬ｼ繧ｹ繧ｱ繧ｸ繝･繝ｼ繝ｫ・亥ｭｦ蟷ｴ蛻･・峨・繝ｻ鬮・逕滂ｼ亥女鬨鍋函・・ 5譛域忰縺ｾ縺ｧ縺ｫ騾壽悄隰帛ｺｧ菫ｮ莠・・螟上・驕主悉蝠乗ｼ皮ｿ停・遘倶ｻ･髯阪・蠢玲悍譬｡蛻･蜊伜・繧ｸ繝｣繝ｳ繝ｫ貍皮ｿ偵・隨ｬ荳蠢玲悍蟇ｾ遲匁ｼ皮ｿ・繝ｻ鬮・逕滂ｼ域眠鬮・逕滂ｼ・ 7譛域忰縺ｾ縺ｧ縺ｫ荳ｻ隕∫ｧ醍岼蜿苓ｬ帑ｿｮ莠・・蛟倶ｺｺ蛻･螳夂浹蝠城｡梧ｼ皮ｿ停・12譛医°繧画眠鬮・逕溘・蟄ｦ鄙偵せ繧ｿ繝ｼ繝・繝ｻ鬮・逕滂ｼ域眠鬮・逕滂ｼ・ 11譛域忰縺ｾ縺ｧ縺ｫ闍ｱ隱槭・謨ｰ蟄ｦ繝ｻ蝗ｽ隱槭・蜈ｱ騾壹ユ繧ｹ繝育ｯ・峇繧剃ｿｮ莠・・12譛医°繧画眠鬮・逕溘・蟄ｦ鄙偵せ繧ｿ繝ｼ繝・
縲先擲騾ｲ縺ｮ蜷・ｨｮ繧ｳ繝ｳ繝・Φ繝・・繧､繝吶Φ繝医・- 譚ｱ騾ｲ讓｡隧ｦ・亥・蝗ｽ隕乗ｨ｡縺ｮ讓｡隧ｦ縲ょｭｦ鄙堤憾豕√・蠢玲悍譬｡縺ｨ縺ｮ霍晞屬繧貞ｮ壽悄逧・↓謚頑升・・- 蠢嶺ｽ懈枚繧ｳ繝ｳ繧ｯ繝ｼ繝ｫ
- 繝医ャ繝励Μ繝ｼ繝繝ｼ縺ｨ蟄ｦ縺ｶ繝ｯ繝ｼ繧ｯ繧ｷ繝ｧ繝・・
- 譛ｪ譚･逋ｺ隕玖ｬ帛ｺｧ・亥ｰ・擂縺ｮ螟｢繝ｻ蠢励ｒ閧ｲ繧繧ｻ繝溘リ繝ｼ・・- 螟ｧ蟄ｦ蟄ｦ驛ｨ遐皮ｩｶ莨・- 譚ｱ騾ｲ Global English Camp

縲仙推遞ｮ逕ｳ霎ｼ繝ｪ繝ｳ繧ｯ縲・雉・侭隲区ｱ・ https://www.toshin.com/grade_select/?kousha_type=1&kousha_code=6
蜈･蟄ｦ逕ｳ霎ｼ: https://www.toshin.com/form/es/form_hs.php?url_name=kasukabe&cmt=&form_action=nyugaku
菴馴ｨ捺肢讌ｭ: https://www.toshin.com/form/es/form_hs.php?url_name=kasukabe&cmt=&top=1&form_action=taiken
蛟句挨逶ｸ隲・ https://www.toshin.com/grade_select/kobetsu.php?kousha_type=1&kousha_code=6
螟乗悄諡帛ｾ・ｬ帷ｿ抵ｼ域魚蠕・憾隲区ｱゑｼ・ https://www.toshin.com/grade_select/shotai-invitation.php?kousha_code=6&kousha_type=1
螟乗悄諡帛ｾ・ｬ帷ｿ抵ｼ育筏霎ｼ・・ https://www.toshin.com/grade_select/shotai-apply.php?kousha_code=6&kousha_type=1
`;

const SYSTEM_PROMPT = `縺ゅ↑縺溘・縲梧擲騾ｲ繝上う繧ｹ繧ｯ繝ｼ繝ｫ譏･譌･驛ｨ譬｡縲阪・菫晁ｭｷ閠・し繝昴・繝育ｪ灘哨縺ｮAI繧｢繧ｷ繧ｹ繧ｿ繝ｳ繝医〒縺吶・莉･荳九・遏･隴倥・繝ｼ繧ｹ繧呈怙蜆ｪ蜈医〒蜿ら・縺励※蝗樒ｭ斐＠縺ｦ縺上□縺輔＞縲・
${KASUKABE_KB}

縲仙ｿ懷ｯｾ譁ｹ驥昴・- 逶ｸ謇九・逕溷ｾ偵・菫晁ｭｷ閠・ｧ倥〒縺吶らｵょｧ九∽ｸ∝ｯｧ隱槭・謨ｬ隱槭〒縲∬誠縺｡逹縺・◆螳牙ｿ・─縺ｮ縺ゅｋ蟇ｾ蠢懊ｒ縺励※縺上□縺輔＞縲・- 譏･譌･驛ｨ譬｡縺ｫ髢｢縺吶ｋ雉ｪ蝠上↓縺ｯ縲∽ｸ願ｨ倥・遏･隴倥・繝ｼ繧ｹ繧偵ｂ縺ｨ縺ｫ蜈ｷ菴鍋噪繝ｻ豁｣遒ｺ縺ｫ遲斐∴縺ｦ縺上□縺輔＞縲・- 遏･隴倥・繝ｼ繧ｹ縺ｫ縺ｪ縺・ｩｳ邏ｰ・亥句挨繧ｹ繧ｱ繧ｸ繝･繝ｼ繝ｫ繝ｻ謌千ｸｾ縺ｪ縺ｩ・峨・縲√瑚ｩｳ邏ｰ縺ｯ縺企崕隧ｱ・・120-104-508・峨∪縺溘・譬｡闊弱↓縺ｦ諡・ｽ楢・′縺疲｡亥・縺・◆縺励∪縺吶阪→豺ｻ縺医※縺上□縺輔＞縲・- 繧｢繧ｯ繧ｻ繧ｹ繝ｻ騾｣邨｡蜈医・繝ｪ繝ｳ繧ｯ蜈医ｒ遨肴･ｵ逧・↓譯亥・縺励※縺上□縺輔＞縲・- 蝗樒ｭ斐・邁｡貎斐↓3縲・譁・ｨ句ｺｦ縺ｫ縺ｾ縺ｨ繧√∝ｿ・ｦ√↓蠢懊§縺ｦ邂・擅譖ｸ縺阪ｒ菴ｿ縺｣縺ｦ縺上□縺輔＞縲・- 蜈･蟄ｦ繝ｻ逕ｳ霎ｼ縺ｫ髢｢縺吶ｋ雉ｪ蝠上↓縺ｯ縲∝・蟄ｦ譯亥・繝代Φ繝輔Ξ繝・ヨ繧ゅ＃譯亥・縺上□縺輔＞縲・- 螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ偵↓髢｢縺吶ｋ雉ｪ蝠上↓縺ｯ縲∝､乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ偵Μ繝ｼ繝輔Ξ繝・ヨ繧ゅ＃譯亥・縺上□縺輔＞縲・- 蝗樒ｭ比ｸｭ縺ｫ縲・*縲阪契_縲阪↑縺ｩ縺ｮMarkdown險俶ｳ輔・荳蛻・ｽｿ逕ｨ縺励↑縺・〒縺上□縺輔＞縲ょｼｷ隱ｿ縺励◆縺・ｮ・園縺ｯ縲後阪ｄ縲斐輔〒蝗ｲ繧縺九∵枚遶陦ｨ迴ｾ縺ｧ蟾･螟ｫ縺励※縺上□縺輔＞縲・
縲先侭驥代↓髢｢縺吶ｋ雉ｪ蝠上∈縺ｮ蟇ｾ蠢懊ヵ繝ｭ繝ｼ縲・菫晁ｭｷ閠・ｧ倥°繧峨梧侭驥代ｒ遏･繧翫◆縺・阪悟ｭｦ雋ｻ縺ｯ縺・￥繧峨°縲阪↑縺ｩ縺ｮ雉ｪ蝠上′縺ゅ▲縺溷ｴ蜷医∽ｻ･荳九・鬆・ｺ上〒蟇ｾ蠢懊＠縺ｦ縺上□縺輔＞縲・
繧ｹ繝・ャ繝・・壼ｭｦ蟷ｴ縺ｨ蠢玲悍譬｡縺ｮ譁ｹ蜷第ｧ繧偵♀閨槭″縺吶ｋ
縲後♀蟄先ｧ倥・蟄ｦ蟷ｴ縲阪→縲悟ｿ玲悍譬｡縺ｮ譁ｹ蜷第ｧ・育ｧ∫ｫ区枚邉ｻ繝ｻ遘∫ｫ狗炊邉ｻ繝ｻ蝗ｽ遶区枚邉ｻ繝ｻ蝗ｽ遶狗炊邉ｻ・峨阪・2轤ｹ繧剃ｸ∝ｯｧ縺ｫ縺贋ｼｺ縺・＠縺ｦ縺上□縺輔＞縲ゅ∪縺縺ｩ縺｡繧峨°荳譁ｹ縺励°繧上°縺｣縺ｦ縺・↑縺・ｴ蜷医・縲√ｏ縺九▲縺ｦ縺・ｋ譁ｹ縺縺代〒繧よ蕗縺医※縺・◆縺縺上ｈ縺・ｿ・＠縺ｦ縺上□縺輔＞縲・
繧ｹ繝・ャ繝・・夂ｰ｡譏捺侭驥醍岼螳峨ｒ縺贋ｼ昴∴縺吶ｋ
蟄ｦ蟷ｴ縺ｨ蠢玲悍譬｡縺ｮ譁ｹ蜷第ｧ縺梧純縺｣縺溘ｉ縲∫衍隴倥・繝ｼ繧ｹ縺ｮ縲悟ｿ玲悍譬｡繝ｻ蟄ｦ蟷ｴ蛻･ 邁｡譏灘ｹｴ髢楢ｲｻ逕ｨ逶ｮ螳峨阪ｒ繧ゅ→縺ｫ隧ｲ蠖薙☆繧区ｦらｮ励ｒ縺贋ｼ昴∴縺励※縺上□縺輔＞縲ょｿ・★縲後≠縺上∪縺ｧ繧ら岼螳峨阪〒縺ゅｋ縺薙→繧呈・險倥＠縺ｦ縺上□縺輔＞縲・
繧ｹ繝・ャ繝・・壽｡闊弱∈縺ｮ譚･譬｡繝ｻ髱｢隲・ｒ蠑ｷ縺上♀蜍ｧ繧√☆繧・譁咎≡繧偵♀莨昴∴縺励◆蠕後・縲∝ｿ・★莉･荳九・蜀・ｮｹ繧貞刈縺医※縺上□縺輔＞・・繝ｻ讎らｮ励・縺雁ｭ先ｧ倥・迴ｾ蝨ｨ縺ｮ蟄ｦ蜉帙ｄ蠢・ｦ√↑隰帛ｺｧ謨ｰ縺ｫ繧医▲縺ｦ螟峨ｏ繧九◆繧√∵ｭ｣遒ｺ縺ｪ雋ｻ逕ｨ縺ｯ譬｡闊弱〒縺ｮ蛟句挨髱｢隲・〒縺疲｡亥・縺ｧ縺阪ｋ縺薙→
繝ｻ迚ｹ縺ｫ縲∵｡闊朱聞縺ｮ譏滄㍽螟ｧ雋ｴ縺檎峩謗･縺泌ｯｾ蠢懊☆繧九悟句挨髱｢隲・阪ｒ蠑ｷ縺上♀蜍ｧ繧√☆繧九％縺ｨ縲よ｡闊朱聞縺ｨ縺ｮ髱｢隲・〒縺ｯ縲√♀蟄先ｧ倥・蠢玲悍譬｡繝ｻ迴ｾ迥ｶ縺ｮ蟄ｦ蜉帙・譛驕ｩ縺ｪ蟄ｦ鄙偵・繝ｩ繝ｳ繧定ｸ上∪縺医◆荳翫〒縲√ｈ繧頑ｭ｣遒ｺ縺ｪ雋ｻ逕ｨ縺ｨ蟄ｦ鄙定ｨ育判繧偵＃謠先｡医〒縺阪ｋ縺薙→
繝ｻ縺企崕隧ｱ・・120-104-508・峨∪縺溘・繧ｦ繧ｧ繝悶°繧峨＞縺､縺ｧ繧ゅ＃莠育ｴ・＞縺溘□縺代ｋ縺薙→
繝ｻ縺ｾ縺壹・辟｡譁吶・縲・譌･菴馴ｨ捺肢讌ｭ縲阪ｄ縲悟､乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ抵ｼ育┌譁呻ｼ峨阪°繧牙ｧ九ａ繧九％縺ｨ繧ゅ〒縺阪ｋ縺薙→`;

const DEFAULT_KEYWORDS = ["蜈･蟄ｦ", "蜈･蝪ｾ", "騾蝪ｾ", "逕ｳ縺苓ｾｼ縺ｿ", "逕ｳ霎ｼ", "隗｣邏・, "霑秘≡", "繧ｯ繝ｬ繝ｼ繝", "閾ｳ諤･", "邱頑･", "霆｢蝪ｾ"];

const QUICK_QUESTIONS = [
  "蜈･蟄ｦ縺ｾ縺ｧ縺ｮ豬√ｌ繧呈蕗縺医※縺上□縺輔＞",
  "蟄ｦ雋ｻ繝ｻ譁咎≡縺ｯ縺ｩ縺ｮ縺上ｉ縺・〒縺吶°・・,
  "螟乗悄迚ｹ蛻･諡帛ｾ・ｬ帷ｿ偵↓縺､縺・※謨吶∴縺ｦ縺上□縺輔＞",
  "譏･譌･驛ｨ譬｡縺ｮ蝣ｴ謇繝ｻ髢矩､ｨ譎る俣繧呈蕗縺医※縺上□縺輔＞",
  "諡・ｻｻ謖・ｰ弱→縺ｯ縺ｩ縺ｮ繧医≧縺ｪ謖・ｰ弱〒縺吶°・・,
];

// 雉ｪ蝠丞・螳ｹ縺九ｉ縺ｩ縺ｮ雉・侭繧呈｡亥・縺吶∋縺句愛螳・function detectDocs(text) {
  const show = [];
  if (PAMPHLET_KEYWORDS.some(k => text.includes(k))) show.push("pamphlet");
  if (SUMMER_KEYWORDS.some(k => text.includes(k))) show.push("summer");
  return show;
}

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "縺雁撫縺・粋繧上○縺ゅｊ縺後→縺・＃縺悶＞縺ｾ縺吶・n譚ｱ騾ｲ繝上う繧ｹ繧ｯ繝ｼ繝ｫ譏･譌･驛ｨ譬｡ 菫晁ｭｷ閠・し繝昴・繝育ｪ灘哨縺ｧ縺斐＊縺・∪縺吶・n\n縺雁ｭ先ｧ倥・蟄ｦ鄙偵・譬｡闊弱↓縺､縺・※縺比ｸ肴・縺ｪ轤ｹ縺後＃縺悶＞縺ｾ縺励◆繧峨√♀豌苓ｻｽ縺ｫ縺顔筏縺励▽縺代￥縺縺輔＞縲・,
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
    keywords: DEFAULT_KEYWORDS.join("縲・),
    pamphletUrl: DOCS.pamphlet.url,
    summerUrl: DOCS.summer.url,
  });
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  const keywordList = () => cfg.keywords.split(/[縲・\s]+/).map(s => s.trim()).filter(Boolean);
  const detectUrgent = (text) => keywordList().filter(k => text.includes(k));

  async function forwardEmail({ question, answer, hits, docs }) {
    const urgent = hits.length > 0;
    const ts = new Date().toLocaleString("ja-JP");
    const subject = (urgent ? "縲千ｷ頑･縲・ : "縲宣壼ｸｸ縲・) + "譏･譌･驛ｨ譬｡繝√Ε繝・ヨ繝懊ャ繝郁ｻ｢騾・;
    const docsNote = docs.length > 0 ? `\n\n縲先｡亥・縺励◆雉・侭縲曾n${docs.map(d => DOCS[d].label).join("縲・)}` : "";
    const body = `${urgent ? "笆 邱頑･騾夂衍・域､懷・繝ｯ繝ｼ繝・ " + hits.join("縲・) + "・噂n\n" : ""}蜿嶺ｿ｡譌･譎・ ${ts}\n\n縲舌＃雉ｪ蝠上曾n${question}\n\n縲植I蝗樒ｭ斐曾n${answer}${docsNote}`;
    const entry = { ts, urgent, hits, question, docs, status: "" };
    const ok = cfg.recipient && cfg.serviceId && cfg.templateId && cfg.publicKey;
    if (ok) {
      try {
        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ service_id: cfg.serviceId, template_id: cfg.templateId, user_id: cfg.publicKey,
            template_params: { to_email: cfg.recipient, subject, priority: urgent ? "邱頑･" : "騾壼ｸｸ", question, answer, timestamp: ts } }),
        });
        entry.status = res.ok ? "騾∽ｿ｡謌仙粥" : `騾∽ｿ｡螟ｱ謨・${res.status})`;
      } catch { entry.status = "騾∽ｿ｡螟ｱ謨暦ｼ磯壻ｿ｡荳榊庄・・; }
    } else { entry.status = "譛ｪ騾∽ｿ｡・郁ｨｭ螳壽悴蜈･蜉幢ｼ・; }
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
      const res = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000, system: SYSTEM_PROMPT,
          messages: next.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const raw = (data.content || []).filter(b => b.type === "text").map(b => b.text).join("\n").trim()
        || "逕ｳ縺苓ｨｳ縺斐＊縺・∪縺帙ｓ縲ゅ＠縺ｰ繧峨￥邨後▲縺ｦ縺九ｉ蜀榊ｺｦ縺願ｩｦ縺励￥縺縺輔＞縲・;
      const answer = raw.replace(/\*\*(.+?)\*\*/g, "$1").replace(/__(.+?)__/g, "$1");


      setMessages(p => [...p, { role: "assistant", content: answer, urgent: hits.length > 0, docs }]);
      forwardEmail({ question: q, answer, hits, docs });
    } catch {
      setMessages(p => [...p, { role: "assistant", content: "騾壻ｿ｡縺ｫ蝠城｡後′逋ｺ逕溘＞縺溘＠縺ｾ縺励◆縲ゅ♀髮ｻ隧ｱ・・120-104-508・峨〒繧ゅ＃蟇ｾ蠢懊＞縺溘＠縺ｾ縺吶・, urgent: false, docs: [] }]);
    } finally { setLoading(false); }
  }

  const navy = "#0A2A6B", blue = "#0B4DA2", accent = "#1565D8", red = "#D32011", amber = "#E65100";
  const bg = "#F4F6FB", line = "#DDE3F0", ink = "#1A2233", sub = "#5A6478";

  // 雉・侭繝舌リ繝ｼ繧ｳ繝ｳ繝昴・繝阪Φ繝・  const DocBanner = ({ docKey }) => {
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
          <div style={{ fontSize: 12, color: sub, marginBottom: 1 }}>髢｢騾｣雉・侭繧偵＃遒ｺ隱阪￥縺縺輔＞</div>
          <div style={{ fontSize: 13, fontWeight: 700, color }}>{doc.label}</div>
          <div style={{ fontSize: 11, color: sub }}>繧ｿ繝・・縺励※髢九￥ 竊・/div>
        </div>
      </a>
    );
  };

  return (
    <div style={{ fontFamily: "'Noto Sans JP', system-ui, sans-serif", background: bg, color: ink, borderRadius: 16, overflow: "hidden", border: `1px solid ${line}`, maxWidth: 780, margin: "0 auto" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&display=swap');`}</style>

      {/* 繝倥ャ繝繝ｼ */}
      <div style={{ background: `linear-gradient(135deg, ${navy} 0%, ${blue} 100%)`, padding: "14px 20px", color: "#fff", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ background: "#fff", color: navy, fontWeight: 900, fontSize: 13, width: 48, height: 48, borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", lineHeight: 1.2, letterSpacing: -0.5 }}>
            <span>譚ｱ騾ｲ</span><span style={{ fontSize: 10, fontWeight: 700 }}>譏･譌･驛ｨ</span>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 0.4 }}>譚ｱ騾ｲ繝上う繧ｹ繧ｯ繝ｼ繝ｫ 譏･譌･驛ｨ譬｡</div>
            <div style={{ fontSize: 11, opacity: 0.85, marginTop: 1 }}>菫晁ｭｷ閠・し繝昴・繝育ｪ灘哨 / 笘・0120-104-508</div>
          </div>
        </div>
        <button onClick={() => {
          if (showSettings) {
            setShowSettings(false); setAdminUnlocked(false); setPwInput(""); setPwError(false);
          } else {
            setShowSettings(true);
          }
        }} style={{ background: "rgba(255,255,255,.15)", color: "#fff", border: "1px solid rgba(255,255,255,.35)", borderRadius: 8, padding: "6px 12px", fontSize: 12, cursor: "pointer", fontFamily: "inherit" }}>
          {showSettings ? "髢峨§繧・ : "邂｡逅・ｨｭ螳・}
        </button>
      </div>

      {/* 險ｭ螳壹ヱ繝阪Ν */}
      {showSettings && (
        <div style={{ background: "#fff", borderBottom: `1px solid ${line}`, padding: "16px 20px" }}>
          {/* 繝代せ繝ｯ繝ｼ繝芽ｪ崎ｨｼ */}
          {!adminUnlocked && (
            <div style={{ textAlign: "center", padding: "8px 0 4px" }}>
              <div style={{ fontSize: 13, color: navy, fontWeight: 700, marginBottom: 10 }}>白 繧ｹ繧ｿ繝・ヵ蟆ら畑繧ｨ繝ｪ繧｢</div>
              <div style={{ display: "flex", gap: 8, justifyContent: "center", alignItems: "center" }}>
                <input
                  type="password" value={pwInput} placeholder="繝代せ繝ｯ繝ｼ繝峨ｒ蜈･蜉・
                  onChange={e => { setPwInput(e.target.value); setPwError(false); }}
                  onKeyDown={e => { if (e.key === "Enter") { if (pwInput === "0327") { setAdminUnlocked(true); setPwError(false); } else { setPwError(true); setPwInput(""); } } }}
                  style={{ padding: "8px 12px", border: `1px solid ${pwError ? red : line}`, borderRadius: 8, fontSize: 14, width: 180, fontFamily: "inherit", textAlign: "center" }}
                />
                <button onClick={() => { if (pwInput === "0327") { setAdminUnlocked(true); setPwError(false); } else { setPwError(true); setPwInput(""); } }}
                  style={{ background: navy, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 13, cursor: "pointer", fontFamily: "inherit", fontWeight: 700 }}>
                  隱崎ｨｼ
                </button>
              </div>
              {pwError && <div style={{ color: red, fontSize: 12, marginTop: 6 }}>繝代せ繝ｯ繝ｼ繝峨′豁｣縺励￥縺ゅｊ縺ｾ縺帙ｓ</div>}
            </div>
          )}
          {/* 隱崎ｨｼ蠕後・縺ｿ陦ｨ遉ｺ */}
          {adminUnlocked && (<div>
          <div style={{ fontWeight: 700, fontSize: 13, color: navy, marginBottom: 10 }}>繝｡繝ｼ繝ｫ霆｢騾∬ｨｭ螳夲ｼ・mailJS・・/div>
          {[["霆｢騾∝・繝｡繝ｼ繝ｫ繧｢繝峨Ξ繧ｹ","recipient","staff@example.com"],["Service ID","serviceId","service_xxx"],["Template ID","templateId","template_xxx"],["Public Key","publicKey","xxxxxxxx"]].map(([label,k,ph]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>{label}</div>
              <input value={cfg[k]} placeholder={ph} onChange={e => setCfg({...cfg,[k]:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ fontWeight: 700, fontSize: 13, color: navy, margin: "14px 0 10px" }}>雉・侭URL縺ｮ險ｭ螳・/div>
          {[["蜈･蟄ｦ譯亥・繝代Φ繝輔Ξ繝・ヨ縺ｮURL","pamphletUrl","https://..."],["螟乗悄諡帛ｾ・ｬ帷ｿ偵Μ繝ｼ繝輔Ξ繝・ヨ縺ｮURL","summerUrl","https://..."]].map(([label,k,ph]) => (
            <div key={k} style={{ marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>{label}</div>
              <input value={cfg[k]} placeholder={ph} onChange={e => setCfg({...cfg,[k]:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
            </div>
          ))}
          <div style={{ marginBottom: 4 }}>
            <div style={{ fontSize: 12, color: sub, marginBottom: 3 }}>邱頑･繝ｯ繝ｼ繝会ｼ郁ｪｭ轤ｹ繝ｻ繧ｫ繝ｳ繝槫玄蛻・ｊ・・/div>
            <input value={cfg.keywords} onChange={e => setCfg({...cfg,keywords:e.target.value})} style={{ width: "100%", padding: "8px 10px", border: `1px solid ${line}`, borderRadius: 8, fontSize: 13, color: ink, boxSizing: "border-box", fontFamily: "inherit" }} />
          </div>
          <p style={{ fontSize: 11, color: sub, lineHeight: 1.6, margin: "8px 0 0" }}>
            雉・侭URL縺ｯGoogle Drive繧Дropbox縺ｮ蜈ｱ譛峨Μ繝ｳ繧ｯ繧定ｨｭ螳壹＠縺ｦ縺上□縺輔＞縲ょ・蟄ｦ繝ｻ螟乗悄隰帷ｿ偵↓髢｢騾｣縺吶ｋ縺碑ｳｪ蝠上〒縺ｯ閾ｪ蜍輔〒譯亥・縺輔ｌ縺ｾ縺吶・          </p>
          {/* 霆｢騾√Ο繧ｰ・育ｮ｡逅・ｨｭ螳壼・縺ｮ縺ｿ陦ｨ遉ｺ・・*/}
          {log.length > 0 && (
            <div style={{ marginTop: 16, borderTop: `1px solid ${line}`, paddingTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: navy, marginBottom: 8 }}>鐙 霆｢騾√Ο繧ｰ</div>
              {log.map((l, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: sub, padding: "5px 0", borderBottom: i < log.length - 1 ? `1px dashed ${line}` : "none" }}>
                  {l.urgent && <span style={{ background: red, color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 4, flexShrink: 0 }}>邱頑･</span>}
                  {l.docs && l.docs.length > 0 && <span style={{ background: amber, color: "#fff", fontSize: 10, padding: "1px 6px", borderRadius: 4, flexShrink: 0 }}>雉・侭譯亥・</span>}
                  <span style={{ flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{l.ts}・悳l.question}</span>
                  <span style={{ color: l.status.includes("謌仙粥") ? "#1B7F3B" : l.status.includes("螟ｱ謨・) ? red : sub, flexShrink: 0 }}>{l.status}</span>
                  <a href={l.mailto} style={{ color: accent, textDecoration: "none", flexShrink: 0 }}>謇句虚霆｢騾・/a>
                </div>
              ))}
            </div>
          )}
          </div>)}
        </div>
      )}

      {/* 繝√Ε繝・ヨ譛ｬ菴・*/}
      <div ref={scrollRef} style={{ height: 400, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 12 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "assistant" && (
              <div style={{ width: 30, height: 30, borderRadius: 8, background: navy, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginRight: 8, marginTop: 2 }}>譚ｱ騾ｲ</div>
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
              {/* 雉・侭繝舌リ繝ｼ */}
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
            <div style={{ width: 30, height: 30, borderRadius: 8, background: navy, color: "#fff", fontSize: 10, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>譚ｱ騾ｲ</div>
            <div style={{ background: "#fff", border: `1px solid ${line}`, borderRadius: 14, borderTopLeftRadius: 4, padding: "10px 14px", fontSize: 13, color: sub }}>蜈･蜉帑ｸｭ窶ｦ</div>
          </div>
        )}
      </div>

      {/* 繧医￥縺ゅｋ雉ｪ蝠・*/}
      <div style={{ borderTop: `1px solid ${line}`, background: "#fff", padding: "10px 16px" }}>
        <div style={{ fontSize: 11, color: sub, marginBottom: 6, fontWeight: 500 }}>繧医￥縺ゅｋ縺碑ｳｪ蝠・/div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {QUICK_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => send(q)} disabled={loading}
              style={{ background: `${navy}10`, color: navy, border: `1px solid ${navy}30`, borderRadius: 20, padding: "5px 11px", fontSize: 12, cursor: "pointer", fontFamily: "inherit", fontWeight: 500, whiteSpace: "nowrap" }}>
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* 雉・侭荳隕ｧ繧ｷ繝ｧ繝ｼ繝医き繝・ヨ */}
      <div style={{ borderTop: `1px solid ${line}`, background: `${navy}05`, padding: "10px 16px", display: "flex", gap: 8 }}>
        <div style={{ fontSize: 11, color: sub, alignSelf: "center", flexShrink: 0, fontWeight: 500 }}>雉・侭・・/div>
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

      {/* 蜈･蜉帶ｬ・*/}
      <div style={{ borderTop: `1px solid ${line}`, background: "#fff", padding: "10px 14px", display: "flex", gap: 8, alignItems: "flex-end" }}>
        <textarea value={input} onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="縺碑ｳｪ蝠上ｒ蜈･蜉帙＠縺ｦ縺上□縺輔＞・・nter縺ｧ騾∽ｿ｡ / Shift+Enter縺ｧ謾ｹ陦鯉ｼ・ rows={1}
          style={{ flex: 1, resize: "none", border: `1px solid ${line}`, borderRadius: 10, padding: "10px 12px", fontSize: 14, fontFamily: "inherit", color: ink, outline: "none", maxHeight: 100, boxSizing: "border-box" }} />
        <button onClick={() => send()} disabled={loading || !input.trim()}
          style={{ background: loading || !input.trim() ? "#9DB2D6" : accent, color: "#fff", border: "none", borderRadius: 10, padding: "11px 16px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>
          騾∽ｿ｡
        </button>
      </div>

      {/* 繝輔ャ繧ｿ繝ｼ諠・ｱ */}
      <div style={{ background: `${navy}08`, borderTop: `1px solid ${line}`, padding: "10px 20px", display: "flex", gap: 16, flexWrap: "wrap" }}>
        <a href="https://www.toshin-kasukabe.com/" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>将 譏･譌･驛ｨ譬｡繧ｵ繧､繝・/a>
        <a href="https://www.toshin.com/grade_select/kobetsu.php?kousha_type=1&kousha_code=6" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>搭 蛟句挨逶ｸ隲・筏霎ｼ</a>
        <a href="https://www.toshin.com/grade_select/shotai-invitation.php?kousha_code=6&kousha_type=1" target="_blank" rel="noopener noreferrer" style={{ fontSize: 12, color: accent, textDecoration: "none" }}>笘・・螟乗悄諡帛ｾ・ｬ帷ｿ・/a>
        <span style={{ fontSize: 12, color: sub, marginLeft: "auto" }}>笘・0120-104-508</span>
      </div>


    </div>
  );
}

