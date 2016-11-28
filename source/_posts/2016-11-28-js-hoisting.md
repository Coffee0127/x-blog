---
title: JavaScript Hoisting
categories: JavaScript
toc: false
date: 2016-11-28 14:17:15
tags:
    - JavaScript
    - Must-Know
---
這篇是上完[保哥](https://www.facebook.com/will.fans)的《JavaScript 開發實戰：核心概念篇》筆記之二 ~~(狀態仍顯示為拖稿)~~

**Hoisting** 翻成中文是提升，在 JavaScript 是要提升什麼呢？

W3Schools [JavaScript Hoisting](http://www.w3schools.com/js/js_hoisting.asp) 是這樣定義的：
{% blockquote JavaScript Hoisting http://www.w3schools.com/js/js_hoisting.asp W3Schools%}
Hoisting is JavaScript's default behavior of moving declarations to the top.
{% endblockquote %}

JavaScript 預設會把**宣告(declarations)提升到最上端**

即變數可以先使用，後宣告 (這跟一般程式語言不一樣XD)，以下兩段範例程式碼輸出結果是完全相同的

* Example 1
```js
x = 5; // Assign 5 to x
console.log(x);     // print 5
var x; // Declare x
```

* Example 2
```js
var x; // Declare x
x = 5; // Assign 5 to x
console.log(x);     // print 5
```

---
再來談談哪些是**宣告(declarations)**
* 使用 `var` 關鍵字宣告的變數
* 使用宣告式的具名函數 (如下宣告 foo 的 function)
```js
function foo() {
    console.log("I'm a function and my name is 'foo'");
}
```

因此以下程式碼也是可以正常執行的

```js
foo();

function foo() {
    console.log("I'm a function and my name is 'foo'");
}
```

那麼當 `var` 跟 `function` 一起來的時候該怎麼辦呢XD

幾點原則如下：
1. `var` 僅提升變數宣告，而非初始化(Initializations)
2. `function` 則是連同函式定義提升
3. `var` 跟 `function` 先宣告者先提升

看似理解了，但是還是需要多加練習才可以

---
請問以下程式碼執行時會回傳什麼?

```js
(function() {
    return test();
    var test = function() { return 1; }
    function test() { return 2; }
})();
```

1. 逐行尋找 `var` 及 `function` 宣告，並提升至 function scope 的最上層。因此先將 `var test` 提升，初始化仍維持原位置
```js
(function() {
    var test;

    return test();
    test = function() { return 1; }
    function test() { return 2; }
})();
```

2. 接著再往下遇到 `function test()`，一樣提升至 function scope 最上層 (注意提升後的位置，是在 `var test` 之後)
```js
(function() {
    var test;
    function test() { return 2; }

    return test();
    test = function() { return 1; }
})();
```

3. 因此這樣便很清楚知道 `return test()` 會回傳 `2` <( ‵▽′)b good job

---
再來一次逐步提升 (其實只是將 test 換個位置而已XD)

```js
(function() {
    var test = function() { return 1; }
    function test() { return 2; }
    return test();
})();
```

1. 提升 `var test`
```js
(function() {
    var test;

    test = function() { return 1; }
    function test() { return 2; }
    return test();
})();
```

2. 再來提升 `function`
```js
(function() {
    var test;
    function test() { return 2; }

    test = function() { return 1; }
    return test();
})();
```

3. 因此這樣便很清楚知道 `return test()` 會回傳 `1` <( ‵▽′)b good job
很神奇的，明明 `function` 比較晚宣告，但是最後仍是會回傳 `1` XD
這就是 JavaScript 迷人之處(?)

---
更多的練習題～ (還是將 test 換個位置而已XD)

* Example 1
```js
(function() {
    function test() { return 2; }
    var test = function() { return 1; }
    return test();
})();   // return 1
```

* Example 2
```js
(function() {
    function test() { return 2; }
    return test();
    var test = function() { return 1; }
})();   // return 2
```

* Example 3
```js
(function() {
    var test = function() { return 1; }
    return test();
    function test() { return 2; }
})();   // return 1
```

* Example 4
```js
(function() {
    return test();
    function test() { return 2; }
    var test = function() { return 1; }
})();   // return 2
```

---
由於 JavaScript 允許函式在任何位置使用 `var` 宣告變數，因此要特別小心 `Hoisting` 造成的奇怪現象

其實我們只要養成幾個好習慣

1. 將所有的變數在 `function` 一開始的時候即使用 `var` 宣告 (甚至是 `for` 迴圈的變數 `i`)
**若未採用 `var` 宣告會成為全域變數**，要特別注意！
2. 函式採用 `函式表示法 (function expression)` 方式宣告 (即 `var test = function() {}`)

可參考範例 [jQuery](https://github.com/jquery/jquery/blob/1.6.2/jquery.js) 25 行開始宣告一堆的變數、72 行宣告了 fcamelCase 函式...等