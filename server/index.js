const express = require("express");
const app = express();
const mysql = require("mysql");
require('dotenv').config();

const db = mysql.createConnection({
    host: process.env.dbhost, 
    user: process.env.dbuser, 
    password: process.env.dbpassword,
    database: process.env.dbdatabase
    
});
console.log(db);

db.connect((err) =>{
    if(err){
        console.log(err);
        throw err;
    }else{
        console.log("Database connected ");
    }
});


app.get("/login", (req, res) => {
    db.query(sql, (err) =>{

    })
});

app.listen(process.env.port, () => {
    console.log("Server started on port 3000");  
});