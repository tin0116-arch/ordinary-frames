# Ordinary Frames 日常拾光

> Not every moment needs to be extraordinary to be remembered.

這是一個以原創攝影作品記錄生活片刻的靜態網站。使用溫暖底片感的介面，呈現每張照片的地點、日期與故事。



### 網站內容

- 首頁：主視覺、攝影理念、Gallery、Stories、About
- Gallery：Light & Moments / Places & Memories 分類篩選，點擊照片可放大
- Story：使用共用 `collection.html?slug=...` 模板顯示照片、日期與故事
- 使用 `data/collections.json` 統一管理作品
- 手機與桌面皆可瀏覽，不需要伺服器端或付費 API

### 專案目錄

```text
ordinary-frames/
├── AGENTS.md               # AI 開發規則
├── README.md
├── index.html              # 首頁與作品清單
├── collection.html         # 共用詳情頁
├── css/style.css
├── js/main.js
├── js/collection.js
├── data/collections.json   # 唯一的作品資料來源
└── assets/photos/<slug>/   # 照片依作品 slug 管理
```

### AGENTS.md 擴充驗證

初版包含三個攝影作品。將來新增作品時，AI 必須先閱讀 `AGENTS.md`，再將新照片放到 `assets/photos/<slug>/`，於 `data/collections.json` 新增資料，並驗證 Gallery、分類篩選及詳情頁，不改動原本頁面模板。

> 圖片著作權：攝影作品由網站作者提供。請勿擅自轉載、重製或作為他用。
