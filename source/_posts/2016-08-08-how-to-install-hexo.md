---
title: Hexo 安裝
date: 2016-08-08 21:08:49
categories: Hexo
tags: Hexo
toc: true
---
<div style="font-size: 24px;padding-top: 20px;font-style: italic;">“取之於社會，用之於社會”</div>

從土木工程轉行 Key-in 人員也三年多了，現在才開始寫 Blog 會不會太慢 (￣□￣|||)a

一來是寫下在這行打滾的心得，做個里程碑，
二來是希望他日若有人遇到一樣問題，能夠幫上忙。(找到的資料是繁體中文不是很親切嗎 ㄟ(￣▽￣ㄟ))

選用 GitHub 理由：容量無限啊XD
<span style="padding-left: 8.5em">~~(絕對不是有自己的 domain name 是件很 cooooooooooooool 的事)~~</span>
選用 Hexo 理由：透過 [MarkDown](http://markdown.tw/) 的簡單語法即可撰寫出有層次網頁！
<span style="padding-left: 8em">(另一個理由就是我想熟悉他的語法....XD)</span>

因此第一篇 Blog，不免俗就是簡單搭建 Hexo 並且佈署至 GitHub 上來個 Hello World 一下。

***
### 前置安裝
開始之前，我們需先確認電腦有安裝以下環境
- [Node.js](http://nodejs.org/)
- [Git](http://git-scm.com/)

### 安裝 Hexo
安裝好 Node.js 後，即可透過 `npm` 方式快速安裝 hexo
```
$ npm install -g hexo-cli
```

### 建立 Hexo
``` bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```
建立完成後，專案資料夾會有下列檔案：

``` plain
.
├─ _config.yml    // hexo 設定檔
├─ package.json   // Node.js 相依設定檔
├─ node_modules   // Node.js 模組
├─ scaffolds      // Blog 文章 layout
├─ source
│　　└─ _posts    // Blog 文章
└─ themes         // Hexo 主題
　　 └─ landscape
```

### 啟動 Hexo Server
```
$ hexo server [-p][-s][-l]
or
$ hexo s [-p][-s][-l]
```

選項 | 描述
--- | ---
`-p`, `--port` | 覆蓋連接埠設定，預設 4000
`-s`, `--static` | 只使用靜態檔案
`-l`, `--log` | 啟動記錄器，或覆蓋記錄格式
連線至 http://localhost:4000 查看，就可以看到第一篇 Hello World 文章

### 自動刷新 (Optional)
```
$ npm install hexo-browsersync --save
```

### 建立檔案
接下來我們要建立自己的文章，輸入以下指令
``` bash
$ hexo new [layout] <title>
or
$ hexo n [layout] <title>
```
`hexo new FirstBlog` 在 `source` 資料夾下即建立 `FirstBlog.md` 檔案，就可以開始編寫 Blog 囉

### 設定檔 _config.yml
Hexo 分兩個設定檔，這邊講的是根目錄下的 `_config.yml`，而非主題下的
#### Site
```yml
# Site
title:  # 網站主標題
subtitle: # 網站副標題
description: # 用於產生 <meta property="og:description"> 標籤
author: # 網站作者
language: # 網站語言
timezone: # 網站時區，預設使用電腦時區
```

#### URL

```yml
# URL
## Set your site url here. For example, if you use GitHub Page, set url as 'https://username.github.io/project'
url: https://coffee0127.github.io/blog  #網站的網址
permalink: :year/:month/:day/:title/    # 文章永久連結的格式
permalink_defaults:                     # 永久連結中各區段的預設值，小弟沒試過XD
```

#### Writing
這邊僅針對 `new_post_name` 稍作說明，`new_post_name` 是新文章的檔案名稱，預設是 `:title.md`。
小弟將其修改為 `:year-:month-:day-:title.md`，將其修改為 `年-月-日-標題.md`，以日期為檔名，方便文章管理。
```yml
# Writing
new_post_name: :year-:month-:day-:title.md
```

其他說明可再參考官網 [Configuration](https://hexo.io/docs/configuration.html)

接著佈署至 GitHub 請見下一篇 {% post_link how-to-deploy-to-git 'Hexo 佈署' %}

### Reference
* [Hexo](https://hexo.io/)
* [使用GitHub和Hexo搭建免费静态Blog](https://wsgzao.github.io/post/hexo-guide/)
* [如何搭建一个独立博客——简明Github Pages与Hexo教程](http://www.jianshu.com/p/05289a4bc8b2)
