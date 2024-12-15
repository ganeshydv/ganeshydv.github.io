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
