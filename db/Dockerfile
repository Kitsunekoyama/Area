FROM mysql:latest
ADD ./schema.sql /docker-entrypoint-initdb.d/
ENV MYSQL_DATABASE=test \
    MYSQL_ROOT_PASSWORD=password \
    MYSQL_USER=test \
    MYSQL_PASSWORD=test
    
EXPOSE 3306