---
layout: post
title: "Java & Spring Boot Complete Guide"
categories: ["Programming Languages", "Java & Spring"]
tags: [java-&-spring, complete-guide]
date: 2025-07-22
author: "GGurkhude"
description: "Comprehensive guide covering Java fundamentals, Spring Boot, Maven, JPA, Hibernate, and Multithreading"
toc: true
---

# Java & Spring Boot Complete Guide

Comprehensive guide covering Java fundamentals, Spring Boot, Maven, JPA, Hibernate, and Multithreading

## 📚 Table of Contents

- [**0.** Streams](#section-0)

- [**1.** Maven](#section-1)
- [**1-1.** Pom](#section-1-1)
- [**1-1-2.** Maven Lifecycle](#section-1-1-2)
- [**1-2.** Maven Module Structure](#section-1-2)

- [**2.** Jdbc](#section-2)

- [**3-0.** Hibernate Arch](#section-3-0)
- [**3.** Hibernate](#section-3)
- [**3-1-0.** Jpa](#section-3-1-0)
- [**3-1-1.** Hibernate Jpa](#section-3-1-1)
- [**3-1-2.** Hibernate Jpa Mapping](#section-3-1-2)

- [**4.** Server Config](#section-4)
- [**999.** What When](#section-999)
  - [**0.** Jvm Jre Jdk](#section-0)
  - [**0.** Before Spring Boot](#section-0)
  - [**0-1.** How Java Code Runs](#section-0-1)
  - [**0-2.** How Java Code Runs](#section-0-2)
  - [**1-0.** Memory Management Garbage Collection](#section-1-0)
  - [**1.** Spring Boot](#section-1)
  - [**1-1.** Memory Management Garbage Collection](#section-1-1)
  - [**1-1.** Spring Boot @springbootapplication](#section-1-1)
  - [**2.** Java Exception](#section-2)
  - [**2.** Spring Boot Request Handling](#section-2)
  - [**2-1.** Spring Boot Request Validation](#section-2-1)
  - [**3-0.** Multihreading Process Thread Heap Stack](#section-3-0)
  - [**3.** Spring Boot Exception Handling](#section-3)
  - [**3-1.** Multithreading Thread Creation](#section-3-1)
  - [**3-2.** Multithreading Monitor Locks](#section-3-2)
  - [**3-2-1.** Multithreading Monitor Lock](#section-3-2-1)
  - [**3-2-2.** Multithreading Stop Resume Suspend Deprecated](#section-3-2-2)
  - [**3-2-3.** Multithreading Demon Thread Reentrantlock](#section-3-2-3)
  - [**3-2-4.** Multithreading Readwritelock](#section-3-2-4)
  - [**3-2-4-1.** Readwritelock](#section-3-2-4-1)
  - [**3-2-5.** Multithreading Stampedlock](#section-3-2-5)
  - [**4.** Spring Boot Dependency Resolution](#section-4)

  - [**5.** Multithreading Reentrantlock Vs Readwritelock Vs Stampedlock Vs Semaphorelock](#section-5)
  - [**5-2.** Spring Boot Hql Relations](#section-5-2)
  - [**999.** Readme](#section-999)

---



## 0. Streams {#section-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Streams :
- form JAVA 8 in java.util.strm pkg
- For filtering, mapping, and reducing data

### Features :
1. `Chaining`: Multiple stream operations can be chained together in a fluent and readable way.
2. `Immutability`: Streams do not modify the source; they create a new stream with the result.
2. `Parallelism`: Streams can be processed in parallel using .parallelStream() to utilize multi-core processors efficiently.

### Operations : 1. Intermdiate 2. Terminal
### 1. Intermediate Operations:
- These return a new stream and are lazy (executed only when a terminal operation is called).

   1. **filter()**: Filters elements based on a predicate.
   1. **map()**: Transforms each element using a function.
   1. **flatMap()**: Flattens nested streams into a single stream.
   1. **sorted()**: Sorts elements.
   1. **distinct()**: Removes duplicate elements.
   1. **limit()**: Limits the size of the stream.
   1. **skip()**: Skips the first n elements.

### 2. Terminal Operations:
- These produce a result or a side effect and consume the stream.

   1. **collect()**: Collects the result into a collection or other data structure.
   1. **forEach()**: Performs an action for each element.
   1. **reduce()**: Reduces the stream to a single value using a binary operator.
   1. **count()**: Returns the count of elements.
   1. **anyMatch()/allMatch()/noneMatch()**: Checks conditions on elements.

### Examples
### 1.Filtering and Transforming a List:
```java
import java.util.*;
import java.util.stream.*;

public class StreamExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David");

        // Filter names that start with 'A' and convert them to uppercase
        List<String> filteredNames = names.stream()
                                          .filter(name -> name.startsWith("A"))
                                          .map(String::toUpperCase)
                                          .collect(Collectors.toList());

        System.out.println(filteredNames); // Output: [ALICE]
    }
}
```
### 2. Summing a List of Numbers:
```java
import java.util.*;
import java.util.stream.*;

public class StreamSumExample {
    public static void main(String[] args) {
        List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);

        // Calculate the sum of even numbers
        int sum = numbers.stream()
                         .filter(num -> num % 2 == 0)
                         .reduce(0, Integer::sum);

        System.out.println("Sum of even numbers: " + sum); // Output: 6
    }
}
```
### 3. Grouping Data:
```java
import java.util.*;
import java.util.stream.*;
import static java.util.stream.Collectors.*;

public class StreamGroupingExample {
    public static void main(String[] args) {
        List<String> names = Arrays.asList("Alice", "Bob", "Charlie", "David", "Alex");

        // Group names by their starting letter
        Map<Character, List<String>> groupedNames = names.stream()
                                                         .collect(groupingBy(name -> name.charAt(0)));

        System.out.println(groupedNames);
        // Output: {A=[Alice, Alex], B=[Bob], C=[Charlie], D=[David]}
    }
}
```

---

## 1. Maven {#section-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Maven : 
- `Maven is a powerful build automation and project management tool for Java`
- Manage - depencency, Project Structure, Creating Executable File, Plugins, Build Lifecycle
- **`Build--> compile --> test --> package --> install `**
- Nothing but collection of different architecure which can be used to kick start project ex. a spring boot project or web app or react project. 
#
### 1. Catalog 
   -  essentially a collection of Maven archetypes
### 2. Archetype
   - A Maven archetype is a project template that defines the structure and configuration for a specific type of project
   - Examples of Archetypes:
       ```
       maven-archetype-quickstart: A basic Java project setup.
       maven-archetype-webapp: A template for Java web applications.
       ```
#
### Customizing Archetype Configuration:
- After selecting an archetype, you’ll need to provide information suchas:- Group ID: The base package for your project (e.g., com.example).- Artifact ID: The name of your project.- Version: The project version (e.g., 1.0-SNAPSHOT).
- Ex: 
  ```xml
  <groupId>com.mycompany</groupId>
  <artifactId>user-service</artifactId>
  <version>1.0.0</version>
  ```
#


### **Artifact** : Executable file
- An artifact in Maven represents the output of your project or module after it is built (e.g., a JAR, WAR, or other package types).
- Each Maven project or module is associated with one artifact, which is uniquely identified by the Group ID, Artifact ID, and Version.
- **Artifact ID** = Name of the Module/Project:
    - `When you build your Maven project, Maven generates an artifact file - ex. JAR`.
    - For example:
        - A Java library project outputs a .jar file (e.g., my-library-1.0.0.jar).
        - A web application project outputs a .war file (e.g., my-webapp-1.0.0.war).
    - Artifacts (e.g., JAR files) can be added as dependencies to other Maven projects. For example:
    ```xml 
    <dependency>
    <groupId>com.mycompany</groupId>
    <artifactId>user-service</artifactId>
    <version>1.0.0</version>
    </dependency>
    ```
   - This allows you to reuse the executable code from one project/module in another project/module

---

## 1-1. Pom {#section-1-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## POM : Project Object Model

1. **Defines Project Structure and Build Configuration:**
Specifies the project name, version, and other key attributes.
Provides the structure for dependencies, plugins, and build settings.

1. **Manages Dependencies:**
Allows you to declare libraries or frameworks your project requires. Maven automatically downloads and integrates these dependencies.

1. **Defines Build Lifecycle:**
Configures how the project should be compiled, tested, and packaged.

1. **Configures Plugins:**
Extends Maven’s capabilities (e.g., to build JAR files, run tests, create documentation).

## Structure :
```xml
<project xmlns="http://maven.apache.org/POM/4.0.0"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion> <!-- POM version -->

    <!-- Project Metadata -->
    <groupId>com.example</groupId>       <!-- Unique organization ID -->
    <artifactId>my-app</artifactId>     <!-- Project/module name -->
    <version>1.0.0</version>            <!-- Current version of the project -->

    <!-- Packaging Type -->
    <packaging>jar</packaging>          <!-- Can be 'jar', 'war', etc. -->

    <!-- Properties  : Variables to be used in this file -->
    <properies>
        <maven.compiler.source>8</maven.compiler.source>
        <maven.compiler.target>8</maven.compiler.target>
    </properties>

    <!-- Dependencies -->
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
            <version>3.0.0</version>
        </dependency>
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.13.2</version>
            <scope>test</scope>         <!-- Used only for testing -->
        </dependency>
    </dependencies>

    <!-- Build Configuration -->
    <build>
        <plugins>
            <!-- Plugin to compile Java code -->
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>3.8.1</version>
                <configuration>
                    <source>11</source>  <!-- Java version -->
                    <target>11</target>  <!-- Java bytecode compatibility -->
                </configuration>
            </plugin>

            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-shade-plugin</artifactId>
                <version>3.8.1</version>
                <executions>
                    <execution>
                      <phase>package</phase> <!-- only execute in this phase -->
                      <goals>
                        <goal>shade</goal> <!-- run this goal (a task) in specified phase -->
                      </goals>
                      <configuration>
                        <transformers>
                          <transformer>
                            <mainClass>com.test.config.MainClassObj</mainClass>
                          </transformer>
                        </transformers>
                      </configuration>
                    </execution>
                </executions>
            </plugin>
        </plugins>
    </build>
</project>
```

### Explaintaion:
1. `<execution>` 
    - Purpose: Defines when and how a Maven plugin should run during the Maven lifecycle.
    - Key Elements:
        - `<phase>`: Specifies the lifecycle phase in which the plugin should execute. Examples include validate, compile, package, install, etc.
        - `<goals>`: Specifies the specific tasks (or goals) of the plugin to execute.
        - `<id>` (optional): A unique identifier for the execution, useful when you have multiple executions of the same plugin.
    
        ```xml
            <execution>
                <id>shade-task</id> <!-- Optional identifier for this execution -->
                <phase>package</phase> <!-- Executes during the "package" phase -->
                <goals>
                    <goal>shade</goal> <!-- Runs the "shade" goal of the maven-shade-plugin -->
                </goals>
            </execution>
        ```
        - Explanation:
            - This example tells Maven to execute the shade goal of the maven-shade-plugin during the package phase of the build lifecycle.
            - Without this, the plugin won’t run unless triggered manually.
2. `<configuration>`
    - Purpose: Used to customize the behavior of the plugin by passing specific settings or parameters.
    - Key Elements:
    - Contains plugin-specific parameters that control its execution.
    ```xml
    <configuration>
        <createDependencyReducedPom>true</createDependencyReducedPom> <!-- Reduce dependency POM -->
        <outputFile>my-fat-jar.jar</outputFile> <!-- Custom output file name -->
    </configuration>
    ```
    - Explanation:
        - createDependencyReducedPom: Instructs Maven to create a simplified pom.xml without unnecessary dependencies.
        - outputFile: Specifies the name of the resulting fat JAR file.
3. `<transformers>`
    - Purpose: Used to modify or transform the contents of the JAR file being created by the maven-shade-plugin.
    - Key Elements:
    - Contains one or more` <transformer>` elements, each specifying a transformation.
    ```xml
    <transformers>
        <transformer implementation="org.apache.maven.plugins.shade.resource.ManifestResourceTransformer">
            <mainClass>com.example.MainApp</mainClass> <!-- Sets the Main-Class in the JAR's manifest -->
        </transformer>
    </transformers>
    ```
    - Explanation:
        - The ManifestResourceTransformer modifies the MANIFEST.MF file in the JAR to include a Main-Class entry, enabling the JAR to be executable.
4. `<transformer>`
    - Purpose: Each` <transformer>` specifies a particular transformation for the contents of the JAR.
    - Common Transformers:
    - ManifestResourceTransformer: Modifies the JAR’s manifest file.
    - AppendingTransformer: Merges specific resources (e.g., META-INF/services files) into the JAR.
    - ServicesResourceTransformer: Combines service provider configuration files (used for META-INF/services).
    - 
    ```xml
    <transformer implementation="org.apache.maven.plugins.shade.resource.ServicesResourceTransformer" />
    ```
    - Explanation:
        - This transformer ensures that service provider files from multiple dependencies are merged, rather than overwritten, in the final fat JAR.

5. `<executions>`
     - Purpose: Wraps multiple `<execution>` elements.
     - Key Elements:
     - Defines a list of executions for a plugin, enabling more complex configurations.
     ```xml
     <executions>
        <execution>
            <id>default-shade</id>
            <phase>package</phase>
            <goals>
                <goal>shade</goal>
            </goals>
        </execution>
     </executions>
     ```
     - Explanation:
        - Allows multiple `<execution> `definitions, which is useful for running different goals or configurations of the same plugin.
### Symmary :
| **Tag**           | **Purpose**                                                               |
|--------------------|---------------------------------------------------------------------------|
| `<execution>`      | Defines when (phase) and how (goal) the plugin should run.               |
| `<configuration>`  | Customizes the plugin behavior with specific parameters.                 |
| `<transformers>`   | Modifies or transforms the resources being bundled into the JAR.         |
| `<transformer>`    | Specifies an individual transformation (e.g., adding a `Main-Class`).    |
| `<executions>`     | Groups multiple `<execution>` elements for complex plugin configurations. |

----
## Plugins : used by maven 
## Dependency : used by project
## How can specify JAVA, JDK, Main  class ?
### 1. Main Class :  `maven-jar-plugin`
```xml
<build>
    <plugins>
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-jar-plugin</artifactId>
            <version>3.2.2</version>
            <configuration>
                <archive>
                    <manifest>
                        <mainClass>com.example.Main</mainClass>
                    </manifest>
                </archive>
            </configuration>
        </plugin>
    </plugins>
</build>
```
- Other way :
```xml
<build>
    <plugins>
      <plugin>
        <groupId>org.apache.maven.plugins</groupId>
        <artifactId>maven-jar-plugin</artifactId>
        <version>3.2.2</version>
        <executions>
          <execution>
            <phase>package</phase> <!-- This is optional; it is the default phase for this plugin -->
<!--            <goals>-->
<!--              <goal>jar</goal> &lt;!&ndash; You can specify the goal here -->
<!--            </goals>-->
            <configuration>
              <archive>
                <manifestEntries>
                  <Main-Class>org.example.App</Main-Class>
                </manifestEntries>
              </archive>
            </configuration>
          </execution>
        </executions>
      </plugin>
    </plugins>
  </build>
```
### 1.2 Shade Plugin: `maven-shade-plugin`
- **when want dependenices to be part of JAR.**
- This mean no need to install depend. seperatly only need to run jar file
- You need a self-contained JAR with no external dependency requirements.
- The application is intended to run on environments where dependencies can't be installed separately.
### 2. JDK : `maven-toolchains-plugin`
```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-toolchains-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <toolchains>
                        <jdk>
                            <version>11</version>
                            <vendor>oracle</vendor>
                        </jdk>
                    </toolchains>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```


### 3. JAVA Version: `maven-compiler-plugin`
```xml
<build>
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId>
                <artifactId>maven-toolchains-plugin</artifactId>
                <version>3.0.0</version>
                <configuration>
                    <toolchains>
                        <jdk>
                            <version>11</version>
                            <vendor>oracle</vendor>
                        </jdk>
                    </toolchains>
                </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
</build>
```

---

## 1-1-2. Maven Lifecycle {#section-1-1-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Maven Life Cycle :

- Order is : **`Life Cycle <== Phase <== Goal`**
     1. Life Cycle : ex. clean, build
     2. Phase : stages or High level goal in LifeCycle 
         - ex: Compile, test, package, etc.
    3. Goals : specific task 
        - ex. compiling code, running test cases, etc.
## Three Maven Lifecycles
1. Clean Lifecycle: 
    - Prepares the project for a fresh build by removing previously built artifacts.
    - Phases:
        1. `pre-clean`: Executes tasks before cleaning (e.g., backups).
        1. `clean`: Deletes files generated by previous builds (e.g., target/ folder).
        1. `post-clean`: Executes tasks after cleaning.
2. Default Lifecycle (Build Lifecycle): 

    - Handles the complete project build process.
    - Phases (key ones):
        1. `validate`: Validates the project configuration (e.g., ensures pom.xml is correct).
        1. `compile`: Compiles the source code.
        1. `test`: Runs unit tests using frameworks like JUnit.
        1. `package`: Packages the compiled code into a distributable format (e.g., JAR, WAR).
        1. `verify`: Ensures the package meets quality standards (e.g., integration tests).
        1. `install`: Installs the package to the local repository (for use by other local projects).
        1. `deploy`: Copies the built package to a remote repository (e.g., Maven Central or an internal repo).
3. Site Lifecycle: 
    - Used to generate project documentation.
    - Phases:
        1. `pre-site`: Executes tasks before generating documentation.
        1. `site`: Generates project documentation (e.g., reports, project site).
        1. `post-site`: Executes tasks after generating documentation.
        1. `site-deploy`: Deploys the documentation to a web server or repository.

## Key Phases in the Default Lifecycle
| **Phase**  | **Description**     |
|------------|--------------------|
| `validate` | Ensures the project is correctly configured and all necessary files are present.  `install Dependency` [in .m2 folder of local] |
| `compile`  | Compiles the project's source code. `check Dependency`   |
| `test`     | Runs unit tests (if any).   |
| `package`  | Packages the compiled code into a distributable format (e.g., `.jar` or `.war`).   |
| `verify`   | Runs checks to ensure the package is valid and meets quality standards (e.g., integration tests). |
| `install`  | Installs the package into the local Maven repository (`~/.m2/repository`).   |
| `deploy`   | Uploads the package to a remote repository (e.g., Maven Central or an internal repository). |


## Real-Life Example
- Suppose you're developing a library:
1. Build Process:
   1. Run `mvn compile` to compile the Java code.
   1. Run `mvn test` to execute unit tests.
   1. Run `mvn package` to create a my-library-1.0.jar file in the target directory.

2. Deployment:
   1. Run `mvn install` to make the JAR available locally for other projects.
   1. Run `mvn deploy` to upload it to a remote repository for global use.

---

## 1-2. Maven Module Structure {#section-1-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Why Can't the Main Module Be Packaged as JAR?
1. ### Conflict Between Parent and Artifact Roles
    - Maven assumes that if a module produces a JAR, it should not also act as a parent POM. Combining these roles leads to issues in the build lifecycle, as Maven doesn't know whether to handle it as a JAR or as a parent POM.
2. ### Role of the Parent Module
   - In Maven's multi-module project, the main module (parent) is expected to manage the entire project's structure, including submodules. Its primary role is aggregation, dependency management, and providing consistent plugin configurations. By default, its packaging is set to pom.

   - If you change its packaging to jar, Maven gets confused because:
        - It no longer sees the module as a parent module.
        - It expects a JAR file to be generated, but the submodules and modules tag in the POM conflict with this expectation.

## Solution: Separate Responsibilities
### 1. Approach 1: Create a Separate "Common Logic" Module
- Keep the parent module (main-project) as pom packaging.
- Move shared logic or reusable code to a dedicated submodule (e.g., common-utils).
- Structure :
```
main-project/
├── common-utils/     <- Contains shared logic (packaging = jar)
├── service-a/        <- Service A logic (packaging = jar or war)
├── service-b/        <- Service B logic (packaging = jar or war)
└── pom.xml
```
- Parent POM :
```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>main-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>common-utils</module>
        <module>service-a</module>
        <module>service-b</module>
    </modules>
</project>
```
- Child Util POM:
```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>main-project</artifactId>
        <version>1.0.0</version>
    </parent>
    <artifactId>common-utils</artifactId>
    <packaging>jar</packaging>
</project>
```
- Service A POM:
```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>com.example</groupId>
        <artifactId>main-project</artifactId>
        <version>1.0.0</version>
    </parent>
    <artifactId>service-a</artifactId>
    <packaging>jar</packaging>

    <dependencies>
        <dependency>
            <groupId>com.example</groupId>
            <artifactId>common-utils</artifactId>
            <version>1.0.0</version>
        </dependency>
    </dependencies>
</project>
```

## 2. Approach 2: Use a Profile to Package the Parent Module
- If you absolutely must include shared logic in the main module, you can use Maven profiles to enable dual behavior: the module acts as a parent POM and optionally produces a JAR when required
- Now, when you run Maven with the profile activated:
```bash
mvn install -P jar-profile
```
- POM :
```xml
<project>
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.example</groupId>
    <artifactId>main-project</artifactId>
    <version>1.0.0</version>
    <packaging>pom</packaging>

    <modules>
        <module>service-a</module>
        <module>service-b</module>
    </modules>

    <profiles>
        <profile>
            <id>jar-profile</id>
            <activation>
                <property>
                    <name>build-jar</name>
                </property>
            </activation>
            <build>
                <plugins>
                    <plugin>
                        <groupId>org.apache.maven.plugins</groupId>
                        <artifactId>maven-jar-plugin</artifactId>
                        <version>3.3.0</version>
                        <executions>
                            <execution>
                                <goals>
                                    <goal>jar</goal>
                                </goals>
                            </execution>
                        </executions>
                    </plugin>
                </plugins>
            </build>
        </profile>
    </profiles>
</project>
```

---

## 2. Jdbc {#section-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## JDBC : 
- `JDBC (Java Database Connectivity) is an API in Java that allows you to interact with databases.`
## Key Components of JDBC
- `Driver Manager:` Manages database drivers and establishes connections.
- `Connection`: Represents the connection to a specific database.
- `Statement`: Used to execute SQL queries.
- `ResultSet`: Represents the results of a query, which can be iterated over.
- `PreparedStatement`: A subclass of Statement that allows precompiled parameterized queries.
- `CallableStatement`: Used to call stored procedures in the database.

## Steps to Use JDBC
1. Load the Database Driver:
   - Modern JDBC drivers use a ServiceLoader mechanism, so explicit loading via Class.forName() is often unnecessary.
2. Establish a Connection: 
   - Use the DriverManager.getConnection() method with the appropriate JDBC URL.

3. Create a Statement: 
   - Choose between Statement, PreparedStatement, or CallableStatement.

4. Execute SQL Queries: 
   - Use the executeQuery or executeUpdate methods.

5. Process Results: 
   - Iterate through the ResultSet to retrieve query results.

6. Close Resources: 
   - Close the ResultSet, Statement, and Connection to release resources.

## Example :
```java
import java.sql.*;

public class JdbcExample {
    public static void main(String[] args) {
        // Database URL, username, and password
        String url = "jdbc:mysql://localhost:3306/testdb";
        String user = "root";
        String password = "password";

        // JDBC objects
        Connection connection = null;
        Statement statement = null;
        ResultSet resultSet = null;

        try {
            // 1. Establish connection
            connection = DriverManager.getConnection(url, user, password);

            // 2. Create statement
            statement = connection.createStatement();

            // 3. Execute query
            String sql = "SELECT id, name FROM employees";
            resultSet = statement.executeQuery(sql);

            // 4. Process result set
            while (resultSet.next()) {
                int id = resultSet.getInt("id");
                String name = resultSet.getString("name");
                System.out.println("ID: " + id + ", Name: " + name);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            // 5. Close resources
            try {
                if (resultSet != null) resultSet.close();
                if (statement != null) statement.close();
                if (connection != null) connection.close();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }
}
```
## What is Connection Pooling?
- `Definition`: Connection pooling is the process of maintaining a pool (or cache) of pre-established database connections that are reused, rather than creating and closing a connection for every database request.
- `Purpose`: It minimizes the overhead of repeatedly creating and destroying database connections, which is a resource-intensive operation.
- ### Process:
    1. When an application needs to interact with a database, it borrows a connection from the pool.
    2. After the operation is complete, the connection is returned to the pool instead of being closed.
    3. The pool manages the lifecycle of the connections and ensures they are reused efficiently.
- ### Why ?
   1. Database connections are expensive: Establishing a connection involves handshakes, authentication, and allocation of resources, which can be slow.
   2. Concurrency: Modern applications often serve many users simultaneously. Without pooling, a new connection for each request could overwhelm the database.
   3. Performance: Connection pooling reduces latency by reusing existing connections instead of creating new ones.

## Libraries and Tools for Connection Pooling
### HikariCP:

1. A popular, fast, and lightweight connection pooling library.
1. Known for low latency and high throughput.

```java
HikariConfig config = new HikariConfig();
config.setJdbcUrl("jdbc:mysql://localhost:3306/testdb");
config.setUsername("root");
config.setPassword("password");
config.setMaximumPoolSize(10); // Maximum connections

HikariDataSource dataSource = new HikariDataSource(config);

try (Connection connection = dataSource.getConnection()) {
    // Use the connection
}
```

---

## 3-0. Hibernate Arch {#section-3-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

!["Hibernate_str"](3.0_Hibernate_str.png)
## Hibernate Structure :
```
                     Java
                      ↕
    |           Persistent Object                |
                      ↕
    |               HIBERNATE                    |
    |   1. Config -> 2. Register.Class -->       |      
    |   3. SessionFactory --> 4. Session -->     |
    |   5. Transaction --> 6. Query -->          |
    |   7. Transaction close --> 8.Session Close | 
                     ↕
                 [DataBase]
```
### SessionFactory : `Thread Safe` & Initialize only once 
- start up and kept for later use.
### Session : `NOT Thread Safe` & Open-Close for each Transaction

### Transaction Object :
- Transactions in Hibernate are handled by an underlying transaction manager and transaction (from JDBC or JTA).

### Query Object :
- Query objects use SQL or Hibernate Query Language (HQL) string to retrieve data from the database and create objects.
- A Query instance is used to bind query parameters, limit the number of results returned by the query, and finally to execute the query.
### Persistent Classes :
- `Java classes whose objects or instances will be stored in database tables are called persistent classes in Hibernate`. 
- Hibernate works best if these classes follow some simple rules, also known as the Plain Old Java Object `(POJO)` programming model.
- Conditions :
   1. All Java classes that will be persisted need a default constructor.

---

## 3. Hibernate {#section-3}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Hibernate
```
Q1. can we directly pass query to hibernate and can not use JPA as hibernate is ORM I don't think it has to be dependent on anything?
- Yes, you can use Hibernate directly without depending on JPA if you choose to, as Hibernate is both a JPA implementation and a standalone ORM framework
```
### Core Components of Hibernate:

- `Configuration`: Specifies database connection details, Hibernate settings, and mappings.
- `SessionFactory`: A heavyweight object that is created once per application and used to create sessions.
- `Session`: A lightweight object for performing database operations (e.g., CRUD).
- `Transaction`: Manages atomic units of work, ensuring all operations within the transaction are either completed successfully or rolled back.
- `Query`: Used to execute SQL or HQL (Hibernate Query Language) to interact with the database.

## How to configure Hibernate ?
- Mapping of POJO clasess/Entity Bean Class Using Annotation
- JDK >= 5 && Hibernate >=3 
### 1. Dependency :
- For Hibernate 6 :
```xml
    <dependencies>
    <!-- Hibernate Core -->
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-core</artifactId>
        <version>5.6.15.Final</version>
    </dependency>
    <!-- MySQL Driver -->
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>
   </dependencies>
```
### 2. Config file  : `hibernate.cfg.xml`
```xml
<?xml version='1.0' encoding='UTF-8'?>  
<!DOCTYPE hibernate-configuration PUBLIC  
   "-//Hibernate/Hibernate Configuration DTD 5.3//EN"  
   "http://hibernate.org/dtd/hibernate-configuration-3.0.dtd"> 
<hibernate-configuration>
    <session-factory>
        <!-- Database Configuration -->
        <property name="hibernate.connection.driver_class">com.mysql.cj.jdbc.Driver</property>
        <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/mydb</property>
        <property name="hibernate.connection.username">root</property>
        <property name="hibernate.connection.password">password</property>
        <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>

        <!-- Hibernate Settings -->
        <property name="hibernate.show_sql">true</property>
        <property name="hibernate.format_sql">true</property>
        <property name="hibernate.hbm2ddl.auto">update</property>

        <!-- Register Entity -->
        <mapping class="com.example.User"/>
    </session-factory>
</hibernate-configuration>
```
### 3. Create and Register Entities :
- 4 ways :
    ### 1. Entity Class Definition:
    - You define an entity as a plain Java class (POJO) annotated with Hibernate-specific annotations (org.hibernate.annotations) or by using an XML configuration file (if you prefer).
    ```java
        package com.example;
        
        import org.hibernate.annotations.Entity; // Hibernate-specific
        import javax.persistence.Id;
        import javax.persistence.GeneratedValue;
        import javax.persistence.GenerationType;
        
        @Entity
        public class User {
            @Id
            @GeneratedValue(strategy = GenerationType.IDENTITY)
            private Long id;
            private String username;
            private String email;
        
            // Getters and Setters
            public Long getId() {
                return id;
            }
            public void setId(Long id) {
                this.id = id;
            }
            public String getUsername() {
                return username;
            }
            public void setUsername(String username) {
                this.username = username;
            }
            public String getEmail() {
                return email;
            }
            public void setEmail(String email) {
                this.email = email;
            }
        }
     ```
    ### 2. Hibernate Configuration File (hibernate.cfg.xml): 
    - Register the entity explicitly in the Hibernate configuration file.
    ```xml
     <?xml version='1.0' encoding='UTF-8'?>  
     <!DOCTYPE hibernate-configuration PUBLIC  
   "-//Hibernate/Hibernate Configuration DTD 5.3//EN"  
   "http://hibernate.org/dtd/hibernate-configuration-3.0.dtd"> 
     <hibernate-configuration>
         <session-factory>
             <!-- Database connection settings -->
             <property name="hibernate.connection.url">jdbc:mysql://localhost:3306/mydb</property>
             <property name="hibernate.connection.username">root</property>
             <property name="hibernate.connection.password">password</property>
             <property name="hibernate.dialect">org.hibernate.dialect.MySQLDialect</property>
     
             <!-- Entity registration -->
             <mapping class="com.example.User"/>
         </session-factory>
     </hibernate-configuration>
    ```
    ### 3. Programmatic Entity Registration (Without XML):
    ```java
    import org.hibernate.SessionFactory;
    import org.hibernate.cfg.Configuration;
    
    public class HibernateExample {
        public static void main(String[] args) {
            // Create Configuration object
            Configuration configuration = new Configuration();
            configuration.configure("hibernate.cfg.xml");
    
            // Register the entity programmatically
            configuration.addAnnotatedClass(User.class);
    
            // Build SessionFactory
            SessionFactory sessionFactory = configuration.buildSessionFactory();
    
            // Use SessionFactory to manage entities
            sessionFactory.close();
        }
    }
    ```
   ### 4. Annotation-Based Entity Registration:

    - Hibernate scans the annotations in your entity class (e.g., @Entity, @Table) to map it to a database table.
    - You must explicitly list the entity in the configuration file or programmatically using addAnnotatedClass.
- ### When using Hibernate directly:
    - Entities must be explicitly registered either via:
        - XML configuration (hibernate.cfg.xml or other mapping files).
        - Programmatic registration (using the Configuration object).

### 4. Executing Query :
1. **Hibernate Utlity Class** :
```java
package com.example;

import org.hibernate.SessionFactory;
import org.hibernate.cfg.Configuration;

public class HibernateUtil {
    private static final SessionFactory sessionFactory;

    static {
        try {
            // Load configuration and build SessionFactory
            Configuration configuration = new Configuration().configure();
            sessionFactory = configuration.buildSessionFactory();
        } catch (Throwable ex) {
            throw new ExceptionInInitializerError(ex);
        }
    }

    public static SessionFactory getSessionFactory() {
        return sessionFactory;
    }
}

```
2. **Save Data** :
```java
package com.example;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class MainApp {
    public static void main(String[] args) {
        // Get SessionFactory
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Begin Transaction
        Transaction transaction = session.beginTransaction();

        // Create and Save User
        User user = new User();
        user.setUsername("JohnDoe");
        user.setEmail("john.doe@example.com");
        session.save(user);

        // Commit Transaction
        transaction.commit();

        // Close Session
        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
```
3. **Retirving Data**
```java
package com.example;

import org.hibernate.Session;

public class RetrieveExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Retrieve User by ID
        User user = session.get(User.class, 1L);
        System.out.println("Retrieved User: " + user.getUsername() + ", " + user.getEmail());

        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
``` 
4. **Updating Data**:
```java
package com.example;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class UpdateExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        // Retrieve User
        User user = session.get(User.class, 1L);
        user.setEmail("updated.email@example.com");

        // Save Changes
        session.update(user);
        transaction.commit();

        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
```
5. **Delete**
```java
package com.example;

import org.hibernate.Session;
import org.hibernate.Transaction;

public class DeleteExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();
        Transaction transaction = session.beginTransaction();

        // Retrieve and Delete User
        User user = session.get(User.class, 1L);
        if (user != null) {
            session.delete(user);
        }

        transaction.commit();
        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
```
6. **HQL** 
```java
package com.example;

import org.hibernate.Session;

import java.util.List;

public class HQLExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        // HQL Query
        String hql = "FROM User WHERE username = :username";
        List<User> users = session.createQuery(hql, User.class)
                                  .setParameter("username", "JohnDoe")
                                  .getResultList();

        for (User user : users) {
            System.out.println("User: " + user.getUsername() + ", Email: " + user.getEmail());
        }

        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
```
7. **Native SQL** 
```java
package com.example;

import org.hibernate.Session;

import java.util.List;

public class NativeSQLExample {
    public static void main(String[] args) {
        Session session = HibernateUtil.getSessionFactory().openSession();

        // Native SQL Query
        String sql = "SELECT * FROM User WHERE username = :username";
        List<Object[]> results = session.createNativeQuery(sql)
                                        .setParameter("username", "JohnDoe")
                                        .getResultList();

        for (Object[] row : results) {
            System.out.println("User: " + row[1] + ", Email: " + row[2]);
        }

        session.close();
        HibernateUtil.getSessionFactory().close();
    }
}
```
8. **All in One** :
```java
import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.cfg.Configuration;

public class HibernateExample {
    public static void main(String[] args) {
        // Load Hibernate configuration
        Configuration configuration = new Configuration().configure();
        SessionFactory sessionFactory = configuration.buildSessionFactory();

        // Open session
        Session session = sessionFactory.openSession();

        // Begin transaction
        Transaction transaction = session.beginTransaction();

        // Save an entity
        User user = new User();
        user.setUsername("JohnDoe");
        user.setEmail("john.doe@example.com");
        session.save(user);

        // Query the database
        String hql = "FROM User WHERE username = :username";
        User fetchedUser = session.createQuery(hql, User.class)
                                  .setParameter("username", "JohnDoe")
                                  .uniqueResult();

        System.out.println("Fetched User: " + fetchedUser.getEmail());

        // Commit transaction
        transaction.commit();

        // Close session
        session.close();
        sessionFactory.close();
    }
}
```
- **HQL**:
```java
String sql = "SELECT * FROM users WHERE username = :username";
List<Object[]> results = session.createNativeQuery(sql)
                                .setParameter("username", "JohnDoe")
                                .getResultList();
```

---

## 3-1-0. Jpa {#section-3-1-0}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## JPA : Java Persistence API

- This is only kind of schemas, Interfaces but no solid implementation so if want to utilize need ORM which will use JPA to create query and then send it to DB.
- ### `API --> [ ORM (EX. Hibernate) <--> JPA (EX. jakarta Persistence) ] --> JDBC --> DB`
- Hibernate : `Hibernate is both a JPA implementation and a standalone ORM framework so no need for extra JPA`

- JPA is just a specification; `you need an implementation (e.g., Hibernate, EclipseLink) to use it effectively.`
- You can bypass JPA entirely and use Hibernate directly if you don't need the standardized interfaces.

---

## 3-1-1. Hibernate Jpa {#section-3-1-1}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Hibernate with JPA

- `When using JPA, you do not need hibernate.cfg.xml. Instead, you configure everything through the persistence.xml file.`

## 1. Dependency
### which version to choose?
### `jakarta.persistence` vs `javax.persistence`
- Modern frameworks like Spring Boot 3 require jakarta.persistence.
- Older Spring Boot versions (e.g., 2.x) use javax.persistence.
- ### Namespace Change:

    - Starting with Jakarta EE 9, all Java EE APIs transitioned to the jakarta namespace to distinguish them from the older javax namespace.
    - For Hibernate, this means that if you're using a modern version (e.g., Hibernate 6.x), it typically aligns with Jakarta EE and uses jakarta.persistence.
- ### Compatibility:

    - If your project uses newer frameworks or libraries (e.g., Spring 6 or Hibernate 6), they are designed to work with jakarta.persistence.
    - Older projects using javax.persistence are compatible with Hibernate versions prior to 6.x.
- ### Dependency for `jakarta.persistence` for Hibernate vesrions >= 6 :
   - jakarta Persistence API: :
    ```xml
     <dependency>
        <groupId>jakarta.persistence</groupId>
        <artifactId>jakarta.persistence-api</artifactId>
        <version>3.1.0</version>
     </dependency>
    ```
    - For Hibernate 6 :
    ```xml
    <dependency>
      <groupId>org.hibernate.orm</groupId>
      <artifactId>hibernate-core</artifactId>
      <version>6.2.15.Final</version>
    </dependency>
    ```
- ### `Java EE (Legacy) Dependencies` :
   - javax persistence API :
    ```xml
    <dependency>
    <groupId>javax.persistence</groupId>
    <artifactId>javax.persistence-api</artifactId>
    <version>2.2</version>
    </dependency>
    ```
    - For Hibernate versions < 6:
     ```xml
    <dependency>
    <groupId>org.hibernate</groupId>
    <artifactId>hibernate-core</artifactId>
    <version>5.6.15.Final</version>
    </dependency>
    ```
- ### My SQL Connector : alway required - choose version based on ORM
    ```xml
    <dependency>
        <groupId>mysql</groupId>
        <artifactId>mysql-connector-java</artifactId>
        <version>8.0.32</version>
    </dependency>
    ```
## 2. Config : Switching from hibernate.cfg.xml to persistence.xml

## 3. Entity Registration
## 4. DB operations using ORM

---

## 3-1-2. Hibernate Jpa Mapping {#section-3-1-2}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## ! Mapping of POJO clasess/Entity Bean Class Using Annotation
- JDK >= 5 && Hibernate >=3

---

## 4. Server Config {#section-4}

*📖 [← Back to Table of Contents](#-table-of-contents)*

## Depnedency

## Create server

## Register PKG for API's

## Create Multiple Servers

---

## 999. What When {#section-999}

- JDK →JRE → Java source code → compiled to bytecode (.class) → run by JVM → executed as machine code (bits)
-  Maven (builds App) → Dependency → Code → JAR/WAR

## Request: 
User --> Servlet --> APP Logic --> JPA --> JDBC--> DB

## ✅ **Key Concepts**

| Term   | Stands For            | Responsibility                         | Maps To DB? | Layer                 |
|--------|------------------------|-----------------------------------------|--------------|------------------------|
| DTO    | Data Transfer Object   | Moves data between layers or systems    | ❌ No         | Controller ↔ Service   |
| Model  | General term           | Depends on usage                        | Maybe         | Varies                 |
| Entity | Entity class (JPA)     | Maps Java object to DB table            | ✅ Yes        | Persistence Layer      |
| DAO    | Data Access Object     | Interface/class to access data source   | ❌ (works with Entity) | Repository Layer       |

---

### 0. Jvm Jre Jdk {#section-0}

> **📁 Topic: Adv Java**

## 🔍 JDK = JRE (JVM + libs) + Compiler

Java code cannot run without the JVM (Java Virtual Machine)

| Component                          | Purpose                               | Contains                         |
| ---------------------------------- | ------------------------------------- | -------------------------------- |
| **JVM**                            | Runs the bytecode (`.class` files)    | Just the runtime engine          |
| **JRE (Java Runtime Environment)** | Used to **run** Java applications     | JVM + Core libraries (`rt.jar`)  |
| **JDK (Java Development Kit)**     | Used to **develop** and run Java apps | JRE + Compiler (`javac`) + Tools |

## 🔁 Can JVM be installed separately?
- 👉 Officially, No.
- You don’t install the JVM alone directly from Oracle or OpenJDK. You install the JRE or JDK, and they include the JVM.
    - If you only want to run Java programs: install JRE.
    - If you want to develop and run Java programs (e.g., using javac, IntelliJ, Spring Boot): install JDK.
- `As of Java 9 and above, JRE is no longer distributed separately by Oracle — you install the JDK, and it provides both dev tools and runtime (JVM + libraries)`.

---

### 0. Before Spring Boot {#section-0}

> **📁 Topic: SpringBoot**

## ✅ **Spring Ecosystem Evolution Overview**

| Term             | Description                                                                 | Key Features / Responsibility                                                                                 | Use Case Example                                       |
|------------------|-----------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------|--------------------------------------------------------|
| **Before Spring** | Java EE (J2EE) era using Servlets, JSPs, EJBs, JDBC manually                | Complex configurations, tightly coupled, heavy XML, boilerplate code                                          | JDBC connection with raw `DriverManager`              |
| **Spring (Core)**| Lightweight framework for dependency injection (DI) and inversion of control (IoC) | Bean management using ApplicationContext/BeanFactory, POJO-based development                                 | Configuring services using `@Component`, `@Autowired` |
| **Spring MVC**   | Web framework part of Spring for building web applications                   | Uses DispatcherServlet, Controllers, REST APIs, request mapping, model-view-controller structure             | `@Controller`, `@GetMapping`, form handling            |
| **Spring Framework**| Umbrella term for all Spring modules (Core, MVC, AOP, JDBC, Security, etc.) | Full-stack framework with loosely coupled modules                                                             | Web + data + security integration                     |
| **Spring Boot**  | Convention-over-configuration framework built on top of Spring Framework     | Auto-configuration, embedded servers (Tomcat), starters, production-ready apps fast                          | `@SpringBootApplication`, no `web.xml` needed         |

## ✅ **Difference: JPA vs Servlet**

| Concept | Stands For                    | Responsibility / Purpose                             | Operates On        | Example Use Case                                   |
|---------|-------------------------------|-------------------------------------------------------|--------------------|----------------------------------------------------|
| **JPA** | Java Persistence API          | ORM (Object Relational Mapping); handles DB operations | Entity Classes     | Save, update, delete, query records from database  |
| **Servlet** | Java Servlet API             | Handles low-level HTTP requests & responses            | HTTP Layer (Web)   | Handle form submissions, return HTML/JSON          |


-----

# Servlet Structure:
1. web.xml for mapping api's
2. need to create servlet class (hanlder/controller) and map in web.xml
```
Req -> Servlet Container (Req Handler) web.xml [collection of servlet]--> App
```
------
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
---
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
 -` @SpringBootApplication`:  No Need to for Dispatcher Servlet config, `@Configuration`, `@ComponentScan`, `@EnableWebMvc`

### 3. Embedded Server:
 - No need to create APP WAR and deploy on Tomcat as it was needed in Servlet and Spring MVC.

---

### 0-1. How Java Code Runs {#section-0-1}

> **📁 Topic: Adv Java**

## 🧭 Final Refined Summary (Steps)
1. JVM: starts New JVM Process (cmd: java MyApp)
2. JVM: Core classloaders initialized
3. JVM: MyApp.class is loaded
4. JVM: Bytecode is verified
5. JVM: Memory (heap, stack, metaspace) is allocated
6. JVM: Main thread is created
7. JVM: main() method is invoked
8. JVM: Bytecode is executed via interpreter or JIT
9. JVM: GC and other runtime services run in background
10. JVM: exits when program ends

```
+-----------------------------+
|     Run: java MyApp        |
+-----------------------------+
              |
              v
+-----------------------------+
|   New JVM Process Starts    |
|  (Loads runtime libraries)  |
+-----------------------------+
              |
              v
+-----------------------------+
|   Initialize ClassLoaders   |
| - Bootstrap (3)             |
| - Extension (2)             |
| - Application(1)            |
+-----------------------------+
              |
              v
+-----------------------------+
|   Load MyApp.class          |
|   (From classpath)          |
+-----------------------------+
              |
              v
+-----------------------------+
|   Bytecode Verification     |
|   (Safe? Valid? Well-formed?)|
+-----------------------------+
              |
              v
+-----------------------------+
|   Memory Areas Allocated    |
| - Heap                      |
| - Stack (per thread)        |
| - Metaspace                 |
| - PC Register               |
| - Native Stack              |
+-----------------------------+
              |
              v
+-----------------------------+
|   Main Thread Started       |
| → Calls: main(String[] args)|
+-----------------------------+
             |
 Instructions cause memory allocation:
   - new → Heap
   - method call → Stack
              |
              v
+-----------------------------+
|   Bytecode Execution        |
| - Interpreter               |
| - or JIT (HotSpot)          |
+-----------------------------+
              |
              v
+-----------------------------+
|   Runtime Services          |
| - GC, Thread Mgmt, etc.     |
| - I/O, Exceptions           |
+-----------------------------+
              |
              v
+-----------------------------+
| Program Ends                |
| - main() done               |
| - All non-daemon threads end|
+-----------------------------+
              |
              v
+-----------------------------+
| JVM Shutdown                |
| - Runs shutdown hooks       |
| - Frees memory              |
+-----------------------------+
```

## ✅ Corrected Statement (Use This):
JVM allocates Heap and Stack memory before execution, and memory is used dynamically at runtime based on .class bytecode execution, not just verification.

---

### 0-2. How Java Code Runs {#section-0-2}

> **📁 Topic: Adv Java**

## Step 1: Compile java code (JDK) --> .java to .class (bytecode)
- Java compiler (part of JDK) compiles code
- java c abc.java
## Step 2: Run .class code
- JVM (JIT) coverts .class (bytecode) to bitcode
- java abc.class
- When run cmd: `java file1` - For Each Program New JVM instance get started

> Each JVM --> Stores Byte code in Code Segment --> Validates --> Creates Process --> Starts Main thread to excute ByteCOde line by line

> If you want to compile .java → .class → you need the JDK, because it includes javac.

> If you only want to run a .class file → the JRE or JVM is enough.

## 🔍 Breakdown:

| Component                          | Includes                                   | Purpose                                               |
| ---------------------------------- | ------------------------------------------ | ----------------------------------------------------- |
| **JDK (Java Development Kit)**     | `javac`, `java`, `javadoc`, `javap`, tools | For **developers**: Write, compile, run Java programs |
| **JRE (Java Runtime Environment)** | `java` - JVM + core libraries (no compiler)         | For **running** already-compiled Java programs        |
| **JVM (Java Virtual Machine)**     | Part of JRE                                | For **executing bytecode** at runtime                 |

## 

| Task                   | Can JRE Do It? | Notes                       |
| ---------------------- | -------------- | --------------------------- |
| Run a `.class` file    | ✅ Yes          | Uses `java ClassName`       |
| Run a `.jar` file      | ✅ Yes          | Uses `java -jar myapp.jar`  |
| Compile a `.java` file | ❌ No           | Needs `javac` → only in JDK |


## 

| Feature             | JRE   | JDK   |
| ------------------- | ----- | ----- |
| Has `java`          | ✅ Yes | ✅ Yes |
| Has `javac`         | ❌ No  | ✅ Yes |
| Can run `.class`    | ✅ Yes | ✅ Yes |
| Can run `.jar`      | ✅ Yes | ✅ Yes |
| Can compile `.java` | ❌ No  | ✅ Yes |

---

### 1-0. Memory Management Garbage Collection {#section-1-0}

> **📁 Topic: Adv Java**

## Memory Management:
- Java handles memory management and gc using JVM automatically.

### 🧠 1. Who Manages Memory in Java?
- ✅ JVM is responsible for memory management in Java.
- It allocates memory for:
    - Class loading
    - Objects
    - Stack frames
    - Method calls
    - Garbage collection
### 🧱 2. Java Memory Areas (Runtime Memory Structure)
Here's a visual/text breakdown of Java memory inside the JVM:
```pgsql
+----------------------------+
|    Method Area (MetaSpace)|
+----------------------------+
|          Heap             |
|  (Objects, class instances)|
+----------------------------+
|          Stack            |
| (Method calls, local vars)|
+----------------------------+
|     Program Counter (PC)  |
+----------------------------+
|     Native Method Stack   |
+----------------------------+
```
| Memory Area             | Role                                                                  |
| ----------------------- | --------------------------------------------------------------------- |
| **Heap**                | Stores all Java objects & class instances. Managed by GC.             |
| **Method Area**         | Stores metadata (class, method info). In Java 8+, part of Metaspace.  |
| **Stack**               | Each thread gets a stack. Stores method call frames, local variables. |
| **PC Register**         | Keeps track of current instruction per thread.                        |
| **Native Method Stack** | For native code execution (e.g., JNI).                                |


---
## So by any chance u mean all java codes will run inside memory created by JVM? and JVM creates memory for each java code
   - Yes, you're exactly right — every Java program runs inside memory allocated by the JVM, and JVM creates and manages that memory for each running Java program (also called a Java process).

### ✅ 1. “All Java code runs inside memory created by JVM?”
✔️ Yes.
- When you execute a Java program (using java MyApp), here's what happens:
   - JVM starts.
   - Loads the class MyApp
   - Looks for the public static void main(String[] args) method
   - Starts a main thread to run that method
   - It allocates memory (Heap, Stack, etc.).
   - It loads your compiled .class files (bytecode).
   - It executes bytecode line by line (using interpreter or JIT compiler).
   - JVM manages everything — memory, execution, GC, etc.
- ➡️ So your code never touches system memory directly like in C/C++. It lives completely inside JVM memory space.

### ✅ 2. “JVM creates memory for each Java code?”
✔️ Yes, per Java process.
- For every Java application, JVM spins up its own memory space, which includes:
    - Its own Heap (objects, class instances)
    - Its own Stacks (per thread)
    - Its own Metaspace (class metadata)
    - Its own GC management and tracking

- 📌 That means:
    - If you run java A and then separately run java B, both A and B run in separate JVM instances, with separate memory.
    - They're completely isolated from each other (like different Docker containers).

## 🔍 Visual Breakdown:

JVM instance created
```arduino
JVM Memory:
 ├─ Heap (your objects)
 ├─ Stack (method calls, vars)
 ├─ Metaspace (class data)
 └─ GC running in background
```

---

### 1. Spring Boot {#section-1}

> **📁 Topic: SpringBoot**

## Spring Boot
- No Seperate Server Initialization
- No Seperate Servlet for handling API
- No Seperate JPA for DB operations



## Request Flow:
`Client → DTO (validations) → Controller → Service → Entity(Table) → Repository(DAO-for CRUD) → DB`

## ✅ **Key Concepts**

| Term   | Stands For            | Responsibility                         | Maps To DB? | Layer                 |
|--------|------------------------|-----------------------------------------|--------------|------------------------|
| DTO    | Data Transfer Object   | Moves data between layers or systems    | ❌ No         | Controller ↔ Service   |
| Model  | General term           | Depends on usage                        | Maybe         | Varies                 |
| Entity | Entity class (JPA)     | Maps Java object to DB table            | ✅ Yes        | Persistence Layer      |
| DAO    | Data Access Object     | Interface/class to access data source   | ❌ (works with Entity) | Repository Layer       |

---

### 1-1. Memory Management Garbage Collection {#section-1-1}

> **📁 Topic: Adv Java**

## Stack & Heap in RAM Created/Managed by JVM 
| Memory Area | Used For                                                     |
| ----------- | ------------------------------------------------------------ |
| **Heap**    | All objects and class instances (`new` keyword)              |
| **Stack**   | Method calls, local variables, return addresses (per thread) |

- Each `Thread` have own `different stack` but `common HEAP`

### 🔍 Does Heap/Stack allocation change during execution?
✔️ Yes, both Heap and Stack memory allocations evolve dynamically as code is executed line by line (instruction by instruction).


- For `Methods`: Block is created in `Stack` called "`Frames`", so this will create local variables go out of scope after execution
- For `Object`: in `HEAP`, `Ref` in `Stack`

### Strings: stored in String Pool Area of HEAP
- String Literals: not created but will be taken exisitng one if it's already present in String Pool

### After Stack execution complete: stack empty - GC clear HEAP
- `JVM manages GC` so it's automatic management 

## GC
- `Objects`
   - `Strong Referance`: Obj1 ob1=new Obj1(); never get deleted when this ref is present in stack
       - this is used most of the time
   - `Weak Referance`: List<Obj1> =new ArrayList<>(); can be deleted 
      - `Soft Refernace` (weak ref) : can be deleted urgently even if ref is present

## HEAP Memory
- Young Generarion + Old Gen  & Non HEAP (Meta Space)
### Young Gen = Eden +  S0 + S1 
- Eden stores: new Object
- S0, S1: survivour space 
- let say GC invoked (Mark & sweep Algo) --> Mark algo will check which obj have no ref in HEAP then Sweep Algo will remove them and which are survived means which have ref will be put in S0 and it's called `minor GC `and it's AGE=1
- Let say new Obj again created -->  Some Object which don't have ref will be deleted and sweep will remove them from HEAP and will move AGE=1 refs to S1 and their AGE=2 and which are moved to S0 their AGE=1
- Let say AGE=3 is our threshold anf GC again Run: MArk & Sweep same process and this time it will put ref whose AGE=3 will be put in Old generation AREA of Heap and this will be deleted using `Major GC`
### Meta Space (Permenant Gen before java 7/8): Outside of HEAP
- Class Variables (Static vars)
- Class Metadata 
- Stores Constants (static final int a=10)
> Permenant Gen was Part of HEAP in Java7/8

## GC:
- Goals
    - Throughput: increase 
    - Latency: decrease
    - why? - because it pauses Main App thread for clearing HEAP Area which affects performance of Application
1. Serrial GC: 
    - one thread 
    - Slow
    - `Expensive: All App Threads get Paused means APP will Stop`
    - `If GC slow app will become Slow`
2. parallel GC: Java 8
    - Multi Threads
    - Some what Fast
3. Concurrent Mark & Sweep : 
    - App thread + GC Thread Runs in Parallel
    - Try to delete when App thread  is still running but depends on action can be stopped
4. G1: 
    - Tried to Reduce GC time to 0

---

### 1-1. Spring Boot @springbootapplication {#section-1-1}

> **📁 Topic: SpringBoot**

# @SpringBootApplication = @EnableAutoConfiguration + @ComponentScan + @Configuration

## @EnableAutoConfiguration
- Scans package based on class path and registers BEANs in Application Context
- Spring Boot considers the package of the class declaring
the `@EnableAutoConfiguration` as the default package. Therefore, if we apply this
annotation in the root package of the application, every sub-packages & classes will
be scanned. As a result, we won’t need to explicitly declare the package names
using `@ComponentScan`.

---

### 2. Java Exception {#section-2}

> **📁 Topic: Adv Java**

## Hierarchy:
```
object --> Throwable --> Error + Exception (checked + unchecked)
Exception = checked (compileTime) + Unchecked (RuntTime)
```

---

### 2. Spring Boot Request Handling {#section-2}

> **📁 Topic: SpringBoot**

# @Controller
```java
@Controller
public class GreetController {

    @GetMapping("/greet")
    @ResponseBody
    public String greet() {
        return "Hello!";
    }
}

@Controller
public class EmployeeController {

    @GetMapping("/employee")
    @ResponseBody
    public Employee getEmployee() {
        return new Employee(1L, "John");
    }
}

```
# @ResponseBody
- `@ResponseBody` tells Spring to write the method return value directly to the HTTP response body, instead of rendering a view (like JSP or Thymeleaf).

> The return value is usually serialized as JSON (or XML), depending on the `Accept header`.
- If you don’t use @ResponseBody, Spring assumes you want to return a view name, like greet.jsp.
- Not Needed in @RestController
# @RestController
- Combines `@Controller` + `@ResponseBody`
- Tells Spring:
   - This class handles HTTP requests
   - Return values from methods should be automatically serialized to JSON (or XML)

```java
//  @RestController
@RestController
public class GreeController{
    @GetMapping("/greet")
    public String greet(){
        return "Hello";
    }
}
//  @Controller
@Controller
public class GreetController {

    @GetMapping("/greet")
    @ResponseBody
    public String greet() {
        return "Hello!";
    }
}

```

### 🔁 `Without @RestController, you'd have to manually annotate class with @Controller and each method with @ResponseBody.`

# RequestMapping()
- Maps HTTP request to classes or Methods
- Can define:
   1. `Class level`: Base path 
   2. `Method Level`: Specific HTTP method + path 
```java
@RestController
@RequestMapping("/api")
public class GreetController {
    @GetMapping("/greet")
    public String greet(){
        return "Hello";
    }

    @RequestMapping("/v1/greet")
    public String greetV1(){
        return "Hello";
    }
     @RequestMapping(value="/v2/greet",Method=RequestMethod.GET)
    public String greetV2(){
        return "Hello";
    }
}
```
# @GetMapping
- Shortcut for: `@RequestMapping(method=Request.GET)`

## Summary

| Annotation       | Purpose                               | Used On     |
|------------------|----------------------------------------|-------------|
| `@RestController`| Marks class as a REST API controller   | Class       |
| `@RequestMapping`| Maps URL paths (any HTTP method)       | Class/Method|
| `@GetMapping`    | Maps GET requests (shortcut)           | Method      |

# Post Handling:
1. Create DTO(model) class
2. `@PostMapping()`: automatically maps to dto
3. Body Mapping: `@RequestBody`

```java
class GreetBodyDto{
    private String name;
    public void setName(String name){
        this.name=name;
    }
    public Sting getName(){
        return name;
    }

}
class GreetResponse{
    private String message;
    public void setMessage(String message){
        this.message=message;
    }
}

@RestController
class GreetController{
  @PostMapping("/greet")
  public GreetResponse greetUser(@RequestBody GreetBodyDto greetBody){
    GreetResponse response=newn GreetResponse();
    response.setMessage("Message Sent to user"+greetBody.getName());
    return response;
  }
}

```
# 🧭 Spring Boot Parameter Binding Annotations
## Path Variable (Path Param) + Request Param (Query param)
- Example 1:
```java
   @PostMapping("/greet/{name}")
    public GreetResponse greetUser(@RequestBody GreetRequest request,@PathVariable("name") String namePathParam,@RequestParam("id") int id) {
        String message= "Hello "+request.getName()+"!";
        GreetResponse response=new GreetResponse();
        response.setName(namePathParam);
        response.setId(id);
        response.setMessage(message);
        return response;
    }
```
- Example 2:

```java
    @GetMapping("/greet/v1/{name}")
    public GreetResponse greetUser2(@PathVariable String name,@RequestParam int id){
        String message= "Hello!";
        GreetResponse response=new GreetResponse();
        response.setName(name);
        response.setId(id);
        response.setMessage(message);
        return response;
    }
```

| Annotation      | Used to extract data from  | Example usage                          |
| --------------- | -------------------------- | -------------------------------------- |
| `@PathVariable` | URL **path**               | `/users/{id}` → `@PathVariable int id` |
| `@RequestParam` | Query **parameters**       | `/search?name=John` → `@RequestParam`  |
| `@PathParam`    | (JAX-RS) Path **segments** | Rarely used in Spring (more in JAX-RS) |

## Response JSON or xML
- Spring automatically supports content negotiation, allowing responses in different formats
(e.g., JSON, XML) based on Accept headers.
- Example
```java
@GetMapping(value = "/info", produces = { MediaType.APPLICATION_JSON_VALUE,
MediaType.APPLICATION_XML_VALUE })
public User getInfo() {
return new User(1L, "Alice");
}
```
-  Request Accept: application/json → JSON
-  Request Accept: application/xml → XML

---

### 2-1. Spring Boot Request Validation {#section-2-1}

> **📁 Topic: SpringBoot**

# @Valid: for validations
### 1. Dependecy:
```yml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```
## 2. Annotate in DTO with ValidationConstaints
```java
import jakarta.validation.constraints.NotBlank;

public class CreateEmployeeRequest {

    @NotBlank(message = "Name is required")
    private String name;

    // getters and setters
}
```

## ✅ 3. Use @Valid in Controller
```java
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    @PostMapping
    public String createEmployee(@RequestBody @Valid CreateEmployeeRequest request) {
        return "Employee created: " + request.getName();
    }
}
```
# DTO Validation Exception Handling:
## @ControllerAdvice:
```java
@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<?> handleValidation(MethodArgumentNotValidException ex) {
        List<String> errors = ex.getBindingResult()
            .getFieldErrors()
            .stream()
            .map(error -> error.getField() + ": " + error.getDefaultMessage())
            .toList();

        return ResponseEntity.badRequest().body(Map.of("errors", errors));
    }
}
```

---

### 3-0. Multihreading Process Thread Heap Stack {#section-3-0}

> **📁 Topic: Adv Java**

# How Java Memory allocation works?

## Run Cmd: javac example.java
- converts to bytecode : example.class
## Run Cmd: Java example.class 
### 1. JDK: will Allocate HEAP memory for JVM Process
### 2. JDK: will start new JVM instance
### 3. JVM: `JIT`: will `Converts` `bytecode` to `machine code`

- when JIT convert to machine code it check for if new thread will be required based on code and if yes then it creates new thread with Stack + Register + counter
- Main thing about JIT is this converting and creating thread can haapen at run time or compile time

### 4. JVM: `Code Segment` [`Code Cache`]  = `JIT`: will `save` `machine code` in `Code Segment` 
- this is read only : cpu can understand
### 5. JVM: verify machine code
### 6. JVM: Allocates `Heap memory` + `Data Segment`
### 7. JVM: `HEAP` = Store new Objects/Instance data - Shared beween all threads
### 8. JVM: `Data segment` [`Method Area`] = Global + Static variable stored   
- Shared beween all threads.
- After java 8 this is part of HEAP
  
### 9. JVM: `Starts` `Main thread` - Allocates= Stack (calls,local variables) + Registers + Counter
### 10. JVM: `Thread-Stack`: 
- Loads machine code on stack or can say start execution step by step
- Stores `local variables`
- keeps track of execution
- manages `method calls`
### 11. JVM: `Thread-Register`: 
- Each thread have own register. 
- `JIT` uses to optimize bytecode 
- Used for `context switching`
### 12. JVM: `Thread-Counter`: ponits to current instrcution which is getting executed 
 - Counter-points to Code segment instruction
 - let say 2 threads are there other than main thread
 - in this case pc (counter) will point to some address in Code Segment as this CodeSegment know `where to start new threa`d as JIT saves these details when converting bytecode -> machine code 

## Context Switching
- Happens when threads are more than CPU core but when core are more threads can run in parallel
- In context swithcing `counter` is used which locates `registers` and then thread will start executing tasks where it was left before (as when context switching happens it actually stores existing threads results data in registers and pc will points to that register so when again the thread loads it, counter is used for getting last instruction where it's stored)

## Multithreading
### Issues:
1. Data inconsistency
2. Synchronization issue
3. Deadlocak

## Multitasking vs Multithreading
1. Multitasking : 
    - different porocess/task
    - no share of resources
2. Multithreading
    - Multiple thread of same process
    - resources shared

---

### 3. Spring Boot Exception Handling {#section-3}

> **📁 Topic: SpringBoot**

## Spring Boot Exception Handling
### @ControllerAdvice: Class Level
### @ExceptionHandler: Method Level

### Example

```java
// Custom Exection
class UserNotFoundException extends RuntimeExcetion{
    UserNotFoundException(String message){
        super(message);
    }
}

//Global Exception Handler
@ControllerAdvice
class GlobalExceptionHanlder{
   @ExceptionHandler(UserNotFoundException.class)
   public ResponseEntity<?> HandleUserException(UserNotFoundException ex){
      return ResponsEntity.status(500).body(Map.of("error",ex.getMessage()));
   }
}
```

---

### 3-1. Multithreading Thread Creation {#section-3-1}

> **📁 Topic: Adv Java**

## Thread Creation
2 ways:
1. Implement `Runnable` interface
2. Extend `Thread` class

## Structure:
```java
interface Runnable{
    public void run()
}

class Thread implements Runnable{
    Runnable target;
    public Thread(Runnable target){
        this.target=target;
    }

    public void run(){
        if(target!=null){
            this.target.run();
        }
    }
    public void init(){

    }
    public void start(){

    }
    public void sleep(){

    }
    public void stop(){

    }
    public void interrupt(){

    }
   
}
```
- Runnable --implemented by--> Thread
### Runnable Interface
- It's functional interface - can pass lambda function
- for custom implementation
- in the end Thread class will run 
```java
class Drive implements Runnable{
    public void run(){
        sout("driving");
    }
}

class Main{
    psvm(String[] args){
        Drive drive=new Drive();
        Thread td=new Thread(drive); // thread takes runnable
        td.start();// this will start new thread
        td.run();// this will call thread Run method which internally call drive.run();
    }
}
```
### Thread Class
```java
class MultiThreadDemo extends Thread{
    @Override
    public void run(){
        ///
    }
}

class Main{
    psvm(String[] args){
        MultiThreadDemo demo= new MultiThreadDemo();
        demo.start(); //creates new Thread
        demo.run();
        demo.stop();
    }
}
```
## Thread Lifecycle:
- New → start() → Runnable (waiting for CPU)
- Runnable ↔ run()/yield() ↔ Running (got CPU time)
- Running → run() → Blocked / Waiting / Timed waiting
- Any of these → stop() → Terminated
### `New` --Start()--> { `Runnable` (waiting for CPU time - then context switching) <--run()--> <--yield()-->`Running`} (got cpu time) --Run()--> [`Blocked` (due to IO/lock) || `Waiting` (wait()/notify())|| `Timed waiting`(sleep() or join())] --stop()--> `Terminated`
```text
       ┌───────┐                                  
       │  New  │         ──────stop()────────▶     Terminated
       └───┬───┘                                
        start()                                                                   
           │                                     
           ▼                                     
┌──────────────────────────────┐                  
│ Runnable (waiting for CPU)   │──────────────▶    Terminated
└───┬─────────────┬────────────┘      stop()             
    │             │                                
    │ run()       │ yield()                              
    ▼             ▲                              
┌──────────────────────────────┐                              
│ Running (got CPU time)       │──────────────▶     Terminated                             
└───┬───────┬───────────┬──────┘      stop()                              
    │       ▼           │                              
    │     wait()   sleep()/join()                              
    │       │           │                              
    │    notify()       │                              
    ▼       ▲           ▼                              
┌───────────┴─────────────────┐                              
│ Blocked │ Waiting  │ Timed  │──────────────▶      Terminated                     
│ (IO/    │ (wait/   │ waiting│      stop()                              
│ lock)   │ notify())│        │                              
└─────────┴──────────┴────────┘                              
```

---

### 3-2. Multithreading Monitor Locks {#section-3-2}

> **📁 Topic: Adv Java**

## Monitor object
- Object on which JVM puts lock is Monitor Object
- when Object `instance` is `locked` it will `lock only synchronous block (method)` not whole instance.

## Monitor Locks: for accessing block of code
> This lock is object level lock means can be specific to single object
- it helps to make sure that one 1 thread goes inside particular section of code(a `synchronized` block or method)
- put using `synchronized` keyword before method or block of code
- `Runnable/Running` : put Monitor Block
- `Blocked + waiting` : releases Monitor block
- `Timed Waiting` : not releases Monitor block
- wait()
    - put thread on wait
    - releases lock
- notify()
    - to resume waiting thread
## Synchronized
- can be instance method, static method or block
- ### 🔒 What Happens in synchronized Methods? case 1 & 2 both are same
 ```java
//Case 1: synchronized instance method
public synchronized void methodA() {
  // JVM internally does: synchronized(this) {
  //   method body
  // }
}
     
// Case 2: synchronized (this)
public void methodB() {
    synchronized(this) {
        // Lock is acquired on the current object instance
    }
}

```
 - ✅ This means:
    - JVM acquires monitor lock on this (current object instance).
    - So yes, the `monitor object = current instance`.

### ⚠️ But You Can Also Synchronize on Another Object
```java
private final Object customLock = new Object();

public void methodC() {
    synchronized(customLock) {
        // Monitor is customLock, not 'this'
    }
}
```
- 🔑 Now:
     - `this ≠ monitor object`
     - You're locking on a separate object, not the instance itself.
     > This is a good practice in some cases to avoid exposing object-wide locks — helps prevent deadlocks and interference.
### 🧪 Static Method Example
```java
public static synchronized void staticMethod() {
    // JVM acquires lock on the class object: MyClass.class
}
```
- Here, `this doesn’t exist (static context)`.
- `Monitor = MyClass.class (class-level lock)`
## 📌 Summary Table
| Case                         | What is the monitor? | Is it `this`? |
| ---------------------------- | -------------------- | ------------- |
| `synchronized void method()` | `this`               | ✅ Yes         |
| `synchronized (this)`        | `this`               | ✅ Yes         |
| `synchronized (otherObj)`    | `otherObj`           | ❌ No          |
| `static synchronized method` | `ClassName.class`    | ❌ No          |



## Example: Async Execution
```java
// object to share methods across threads
class MonitorLock{
    synchronized void task1() throws InterruptedException{
        System.out.println("task 1: start");
        Thread.sleep(10000);
        System.out.println("task 1: complete");
    }

    void task2(){
        System.out.println("task 2: before sync-lock");
        synchronized(this){//this will try to put lock on whole object(this) - so if there is already a lock on some resource of this object by other thread T1 (here task1()) and then if anyother thread T2 calls task2 then it will wait for release of lock by T1 on task1 for locking the whole object
            System.out.println("task 2: after sync-lock");
        }
    }

    void task3(){
        System.out.println("task 3");
    }

}
//create thread or custom thread
class CustomThread implements Runnable{
    MonitorLock ml;
    CustomThread(MonitorLock ml){
        this.ml=ml;
    }

    @Override
    public void run(){
        this.ml.task2();
    }
}
class Main{
    public static void main(String[] args) throws Exception {

        MonitorLock ml = new MonitorLock();
        //using LAMBDA
        Thread td1 = new Thread(()->{
            try {
                ml.task1();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });//giving task1() to td1
        //using custom thread
        CustomThread ctd = new CustomThread(ml);//giving ml to CustomThread
        Thread td2 = new Thread(ctd);//td2 is now a thread which will run task2() of MonitorLock
        Thread td3 = new Thread(()->{ml.task3();});

        td1.start();
        td2.start();
        td3.start();

    }
}

//OP:
/*
task 1: start
task 2: before sync-lock
task 3
task 1: complete
task 2: after sync-lock
*/
```

### When use Runnable directly : Sync execution
```java
class Main2{
    public static void main(String[] args) throws Exception {

        MonitorLock ml = new MonitorLock();
        //using LAMBDA
        Thread td1 = new Thread(()->{
            try {
                ml.task1();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        });//giving task1() to td1
        //using custom thread
        CustomThread ctd = new CustomThread(ml);//giving ml to CustomThread
        Thread td3 = new Thread(()->{ml.task3();});

        td1.run(); //run makes it run 
        ctd.run();
        td3.start();

        /*
        
        td1.start();
        td2.run();
        td3.run();
            task 2: before sync-lock
            task 1: start
            task 1: complete
            task 2: after sync-lock
            task 3
        */

    }
}
/*
OP:
task 1: start
task 1: complete
task 2: before sync-lock
task 2: after sync-lock
task 3
*/

```

---

### 3-2-1. Multithreading Monitor Lock {#section-3-2-1}

> **📁 Topic: Adv Java**

## 🧠 "If the monitor lock is on the current object (this), then why doesn't it block access to all other methods of that object?"

### 🔐 Monitor Lock: Only Affects synchronized Code
- The monitor lock only protects code that is inside synchronized blocks or methods.
It does not block access to non-synchronized methods — even though the lock is on the same object.
### 🔁 So Why Doesn't Lock Block the Whole Object?
- Because the monitor is not a gate to the object itself, it’s just a gate to synchronized code sections.

### 🔑 Rule:
- JVM enforces monitor lock only when entering synchronized methods or blocks.
- If a method is not marked as synchronized, the thread does not check or care about the monitor lock on the object.

## 🧠 What If You Want to Prevent Access to All Methods?
If you want to block all access to any part of the object while a thread holds a lock, you must:
- Either synchronize all methods
- Or write a wrapper that checks lock status manually (less common)
- Or use ReentrantLock with tryLock and flags


## Example: lock and wait 
### wait()
- put thread on wait
- releases lock (releases monitor lock on sync block/code)
### notify()
- to resume waiting thread
### Check Item Available
```java
public class MonitorLockEx {
    public static void main(String[] args) throws InterruptedException {
        Product product = new Product();
        Thread producerThread =new Thread(()->{
            try {
                Thread.sleep(5000);
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
            product.addItem();
        });
        Thread consumerThread = new Thread(()->{
            product.consumeItem();
        });
        producerThread.start();
        consumerThread.start();

    }
}
class Product{
    private boolean isAvailable;

    public synchronized void addItem(){
        System.out.println("Item added");
        isAvailable= true;
        notifyAll();// Notify all waiting threads that an item is available
    }

    public synchronized  void consumeItem() {
        while(!isAvailable){// if is not used as mentioned in oracle docs if block can be some time create a problem
            System.out.println("Waiting for item to be available...");
            try {
                wait();// Wait until notified that an item is available
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        System.out.println("Item consumed");
    }
}
```
## Consumer Producer Example
- Producer Thread: Adds user
- Consumer Thread: Removes User
```java
public class MonitorLockEx2 {
    public static void main(String[] args) {
        UserManagement userManagement = new UserManagement(5);

        // Thread to add users every 2 seconds for 5 times
        Thread producerThread = new Thread(()->{
            for(int i=1;i<=10;i++){
                User user =new User(i,"user_"+i);//{id:int,name:String}
                userManagement.userAdd(user);
//                try {
//                    Thread.sleep(2000); // Sleep for 2 seconds before adding the next user
//                } catch (InterruptedException e) {
//                    Thread.currentThread().interrupt(); // Restore interrupted status
//                    throw new RuntimeException(e);
//                }
            }
            userManagement.setUserAddingComplete();
        });

        //consumer thread to remove users
        Thread consumerThread = new Thread(()->{
            while (true) {
                User user = userManagement.userRemove();
                if (user == null) {
                    break; // Exit if no more users to remove and addition is complete
                }
                System.out.println("Removed user: " + user.getName());
                try {
                    Thread.sleep(1000); // Sleep for 1 second before removing the next user
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt(); // Restore interrupted status
                    throw new RuntimeException(e);
                }
            }
        });

        // Start both threads
        producerThread.start();
        consumerThread.start();

        System.out.println("Producer and Consumer threads started.");
//        try {
//            producerThread.join();
//            consumerThread.join();
//        } catch (InterruptedException e) {
//            Thread.currentThread().interrupt();
//            throw new RuntimeException(e);
//        }

    }
}

class UserManagement {
    Queue<User> userList = new LinkedList<>();
    int bufferSize;
    private boolean isUserAddingComplete = false; // Flag to indicate if user addition is complete
    public UserManagement(int bufferSize){
        this.bufferSize=bufferSize;
    }

    public synchronized void userAdd(User user)  {
        while (userList.size()==bufferSize){// not used if as mentioned in oracle docs if block can be some time create a problem
            System.out.println("user buffer is full");
            try {
                wait();
            } catch (InterruptedException e) {
                throw new RuntimeException(e);
            }
        }
        userList.add(user);
        System.out.println("User added: " + user.getName());
        notifyAll(); // Notify any waiting threads that a new user has been added
    }

    public synchronized User userRemove() {
        // suggest:return after userAdding is complete and no user is available
//        if (isUserAddingComplete && userList.isEmpty()) {
//            System.out.println("No more users to remove, and user addition is complete.");
//            return null; // No users to remove and addition is complete
//        }
        // Wait until there is at least one user to remove
        while (userList.isEmpty()) {
            if (isUserAddingComplete) {
                System.out.println("No more users to remove, and user addition is complete.");
                return null;
            }
            try {
                System.out.println("Waiting for users to be added...");
                wait();
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                throw new RuntimeException(e);
            }
        }
        User user = userList.poll();
        System.out.println("User removed: " + (user != null ? user.getName() : "null"));
        notifyAll();//for adding as it will be in waiting state for adding if buffer is full;
        return user;
    }

    public synchronized void setUserAddingComplete() {
        isUserAddingComplete = true;
        notifyAll(); // Notify any waiting threads that user addition is complete
    }

}
```

---

### 3-2-2. Multithreading Stop Resume Suspend Deprecated {#section-3-2-2}

> **📁 Topic: Adv Java**

## Why Stop(), Resume(), Suspended() is deprecated
- Stop(): 
    - Terminates Thread
    - No lock release
    - No resource cleaning
- Suspended():
    - put thread on HOLD - No locak Release
- Resume():
    -  resumes suspended thread
#
- wait()
    - put thread on wait
    - releases lock
- notify()
    - to resume waiting thread 
    - only single thread is resumed and it's managed by JVM 
    - randomly thread is selected for resuming

- join()
    - makes main thread to wait for completing other thread
- priority()
    - 1 to 10: low to high
    - even we set specific priority JVM does not gurantee the execution order will be followed based on priority
    - Never rely on priority

---

### 3-2-3. Multithreading Demon Thread Reentrantlock {#section-3-2-3}

> **📁 Topic: Adv Java**

# 💡 Key Principle of Locking in JAVA
### A lock (including ReentrantLock, ReadWriteLock, Semaphore, Stampede) controls access to the code block, not the object — it doesn't care about the object instance, only about the lock instance.
- If multiple objects or threads share the same lock instance, then their access is coordinated.
- If they each have a different lock instance, then they act independently — even if the logic is the same.
### ✅ All lock types in Java behave this way:
- The lock controls access not based on the object it's inside, but based on the lock instance itself.
## Threads: User Thread || Demon Thread
- set: thread.isDemon(true);
-  `Alive until Main thread is Alive`
- Garbage Collector: Demon Thread
- in logging can be useful

## Types of Lock

1. Monitor Lock 
   - synchronized
   - depends on object(this)
### Custom Locks: Not depend on object (No synchronized)
   - why?
       - In Monitor lock resource object is shared among thread but what if there are muliple threads with having same or different monitor object then this lock will not make any method to be accessed by single thread
       - in this scenario even if there are different instance objects (monitor) of same type it should not let access of particular code segment to any thread
       - So synchronized only ensures one thread per object, not one thread for all objects.
       - Each Thread has a new object → new monitor → no lock is shared → all threads access the code block in parallel, even if that method should be exclusive!
       - EX. database connection limit is 5 so if 10 threads want to access them it should wait 
       - `HAS-A`: in simple words, lock object is given to different monitor objects and at one time that method will be accessable by only one thread event there are muliple objects (monitors).
       - ✅ Limit access to a critical section globally, even across different instances.
2. Reentrant 
3. ReadWrite
4. semaphore
5. Stamped
# 1. Reentrant Lock:
-  Reentrant = "Re-enterable by the same thread"
- Single ReentranLock object is shared between objects which are running on different threads
- No need of synchronized
- Used directly 
- In simple words if you need some method or block to be accessed by only one thread at a time use `Reentrant lock`
```java
class SharedProductResource{
    boolean isAvailable=false;
    void producer(ReentrantLock lock){
        try{
            lock.lock();
            sout("Lock acquired by: "+Thread.currentTHread().getName());
            isAvailable=true;
            Thread.sleep(2000);
        }catch(Exception e){

        }finally{
            lock.unlock();
            sout("lock released by: "+Thread.currentTHread().getName());
        }
    }
}
class Main{
    psvm(String[] args){
        ReentrantLock lock=new ReentreantLock();
        SharedProductResource p1= new SharedProductResource();
        Thread td1= new Thread(()->{
            p1.producer(lock);
        });
        SharedProductResource p2= new SharedProductResource();
        Thread td2= new Thread(()->{
            p2.producer(lock);
        });

        td1.start();
        td2.start();
    }
}
```
## await(), Signal(), signalAll()
```java
Lock lock = new ReentrantLock();
Condition condition = lock.newCondition();
```
- ✅ Condition.await() ~ wait()
- ✅ Condition.signal() ~ notify()
- ✅ Condition.signalAll() ~ notifyAll()
### Fairness policy: create a "`fair`" lock where `threads acquire the lock in the order requested`
- Interruptible locks
- Explicit unlocking across different code paths
## ✅ Desired Outcome: Lock shared across all instances
### ✅ Limit access to a critical section globally, even across different instances.
### 🔍 Why ReentrantLock Works in These Scenarios
### 🔸 HAS-A relationship
- The lock is not on this (the object)
- It's a field (HAS-A) that is shared across objects or components

### 🔸 Real-world analogy
- Think of 10 API servers (10 object instances)
- Only 5 DB connections available


### ✅ Summary
- Use synchronized when thread safety is needed at object level.
- Use ReentrantLock when:
   - You want explicit control
   - Need to protect a shared global resource
   - Want to enforce locking across different object instances
   - Need timeout, interruptible waits, or fairness

---

### 3-2-4. Multithreading Readwritelock {#section-3-2-4}

> **📁 Topic: Adv Java**

# Read Write Lock
## 🔍 What is ReadWriteLock?
- It's a concurrency utility that allows multiple threads to read a shared resource simultaneously, but only one thread to write, and no reads during writing.
### Shared Lock (Read lock): 
- T1 & T2 (or more Threads) can both put this lock on same object but  
- they can only read and
- can not write it.
- if there is Shared lock already then Can not put Exclusive lock.
- if there is Shared lock already then Can put Shared lock.

### Exclusive Lock (Write lock):
- can Read and also can write i.e. change the value of objects.
- Shared (Read) lock  not allowed when there is Exlusive (Write) lock
- Only 1 thread can acquire?
## 🔑 Problem It Solves:
- With a normal ReentrantLock or synchronized block:
- Only one thread (read or write) can access the resource at a time.
- But many times we want:
    - Many readers (non-conflicting)
    - Only one writer (exclusive)

- You don’t want all 10 reads to block just because one thread is reading — only block when a write happens.
## ⚠️ Notes
- Writers are exclusive — no other reader or writer allowed during write
- Fairness is not guaranteed by default → use:
```java
new ReentrantReadWriteLock(true); // fair mode
```
## How ReentrantReadWriteLock works:  
- Multiple threads can hold the read lock at the same time, allowing concurrent reads.
- When a thread acquires the write lock, it blocks all other reads and writes until it releases the lock.
- In your output, reads and writes are interleaved, but no read happens while a write lock is held.
## 🧠 Use Case:
Let’s say you have:
- 1 shared config file or cache
- 10 threads read it frequently
- Occasionally, 1 thread updates it
```java
ReadWriteLock lock = new ReentrantReadWriteLock();
Lock readLock = lock.readLock();
Lock writeLock = lock.writeLock();
```
## 🧠 So what happens inside high-level locks like ReadWriteLock?
Internally, they manage thread parking/unparking using lower-level primitives like:
- LockSupport.park()
- FIFO thread queues
- CAS + Unsafe memory access (for performance)

You don’t need to call wait()/notify() — the library takes care of who gets notified and when.

### Example:
```java
import java.util.concurrent.locks.*;

class SharedCache {
    private String data = "initial";
    private final ReadWriteLock rwLock = new ReentrantReadWriteLock();
    private final Lock readLock = rwLock.readLock();
    private final Lock writeLock = rwLock.writeLock();

    public void readData(String threadName) {
        readLock.lock();
        try {
            System.out.println(threadName + " reading data: " + data);
            ////in these 3 seconds if any thread tries to write it will wait until all read threads will complete and read lock is released
            Thread.sleep(3000);
        } catch (InterruptedException e) {
        } finally {
            readLock.unlock();
        }
    }

    public void writeData(String threadName, String newData) {
        writeLock.lock();
        try {
            System.out.println(threadName + " writing data...");
            Thread.sleep(2000);
            data = newData;
            System.out.println(threadName + " wrote data: " + data);
        } catch (InterruptedException e) {
        } finally {
            writeLock.unlock();
        }
    }
}
public class Main {
    public static void main(String[] args) {
        SharedCache cache = new SharedCache();

        // 5 reader threads
        for (int i = 1; i <= 5; i++) {
            final int id = i;
            new Thread(() -> cache.readData("Reader-" + id)).start();
           // all the read threads will run concurrently
        }

        // 2 writer threads
        new Thread(() -> cache.writeData("Writer-1", "updated-by-w1")).start();
        new Thread(() -> cache.writeData("Writer-2", "updated-by-w2")).start();
    }
}

```
## 📊 What Happens Internally?
| Operation     | Behavior                                 |
| ------------- | ---------------------------------------- |
| Reader-Reader | ✅ Can run concurrently                   |
| Reader-Writer | ❌ Writer waits for all readers to finish |
| Writer-Reader | ❌ Readers wait for writer to finish      |
| Writer-Writer | ❌ Only one writer at a time              |

## 📌 Use Cases in System Design
| Use Case        | ReadWriteLock Usage                            |
| --------------- | ---------------------------------------------- |
| Config server   | Reads are frequent, writes rare                |
| Cache system    | Read-heavy: threads can read concurrently      |
| Product catalog | All users browse (read), admin updates (write) |

## 🧠 Advantages
- Better performance in read-heavy systems
- More granular control than synchronized
- Prevents starvation using fairness policies

## Disadvantages
- no wait(), signal() like for ReentrantLock so can not be used for subscriber-consumer 
- no tryLock() lock like ReentrantLock so can not check if lock is available before locking so sequential locking of different threads is not possible 

## ✅ Summary
| Lock Type     | Readers Allowed?    | Writers Allowed?  |
| ------------- | ------------------- | ----------------- |
| `readLock()`  | ✅ Yes, concurrently | ❌ No              |
| `writeLock()` | ❌ No                | ✅ One thread only |

---

### 3-2-4-1. Readwritelock {#section-3-2-4-1}

> **📁 Topic: Adv Java**

## 🔑 Your Question:
If multiple objects share the same ReadWriteLock object, will they be mutually exclusive, even though they are different objects
### ✅ Short Answer:
Yes, if multiple instances share the same ReadWriteLock, their read and write access will be controlled globally — across all instances.
## 💡 Key Principle
A lock (including ReadWriteLock) controls access to the code block, not the object — it doesn't care about the object instance, only about the lock instance

## Example
```java
class SharedResource {
    private final ReadWriteLock lock;

    public SharedResource(ReadWriteLock sharedLock) {
        this.lock = sharedLock;
    }

    public void read(String name) {
        lock.readLock().lock();
        try {
            System.out.println(name + " reading...");
            Thread.sleep(1000);
        } catch (Exception e) {
        } finally {
            lock.readLock().unlock();
        }
    }

    public void write(String name) {
        lock.writeLock().lock();
        try {
            System.out.println(name + " writing...");
            Thread.sleep(2000);
        } catch (Exception e) {
        } finally {
            lock.writeLock().unlock();
        }
    }
}
public class Main {
    public static void main(String[] args) {
        ReadWriteLock sharedLock = new ReentrantReadWriteLock();

        SharedResource obj1 = new SharedResource(sharedLock);
        SharedResource obj2 = new SharedResource(sharedLock);

        new Thread(() -> obj1.read("Reader-1")).start();
        new Thread(() -> obj2.read("Reader-2")).start();
        new Thread(() -> obj1.write("Writer-1")).start();
        new Thread(() -> obj2.write("Writer-2")).start();
    }
}
```
### ✅ Result:
- Reader-1 and Reader-2 can run together ✅
- Writer-1 and Writer-2 will block each other ✅
- A writer will wait until all readers finish ✅
- `Even though obj1 and obj2 are different objects, the lock is shared, so access is coordinated`.

## 🔥 What if Each Object Had Its Own Lock?
```java
SharedResource obj1 = new SharedResource(new ReentrantReadWriteLock());
SharedResource obj2 = new SharedResource(new ReentrantReadWriteLock());
```
Now:
- They have independent locks 🔓
- Readers/writers from obj1 and obj2 won't block each other
- Not thread-safe globally
- This is like having 10 DB servers with independent limits — bad idea if you want centralized control (e.g., connection pool of size 5).

---

### 3-2-5. Multithreading Stampedlock {#section-3-2-5}

> **📁 Topic: Adv Java**

# StampedLock
- `Optimistic Lock + Passimistic Lock [ReadWriteLock]`
- `Optimistic Lock: No locking` 
- `Passimistic Lock`: Locking on `Code` (Locking-code block irrespective of instance) or `Object`(Synchronized)
- In StampedLock when putting lock(), we get one stamp of `type long` which indicates current version and need to give same stamp in `unlock(stamp)`
- `lock.validate(stamp)`: for validating the state for particular block of code this is to check that is there any other thread accessed this block of code already and executed properly
## ReadLock:
### 🔒 What it is:
- Pessimistic read lock, blocks if a write is happening.
- Allows multiple concurrent readers.
- No writer allowed while readers hold the lock.
### 💡Real-world analogy:
- You and others are allowed to read a document as long as no one is editing it.
```java
StampedLock lock = new StampedLock();

long stamp = lock.readLock(); // blocks if write lock is held
try {
    int value = sharedData;
    // safely use value
} finally {
    lock.unlockRead(stamp);
}
```

### ✅ Characteristics:
- Safe.
- Slower than optimistic, better for consistency.
- Writer waits for readers to release.


## WriteLock:
### ✍️ What it is:
- Exclusive lock, only one thread can write.
- Blocks readers and writers until released.
### 💡 Real-world analogy:
- You are editing the document and don’t allow anyone to read or write until you’re done.


```java
StampedLock lock = new StampedLock();

long stamp = lock.writeLock(); // blocks all
try {
    sharedData = 42; // modify data
} finally {
    lock.unlockWrite(stamp);
}
```
✅ Characteristics:
- Full control.
- Ensures `atomic` and exclusive modifications.
- `Can deadlock if used carelessly in large systems.`

## Optimistic Read Lock:
### ✅ What it is:
   - Non-blocking, lightweight read.
   - Allows other threads to write concurrently.
   - Must validate before using data, to ensure no write happened during the read.
### 💡 Real-world analogy:
You're reading a whiteboard assuming no one will update it. Before using the info, you peek again to confirm it hasn’t changed.

```java
StampedLock lock = new StampedLock();

long stamp = lock.tryOptimisticRead();
try {
    int value = sharedData; // read shared data
    if (!lock.validate(stamp)) {
        // Fallback to readLock() if data was modified
        stamp = lock.readLock();
        try {
            value = sharedData;
        } finally {
            lock.unlockRead(stamp);
        }
    }
    // use value
} finally {
    // nothing to unlock for optimistic read
}

```

### ✅ Characteristics:
- Fastest, but not safe alone if data might change.
- Suitable for mostly-read systems (e.g., caching).

---

### 4. Spring Boot Dependency Resolution {#section-4}

> **📁 Topic: SpringBoot**

### Spring uses the class name (with the first letter in lowercase) as the default bean name when you annotate a class with @Component, @Service, @Repository, or @Controller without specifying a custom name.

---

### 5. Multithreading Reentrantlock Vs Readwritelock Vs Stampedlock Vs Semaphorelock {#section-5}

> **📁 Topic: Adv Java**

## ✅ 1. Why ReentrantLock is more flexible for dependent writes (multi-object coordination)
### Real-life Problem: Multi-resource consistency
- Let’s say you’re doing something like this:
   - Transfer money from Account A to Account B
   - Or deduct stock from Warehouse X and add to Warehouse Y
- You must lock both A and B together for the operation to be consistent.

### With ReadWriteLock:
```java
a.getLock().writeLock().lock();
b.getLock().writeLock().lock(); // Potential deadlock if thread order differs
try {
   // update both objects
} finally {
   b.getLock().writeLock().unlock();
   a.getLock().writeLock().unlock();
}
```
>❌ No tryLock(), so you can't easily implement deadlock prevention (like checking lock availability before blocking).
### With ReentrantLock:
```java
if (a.lock.tryLock(1, TimeUnit.SECONDS)) {
    try {
        if (b.lock.tryLock(1, TimeUnit.SECONDS)) {
            try {
                // safe to transfer
            } finally {
                b.lock.unlock();
            }
        }
    } finally {
        a.lock.unlock();
    }
}
```
### ✅ ReentrantLock provides:
- Fine-grained coordination using tryLock() and timeouts
- Deadlock avoidance
- Better composition when multiple objects need to be locked together
## ✅ 2. Coordination Between Threads (with Conditions)
Let’s say one thread writes only when some condition is met (e.g., enough stock is present).
- With ReentrantLock:
```java
lock.lock();
try {
    while (stock < demand) {
        condition.await(); // equivalent to wait()
    }
    stock -= demand;
} finally {
    lock.unlock();
}
```
- Another thread signals:
```java
lock.lock();
try {
    stock += 100;
    condition.signalAll(); // equivalent to notifyAll()
} finally {
    lock.unlock();
}
```
### ✅ This kind of coordination between threads is not possible with ReadWriteLock, because:
- It doesn’t support Condition
- No await()/signal() methods
- So no wait-until-available mechanism

## ✅ 3. Write ordering, control, and fairness
### ReentrantLock allows:

- Fairness policy: create a "`fair`" lock where `threads acquire the lock in the order requested`
- Interruptible locks
- Explicit unlocking across different code paths
### This gives more flexibility in designing low-level synchronization strategies, for example:
- Implementing priority-based task execution
- Canceling threads waiting for a lock
- Ensuring timed lock attempts (to reduce contention)
> ReadWriteLock doesn’t give this control — it’s focused purely on isolated read-write separation.

---

### 5-2. Spring Boot Hql Relations {#section-5-2}

> **📁 Topic: SpringBoot**

## Hibernate (via JPA annotations & used internally by Spring Data JPA) helps manage these automatically by:
- Mapping foreign keys
- Handling cascading operations
- Managing lazy vs eager loading
- Avoiding infinite loops during serialization (with help from Jackson or DTOs)

## OneToMany + ManyToOne
### 📘 User Entity (One user has many orders)
```java
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // One-to-many: mapped by "user" in Order
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Order> orders = new ArrayList<>();
}
```
### 📦 Order Entity (Each order belongs to one user)
```java
@Entity
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "product_id")  // FK to products table
    private Product product;

    // Many orders → one user
    @ManyToOne
    @JoinColumn(name = "user_id") // FK in orders table
    private User user;
}
```

### Product
```java
@Entity
public class Product {
    @Id
    @GeneratedValue
    private Long id;

    private String name;

    @OneToMany(mappedBy = "product")
    private List<Order> orders;
}
```

### 🧠 Hibernate Will Generate:
```sql
CREATE TABLE users (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255)
);

CREATE TABLE orders (
  id BIGINT PRIMARY KEY AUTO_INCREMENT,
  quantity INT,
  user_id BIGINT,
  product_id BIGINT,
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

```
## Insert Example
```java
User user = new User("Jack");
Product product = new Product("iPhone");

Order order = new Order();
order.setUser(user);
order.setProduct(product);
order.setQuantity(2);

user.setOrders(List.of(order));
product.setOrders(List.of(order));

userRepo.save(user); // saves all due to cascading
productRepo.save(product); // optional if not cascaded
```

## ⚙️ Lazy vs Eager Loading

| Fetch Type                         | Behavior                                     |
| ---------------------------------- | -------------------------------------------- |
| `LAZY` (default for `@OneToMany`)  | Doesn’t load related entities until accessed |
| `EAGER` (default for `@ManyToOne`) | Loads related entity immediately             |

```java
@OneToMany(mappedBy = "user", fetch = FetchType.LAZY)
private List<Order> orders;
```

---

## Adv Java



---

## SpringBoot



---

### 999. Readme {#section-999}

> **📁 Topic: SpringBoot**

- Contexts:
   - Application Context
   - Servlet context
- Applicaton: 
   - `@SpringBootApplication()`
      - `@Configuration()`
      - `@EnableAutoConfiguration()`
      - `@ComponentScan()`
- API (servlet) : Done
   - `@Controller()` 
   - `@RestController()`
   - `@RequestBody()`
   - `@PathVariable()`
   - `@RequestParam()`
   - `@RequestMapping()`
   - `@ResponseBody()`
   - DTO 
- API Validations 
   - `@Valid` : with @RequestBody()
   - `@NotNull()`
   - `@NotBlank()`
- Exception: Done
   - Custom Exceptions
   - `@ControllerAdvice()` - class level
   - `@ExceptionHandler()` - method level
- Component:
   - `@Component`
- DI + IOC : theory 
   - `@Autowired`
   - `@Qualifier`
   - `@Value`
- DB : In progress
   - @Table( name="table") : for db table name
       - `@Table(name= "",
       uniqueConstraints = @UniqueContstraint(columnNames=""),
       indexes={
         @Index(name="",columnList="",@Index(name="",columnList=""))
       })`
   -  Entity: (for ORM)
      - `@Entity()` : for ORM
      - `@Id`
      - `@GeneratedValue(startegy=GenerationType.IDENTITY)`
      - `@Column(unique=true,nullable=false)`
      - `@Column(name="db_table_column_name")`
   - Repository: Spring data JPA
      - `@Repository`
      - `@Query`
   - Relations:
       - One to many
       - many to one
- Configs: 
   - `@Profile("dev")`
   - `@Configuration` : class level
   - `@Bean` : method level
   - `@ConfigurationProperties(prefix="app")` (used with @Component for making class config)
   - `@EnableConfigurationProperties(AppProperties.class)` : need to use mannuly if not springbootapplication to make config class

---

### Examples



---

## 🎯 Summary

This comprehensive guide covers all aspects of java & spring, providing practical examples and best practices for real-world implementation.

## 🔗 Related Topics

- [All Categories](/categories/)
- [Technical Collections](/collections/)
- [Latest Posts](/)

---

*📝 **Note:** This guide consolidates multiple learning materials into a single comprehensive resource. Each section represents hands-on learning and practical implementation experience.*
