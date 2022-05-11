drop database if exists foodblog;
create database  foodblog;

use foodblog;




CREATE TABLE user (
    username varchar(50) NOT NULL,
    email varchar(50) UNIQUE,
    PRIMARY KEY (username)
);


CREATE TABLE profile (
        id  INT NOT NULL AUTO_INCREMENT,
        username VARCHAR(50),
        intro VARCHAR(255) NULL,
        avatarUrl varchar(50) null,
        PRIMARY  KEY (id),
        FOREIGN KEY(username) REFERENCES user (username)
);




CREATE TABLE post (
    id  INT NOT NULL AUTO_INCREMENT,
    createdBy VARCHAR(50) not NULL ,
    title VARCHAR(50) NOT NULL,
    slug VARCHAR(100) UNIQUE ,
    summary VARCHAR(200),
    createdAt timestamp DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NULL,
    content TEXT NOT NULL,
    PRIMARY  KEY  (id),
    FOREIGN key (createdBy) REFERENCES user (username)
);




CREATE TABLE category (
    id  INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(50) NOT NULL UNIQUE,
    PRIMARY  KEY  (id)
);


create table post_category (
    id  INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    categoryId INT NOT NULL,
    PRIMARY  KEY  (id),
   	FOREIGN KEY (postId) REFERENCES post(id),
    FOREIGN  KEY (categoryId) REFERENCES category(id)
);




CREATE TABLE tag (
       	id  INT NOT NULL AUTO_INCREMENT,
        title VARCHAR(50) NOT NULL UNIQUE,
        PRIMARY KEY (id)
);


create table post_tag (
    id  INT NOT NULL AUTO_INCREMENT,
    postId INT NOT NULL,
    tagId INT NOT NULL,
    PRIMARY  KEY  (id),
  	FOREIGN KEY (postId)  REFERENCES post (id),
    FOREIGN KEY  (tagId) REFERENCES tag (id)
    
);
