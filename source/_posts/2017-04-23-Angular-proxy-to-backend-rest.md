---
title: Angular 呼叫遠端 API
categories: Angular
toc: true
date: 2017-04-23 12:53:35
tags:
    - Angular
---
Angular 內建的 [Http](https://angular.io/docs/ts/latest/api/http/index/Http-class.html) 可幫助我們呼叫遠端 API，
搭配 Angular CLI 工具更可以快速建立 Angular 開發環境，由於前後端會分別開發 (不是說 Eclipse 不好用，是 VSCode 真的太好用...XD)
因此我們可以透過內建的 proxy 機制，幫助我們在開發時期呼叫遠端 API

<span style="font-size: 1.3em;font-weight:bold;">
程式碼範例 <a href="https://github.com/Coffee0127/Angular-SpringMVC-Integration/commit/bec178cc3656973c5159bc1fc838a9f270f05741">Angular-SpringMVC-Integration</a>
</span>

### 前置動作 - 建立 RESTful 程式

可以參考 {% post_link spring-boot-rest '使用 SpringBoot 建立 RESTful 程式' %} 建立 RESTful API， 或是到[政府資料開放平臺](http://data.gov.tw/)或[臺北市政府資料開放平台](http://data.taipei/)尋找可用的API，如[臺北捷運列車到站站名](http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=55ec6d6e-dc5c-4268-a725-d04cc262172b)

### 建立 Angular 專案
接著我們在該 Mavne 專案根目錄下，透過 Angular CLI 建立專案 `ng new SampleProject --routing --directory front --skip-git`
* `SampleProject` 為專案名稱，這邊跟 Maven 專案採用相同命名
* `--routing` 加入路由機制，會自動建立 `app-routing.module.ts`
* `--directory front` 將 Angular 專案放置於 front 資料夾內
* `--skip-git` 省略初始化 Git repository，因為版控做在 Maven 專案上

接著就會自動安裝 node_modules，安裝好後切到 Angular 專案內，執行 `npm start` 並打開瀏覽器連至 `http://localhost:4200` 確認專案正常執行 {% asset_img inline app-works.png %}

### 透過 [Http](https://angular.io/docs/ts/latest/api/http/index/Http-class.html) 呼叫遠端 RESTful API

修改 app.component.ts 檔案注入 Http 服務元件，接著在 `ngOnInit` 呼叫遠端 RESTful API {% asset_img inline step1.png %}

### 呈現呼叫結果

修改 app.component.html 把呼叫結果印出來  
[AsyncPipe](https://angular.io/docs/ts/latest/api/common/index/AsyncPipe-pipe.html) 執行 [Observable.subscribe](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/api/core/operators/subscribe.md)
[JsonPipe](https://angular.io/docs/ts/latest/api/common/index/JsonPipe-pipe.html) 把 JSON 物件透過 `JSON.stringify()` 輸出 {% asset_img inline step2.png %}

### 設定 api proxy

在 Angular 專案目錄下建立 `proxy.conf.json` 檔案，內容如下 {% asset_img inline step3.png %}
* `/api` 為啟用 proxy 網址
* `target` 為實際遠端 API 網址
* `secure` 設為 false，不檢查 SSL 憑證
以此範例來講，原本 `http://localhost:4200/api/` 會改為連線至 `http://localhost:8080/SampleProject/api/`
更多資訊可以參考 [webpack-dev-server proxy settings](https://webpack.github.io/docs/webpack-dev-server.html#proxy) 及 [http-proxy-middleware](https://github.com/chimurai/http-proxy-middleware#http-proxy-options)

### 讀取 `proxy.conf.json`

修改 `package.json` 在 `start` 之後加上 ` --proxy-config proxy.conf.json` 指定讀取 `proxy.conf.json`
{% asset_img inline step4.png %}

透過以上設定，即可將 Angular 開發伺服器的 API 請求導到遠端 RESTful API了！ p.s 原本遠端 RESTful API 並未設置 CORS 卻一樣可以運作，實在有點厲害XD

### Reference
* [如何在 Angular CLI 建立的 Angular 2 開發環境呼叫遠端 RESTful APIs](http://blog.miniasp.com/post/2017/02/05/Setup-proxy-to-backend-in-Angular-CLI.aspx)
* [Proxy To Backend](https://github.com/angular/angular-cli/wiki/stories-proxy)
