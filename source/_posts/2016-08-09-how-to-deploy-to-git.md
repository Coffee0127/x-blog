---
title: Hexo 佈署
date: 2016-08-09 14:21:18
categories: Hexo
tags: Hexo
toc: true
---
接續上一篇 [Hexo 安裝](</blog/2016/08/08/how-to-install-hexo/)

### 認識 GitHub {% img inline /2016/08/09/how-to-deploy-to-git/PEO-octocat-0.svg 64 %}
* [GitHub](https://zh.wikipedia.org/zh-tw/GitHub)
* [Git達人教你搞懂GitHub基礎觀念](http://www.ithome.com.tw/news/95283)

### 建立 github.io
* [Creating Project Pages manually](https://help.github.com/articles/creating-project-pages-manually/)
主要目的為替你的 repository 建立一個名為 `gh-pages` 的 branch

小弟規劃如下 {% img inline /2016/08/09/how-to-deploy-to-git/branch.jpg %}
+ master：用來放 Hexo 相關檔案
+ gh-pages：用來放 Hexo 產出之靜態網頁，也就是 Blog

### 佈署至 GitHub
1. 手動佈署
    下列其中一個指令，皆可產生靜態網頁，再自行 commit &amps; push 到 gh-pages
    ```
    $ hexo generate
    $ hexo g
    ```
2. 產生完檔案後佈署 (自動化很棒吧XD)
    1. 使用 NPM 安裝 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)
    `npm install hexo-deployer-git --save`
    2. 修改 `_config.yml`
        ```
        deploy:
        type: git
        repo: https://github.com/Coffee0127/blog.git  // 前一步開的 repository git url
        branch: gh-pages  // github.io
        message:          // 預設值為：Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }}
        ```
    3. 佈署指令
        下列的其中一個指令，皆可讓 Hexo 在建立完畢後自動佈署至 GitHub，兩個指令的作用是相同的。
    ```
    $ hexo generate --deploy
    $ hexo deploy --generate
    ```

### 參考資料
* [[Hexo] Gtihub 上架 Blog](https://blog.ivanwei.co/2015/10/11/2015-10-11-build-blog-by-hexojs/)
