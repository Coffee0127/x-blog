---
title: 【轉錄】Top 10 Angular VS Code Extensions
categories: Angular
toc: false
date: 2017-04-03 15:04:35
tags:
    - Angular
    - VS Code
---
**※ 本文用於備份好用的 Angular VSCode 外掛及加上小弟對外掛的見解，著作權仍屬 http://devboosts.com **

### [Bracket Pair Colorizer](https://marketplace.visualstudio.com/items?itemName=CoenraadS.bracket-pair-colorizer)
可針對不同的 bracket 加上不同的顏色，我覺得這個不僅用於 Angular，拿來寫 JavaScript 也是很棒的 = ˇ =
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/bracket-colorizer_cicdeq.gif %}

### [HTML CSS Class Completion](https://marketplace.visualstudio.com/items?itemName=Zignd.html-css-class-completion)
針對已載入的 css class 自動完成
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/html-class-completion_lb3q2o.gif %}

### [Angular 2 TypeScript Emmet](https://marketplace.visualstudio.com/items?itemName=jakethashi.vscode-angular2-emmet)
Angular inline template 內可使用 emmet *(不過小弟沒有在寫 inline template，就沒裝了XD)*
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/angular2-typescript-emmet_digepq.gif %}

### [angular2-inline](https://marketplace.visualstudio.com/items?itemName=natewallace.angular2-inline)
inline css & template 有醒目標示、自動完成及 hover 提示 *(理由同上就沒裝了XD)*
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/angular2-inline_yi3evb.gif %}

### [angular2-switcher](https://marketplace.visualstudio.com/items?itemName=infinity1207.angular2-switcher)
可用來快速切換檔案，如 html -> typescrit
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/angular2-switcher_dif1ze.gif %}

### [vscode-icons](https://marketplace.visualstudio.com/items?itemName=robertohuertasm.vscode-icons)
使 VSCode 針對 Angular 有特定 icon (讓 VSCode 更好看XD)
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523094/angular-icons_rhqxbp.png %}

### [TSLint](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)
針對 TypeScript 的 [Lint](https://zh.wikipedia.org/wiki/Lint)，可標註有問題的程式碼及提供快速修正
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523095/tslint_uteshx.gif %}

### [Angular 2+ Snippets](https://marketplace.visualstudio.com/items?itemName=Mikael.Angular-BeastCode)
提供更多的 Angular 程式碼片段

### [TypeScript Hero](https://marketplace.visualstudio.com/items?itemName=rbbit.typescript-hero)
可用來管理程式碼 import 及 auto import
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/typescript-hero_vxxzuk.gif %}

### [Path Intellisense](https://marketplace.visualstudio.com/items?itemName=christian-kohler.path-intellisense)
檔案路徑的 Intellisense，同樣不僅用於 Angular，拿來寫 JavaScript / HTML / CSS 也是很棒的 = ˇ =
{% img inline http://res.cloudinary.com/dk1rn2kmf/image/upload/v1486523096/path-intelisense_ge4e0u.gif %}

### [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template&showReviewDialog=true)
這個不僅能檢查 Template 中的錯誤，也可以提供更完善的 IntelliSense 提示
不過要注意，若 Angular 專案路徑有任何一層「非英文」的路徑名稱，就會讓 Angular Language Service 失效！
~~安裝方法可以參考 [Will 保哥](https://www.facebook.com/will.fans) 影片教學 https://www.youtube.com/watch?v=3hUAYNzgzYQ~~
=== 2017-04-04 Updated ===
VSCode Marketplace 上架囉，不過目前版本(0.1.1)需要 `@angular/language-service@4.1.0-beta` 和 `typescript@2.1.5`
若未升級到 Angular 4.x 的專案需要自行安裝 dependency
*Angular 4.x 專案完全相容 Angular 2.x，這麼好康的事情還不快升級!!XD*

### Reference
* [Top 10 Angular VS Code Extensions](http://devboosts.com/2017/02/08/top-10-vs-code-extensions/index.html)
