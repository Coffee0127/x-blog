---
title: 使用 VS Code 替 Angular 除錯
categories: Angular
toc: false
date: 2017-06-11 14:35:50
tags:
    - Angular
    - VS Code
---
在 [使用 Chrome 替 Angular 除錯](/blog/2017/06/11/Angular-debug-with-chrome/) 寫了如何使用 Chrome 來進行除錯，
不過在雙螢幕情況下，這時反而會顯得工作效率低落

_修改程式 -> 切換瀏覽器開發者工具 -> 設置中斷點除錯 -> 切回 VS Code -> 修改程式 -> ..._

應該善用 VS Code 本身的除錯工具，就不需要視窗切來切去了

<!--more-->

#### 執行步驟：
1. 先安裝 [Debugger for Chrome](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2. 建立 `launch.json`
    * 如果之前已建立過，此步驟可省略
    * 如果沒有 `launch.json`，可輸入指令 `ctrl + p` → `>debuglaunch.json` 並選擇 `Chrome` (VS Code 會自動建立 `.vscode` 資料夾與 `launch.json`)
      {% asset_img inline add-launch-json.gif %}
3. 於 `launch.json` 加入以下設定
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome against localhost",
      "url": "http://localhost:4200",
      "webRoot": "${workspaceRoot}/src",
      "userDataDir": "${workspaceRoot}/.chrome",
      "sourceMapPathOverrides": {
        "webpack:///./src/*": "${webRoot}/*"
      }
    }
  ]
}
```
    * `url`：修改成 Angular 專案的網址 (即預設的 http://localhost:4200)
    * `webRoot`：指定路徑至 `src` 目錄資料夾 (存放 source code 的路徑)
    * `sourceMapPathOverrides`：加入 `"webpack:///./src/*": "${webRoot}/*"`
        + [使用 Chrome 替 Angular 除錯](/blog/2017/06/11/Angular-debug-with-chrome/) 時，於 Chrome 設定 Webpack 中斷點的路徑 `./`
4. 透過 `npm start` 啟動 Angular 專案
5. 按下 `F5` 開始執行除錯 (VS Code 會自動開啟新的 Chrome 瀏覽器)
6. 開始進行除錯
   _修改程式 -> 設置中斷點除錯 -> 修改程式 -> ..._
   {% asset_img inline vs-code-debug.gif %}
   <br>p.s 不需要切換視窗，VS Code 改完 Angular cli 會自動刷新頁面

### References
* [VS Code - Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug)
* [Live edit and debug your React apps directly from VS Code — without leaving the editor ](https://medium.com/@auchenberg/live-edit-and-debug-your-react-apps-directly-from-vs-code-without-leaving-the-editor-3da489ed905f)
