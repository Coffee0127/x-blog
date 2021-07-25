---
title: Angular 自訂元素
categories: Angular
toc: false
date: 2016-09-20 19:53:24
tags:
    - Angular
---
=== 2017-04-03 Updated ===
配合 Angular 正名，因此 Angular 1.x ==> AngularJS，Angular 2.x 之後的版本 ==> Angular
修改文章標題 & 分類，內文仍維持原樣 ~~絕對不是偷懶~~

---
[Angular2](https://angular.io/) 終於在 2016-09-15 發布正式版本，

由於之前使用的 [Angular CLI](https://cli.angular.io/) 建立的專案版本為 `2.0.0-rc.5` 才一直沒注意到這個問題，

直到今天升級後發現專案直接掛了...XD

{% asset_img inline template-parse-errors.jpg %}

錯誤訊息很明顯：`'hgroup' is not a known element`

由於 Angular2 將網頁視為元件，因此 HTML 標籤都必須是合法的 Directive 元件才行。

最簡單作法當然是將 hgroup 元素改成用 div 表示即可(無誤)

若真的必須使用這種非 Angular2 可以接受的標籤，還是可以透過設定讓這些標籤繼續使用

---
修改 `src/app.module.ts`，使用 `NO_ERRORS_SCHEMA` schema

{% asset_img inline import-module.jpg %}

根據官方說明，schemas 可傳入兩種 `SchemaMetadata`
* `NO_ERRORS_SCHEMA`：允許任意元素及屬性
* `CUSTOM_ELEMENTS_SCHEMA`：允許元素名稱中帶減號(-)的任意元素

設定完成後，畫面即正常運作了～

### Reference
* [Angular 2 開發心得分享 (01)：使用 HTML 自訂元素的注意事項](http://blog.miniasp.com/post/2016/09/19/Angular-2-Custom-Element-Tips.aspx)
* [Angular2 NgModule](https://angular.io/docs/ts/latest/api/core/index/NgModule-interface.html)
