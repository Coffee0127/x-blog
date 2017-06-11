---
title: 透過 Maven 整合 Angular 專案
categories: Maven
toc: true
date: 2017-04-25 00:07:30
tags:
    - Maven
    - Integration
    - Angular
---
在 [使用 SpringBoot 建立 RESTful 程式](/blog/2017/04/23/spring-boot-rest/) 及 [Angular 呼叫遠端 API](/blog/2017/04/23/Angular-proxy-to-backend-rest/) 已經分別完成**開發時期**前後端串接，
接下來是透過 Maven Plugin 將前後端程式打包再一起。

不過為了增加程式的真實性，先加入兩個頁面以驅動 Angular 路由機制 (可參考 [透過 Angular 路由建立 SPA 網站](/2017/04/24/Angular-simple-routing/))

<!--more-->

### 設定 [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
在 `<plugins>` 內加入 [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
作者建議是使用最新版的 (可至 https://repo1.maven.org/maven2/com/github/eirslett/frontend-maven-plugin/ 查閱最新版本)
```xml
<build>
    <plugins>
        <plugin>
            <groupId>com.github.eirslett</groupId>
            <artifactId>frontend-maven-plugin</artifactId>
            <version>1.4</version>
            <executions>
                <!-- 後續介紹... -->
            </executions>
        </plugin>
    </plugins>
</build>
```
接著開始加入 `<execution>`
#### 安裝 node、npm、yarn
第一步當然是要安裝 NodeJS 及 NPM，不過小弟覺得 yarn 安裝速度快一點，因此是直接把兩個 `<goal>` 寫在一起了XD
* 透過 `<nodeVersion>`、`<npmVersion>`、`<yarnVersion>` 分別指定版本
* 透過 `<nodeDownloadRoot>`、`<npmDownloadRoot>`、`<yarnDownloadRoot>` 可以指定下載來源網址 (可用於公司內網環境)
* 透過 `<installDirectory`> 指定檔案下載路徑，預設會放在 `${project.basedir}/node`
```xml
<execution>
    <id>install node and yarn</id>
    <goals>
        <goal>install-node-and-npm</goal>
        <goal>install-node-and-yarn</goal>
    </goals>
    <phase>generate-sources</phase>
    <configuration>
        <nodeVersion>v6.10.0</nodeVersion>
        <npmVersion>3.10.10</npmVersion>
        <yarnVersion>v0.22.0</yarnVersion>
    </configuration>
</execution>
```
#### 安裝 node_modules
因為在前一步驟有安裝了 yarn，因此這邊的 goal 選擇使用 [Running yarn](https://github.com/eirslett/frontend-maven-plugin#running-yarn)
*(當然你也可以選擇執行 [Running npm](https://github.com/eirslett/frontend-maven-plugin#running-npm) 或 [Running Grunt](https://github.com/eirslett/frontend-maven-plugin#running-grunt))*
* `<workingDirectory>` 通常會指向 `package.json` 所在目錄，小弟這邊指向 [Angular 呼叫遠端 API](/blog/2017/04/23/Angular-proxy-to-backend-rest/) 時建立的 `front` 資料夾
* 設定 `<installDirectory>` 為 `${project.basedir}`
  由於設定了 `<workingDirectory>`，Maven 預設會從 `<workingDirectory>` 下尋找 node & yarn，因此我們必須指定路徑回專案根目錄( `${project.basedir}`)
```xml
<execution>
    <id>yarn install</id>
    <goals>
        <goal>yarn</goal>
    </goals>
    <configuration>
        <installDirectory>${project.basedir}</installDirectory>
        <workingDirectory>front</workingDirectory>
    </configuration>
</execution>
```
#### 執行 Angular CLI 打包
這邊執行 [Running npm](https://github.com/eirslett/frontend-maven-plugin#running-npm)，還是要設定 `<installDirectory>`、`<workingDirectory>`
* 透過 `ng build` script 打包 Angular 專案
* `--pord` 指定打包方式為 production，這邊需特別注意 `--prod` 前面的 **`--`**
  因為這個 `<goal>` 最終會變成 [npm-run-script](https://docs.npmjs.com/cli/run-script)，根據其定義在 `<args>` 之前必須帶額外的兩個 `--`
  小弟畢竟對 NodeJS 不是那麼的熟，當初找 global command 的 `ng build --base-href` 可以正常運作，但是跑 `npm run ng build --base-href` 卻失敗 XD，直到看到這篇 [npm run ng build --base-href /newapp not working](https://github.com/angular/angular-cli/issues/5768) 才恍然大悟ˋ(′ε‵")ˊ
* 透過 `--base-href /${app.context.name}/` 設定 Angular 路由的 base href
  Angular CLI 會很聰明地幫我們把 index.html 原本的 `<base href="/">` 替換成 `<base href="/${app.context.name}/">`
  這邊的 `${app.context.name}` 則是在 [使用 SpringBoot 建立 RESTful 程式](/blog/2017/04/23/spring-boot-rest/) 時候設定的 Maven properties
```xml
<execution>
    <id>ng build</id>
    <goals>
        <goal>npm</goal>
    </goals>
    <phase>generate-sources</phase>
    <configuration>
        <installDirectory>${project.basedir}</installDirectory>
        <workingDirectory>front/</workingDirectory>
        <arguments>run ng build -- --prod --base-href /${app.context.name}/</arguments>
    </configuration>
</execution>
```

※ 補充說明：此 plugin 不會使用系統已安裝好的 NodeJS，當然可以透過 `<installDirectory>` 指定含有 node 的系統資料夾
```xml
<installDirectory>C:/iCoding</installDirectory>
```
執行時會去 C:/iCoding/node 尋找 node 執行檔 (這個路徑可以是透過 symbolic link 建立出來的 XD)

### 設定 [maven-resources-plugin](https://maven.apache.org/plugins/maven-resources-plugin/)
若 [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin) 設定正確且運作正常的話，會在 `front` 下產出 `dist` 資料夾，並含有打包好的 Angular 專案
接著我們只需要透過 [maven-resources-plugin](https://maven.apache.org/plugins/maven-resources-plugin/) 把它複製到 SpringBoot 的 static 資料夾即可
*(如果是 war 檔可以透過 [maven-war-plugin](https://maven.apache.org/plugins/maven-war-plugin/examples/including-excluding-files-from-war.html) 實現)*
```xml
<plugin>
    <groupId>org.apache.maven.plugins</groupId>
    <artifactId>maven-resources-plugin</artifactId>
    <executions>
        <execution>
            <id>copy-angular</id>
            <goals>
                <goal>copy-resources</goal>
            </goals>
            <phase>process-resources</phase>
            <configuration>
                <overwrite>true</overwrite>
                <outputDirectory>${project.build.directory}/classes/static</outputDirectory>
                <resources>
                    <resource>
                        <directory>front/dist</directory>
                    </resource>
                </resources>
            </configuration>
        </execution>
    </executions>
</plugin>
```

### 修改 Angular http 程式的 `base url`
老實說小弟很不確定這種寫法到底對不對...XD 如果有誤還請各位先進指點
1. 建立 CustomRequestOptions 元件 `ng g class CustomRequestOptions`
2. 繼承 [BaseRequestOptions](https://angular.io/docs/ts/latest/api/http/index/BaseRequestOptions-class.html) 並實作 [merge](https://angular.io/docs/ts/latest/api/http/index/RequestOptions-class.html#!#merge-anchor) 方法
  若是 production 環境下，則將 [Http](https://angular.io/docs/ts/latest/api/http/index/Http-class.html) 所有 '/' 開頭的 URL 加上 context path
{% img inline /2017/04/25/Maven-Angular-integration/step2.png %}
3. 修改 `app.module.ts` 透過 DI 方式注入 CustomRequestOptions 元件
{% img inline /2017/04/25/Maven-Angular-integration/step3.png %}

### 透過 Maven 打包 & 執行
1. `mvn clean package` 後在 target 資料夾下會有 SpringBoot 的 jar 檔產生
2. 執行 `java -jar target\Angular-SpringMVC-Integration-0.0.1-SNAPSHOT.jar` 並連線至 `http://localhost:8080/SampleProject` 即可看到 Angular 路由及 Http 存取皆可正常運作
  \\(￣▽￣)/(\￣▽)/\\(　 　)/\\(▽￣/)\\(￣▽￣)/ 

<span style="font-size: 1.3em">
*程式碼範例 [Angular-SpringMVC-Integration](https://github.com/Coffee0127/Angular-SpringMVC-Integration)*
</span>

### References
* [frontend-maven-plugin](https://github.com/eirslett/frontend-maven-plugin)
* [深入探討 Angular 的 DI 與 Provider](http://oomusou.io/angular/angular-di/)
