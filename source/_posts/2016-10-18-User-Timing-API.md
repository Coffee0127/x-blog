---
title: User Timing API
categories: JavaScript
toc: false
date: 2016-10-18 22:27:24
tags: JavaScript
---
常常在寫 JavaScript 時，會想知道效能到底好不好之類的

最直覺的方法就是測 JavaScript 執行時間

開始之前先寫個假裝讓 JavaScript 執行很久的 `sleep` 函式

```js
function sleep(seconds) {
    var e = new Date().getTime() + (seconds * 1000);
    while (new Date().getTime() <= e) { }
}
```

接著在呼叫函式的前後做個時間戳記，以便觀察時間長短

```js
(function() {
    // 設定起始時間戳記
    var start = new Date().getTime();

    sleep(3);   // 要測試效能的函式

    // 設定結束時間戳記
    var end = new Date().getTime();
    // 測量時間間隔
    var duration = end - start;

    console.log('taking time: ' + duration + ' ms');
})();
```

但也因此必須額外付出相對應的代價，最起碼需要宣告 `start` 變數

現在，我們可以使用 `User Timing API` 來實現這件事情
同樣必須在呼叫函式前後做時間戳記，只是這次改為使用 `window.performance` 物件`
會使用到的程式碼如下
  * [performance.mark()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark)：設定時間戳記
  * [performance.measure()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure)：測量時間間隔
  * 取得 [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) 方法有以下三種
    + [performance.getEntries()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntries)
    + [performance.getEntriesByName()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByName)
    + [performance.getEntriesByType()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/getEntriesByType)

```js
(function() {
    // 設定起始時間戳記
    performance.mark('start');

    sleep(3);   // 要測試效能的函式

    // 設定結束時間戳記
    performance.mark('end');
    // 測量時間間隔
    performance.measure('myPerformance', 'start', 'end');

    console.log('taking time: ' + performance.getEntriesByName('myPerformance')[0].duration + ' ms');
})();
```

這邊使用 `performance.getEntriesByName()` 取得 [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry) 物件
兩個較為重要屬性如下：
  * [PerformanceEntry.startTime](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/startTime)：紀錄開始時間
    + 要特別注意這邊回傳的是 [DOMHighResTimeStamp](https://developer.mozilla.org/en-US/docs/Web/API/DOMHighResTimeStamp)，即從頁面瀏覽起始開始測量的高解析度時間。
  * [PerformanceEntry.duration](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry/duration)：紀錄效能持續間隔

最後需要清除時間戳記，則是透過 [performance.clearMarks()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMarks)，此方法會清除所有時間戳記。
當然若是想清除特定時間戳記，可以傳入你要清除的戳記名稱，例如 `performance.clearMarks('myPerformance')`

對應清除測量結果，則是透過 [performance.clearMeasures()](https://developer.mozilla.org/en-US/docs/Web/API/Performance/clearMeasures)

### 瀏覽器不支援怎麼辦？
根據 MDN 上面所寫，各瀏覽器支援度如下
{% img inline /2016/10/18/User-Timing-API/browser-compatibility.jpg %}

不過還好已經有人寫好類似的 API 程式了：[user-timing-rum.js](https://gist.github.com/pmeenan/5902672)

透過時間戳記效能追蹤，讓自己撰寫出更好的程式碼 GO!ヾ( ⁰ д ⁰)ﾉ

### Reference
* [Performance](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
* [PerformanceEntry](https://developer.mozilla.org/en-US/docs/Web/API/PerformanceEntry)
* [10 HTML5 APIs Worth Looking Into](https://www.sitepoint.com/10-html5-apis-worth-looking/)