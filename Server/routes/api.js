var express = require('express');
const { resourceLimits } = require('worker_threads');

var validateRequest = require('../middleware/requestAuthenticator');
var db_client = require('../database.js');



var router = express.Router();
router.use(validateRequest);




const {
  sendHttpSuccess,
  sendHttpError,
  sendHttpResourceCreated,
  sendHttpBadRequest
} = require('../utils/httpUtils.js');


const validateRequestBody = require('../utils/requestBodyValidator');
const { body } = require('express-validator');
/************************************************
  FAVOURITE ROUTES & CRUD OPS
************************************************/


router.get('/favourite', function(req, res, next) {
  favourite = {
    username : req.user.username
  }
  getUserFavourites(favourite)
  .then((results) => {
    return sendHttpSuccess(req,res,results);
  }).catch((err) => {
    return sendHttpError(req,res,err);
  })
});


router.post('/favourite',validateRequestBody([body('postId').isNumeric()]),function (req,res,next) {

    favourite = {
        postId: req.body.postId,
        username: req.user.username
    } 
  
    addFavourite(favourite)
    .then(() => {
        return sendHttpResourceCreated(req,res);
    }).catch(err => {
      return sendHttpError(req,res,err);
    });
  


});


router.delete('/favourite',validateRequestBody([body('postId').isNumeric()]), function (req,res,next) {

    favourite = {
      postId: req.body.postId,
      username: req.user.username
  } 
    removeFavourite(favourite)
    .then(   () => {
        return sendHttpSuccess(req,res,null);
      }).catch(err => {
      return sendHttpError(req,res,err);
    });
  

});

/* crud for favourites*/

const getUserFavourites = async (username) => {
  return new Promise((resolve, reject) => {
      let query = `select p.id, p.createdBy, p.title, p.slug, p.summary, p.createdAt, p.updatedAt, p.content, p.banner,p.rating  from post p 
      Inner join favourite f  on f.username = :username  and p.id = f.postId`
      db_client.query(query, favourite,(err,resultSet) => {
          if (err) {
            err.response = "Failed to get user favourites"
            reject(err);
          } else {
              resolve(resultSet);
          }
      });
  });
};


const addFavourite = async (favourite) => {
  return new Promise((resolve,reject) => {
    let query = "INSERT INTO favourite SET username = :username, postId = :postId ON DUPLICATE KEY UPDATE username = :username , postId = :postId;"
    db_client.query(query, favourite,(err,resultSet) => {
        if (err) {
          err.response = "Failed to add post to user favourites"
          reject(err);
        } else {
           return resolve(resultSet);
        }
    });
  });
}


const removeFavourite = async (favourite) => {

  return new Promise((resolve,reject) => {
    let query = "DELETE FROM favourite WHERE username= :username AND postId = :postId;"
    db_client.query(query, favourite,(err,resultSet) => {
        if (err) {
          console.log(err);
            err.response = "Failed to delete favourite"
            reject(err);
        } else {
           return resolve(resultSet);
        }
    });
  });
}















module.exports = router;





