var express = require('express');
const { resourceLimits } = require('worker_threads');
var router = express.Router();
var db_client = require('../database.js');


const {
  sendHttpSuccess,
  sendHttpError
} = require('../utils/httpUtils.js');



// EXAMPLE route
router.get('/', function(req, res, next) {
  db_client.query("select * from user",(err, rows) => {
      if (err) {
        console.log("error");
        sendHttpError(req,res,null);
      }
      sendHttpSuccess(req,res,rows);

 
  });
});







module.exports = router;





