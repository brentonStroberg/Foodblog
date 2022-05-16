const mysql = require("mysql");
require('dotenv').config();


const db_client = mysql.createConnection({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    password: process.env.DB_PASSWORD,
    database: process.env.DATABASE

  });
  



   
  db_client.config.queryFormat = function (query, values) {
    if (!values) return query;
    return query.replace(/\:(\w+)/g, function (txt, key) {
      if (values.hasOwnProperty(key)) {
        return this.escape(values[key]);
      }
      return txt;
    }.bind(this));
  };


db_client.connect((err) =>{
    if(err){
        console.log(err);
        throw err;
    }else{
        console.log("Database connected ");
    }
});

  module.exports = db_client;
  