CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (userId VARCHAR(3), messages VARCHAR(255), roomId VARCHAR(3), FOREIGN KEY(userId) REFERENCES users(userId), FOREIGN KEY(roomId) REFERENCES rooms(roomId)
  
);

INSERT INTO messages (userid, messages, roomId)
VALUES (0, "hello", 1);

CREATE TABLE users (userId VARCHAR(3), username VARCHAR(20), PRIMARY KEY(userId)
  

);

CREATE TABLE rooms (roomId VARCHAR(3), roomName VARCHAR(30),
  PRIMARY KEY(roomId)   
  
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

