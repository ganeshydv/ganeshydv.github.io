# Use the official SonarQube image as the base
FROM sonarqube:latest

# Copy the custom sonar.properties file into the container
COPY ./conf/sonar.properties /opt/sonarqube/conf/sonar.properties

# Create the directory for JDBC drivers
RUN mkdir -p /opt/sonarqube/extensions/jdbc-driver/postgresql

# Copy the PostgreSQL JDBC driver into the container
COPY ./extensions/jdbc-driver/postgresql/postgresql-42.7.3.jar /opt/sonarqube/extensions/jdbc-driver/postgresql/

# Replace <version> with the actual version number of the JDBC driver you downloaded
