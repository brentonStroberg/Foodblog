drop database if exists foodblog;
create database  foodblog;

use foodblog;





CREATE TABLE profile (
        id  INT  AUTO_INCREMENT,
        username VARCHAR(50) NOT NULL,
        intro VARCHAR(255) NULL,
        avatarUrl varchar(max) null,
        PRIMARY  KEY (id),
        UNIQUE (username)
);






CREATE TABLE post (
    id  INT NOT NULL AUTO_INCREMENT,
    createdBy VARCHAR(50) NOT NULL,
    title VARCHAR(50) NOT NULL,
    slug VARCHAR(100)  ,
    summary VARCHAR(200),
    createdAt timestamp NOT NULL,
    updatedAt timestamp NULL,
    content TEXT NOT NULL,
    banner VARCHAR (512) NULL,
    rating INT NULL,
    PRIMARY  KEY  (id),
    UNIQUE (slug)
);



create TABLE favourite (
    username VARCHAR(50) NOT NULL,
    postId INT,
    PRIMARY KEY (username, postId),
    FOREIGN KEY (postId) REFERENCES post (id)
);




CREATE table comment (
    id  INT NOT NULL AUTO_INCREMENT,
    createdBy VARCHAR(50) NOT NULL,
    postId INT not NULL,
    parentId INT NULL,
    createdAt timestamp NOT NULL,
    updatedAt timestamp NULL,
    content TEXT NOT NULL,
    PRIMARY KEY (id),
    FOREIGN  key (postId) REFERENCES post (id)
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

insert into post (createdBy, title,slug,summary,createdAt,content,banner,rating) values ('Razeen','My First Post','MyFirstPost','This is a simple first post','2022-05-14 09:48:57','content of post','<link>','0');
insert into post (createdBy, title,slug,summary,createdAt,content,banner,rating) values ('Razeen','My Second Post','MySecondPost','This is a simple second post','2022-05-13 09:48:57','content of post','<link>','3');
insert into post (createdBy, title,slug,summary,createdAt,content,banner,rating) values ('Raz','A Post from Raz','APostFromRaz','This is a simple post','2022-05-14 09:48:57','content of post','<link>','0');
insert into favourite (username,postId) values ('Razeen',1);
insert into favourite  (username,postId)  values ('Razeen',3);
