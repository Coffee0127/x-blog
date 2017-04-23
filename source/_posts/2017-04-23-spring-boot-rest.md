---
title: 使用 SpringBoot 建立 RESTFul 程式
categories: SpringBoot
toc: false
date: 2017-04-23 12:38:11
tags:
    - Spring
    - SpringMVC
    - SpringBoot
---
在開始之前，必須先了解 [SpringBoot](https://projects.spring.io/spring-boot/) 是用來做什麼的，我覺得這篇 Blog 比喻得滿生動的XD [Introduction to Spring Boot](https://blog.mimacom.com/introduction-to-spring-boot/)
如果 SpringFramework 是提供原物料(如雞蛋、砂糖、麵粉等)，開發人員還必須自己組裝(而且每個案子都會先做類似的事情)，
那麼 SpringBoot 就是直接送上蛋糕，把瑣碎重複的事情全部做好 (當然開發人員仍舊可以透過 Java Configuration 或是 設定檔進行客製化)

小弟也是最近案子才開始有接觸 SpringBoot，觀念上若有錯誤還請不吝指教...Orz

#### *程式碼範例 [Angular-SpringMVC-Integration](https://github.com/Coffee0127/Angular-SpringMVC-Integration/commit/5e91cf1b69b393069029314f204e21bc67439c9f)*

### 設定 Maven 專案環境
於 [pom.xml](https://github.com/Coffee0127/Angular-SpringMVC-Integration/commit/3aff0f3830ac9973b660136158441c8b8cdff4ff) 加入 SpringBoot 相關設定，並且設定 `app.context.name` 供後續設定 context path
```xml
<project>
    ...
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>1.5.1.RELEASE</version>
    </parent>

    <properties>
        <java.version>1.8</java.version>
        <app.context.name>SampleProject</app.context.name>
    </properties>
    ...
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-devtools</artifactId>
        </dependency>
    </dependencies>
```

### 設定 Encoding 及 context path
於 `src/main/resources` 下加入 `application.yml` 檔案及以下設定，這邊須注意到，因為繼承了 `spring-boot-starter-parent` POM，因此引用 Maven 變數值是前後使用 `@maven.token@`，而非 `${maven.token}`
```yml
spring:
  http:
    encoding:
      enabled: true
      charset: UTF-8
      force: true

server:
  context-path: /@app.context.name@
```

### 設定 RestController
程式碼跟之前寫 SpringMVC 類似，不過 Spring 有提供許多新的 Annotation 幫助我們簡化程式碼，如 4.0 之後可使用 `@RestController` 以簡化 `@Controller` 及 `@ResponseBody`
透過 `@requestMapping` 設定 RESTFul API 的路徑
```java
@RestController
@RequestMapping("/api/cars")
public class APIController {
    @RequestMapping("/find")
    public String findCars() {
        // 回傳 Cars JSONArray
        return "[{\"id\":1,\"model\":\"P...\"}]";
    }
}
```

### 建立主程式
最後就是寫個 main 方法執行 SpringBoot，打開 `http://localhost:8080/SampleProject/api/cars/find` 就可以看到前一步指定的回傳資料
```java
@SpringBootApplication
public class MainApplication {
    public static void main(String[] args) throws Exception {
        SpringApplication.run(MainApplication.class, args);
    }
}
```

### References
* [Building an Application with Spring Boot](https://spring.io/guides/gs/spring-boot/)
* [Use ‘short’ command line arguments](http://docs.spring.io/spring-boot/docs/1.5.1.RELEASE/reference/html/howto-properties-and-configuration.html#howto-use-short-command-line-arguments)
