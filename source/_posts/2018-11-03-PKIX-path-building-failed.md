---
title: OpenJDK PKIX path building failed
categories: Java
toc: false
date: 2018-11-03 12:52:48
tags:
    - Java
    - OpenJDK
---
故事是這樣子的，小弟用 [Rainlendar](https://www.rainlendar.net/cms/index.php) + GCALDaemon + Windows排程 同步 Google 行事曆

_其實 Rainlendar Pro 就有同步功能，€9.95_
_GCALDaemon 目前在 sourceforge 已經找不到了...Orz_
_還好 Github 還有 [LancelotLiu](https://github.com/LancelotLiu) Fork 的版本 [GCALDaemon](https://github.com/LancelotLiu/GCALDaemon)_

原本用 OracleJDK 都順順同步，直到前陣子換了 OpenJDK 在同步時卻噴出以下錯誤

<!--more-->
```
2018-11-03 11:06:25 | ERROR | GCalUtilitiesV3 | Unable to load calendar!
  [1 ] javax.net.ssl.SSLHandshakeException: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
  [2 ] at sun.security.ssl.Alerts.getSSLException(Alerts.java:192)
  [3 ] at sun.security.ssl.SSLSocketImpl.fatal(SSLSocketImpl.java:1964)
  [4 ] at sun.security.ssl.Handshaker.fatalSE(Handshaker.java:328)
  [5 ] at sun.security.ssl.Handshaker.fatalSE(Handshaker.java:322)
  [6 ] at sun.security.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1614)
  [7 ] at sun.security.ssl.ClientHandshaker.processMessage(ClientHandshaker.java:216)
  [8 ] at sun.security.ssl.Handshaker.processLoop(Handshaker.java:1052)
  [9 ] at sun.security.ssl.Handshaker.process_record(Handshaker.java:987)
  [10] at sun.security.ssl.SSLSocketImpl.readRecord(SSLSocketImpl.java:1072)
  [11] at sun.security.ssl.SSLSocketImpl.performInitialHandshake(SSLSocketImpl.java:1385)
  [12] at sun.security.ssl.SSLSocketImpl.writeRecord(SSLSocketImpl.java:757)
  [13] at sun.security.ssl.AppOutputStream.write(AppOutputStream.java:123)
  [14] at java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)
  [15] at java.io.BufferedOutputStream.flush(BufferedOutputStream.java:140)
  [16] at org.apache.commons.httpclient.HttpConnection.flushRequestOutputStream(HttpConnection.java:825)
  [17] at org.apache.commons.httpclient.MultiThreadedHttpConnectionManager$HttpConnectionAdapter.flushRequestOutputStream(MultiThreadedHttpConnectionManager.java:1543)
  [18] at org.apache.commons.httpclient.HttpMethodBase.writeRequest(HttpMethodBase.java:1920)
  [19] at org.apache.commons.httpclient.HttpMethodBase.execute(HttpMethodBase.java:1002)
  [20] at org.apache.commons.httpclient.HttpMethodDirector.executeWithRetry(HttpMethodDirector.java:382)
  [21] at org.apache.commons.httpclient.HttpMethodDirector.executeMethod(HttpMethodDirector.java:168)
  [22] at org.apache.commons.httpclient.HttpClient.executeMethod(HttpClient.java:393)
  [23] at org.apache.commons.httpclient.HttpClient.executeMethod(HttpClient.java:324)
  [24] at org.gcaldaemon.core.GCalUtilitiesV3.loadCalendar(GCalUtilitiesV3.java:299)
  [25] at org.gcaldaemon.core.GCalUtilities.loadCalendar(GCalUtilities.java:196)
  [26] at org.gcaldaemon.core.Configurator.synchronizeNow(Configurator.java:1016)
  [27] at org.gcaldaemon.core.file.OfflineFileListener.run(OfflineFileListener.java:61)
  [28] Caused by: sun.security.validator.ValidatorException: PKIX path building failed: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
  [29] at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:397)
  [30] at sun.security.validator.PKIXValidator.engineValidate(PKIXValidator.java:302)
  [31] at sun.security.validator.Validator.validate(Validator.java:262)
  [32] at sun.security.ssl.X509TrustManagerImpl.validate(X509TrustManagerImpl.java:324)
  [33] at sun.security.ssl.X509TrustManagerImpl.checkTrusted(X509TrustManagerImpl.java:229)
  [34] at sun.security.ssl.X509TrustManagerImpl.checkServerTrusted(X509TrustManagerImpl.java:124)
  [35] at sun.security.ssl.ClientHandshaker.serverCertificate(ClientHandshaker.java:1596)
  [36] ... 21 more
  [37] Caused by: sun.security.provider.certpath.SunCertPathBuilderException: unable to find valid certification path to requested target
  [38] at sun.security.provider.certpath.SunCertPathBuilder.build(SunCertPathBuilder.java:141)
  [39] at sun.security.provider.certpath.SunCertPathBuilder.engineBuild(SunCertPathBuilder.java:126)
  [40] at java.security.cert.CertPathBuilder.build(CertPathBuilder.java:280)
  [41] at sun.security.validator.PKIXValidator.doBuild(PKIXValidator.java:392)
  [42] ... 27 more
```

通常這錯誤是憑證認證上發生問題，經過比較以後發現 OpenJDK 的 cacerts 確實少了 Google 憑證鏈的 Root CA憑證 (根憑證)
{% img inline /2018/11/03/PKIX-path-building-failed/diff.jpg %}

### 匯出 根憑證
1. Chrome 連至 <https://www.google.com/> > 點選網址左邊鎖頭 > 憑證
{% img inline /2018/11/03/PKIX-path-building-failed/export-root-ca-step1.jpg %}

2. 憑證路徑 > 點選最上層根憑證 (即 Google Trust Services - GlobalSign Root CA-R2) > 檢視憑證
{% img inline /2018/11/03/PKIX-path-building-failed/export-root-ca-step2.jpg %}

3. 詳細資料 > 複製到檔案
{% img inline /2018/11/03/PKIX-path-building-failed/export-root-ca-step3.jpg %}
接著按照憑證匯出精靈一步一步匯出憑證，這邊取名為 `globalsignr2ca.cer`

### 匯入 根憑證
#### 方法A: 使用 Java [keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html) 
  `keytool -import -alias globalsignr2ca -keystore  %JAVA_HOME%/jre/lib/security/cacerts -file globalsignr2ca.cer`

#### 方法B: 使用 [KeyStore Explorer](https://keystore-explorer.org/)
1. 開啟 [KeyStore Explorer](https://keystore-explorer.org/)，並點選 "Open an existing KeyStore"，選擇要匯入的 cacerts
    若要修改 JAVA_HOME 的可以直接點選  "Open the CA Certificates KeyStore"
    {% img inline /2018/11/03/PKIX-path-building-failed/kse-import-step1.jpg %}
2. 輸入 cacerts 密碼，預設應為 `changeit`
3. 點選 "Import Trusted Certificate" 選擇剛剛匯出的根憑證
    {% img inline /2018/11/03/PKIX-path-building-failed/kse-import-step3.jpg %}
4. KeyStore 顯示憑證內容，確認無誤後按 OK
    {% img inline /2018/11/03/PKIX-path-building-failed/kse-import-step4.jpg %}
5. KeyStore 詢問是否接受此為信賴憑證，點選 是
    {% img inline /2018/11/03/PKIX-path-building-failed/kse-import-step5.jpg %}
6. 要求輸入 alias，輸入 `globalsignr2ca`
    {% img inline /2018/11/03/PKIX-path-building-failed/kse-import-step6.jpg %}

再次執行 GCALDaemon 確認可以正常同步了 🎉

---
### References
* [GCALDaemon](https://github.com/LancelotLiu/GCALDaemon)
    * Fork from <http://gcaldaemon.sourceforge.net/> by [LancelotLiu](https://github.com/LancelotLiu)
* [StackOverflow -“PKIX path building failed” and “unable to find valid certification path to requested target”](https://stackoverflow.com/questions/21076179/pkix-path-building-failed-and-unable-to-find-valid-certification-path-to-requ)
* [keytool](https://docs.oracle.com/javase/8/docs/technotes/tools/unix/keytool.html) 
* [KeyStore Explorer](https://keystore-explorer.org/)
