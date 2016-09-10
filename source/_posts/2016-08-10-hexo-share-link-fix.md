---
title: Hexo 分享連結失效
categories: Hexo
toc: false
date: 2016-08-10 21:29:09
tags: Hexo
---
今天想來試試看分享功能，結果 FB 連結分享出來的卻是 404....XD

看了一下分享的網址 https://coffee0127.github.io/blog/blog/2016/08/09/hexo-configuration/

欸 怎麼網址長出了兩個 `/blog` (￣□￣|||)a

Google 了一下發現官網有人提出了一樣的問題 [share link wrong with sub path](https://github.com/hexojs/hexo/issues/1812)

還好底下有人提供解決方案，或許之後版本作者就會修正了 (小弟使用 Hexo 版本為 3.2.2)

解決方法其實也不難，僅需修改 `hexo/lib/models/post.js` 即可

確切路徑為 `<your_repository>/node_modules/hexo/lib/models/post.js`

將 57 行開始程式碼
```js
  Post.virtual('permalink').get(function() {
    var config = ctx.config;

    return config.url + config.root + this.path;
  });
```
修改為以下即可
```js
  Post.virtual('permalink').get(function() {
    var url_for = ctx.extend.helper.get('url_for');
    var config = ctx.config;
    var partial_url = url_for.call(ctx, this.path);
    return config.url + _.replace(partial_url, config.root, '/');
  });
```

之後重新產生新的 Blog 網頁即可

p.s 僅針對 Blog 放在子資料夾內的才需修改 (好比小弟之類的...XD)
```yml
# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: https://coffee0127.github.io/blog/
root: /blog/
permalink: :year/:month/:day/:title/
permalink_defaults:
```

### Reference
* https://github.com/hexojs/hexo/blob/master/lib/models/post.js#L59