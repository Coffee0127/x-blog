---
title: IntelliJ 修改 Git commit 紀錄
categories: IntelliJ
toc: true
date: 2019-03-06 21:06:49
tags:
  - IntelliJ
  - Git
---
當要修改最後一次 commit 紀錄時，直覺反應就是 `git commit --amend`

但由於 [IntelliJ IDEA](https://www.jetbrains.com/idea/) Git 整合度非常高，幾乎絕大部分操作都能透過 GUI 完成

以下介紹幾種在 IntelliJ 內修改 Git commit 紀錄的作法 (以 2018.3 為例)

情境：修改 commit log `Commit 3`
{% img inline /2019/03/06/intellij-reword-git-commit/commit-logs.jpg %}
<!--more-->

## git commit
### 使用內建 Terminal
1. 確定 Terminal 已啟用
{% img inline /2019/03/06/intellij-reword-git-commit/enable-plugins.jpg %}
2. 透過 `Alt + F12` 開啟 Terminal
3. 輸入 `git commit --amend`
{% img inline /2019/03/06/intellij-reword-git-commit/terminal-cmd.jpg %}
4. 接下來就是 vi 畫面，按下小寫 i 後可以編輯內容；編輯完畢後按 `Esc`，接著輸入 `:wq` 即可儲存離開
{% img inline /2019/03/06/intellij-reword-git-commit/git-vi.jpg %}

~~結果第一個就是打指令 (毆)~~

### Commit 時勾選 Amend commit
勾選 Amend commit 重新 commit 即可，不過限制檔案內容有修改過
{% img inline /2019/03/06/intellij-reword-git-commit/commit-changes.jpg %}

~~你也可以選擇 Amend commit 兩次，例如把上圖的 `Commit3` > `Commit31` > `Commit3`，並打上要修正的 commit 紀錄 (超大誤)~~

## git rebase
### 透過 Git rebase
1. VCS > Git > Rebase...
  {% img inline /2019/03/06/intellij-reword-git-commit/menu-git-rebase.jpg %}
2. 勾選 Interactive，並且 Onto 設定為 `HEAD~`<br>
  {% img inline /2019/03/06/intellij-reword-git-commit/git-rebase.jpg %}
3. 於 Action 選擇 `reword` 後點選 Start Rebasing<br>
  {% img inline /2019/03/06/intellij-reword-git-commit/rebasing-commits.jpg %}
4. 輸入要修正的 Commit 內容後點選 Resume Rebasing<br>
  {% img inline /2019/03/06/intellij-reword-git-commit/additional-rebase-input.jpg %}

### 透過 Version Control reword
1. View > Tool Windows > Version Control (或透過 `Alt + 9` 開啟)
  {% img inline /2019/03/06/intellij-reword-git-commit/menu-version-control.jpg %}
2. 右鍵 > Reword... (或透過 `F2`)
  {% img inline /2019/03/06/intellij-reword-git-commit/version-control-reword.jpg %}
3. 輸入要修正的 Commit 內容後點選 OK<br>
  {% img inline /2019/03/06/intellij-reword-git-commit/reword-commit.jpg %}

## 結語
雖然 IntelliJ 提供精美 GUI 幫助我們，但本質上還是 Git 指令 (是個易學難精的版控😂)
推薦兩位大神的精美文章－
* [Will 保哥](https://blog.miniasp.com/) － [30 天精通 Git 版本控管](https://github.com/doggy8088/Learn-Git-in-30-days) 
* [高見龍](https://kaochenlong.com/) － [為你自己學 Git](https://gitbook.tw/)

底下則是本篇文章運用到的 Git 指令
### 有關 git commit \-\-amend
* [`git commit --amend`](https://git-scm.com/docs/git-commit#git-commit---amend)
* [修正 commit 過的版本歷史紀錄 Part 1 ( reset, amend )](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/18.md)
* [【狀況題】修改 Commit 紀錄](https://gitbook.tw/chapters/using-git/amend-commit1.html)

### 有關 git rebase
* [`git rebase -i`](https://git-scm.com/docs/git-rebase#git-rebase--i)
* [修正 commit 過的版本歷史紀錄 Part 5 ( rebase -i )](https://github.com/doggy8088/Learn-Git-in-30-days/blob/master/zh-tw/23.md)
* [另一種合併方式（使用 rebase）](https://gitbook.tw/chapters/branch/merge-with-rebase.html)
