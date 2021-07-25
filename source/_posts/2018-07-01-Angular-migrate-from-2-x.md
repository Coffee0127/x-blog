---
title: Angular 2.0 升級至 6.0
categories: Angular
toc: true
date: 2018-07-01 15:06:43
tags:
    - Angular
---
在 {% post_link Maven-Angular-integration '透過 Maven 整合 Angular 專案' %} 當時還是使用 Angular 2.4 版

隨著今年 5 月 Angular 6 的正式發佈，當然程式也要做出相對應升級

官方提供了 [Angular 升級指南](https://update.angular.io/)，點選 從哪個版本升到哪個版本 以及 專案複雜度 後，即會列出一份 TODO 清單

<!--more-->
{% asset_img inline update-guide.jpg %}

不過官方並不建議一次跨太多版本，所以還是乖乖從 2.4 -> 4.0 -> 5.0 -> 6.0 這樣逐步升版

### 逐步升級 Angular 版本
#### 2.4 -> 4.0
1. 確保沒有使用 `extends` 任何 Angular 生命週期介面 (如 `OnInit`)，而是應該正確使用 `implements`
結果發現當初寫的範例根本沒有 extends / implements (遮臉)，那就快修正 [app.component.ts](https://github.com/Coffee0127/Angular-SpringMVC-Integration/blob/master/front/src/app/app.component.ts#L9)
2. 更新相依性
`npm install @angular/animations@^4.0.0 @angular/common@^4.0.0 @angular/compiler@^4.0.0 @angular/compiler-cli@^4.0.0 @angular/core@^4.0.0 @angular/forms@^4.0.0 @angular/http@^4.0.0 @angular/platform-browser@^4.0.0 @angular/platform-browser-dynamic@^4.0.0 @angular/platform-server@^4.0.0 @angular/router@^4.0.0 typescript@2.4.0 rxjs@^5.0.1 zone.js@^0.8.4`

#### 4.0 -> 5.0
1. 更新相依性
`npm install @angular/animations@^5.0.0 @angular/common@^5.0.0 @angular/compiler@^5.0.0 @angular/compiler-cli@^5.0.0 @angular/core@^5.0.0 @angular/forms@^5.0.0 @angular/http@^5.0.0 @angular/platform-browser@^5.0.0 @angular/platform-browser-dynamic@^5.0.0 @angular/platform-server@^5.0.0 @angular/router@^5.0.0 typescript@2.4.2 rxjs@^5.5.2`
2. 將 `HttpModule` 及 `Http` 服務元件改為 `HttpClientModule` 及 `HttpClient`
    * [`app.module.ts`](https://github.com/Coffee0127/Angular-SpringMVC-Integration/blob/master/front/src/app/app.module.ts#L20) 改為匯入 `HttpClientModule`
    * [`app.component.ts`](https://github.com/Coffee0127/Angular-SpringMVC-Integration/blob/master/front/src/app/app.component.ts#L12) 改為注入 `HttpClient`
        此外也不再需要自己做 json 轉換了!

#### 5.0 -> 6.0
1. 先確認 NodeJS 使用 8 (或之後)的版本
2. 更新 Angular CLI 版本 (global & local)
    `npm install -g @angular/cli@latest`
    `npm install @angular/cli@latest`
    `ng update @angular/cli`
    Angular CLI 從原本 `.angular-cli.json` 改名成 `angular.json`
3. 更新 codelyzer 版本
    `npm install codelyzer@~4.2.0`
4. 更新 Angular / TypeScript / RxJS 版本
    **Angular 6 必須搭配 TypeScript 2.7 及 RxJS 6**
    `ng update @angular/core`
5. 檢查是否尚有其他相依性未更新
    `ng update` 
6. 修改 RxJS 6 deprecated 的功能 [rxjs-tslint auto update rules](https://github.com/ReactiveX/rxjs-tslint)
    `npm install -g rxjs-tslint`
    `rxjs-5-to-6-migrate -p src/tsconfig.json`
7. 修改完後刪除 `rxjs-compat`
    `npm uninstall rxjs-compat`

~~當然如果不想做這麼多步驟，也可以用 Angular CLI 重新 `ng new` 一個 project，再把原本的程式碼丟進去就好 (逃)~~

### 修改 angular.json
將 `sample-project-e2e` 進行以下修改，避免 Angular CLI 無法正確將 component / service / class 放到 src 下
```json
  "sample-project-e2e": {
    "root": "e2e/",
    "sourceRoot": "",
    ...
  }
```
### 修改 Angular httpClient 程式的 base url
1. 建立 APIInterceptor 服務元件 `ng g s api-interceptor`
2. 實作 [HttpInterceptor](https://angular.io/api/common/http/HttpInterceptor) 的 [intercept](https://angular.io/api/common/http/HttpInterceptor#intercept) 方法 若是 production 環境下，則將 [HttpRequest](https://angular.io/api/common/http/HttpRequest) URL 加上 context path {% asset_img inline api-interceptor.jpg %}
3. 修改 `app.module.ts` 透過 DI 方式注入 APIInterceptor 元件 {% asset_img inline app-module.jpg %}

### 透過 Maven 打包 & 執行

可參考之前文章 {% post_link Maven-Angular-integration '透過 Maven 整合 Angular 專案' %}

<span style="font-size: 1.3em;font-weight:bold;">
程式碼範例 <a href="https://github.com/Coffee0127/Angular-SpringMVC-Integration2">Angular-SpringMVC-Integration</a>
</span>
(原本 2.4 版本移到分支 <a href="https://github.com/Coffee0127/Angular-SpringMVC-Integration/tree/angular2.x">angular2.x</a>)

---
### References
* [Angular 6: Upgrading & Summary of New Features](https://alligator.io/angular/angular-6/)
