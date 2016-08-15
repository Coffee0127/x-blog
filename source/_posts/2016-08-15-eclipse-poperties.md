---
title: Eclipse Properties 顯示中文字
categories: Eclipse
date: 2016-08-15 18:24:08
tags:
    - Eclipse
    - Java
toc: true
---
做專案時，往往需要做國際化 (internationalization，簡稱 i18n，因為總共18個字 XD)

Java 存放這些多國語言檔案使用 properties 檔案，由於該檔案採用 ISO-8859-1 編碼，

Eclipse 針對那些非英文字會自動轉換為 Unicode，如下圖所示

輸入階段仍是中文字 {% img inline /2016/08/15/eclipse-poperties/before.jpg %}

一旦確認後，就~~是見證奇蹟的時刻~~自動轉成 Unicode 了 {% img inline /2016/08/15/eclipse-poperties/after.jpg %}

雖然滑鼠移上去時，可以看到中文字 {% img inline /2016/08/15/eclipse-poperties/hint.jpg %}

但是如果檔案有上萬行，豈不是看到眼花(￣□￣|||)a

還好已經有人將外掛開發出來了，我們只需將其安裝到 Eclipse 即可~

### 安裝步驟
1. Eclipse -> Help -> Install New Software...
2. 點選 Add...
3. Name: Properties Editor
    Location: http://propedit.sourceforge.jp/eclipse/updates/
    {% img inline /2016/08/15/eclipse-poperties/step1.jpg %}
    讓 Eclipse 搜尋一下...
4. 勾選 `PropertiesEditor`
    `PropertiesEditor_Asian_NLS` 是否安裝外掛多國語言 (非必要)
    {% img inline /2016/08/15/eclipse-poperties/step2.jpg %}
5. 接著就是 Eclipse 安裝 plugin 時一些同意條款說明
6. 安裝完成後，在 Eclipse -> Window -> Preferences 即可看見 `Properties Editor`<br/>{% img inline /2016/08/15/eclipse-poperties/step3.jpg 600 %}
    若有安裝多國語言則如圖<br/> {% img inline /2016/08/15/eclipse-poperties/step3-zh.jpg %}
7. 使用外掛提供的 `PropertiesEditor` 開啟 properties 檔案即可看見中文了
    {% img inline /2016/08/15/eclipse-poperties/step4.jpg %}
8. 使用預設的編輯器看，卻仍舊是 Unicode<br/>
    {% img inline /2016/08/15/eclipse-poperties/step5.jpg %}
9. 若不想將註解也轉為 Unicode，則在 Preferences 裡面勾選 Convert Option 的第二個選項
    {% img inline /2016/08/15/eclipse-poperties/step6-1.jpg %}
    註解不再轉為 Unicode<br/>{% img inline /2016/08/15/eclipse-poperties/step6-2.jpg %}

    若整份 properties 都不需轉為 unicode 則勾選第一個選項。
    Ｑ：何時會用？
    Ａ：[ZK i18n](https://www.zkoss.org/wiki/ZK_Developer's_Reference/Internationalization/Labels)，由於 ZK i18n 讀取的 properties 檔案編碼為 UTF-8，因此不需額外轉為 Unicode


### Reference
* [簡介 i18n](http://openhome.cc/Gossip/Rails/i18n.html)