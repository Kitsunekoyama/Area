CREATE DATABASE IF NOT EXISTS test;
USE test;

/*CREATE TABLE arg (
  id INT NOT NULL PRIMARY KEY,
  name varchar(25),
  type varchar(25),
  value varchar(250)
 );

CREATE TABLE relation (
  id INT NOT NULL PRIMARY KEY,
  action varchar(25),
  reaction varchar(25)
);*/

CREATE TABLE userArea(
  id varchar(50) NOT NULL PRIMARY KEY,
  username varchar(25),
  password varchar(25),
  relations JSON,
  google JSON
);

/*CREATE TABLE user_relation (
  'user_id' INT NOT NULL,
  'relation_id' INT NOT NULL,
  PRIMARY KEY('user_id', 'relation_id')
);*/

INSERT INTO userArea (id, username, password) VALUES ('123', 'test', '123');
CREATE TABLE service(
  name varchar(25),
  descr varchar(100),
  image varchar(100)
);

/*CREATE TABLE trigger(
  name varchar(25),
  descr varchar(25),
  serviceName varchar(25)
);
CREATE TABLE action(
  name varchar(25),
  descr varchar(25),
  serviceName varchar(25)

);*/
