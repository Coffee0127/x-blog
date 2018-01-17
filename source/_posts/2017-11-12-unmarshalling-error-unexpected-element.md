---
title: "CXF Unmarshalling Error: unexpected element"
categories: Apache CXF
toc: false
date: 2017-11-12 15:02:40
tags:
    - Java
    - Apache CXF
    - Weblogic
---
最近在使用 [Apache CXF](http://cxf.apache.org/docs/index.html) 搭配 SpringBoot 進行 WebService 開發

測試 Server 端時先使用 [SoapUI](https://www.soapui.org/) 確認沒問題後，再改用 CXF Client 端呼叫，

本機開發使用 Tomcat 跑 Server 端沒有問題，SoapUI 可正常執行並取得結果，CXF Client 端亦是如此

不過實際佈署到 Weblogic 上，SoapUI 可正常執行並取得結果，CXF Client 端卻拋例外了....◢▆▅▄▃崩╰(〒皿〒)╯潰▃▄▅▇◣

例外訊息為 `javax.xml.ws.soap.SOAPFaultException: Unmarshalling Error: unexpected element (uri:"http://io.github.coffee0127/", local:"return"). Expected elements are <{}return>`

後來發現可透過 `StaxTransformFeature` 將未預期的 namespace 去除掉
*(不過至於為何 Weblogic 會加上這些 namespace 還要研究...Orz)*

專案架構如下，程式碼可到 [cxf-test-proj](https://github.com/Coffee0127/cxf-test-proj) 下載
* ws-api 放置 WebService 介面與訊息物件
* ws-client 放置 WebService Client 端 CXF 設定
* ws-server 放置 WebService Server 端 CXF 設定及 WebService 實作

```
cxf-test-proj
├─ws-api
│  └─src
│     └─main
│         └─java
│             └─io
│                 └─github
│                     └─coffee0127
│                        └─service
├─ws-client
│   └─src
│      └─main
│         └─resources
│              └─META-INF
│                  └─spring
└─ws-server
    └─src
       └─main
          ├─java
          │   └─io
          │      └─github
          │          └─coffee0127
          │             └─service
          │                 └─impl
          └─resources
              └─META-INF
                  └─spring
```

### ws-server
* service-wss.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:jaxws="http://cxf.apache.org/jaxws"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://cxf.apache.org/jaxws
            http://cxf.apache.org/schemas/jaxws.xsd">

    <jaxws:endpoint implementor="io.github.coffee0127.service.impl.FunctionProcessServiceImpl"
        address="/s001" />

</beans>
```

* FunctionProcessServiceImpl.java (簡單的實作，並無其他特別設定)
```java
@Service("FunctionProcessService")
@WebService(name = "FunctionProcessService", serviceName = "FunctionProcessServiceClient",
    portName = "FunctionProcessServicePort", targetNamespace = "http://service.coffee0127.github.io/")
public class FunctionProcessServiceImpl implements FunctionProcessService {

    private static final String DATE_TIME_FORMAT = LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS"));

    @Override
    public ServiceMsg msgProcess(ServiceMsg serviceMsg) {
        serviceMsg.getHeader().setMessageTimestamp(DATE_TIME_FORMAT);
        serviceMsg.setBody("Return-" + serviceMsg.getBody());
        return serviceMsg;
    }

}
```

### ws-client
* service-wsc.xml
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:jaxws="http://cxf.apache.org/jaxws"
    xsi:schemaLocation="http://www.springframework.org/schema/beans
            http://www.springframework.org/schema/beans/spring-beans.xsd
            http://cxf.apache.org/jaxws
            http://cxf.apache.org/schemas/jaxws.xsd">

    <!-- 透過 jaxws:client 取得 WebService Client 端: 指定 "介面" 與 "發佈網址" -->
    <jaxws:client id="FunctionProcessService"
        serviceClass="io.github.coffee0127.service.FunctionProcessService"
        address="http://127.0.0.1:8080/my-service/wsdl/s001">
        <jaxws:features>
            <bean class="org.apache.cxf.feature.StaxTransformFeature">
                <property name="inTransformElements">
                    <map>
                        <entry key="{http://io.github.coffee0127/}return" value="return" />
                        <entry key="{http://io.github.coffee0127/}header" value="header" />
                        <entry key="{http://io.github.coffee0127/}body" value="body" />
                        <entry key="{http://io.github.coffee0127/}accessIp" value="accessIp" />
                        <entry key="{http://io.github.coffee0127/}caseId" value="caseId" />
                        <entry key="{http://io.github.coffee0127/}serviceId" value="serviceId" />
                        <entry key="{http://io.github.coffee0127/}messageTimestamp" value="messageTimestamp" />
                    </map>
                </property>
            </bean>
        </jaxws:features>
    </jaxws:client>

</beans>
```

### References
* [Apache CXF SpringBoot](http://cxf.apache.org/docs/springboot.html)
    * [Transformation Feature](http://cxf.apache.org/docs/transformationfeature.html)
