const mysql = require('mysql');
const config = require('./../config/defalut');
const connection = mysql.createConnection(config);
connection.connect();

const query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    connection.query(sql, values, function(err, rows) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  })
}

// 建表
let users =
  `create table if not exists USERS(
     id INT NOT NULL AUTO_INCREMENT,
     username VARCHAR(100) NOT NULL,
     password VARCHAR(100) NOT NULL,
     createAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
     updateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     PRIMARY KEY ( id )
    );`

let articles =
  `create table if not exists ARTICLES(
     id INT NOT NULL AUTO_INCREMENT,
     title TEXT(0) NOT NULL,
     content TEXT(0) NOT NULL,
     classify VARCHAR(50) NOT NULL,
     image_url VARCHAR(100) NULL,
     tags VARCHAR(100) NOT NULL,
     createAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
     updateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     PRIMARY KEY ( id )
    );`

let about_blog =
  `create table if not exists ABOUT_BLOG(
     id INT NOT NULL AUTO_INCREMENT,
     title TEXT(0) NOT NULL,
     classify VARCHAR(50) NOT NULL,
     content TEXT(0) NOT NULL,
     tags VARCHAR(100) NOT NULL,
     createAt datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
     updateAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
     PRIMARY KEY ( id )
  );`

let createTable = function( sql ) {
  return query( sql, [] );
}

// 建表
createTable(users);
createTable(articles);
createTable(about_blog);

module.exports = query;