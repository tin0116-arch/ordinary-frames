# Ordinary Frames — AI 開發規範

## 1. 專案目標
Ordinary Frames（日常拾光）是展示原創日常攝影的靜態作品集。核心是溫暖底片感、尊重影像原貌、以攝影系列保存日常故事。使用繁體中文作為主要敘述，英文作為系列標題或輔助標籤。

## 2. 技術與部署
- 使用 HTML、CSS、原生 JavaScript 和 JSON；不得在未經同意下加入框架、後端、付費 API 或建置工具。
- 必須可透過 GitHub Pages 靜態部署。所有站內資源使用相對路徑。
- 首頁 `index.html`；系列詳情共用 `collection.html?slug=<slug>` 模板，不為每個系列複製 HTML。
- 主要檔案：`css/style.css`、`js/main.js`、`js/collection.js`、`data/collections.json`、`assets/photos/<slug>/`。

## 3. 視覺規範
- 背景 `#F5EFE5`、淺米色 `#D9C4A5`、焦糖棕 `#A98265`、橄欖灰 `#6D7056`、文字 `#332B26`。
- 英文標題優先 Georgia 或系統 serif；中文使用系統 sans-serif（可回退 Noto Sans TC）。
- 大留白、自然照片比例、簡潔日期與系列標籤；避免飽和濾鏡、過度動畫和花俏圖示。
- 手機寬度 375px 起須可閱讀，導覽不遮擋，圖片不超出視窗。
- 使用者偏好減少動態效果時，關閉非必要動畫。

## 4. 內容架構與分類
- 固定分類 ID：`light-and-moments`（光影時刻）、`places-and-memories`（旅途記憶）。不得在未同步修改篩選器與兩份 JS 映射表時自行增加分類。
- `data/collections.json` 為唯一作品資料來源，包含 `collections` 陣列。
- 每個系列必須有：`slug`（小寫英數及連字號、全站唯一）、`title`、`subtitle`、`category`、`date`（YYYY-MM-DD）、`description`（繁體中文約 40–120 字）、`location`（地點，未知時填「未提供」）、`cover`、`photos`（至少 1 張）。
- 每張照片必須有：`src`、`alt`（具體描述畫面，避免「照片1」）、`caption`（可為空字串）、`date`（YYYY-MM-DD 或空字串）。不得捏造拍攝時間、地點、人物、器材資訊。
- 只使用使用者提供且有權公開的影像。不得把示意圖冒充使用者作品；缺照片時標示待補，不虛構照片內容。

## 5. 檔案與照片管理
- 原始照片留在使用者自己的備份位置，網站僅存放經使用者核可的展示版本。
- 每個系列放在 `assets/photos/<slug>/`，檔名採 `<slug>-001.jpg`、`<slug>-002.jpg` 等；也可使用 `.webp`，但 JSON 路徑必須吻合。
- 展示照片原則上長邊不超過 2000px、盡量壓縮至每張約 500KB 以下（視品質調整）；不得擅自裁切、套濾鏡、移除浮水印或改變照片構圖。
- 圖片必須保留原始長寬比，使用 `object-fit: contain` 顯示完整大圖；縮圖如需裁切須先取得使用者同意。
- 不公開 EXIF 中的 GPS 等敏感資訊；盡量使用已移除 EXIF 的展示檔。上傳前檢查車牌、可辨識人物及隱私；不擅自以生成影像替換原作品。

## 6. AI 新增系列的標準流程
1. 先讀本檔、現有 `data/collections.json` 和相關 HTML/CSS/JS，確認分類及命名慣例。
2. 確認使用者提供的照片、系列名稱、分類、日期與文字；缺必要資料先詢問，不猜測。
3. 將展示照片放入 `assets/photos/<slug>/`，依序命名，避免覆寫既有檔案。
4. 在 `data/collections.json` 增加一筆符合 schema 的系列；沿用既有模板，不另造樣式或重複頁面。
5. 使用現有分類的作品時，只編輯 JSON 與照片檔，不改動 HTML/CSS/JS。確認首頁/作品列表能自動顯示新系列，點擊可進入 `collection.html?slug=<slug>`，所有照片可正常載入。
6. 回報新增或修改的檔案、測試結果，以及尚待使用者確認的項目。

## 7. AI 修改限制
- 不得未經要求刪除、覆寫、重新命名既有照片或系列。
- 不得擅自改動全站色彩、字體、導覽與資料 schema；如確有必要，先提出原因及相容方案。
- 不得虛構拍攝故事、地點、人物或照片來源。
- 不得加入追蹤程式、第三方上傳服務或要求 API Key。
- 修改應盡量局部，保持舊系列正常運作。

## 8. 驗收標準
- GitHub Pages 上首頁與系列頁能開啟，站內連結沒有 404。
- `collections.json` 格式正確，`slug` 唯一，所有分類有效，圖片路徑存在。
- 新增系列不需修改 HTML 模板即可出現在列表，且詳情頁正常顯示。篩選器要能正確分組，無作品時不出現破圖。
- 桌面與手機皆能閱讀；圖片比例正確，alt 文字合理，鍵盤可操作重要控制。
- 舊系列沒有因新增內容而消失或損壞。
- AI 在交付時列出檔案變更、測試結果及未完成事項。

## 9. 交辦範例
「請先閱讀 AGENTS.md，使用我提供的照片新增 `quiet-afternoon` 系列，分類為 `little-moments`。依照既有 JSON 格式新增資料，不改動原本樣式；完成後檢查首頁與系列頁面並列出修改檔案。」

## 10. 新增作品的實際驗收示範
- 初版已有 `after-the-sunset`、`a-night-in-rome`、`the-days-of-youth` 三個作品。
- 後續依本檔規則新增 `five-years-later`（2025-07-04，`places-and-memories`）與 `above-the-clouds`（2024-01-31，`light-and-moments`）。
- 擴充時只加入照片、更新 `data/collections.json`，不得為新作品手動複製 HTML，確保版型可以長期重用。

## 11. Photography Notes 攝影手札（首頁擴充規則）
- 攝影手札是首頁 `index.html` 中 `id="notes"` 的內容區塊，導覽連結為 `href="#notes"`，不需要新增 `notes.html`、JSON 或 JavaScript。這是本專案的簡易版本。
- 新增手札前，AI 必須先閱讀本規則，確認對應的攝影作品已存在於 `data/collections.json`，不得捏造拍攝地點、日期或心得。
- 每篇手札使用現有 `#notes` 內的 `<article class="hero">` 結構，依序編號 `NOTE 001`、`NOTE 002`；每篇須有：編號、拍攝日期、地點、英文標題、中文標題、心得、照片路徑、具體 alt 文字、對應 `collection.html?slug=...` 連結。
- 複製既有 `<article>` 後僅替換該篇內容，不新增獨立頁面、不更動其他攝影系列、不新增框架，也不引入外部 API。照片繼續引用 `assets/photos/<slug>/` 中的原始展示檔；不得擅自裁切或套濾鏡。
- 文字採繁體中文，以作者提供的真實感受為基礎，避免虛構經歷。沿用現有 `.hero`、`.hero-copy`、`.hero-photo`、`.text-link` 等 CSS 類別，不隨意新增相互衝突的全站樣式。
- 驗收時應檢查首頁 Notes 連結能跳至 `#notes`、手札文字及照片正常顯示、View Collection 指向正確系列、手機可閱讀、既有五張作品沒有受影響。
- 擴充測試範例：請 AI 先閱讀本檔，再依照 `NOTE 001` 格式新增明治神宮 `five-years-later` 的 `NOTE 002`，保留原有手札與其他作品。
