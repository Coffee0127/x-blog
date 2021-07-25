---
title: 透過 Angular 路由建立 SPA 網站
categories: Angular
toc: false
date: 2017-04-24 08:49:52
tags:
    - Angular
---
#### *程式碼範例 [Angular-SpringMVC-Integration](https://github.com/Coffee0127/Angular-SpringMVC-Integration/commit/688659d58e5e4067a511a4b2819707e0caecaabe)*

### 建立 Angular 專案及頁面元件
1. 透過 Angular CLI 建立專案 `ng new SampleProject --routing`
    `--routing` 加入路由機制，會自動建立 `app-routing.module.ts`
2. 透過 Angular CLI 建立元件 `ng g c pages/page1 --spec false` 及 `ng g c pages/page2 --spec false` 在 pages 下建立兩個 Component
3. 修改 `app-routing.module.ts` 設定路由<!--more-->
   {% asset_img inline step3.png %}
4. 修改 `app.component.html` 加入路由連結 及 路由插座(?XD)
   `[routerLinkActiveOptions]="{ exact: true }"` 必須是根路徑才套用 active class {% asset_img inline step4.png %}
5. 修改 `app.component.css` 加入 active class，利於辨識路由運作<br>
   {% asset_img inline step5.png %}
6. 透過 `npm start` 確認實際運作情形<br>
   {% asset_img inline step6.gif %}

### References
* [ROUTING & NAVIGATION
](https://angular.io/docs/ts/latest/guide/router.html)
* [使用 Angular 2 Router 快速建構 SPA 網站](https://www.youtube.com/watch?v=sQx9s6fGI8E)
    + 投影片 https://www.slideshare.net/WillHuangTW/build-spa-website-with-angular-2-router
