---
layout: post
title: "Hibernate"
date: 2025-07-21
categories: [java, 3-hibernate--md]
tags: [java, database, networking]
author: "GGurkhude"
excerpt: "Learning notes on hibernate"
original_path: "JAVA/3_Hibernate_.md"
---

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
