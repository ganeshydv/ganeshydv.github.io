
# Servlet Structure:
1. web.xml for mapping api's
2. need to create servlet class (hanlder/controller) and map in web.xml
```
Req -> Servlet Container (Req Handler) web.xml [collection of servlet]--> App
```


-----
# Spring Framework (Spring MVC):
### 1. No web.xml
### 2. Mapping is handled by Spring framework(i.e. spring MVC) using Dispatcher Servlet
  - `Need to deploy app on tomact server - servlet container`
### 3. Dependencies:
```xml
<dependencies>
    <dependency>
       <groupId> org.springframework</groupId>
       <artifactId>spring-webmvc</artifactId>
       <version>6.1.4</version>
    </dependency>
    <dependency>
       <groupId> javax.servlet</groupId>
       <artifactId>servlet-api</artifactId>
       <version>2.t</version>
    </dependency>
</dependencies>
```
### 4. Structure:
```
                                                           --> 1. Choose Controller --> Uses HandlerMapping
 Req --> Servlet Container (Tomcat) --> DispatcherServlet  --> 2. Create Instance   --> IOC [Creates instance as well as Dependency]
                                                           --> 3. Invoke Controller --> Respctive API get Invoked
             [APP Deployed here]
```
### 5. config class:
   - `@Configuration`
   - `@EnableWebMvc`
   - `@ComponentScan(basePackages="pkg")` // to tell speing mvc to start scan for registering component
### 6. Need to create Dispatcher Servlet class: first controller
   - This is where each request comes first
   - Need to regiseter config class here as config class know all API/controllers
   - This class extends `AbstractAnnotationConfigDispatcherServletInitializer` and overrides class methods :
      - `getRootConfigClasses()`
      - `getServletConfigClasses()`: returns config.class - as this class has all controllers registered
      - `getServletMapping()` : returns String initial path like "/"

------

# Spring boot: spring MVC+extra
### 1. No need to add seperate dependency: Makes dependency management easy
   - Spring MVC: need to add dependency seperatly - problem: may some version become incompatable in future
   - No need of Version : loads compatable dependency automatically
```xml
<parent>
	<groupId>org.springframework.boot</groupId>
	<artifactId>spring-boot-starter-parent</artifactId>
	<version>3.4.5</version>
	<relativePath/> <!-- lookup parent from repository -->
</parent>
<dependencies>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <aritfactId>spring-boot-starter-web</aritfactId>
    </dependency>
    <dependency>
      <groupId>org.springframework.boot</groupId>
      <aritfactId>spring-boot-starter-test</aritfactId>
    </dependency>
</dependencies>
```
### 2. Autoconfig:
 -` @SpringBootApplication`:  No Need to for Dispatcher Servlet config, @Congfiguration, @ComponentScan, @EnableWebMvc

### 3. Embedded Server:
 - No need to create APP WAR and deploy on Tomcat as it was needed in Servlet and Spring MVC.
