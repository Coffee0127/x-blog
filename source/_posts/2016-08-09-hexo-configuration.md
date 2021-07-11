---
title: Hexo 相關設定
date: 2016-08-09 17:31:38
categories: Hexo
tags: Hexo
toc: true
---
經過前兩篇 {% post_link how-to-install-hexo 'Hexo 安裝' %} & {% post_link how-to-deploy-to-git 'Hexo 佈署' %}

我們已經可以開始編寫 Blog 了<(￣︶￣)>

但是還是過於陽春，因此這篇會講些簡單設定 Hexo，看起來更有模有樣。

### 網頁 Icon
_Icon 代表著網站的精神呢，這當然很重要啊ˋ(′ε‵")ˊ_
1. 將你的 `favicon.ico` 放置於 `source` 資料夾下
2. 修改 `themes/<主題名稱>/_config.yml` 的 favicon 為 `favicon.ico` (若你圖示名稱是 favicon.png，這步驟可省略)
3. 修改 `themes/<主題名稱>/layout/_partial/head.ejs`，加入 context root url
    將 `<link rel="icon" href="<%- theme.favicon %>">` 修改為 `<link rel="icon" href="<%- config.root %><%- theme.favicon %>">` 即可

### Read More
* 方法一：文章中加入 `<!--more-->` 即可 (但是需要自行設置，頗麻煩)
* 方法二：參考  [Hexo自动添加ReadMore标记](https://twiceyuan.com/2014/05/25/hexo%E8%87%AA%E5%8A%A8%E6%B7%BB%E5%8A%A0readmore%E6%A0%87%E8%AE%B0/)，修改 `themes/[主题名]/layout/_partial/article.ejs`，
  但該篇提供之方法只會於首頁處顯示第一段落，稍微修改成可以決定要顯示的行數 (即 `const THRESH_HOLD = 5`)
    ```
    <div class="article-entry" itemprop="articleBody">
      <% if (post.excerpt && index){ %>
        <%- post.excerpt %>
        <% if (theme.excerpt_link){ %>
          <p class="article-more-link">
            <a href="<%- url_for(post.path) %>#more"><%= theme.excerpt_link %></a>
          </p>
        <% } %>
      <% } else { %>
        <%- post.content %>
      <% } %>
    </div>
    ```
    修改為
    ```
    <div class="article-entry" itemprop="articleBody">
      <% if (post.excerpt && index) { %>
        <%- post.excerpt %>
        <% if (theme.excerpt_link) { %>
          <p class="article-more-link">
            <a href="<%=url_for(post.path)%>#more"><%= theme.excerpt_link %></a>
          </p>
        <% } %>
      <% } else { %>
        <% if (!index && post.toc) { %>
          <div id="toc" class="toc-article">
            <strong class="toc-title">文章目錄</strong>
            <%- toc(post.content) %>
          </div>
        <% } %>
        <%
           const THRESH_HOLD = 5;   // 要出現的段落數
           var newLines = (post.content.match(/\n/g) || []).length;
           var indexOfThreshHold = -1;
           for (var i = 0; i < THRESH_HOLD; i++) {
             indexOfThreshHold = post.content.indexOf('\n', indexOfThreshHold + 1);
           }
        %>
        <% if (newLines < THRESH_HOLD || !index) { %>
          <%- post.content %>
        <% } else { %>
          <%- post.content.substring(0, indexOfThreshHold) %>
          <% if (theme.excerpt_link) { %>
            <p class="article-more-link">
              <a href="<%=url_for(post.path)%>"><%= theme.excerpt_link %></a>
            </p>
          <% } %>
        <% } %>
      <% } %>
    </div>
    ```

### 加入評論
1. 先到 [Disqus](http://disqus.com/) 註冊帳號後，在 Create New Site 時 ，會根據你的 WebSite Name 提供對應的 Short Name，也可以自訂 Shortname
2. 修改 `_config.yml`，加入以下資訊後，即可生效。
```
# Disqus
disqus_shortname: <剛剛申請的 Shortname>
```

### 加入相關文章
1. 透過以下指令安裝 [hexo-list-related-posts](https://github.com/nkmk/hexo-list-related-posts)
`$ npm install hexo-list-related-posts --save`
2. 修改 `themes/<主題名稱>/layout/_partial/article.ejs`，找到 `<%- partial('post/nav') %>` 並於前一段落加入 `partial('post/related')`
3. 接著在 `themes/landscape/layout/_partial/post` 新增 `related.ejs` 檔案 (對應前一步驟之檔名)
4. 相關文章樣式版型可再依個人喜好自行修改，主要程式碼為 `<%- list_related_posts([options]) %>`，小弟目前樣式為
```
<article class="article">
  <div class="article-inner">
    <div class="article-header">
        <h3 class="article-title" style="font-size: 20px;">相關文章</h3>
    </div>
    <div class="article-entry">
      <%- list_related_posts({maxCount: 5, orderBy: 'random'}) %>
    </div>
  </div>
</article>
```
並且在 `themes/<主題名稱>/source/css/_partial/article.styl` 加入樣式
```styl
.related-posts-item
  font-size: 16px
```

### 加入 TOC ( Table Of Content )
1. 修改 `themes/<主題名稱>/layout/_partial/article.ejs`，找到 `<%- post.content %>` 並於前一段落加入以下程式碼
  ```
  <% if (!index && post.toc){ %>
    <div id="toc" class="toc-article">
      <strong class="toc-title">文章目錄</strong>
      <%- toc(post.content) %>
    </div>
  <% } %>
  ```
  其中 `!index` 讓首頁摘要不產生目錄，`post.toc` 則是需於文章設定 `toc: true` 才生效
2. 修改樣式，`themes/<主題名稱>/source/css/_partial/article.styl`，於最末端加入以下 CSS 樣式，依個人喜好微調
```styl
/*toc*/
.toc-article
  background #eee
  border 1px solid #bbb
  border-radius 10px
  margin 1.5em 0 0.3em 1.5em
  padding 1.2em 1em 0 1em
  max-width 28%

.toc-title
  font-size 120%

#toc
  line-height 1em
  font-size 0.9em
  float right
  .toc
    padding 0
    margin 1em
    line-height 1.8em
    li
      list-style-type none

  .toc-child
    margin-left 1em
```

### 加入 Google Analytics
1. 先到 [Google Analytics](https://www.google.com.tw/intl/zh-TW/analytics/) 註冊取得追蹤編號
2. 修改 `themes/<主題名稱>/_config.yml`，找到 `google_analytics`  後，將追蹤編號貼上即可

### 加入 sitemap
「Sitemap」是一種檔案，可以在其中列出網站上的網頁，讓其他搜尋引擎瞭解網站內容架構，以更靈活的方式檢索網站。
1. 透過以下指令安裝 [hexo-generator-sitemap](https://github.com/hexojs/hexo-generator-sitemap)
`$ npm install hexo-generator-sitemap --save`
2. 修改 `_config.yml` 加入以下選項
```
# Sitemap
sitemap:
    path: sitemap.xml
```
3. 重啟後連線至 [http://localhost:4000/&lt;Blog 名稱&gt;/sitemap.xml](#) 即可看見 sitemap.xml 囉
4. 提交你的 Sitemap
  + [Google 網站管理員工具](https://www.google.com/webmasters/tools)
  + [Yahoo 和 Bing 網站管理員工具](http://www.bing.com/toolbox/webmaster)
  + [百度站長平台](http://zhanzhang.baidu.com)
  + [360好搜站長平台](http://zhanzhang.haosou.com)

### 加入 RSS Feed
透過 RSS，讓別人訂閱你的文章
1. 透過以下指令安裝 [hexo-generator-feed](https://github.com/hexojs/hexo-generator-feed)
`$ npm install hexo-generator-feed --save`
2. 修改 `_config.yml` 加入以下選項
```
# Feed Atom
feed:
    type: atom
    path: atom.xml
    limit: 20
```
3. 修改 `themes/<主題名稱>/layout/_partial/header.ejs`，將原本 `<%- theme.rss %>` 修改為 `<%=url_for(theme.rss)%>`

### Reference
* [Hexo 安裝教學、心得筆記](https://wwssllabcd.github.io/blog/2014/12/22/how-to-install-hexo/)
* [为Hexo博客添加目录](http://kuangqi.me/tricks/enable-table-of-contents-on-hexo/)
* [如何搭建一个独立博客——简明Github Pages与Hexo教程](http://www.jianshu.com/p/05289a4bc8b2)
* [Hexo+GitHub创建博客及使用技巧](http://longxdragon.github.io/2015/03/07/Hexo-GitHub-create-blog/)
