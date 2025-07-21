---
layout: post
title: "POM : Project Object Model"
date: 2025-07-21
categories: [java, 1-1-pom--md]
tags: [java, networking]
author: "GGurkhude"
excerpt: "Learning notes on pom : project object model"
original_path: "JAVA/1.1_pom_.md"
---

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
