---
title: 使用 Chrome 替 Angular 除錯
categories: Angular
toc: false
date: 2017-06-11 12:06:51
tags:
    - Angular
---
使用 Angular cli 工具好處就是可以節省許多環境面的設定 (如 TypeScript 轉譯、Webpack 打包、程式最小化等)
讓我們能夠專注於業務邏輯的撰寫  

不過也因為所有程式會被 Webpack 打包成 main.bundle.js，在除錯時較不容易找到自己撰寫的程式碼 ~~(via Ctrl + F 搜尋)~~
還好 Webpack 在打包時會產生 source map，以方便程式設計師可以對應原本程式碼  

<!--more-->

打開 Chrome 開發者工具，切換至 `Sources` 頁籤 {% asset_img inline chrome-dev-tool-sources.png %}

從左方資源列表可以看到 `webpack://`，點開並尋找 `.` 資料夾下，即可看到 Angular 專案的 `src` 目錄 {% asset_img inline webpack-root.png %}

尋找要進行除錯的程式，設定中斷點，即可使用 Chrome 來進行除錯
(除錯常見的 Watch、Call Stack 等功能都可在 Chrome 開發者工具中使用)
{% asset_img inline chrome-debug.png %}
