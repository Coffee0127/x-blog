---
title: Hexo 相關文章摘要
categories: Hexo
toc: true
date: 2016-08-11 23:49:26
tags: Hexo
---
在 {% post_link hexo-configuration 'Hexo 相關設定' %} 有跟各位介紹過“加入相關文章”功能，

老實說小弟覺得只有標題實在是太空洞了，因此看看原本的 [hexo-list-related-posts](https://github.com/nkmk/hexo-list-related-posts) 是否有相關功能

~~測試了一下發現其實是有的，只不過原作者並未提供 API 讓人使用，那就只好自己來囉<(￣︶￣)>~~
=== 2016-09-11 Updated ===
原作者已接受 PR，因此不需要再自行修改。不過沒有設置 tags 導致的錯誤，原作者並未修復，因此還是要修改一下XD

### 安裝 striptags
先確認你的 `<repository>/node_modules/` 是否有 `striptags` 模組，
若未看見該模組再透過以下指令安裝
`$ npm install striptags`

### 修改 `hexo-list-related-posts`
檔案路徑為 `<repository>/node_modules/hexo-list-related-posts/lib/index.js`
查閱小弟發給原作者的 [pull request](https://github.com/nkmk/hexo-list-related-posts/pull/3/commits/80e9739cb525f9907881d243bd04b90f6a2264d0#diff-1) 會比較容易理解差異
1. 引入 `striptags` 模組
```js
var striptags = require('striptags');
```
2. 修改 function listRelatedPosts 的 options，程式碼如下
```js
  options = assign({
    maxCount: 5,
    ulClass: 'related-posts',
    liClass: 'related-posts-item',
    generateAbstract: false,    // 是否產生摘要
    abstractClass: 'related-posts-item-abstract',   // 摘要的 css class
    abstractLength: 110,        // 摘要節錄長度
    orderBy: 'date',
    isAscending: false
  }, options);
```
3. 修改function listRelatedPosts 的呈現方式 (在原 function 最末端)，程式碼如下
```js
  if(count === 0){
    result += '<p>No related post.</p>';
  }else{
    result += '<ul class="' + options.ulClass + '">';
    if (options.generateAbstract) {
      for (var i = 0; i < count; i++) {
        result += '<li class="' + options.liClass + '">' + '<a href="' + root + postList[i].path + '">' + postList[i].title + '</a><div class="' + options.abstractClass + '">' + striptags(postList[i].content).substring(0, options.abstractLength) + '</div></li>';
      }
    } else {
      for (var i = 0; i < count; i++) {
        result += '<li class="' + options.liClass + '">' + '<a href="' + root + postList[i].path + '">' + postList[i].title + '</a></li>';
      }
    }
  }
```
4. 修改文章沒有設置 tags 發生錯誤
大家要乖乖替文章加上 tag 啊 (誤)
參考另一段 [pull request](https://github.com/nkmk/hexo-list-related-posts/pull/2/files) 加上檢查即可，程式碼如下
```js
  this.post.tags && this.post.tags.each(function(tag){
    tag.posts.each(function(post){
      postList.push(post);
    });
  });
```

### 加入 `generateAbstract: true`

修改 `themes/[主题名]/layout/_partial/post/related.ejs`  (在 {% post_link hexo-configuration 'Hexo 相關設定' %} 新增的檔案)
```js
<%- list_related_posts({maxCount: 5, orderBy: 'random', generateAbstract: true}) %>
```

### 加入 CSS
修改 `themes/<主題名稱>/source/css/_partial/article.styl`，加入以下樣式
重點在於 `text-overflow: ellipsis` 讓多餘的文字以 `...` 方式呈現
```styl
ul.related-posts
  margin-left: 0
  margin-right: 0
  padding-left: 0
  list-style: none
  li.related-posts-item
    font-size: 16px
    div.related-posts-item-abstract
      overflow: hidden
      white-space: nowrap
      text-overflow: ellipsis
      color: rgb(136, 136, 136)
      margin-bottom: 10px
      font-size: 85%
```

這個~~世界~~相關文章不再這麼空洞了 (=´∀｀)人(´∀｀=)
