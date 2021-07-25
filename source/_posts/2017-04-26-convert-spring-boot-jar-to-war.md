---
title: 打包 SpringBoot 為 war 檔
categories: Spring
toc: true
date: 2017-04-26 17:32:23
tags:
    - Spring
    - SpringBoot
    - Maven
---
<span style="font-size: 1.3em;font-weight:bold;">
程式碼範例 <a href="https://github.com/Coffee0127/Angular-SpringMVC-Integration/commit/ae4bcecdbec04b3f5373d58364b1bdb1336d7a32">Angular-SpringMVC-Integration</a>
</span>

在 {% post_link spring-boot-rest '使用 SpringBoot 建立 RESTful 程式' %} 時，有建立了一個簡單的 SpringMVC 程式，但是打包出來的結果是 jar 檔，接下來就是將其打包成為 war 檔，使得能夠佈署在我們現有的 Servlet Container 上

### 加入 [Spring Boot Maven plugin](http://docs.spring.io/spring-boot/docs/1.5.x/maven-plugin/)
[Spring Boot Maven plugin](http://docs.spring.io/spring-boot/docs/1.5.x/maven-plugin/) 讓 Maven 能夠支援 SpringBoot，使 SpringBoot 專案能打包為可執行的 jar 檔或 war 檔<!--more-->
僅需於 pom.xml 中加入以下設定即可
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!-- ... -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
                <version>1.5.3.RELEASE</version>
                <executions>
                    <execution>
                        <goals>
                            <goal>repackage</goal>
                        </goals>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```
不過若是 maven 專案繼承自 `spring-boot-starter-parent` 那麼可以簡化成如下設定即可
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <!-- ... -->
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
```
嗯，沒錯，就這麼簡單，連版本都不用寫XD
事實上打開 `spring-boot-starter-parent` 後會發現他又繼承了 `spring-boot-dependencies`，
而 `spring-boot-dependencies` 內透過 `<dependencyManagement>` 及 `pluginManagement` 都幫我們定義了一些預設的 scope 或是 goal 等

這個時候已經可以包出可執行的 jar 檔了!

### 修改 Maven 的 packaging 及更改 `spring-boot-starter-tomcat` scope
1. 將 packaging 改為 `war` (預設值為 `jar`)
2. 將 `spring-boot-starter-tomcat` scope 更改為 "provided"
  為什麼前一步驟包出來的 jar 檔可以直接透過 `java -jar` 方式跑 web 程式，其實就是因為內建了 Tomcat 所需的一些函式庫
  不過當我們打包成 war 檔時，這些函式庫反而會跟 server 起衝突，因此需將其更改為 "provided"
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <!-- ... -->
    <packaging>war</packaging>
    <!-- ... -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-tomcat</artifactId>
            <scope>provided</scope>
        </dependency>
        <!-- ... -->
    </dependencies>
</project>
```

### 修改原本的 SpringBootApplication
1. 將原本標註 [`@SpringBootApplication`](http://docs.spring.io/autorepo/docs/spring-boot/1.5.x/api/org/springframework/boot/autoconfigure/SpringBootApplication.html) 的主程式繼承 [`SpringBootServletInitializer`](http://docs.spring.io/autorepo/docs/spring-boot/1.5.x/api/org/springframework/boot/web/support/SpringBootServletInitializer.html)
  而 [`SpringBootServletInitializer`](http://docs.spring.io/autorepo/docs/spring-boot/1.5.x/api/org/springframework/boot/web/support/SpringBootServletInitializer.html) 又繼承了 [`WebApplicationInitializer`](http://docs.spring.io/spring-framework/docs/4.3.x/javadoc-api/org/springframework/web/WebApplicationInitializer.html)
  [`WebApplicationInitializer`](http://docs.spring.io/spring-framework/docs/4.3.x/javadoc-api/org/springframework/web/WebApplicationInitializer.html) 是 Spring 3.1 新增介面，實作此介面的類別，不需額外宣告，會自動被 [`SpringServletContainerInitializer`](http://docs.spring.io/spring-framework/docs/4.3.8.RELEASE/javadoc-api/org/springframework/web/SpringServletContainerInitializer.html) 偵測、自動呼叫註冊所需的相關方法
  *(但是很重要的一點，Servlet 3.0 以上才支援XD；Servlet 2.5 之前的版本還是只能透過 web.xml 方式註冊 `ApplicationContext` 及 `DispatcherServlet`)*
2. 覆寫 `configure` 方法，加入 java configuration (也就是 `MainApplication` 啦!)
```java
@SpringBootApplication
public class MainApplication extends SpringBootServletInitializer {
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {
        return application.sources(MainApplication.class);
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(MainApplication.class, args);
    }
}
```

打包出來的結果，是個 "可執行的 war 檔"，可以將其單獨佈署在 Servlet Container 上 (如 Tomcat)

也可以透過 `java -jar SampleProject.war` 的方式執行這個 war 檔
    打開 `META-INF/MANIFEST.MF` 的檔案，會看到 `Main-Class: org.springframework.boot.loader.WarLauncher`
    因此實際執行 SpringBoot 的主程式 (並且使用 WEB-INF/lib-provided 的 Tomcat 函式庫)

在 `target` 目錄下會看到 `SampleProject.war.original`，這是原本 Maven 打包出來的 war 檔，但是被 [Spring Boot Maven plugin](http://docs.spring.io/spring-boot/docs/1.5.x/maven-plugin/) 重新打包過了 (`repackage`)

### References
* [Packaging executable jar and war files](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#build-tool-plugins-maven-packaging)
* [Create a deployable war file](http://docs.spring.io/spring-boot/docs/current/reference/htmlsingle/#howto-create-a-deployable-war-file)
