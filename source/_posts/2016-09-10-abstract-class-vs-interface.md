---
title: 抽象類別 (Abstract Class) vs 介面 (Interface)
categories: Java
date: 2016-09-10 20:20:40
tags: Java
toc: true
---
許多人初學 Java 時，或許難以理解 _抽象類別_ 和 _介面_ 的差異，
簡單整理摘要如下，若有誤還望各位先進指點 Orz
## 概述
### 抽象類別 (Abstract Class)
1. 使用 `abstract` 定義抽象類別 (不得宣告為 `final class`)
2. 無法實體化的類別 (即無法透過 `new` 關鍵字產生實體)
    或許會看到如下這種程式碼
    + AbstractFooClz.java
    ```java
    public abstract AbstractFooClz {
        protected abstract void doBar();
    }
    ```
    + TestMain.java
    ```java
    public class TestMain {
        public static void main(String[] args) {
            new AbstractFooClz() {
                @Override
                protected void doFoo() {
                    System.out.println("do foo here.");
                }
            }.doFoo();
        }
    }
    ```
    這是屬於匿名類別，終究不是原本的抽象類別，因此要特別注意！(小弟曾認為這也是 `new AbstractFooClz` 的一種...)
3. 專門被拿來當作父類別的類別，具有範本作用
4. 只能被繼承 (使用 `extends` 關鍵字)，子類別需實作抽象方法 (否則繼續抽象下去)
5. 其__抽象方法 (abstract method)__封裝等級不能是 `private` (即必須是 `public/protected/(default)`)
    `abstract 回傳值型別 抽象方法名稱(參數列);`   // 沒有方法實體，以 ; 做結尾
6. 包含抽象方法的類別，一定要宣告為抽象類別；但是抽象類別不一定有抽象方法

### 介面 (Interface)
1. 定義屬性成員皆為常數 (即預設 `public static final`)，因此必須給定初始值
2. 定義方法時，只能為抽象方法 (即預設 `public abstract`，定義功能的名稱，實作部分留給相關類別 override
    + IBar.java
    ```java
    public interface IBar {
        int MY_NUMBER = 0;  // 編譯器視為 public static final int MY_NUMBER = 0;
        void doBar();       // 編譯器視為 public abstract void doBaz();
    }
    ```
    Java8 開始多了 `default` 關鍵字，可替介面加上預設實作，範例如下
    (小弟目前還沒有 Java8 開發經驗，還望各位先進指點實務上如此設計之意義)
    + IBaz.java
    ```java
    public interface IBaz {
        default doBaz() {
            System.out.println("only Java8 can do default baz here.");
        }
    }
    ```
    　
3. 不一定需要定義方法，即空介面 (ex: `java.io.Serializable`)
3. 只能被實作 (使用 `implements` 關鍵字)，子類別需實作抽象方法 (否則需宣告為抽象類別)
4. 子類別實作抽象方法修飾字必須是 `public` (抽象方法預設使用 `public` 修飾)

## 比較
### 相同點
1. 兩者都無法直接實體化
2. 子類別都必須實作已宣告之抽象方法 (或繼續抽象)

### 相異點
||抽象類別 Abstract Class|介面 Interface|
|-|-|-|
|父類別/父介面 繼承|只能繼承一個類別|能繼承多個介面 (Java實現多重繼承)|
|子類別 繼承/實作|只能繼承 (`extends`) 一個抽象類別|能實作 (`implements`) 多個介面|
|方法|可包含非抽象方法|只能是抽象方法 (Java8以前...XD)|
|應用|關係密切的類別中<br>如定義抽象類別 `Car`<br>子類別 `Benz` 及 `Audi` 繼承 `Car`|定義一些功能給較不相干類別使用<br>如定義介面飛翔 `Fly`<br>子類別 `AirPlane` 及 `Bird` 實作 `Fly`<br>__但實務上其實不會不相干類別實作同一介面__|
||必定為父類別|可視為抽象類別的特例|

## Reference
* [Abstract Methods and Classes](https://docs.oracle.com/javase/tutorial/java/IandI/abstract.html)
* [Interfaces](https://docs.oracle.com/javase/tutorial/java/IandI/createinterface.html)