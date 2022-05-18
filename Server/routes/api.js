var express = require('express');
var validateRequest = require('../middleware/requestAuthenticator');
var db_client = require('../database.js');

const fileUploader = require('../middleware/fileUpload');

var router = express.Router();
router.use(validateRequest);




const {
  sendHttpSuccess,
  sendHttpError,
  sendHttpResourceCreated,
  sendHttpBadRequest
} = require('../utils/httpUtils.js');


const validateRequestBody = require('../utils/requestBodyValidator');
const { body, check ,query} = require('express-validator');
/************************************************
  FAVOURITE ROUTES & CRUD OPS
************************************************/

// get iser favourites
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

// add post to favourite
router.post('/favourite',validateRequestBody([query('id').isNumeric()]),function (req,res,next) {

    favourite = {
        postId: req.query.id,
        username: req.user.username
    } 
  
    addFavourite(favourite)
    .then(() => {
        return sendHttpResourceCreated(req,res);
    }).catch(err => {
      return sendHttpError(req,res,err);
    });
  


});

// delete user favourite
router.delete('/favourite',validateRequestBody([query('id').isNumeric()]), function (req,res,next) {

    favourite = {
      postId: req.query.id,
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
      let query = `select p.id, p.createdBy, p.title, p.slug, p.createdAt, p.updatedAt, p.content, p.banner,p.rating  from post p 
      Inner join favourite f  on f.username = :username  and p.id = f.postId;`
      db_client.query(query, username,(err,resultSet) => {
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









/************************************************
  USER ROUTES & CRUD OPS
************************************************/


// create profile
router.post('/user/profile',validateRequestBody([body('username').isString().isLength({min:9,max:99}),body('intro').isString().isLength({max:255}), body('avatarUrl').isURL().isLength({max : 50})]), function(req,res,next) {
    
  profile = {
    username: req.body.username,
    intro: req.body.intro,
    avatarUrl: req.body.avatarUrl
  }

  createProfile(profile)
  .then(results => {
    sendHttpSuccess(req,res,null);
  })
  .catch(err => {
    sendHttpError(req,res,err);
  });
})


const createProfile = async (profile) => {
return new Promise((resolve,reject) => {
    let query = "INSERT INTO profile SET username = :username, intro = :intro, avatarUrl = :avatarUrl;"
    db_client.query(query
    ,profile, 
    function (err,resultSet) {
      if (err) {
          err.response = "Failed to create user profile"
          reject(err);
      } else {
          resolve(resultSet);
      }
    });
  
});
}


// get profile
router.get('/user/profile', function(req,res,next) {
  username = {
    username : req.user.username
  }
  getProfile(username)
  .then(resultSet => {
    return sendHttpSuccess(req,res,resultSet);
  })
  .catch(err => {
    sendHttpError(req,res,err);
  });

})


const getProfile = async (username) => {
return new Promise((resolve,reject) => {

  let query = "SELECT  p.username, p.intro, p.avatarUrl from profile p where username = :username"
  db_client.query(query
    ,username, 
    function (err,resultSet) {
      if (err) {
          err.response = "Failed to get user profile"
          reject(err);
      } else {
          resolve(resultSet);
      }
    });

});
}

// update intro
router.put('/user/intro', validateRequestBody([body('intro').isString().isLength({max:255})]), function(req,res,next) {
intro = {
  intro: req.body.intro,
  username: req.user.username
}
updateIntro(intro)
.then(resultSet => {
  return sendHttpSuccess(req,res,null);
})
.catch(err => {
  return sendHttpError(req,res,err);
});
})



const updateIntro = async (intro) => {
return new Promise((resolve,reject) => {
    let query = "UPDATE profile SET intro = :intro WHERE username = :username"
    db_client.query(query
      ,intro, 
      function (err,resultSet) {
        if (err) {
            err.response = "Failed to update intro"
            reject(err);
        } else {
            resolve(resultSet);
        }
      });
});
}




// upload new avatar
router.put('/user/avatar',fileUploader.fileUploader, function(req, res ,next)  {
  if (!req.file) {
    return sendHttpError(req,res,{response:"Failed to upload avatar"});
  } else {
    url = {
        avatarUrl: req.file.location,
        username: req.user.username
    }
    updateAvatarUrl(url)
    .then(resultSet => {
        return sendHttpSuccess(req,res,null);
    }).catch(err => {
      return sendHttpError(req,res,err);
    })
  }
});


const updateAvatarUrl = async (url) => {
  return new Promise((resolve,reject) => {
      let query = "UPDATE profile SET avatarUrl = :avatarUrl WHERE username = :username;";
     let x = db_client.query(query
        ,url, 
        function (err,resultSet) {
          if (err) {
              err.response = "Failed to upload avatar"
              reject(err);
          } else {
              resolve(resultSet);
          }
        });  
      });
}







/************************************************
  POST ROUTES & CRUD OPS
************************************************/


// create post
router.post('/post',fileUploader.fileUploader, validateRequestBody(
  [
    body('title').isString().isLength({max:50}), 
    body('createdAt').isISO8601(),
    body('content').isString(),
    body('category').isString().isLength({max:50})
    
  ]
  
  
  ), function(req, res ,next)  {
  if (!req.file) {
    return sendHttpError(req,res,{response:"Failed to upload banner image"});
  } else {


    post = {
        banner: req.file.location,
        username: req.user.username,
        title: req.body.title,
        createdAt: req.body.createdAt,
        content: req.body.content,
        category: req.body.category
    }



    createPost(post)
    .then(resultSet => {
        return sendHttpSuccess(req,res,null);
    }).catch(err => {
      return sendHttpError(req,res,err);
    })
  }
});






const createPost = async (post) => {
  return new Promise((resolve,reject) => {

    db_client.beginTransaction(function(err) {

        if (err) {
          err.response="Failed to create post"
          reject(err)
        }

        let postQuery = "INSERT INTO post SET createdBy = :username, title = :title, createdAt = :createdAt, content = :content, banner = :banner;"


        db_client.query(postQuery, post, function(err,resultSet1) {
            if(err) {
              db_client.rollback(function() {
                err.response="Failed to create post"
                reject(err);
              })
            }  
           
            let categoryQuery = "INSERT   INTO category SET title = :category"

            db_client.query(categoryQuery, post, function(err, resultSet2)  {
                if(err) {
                  db_client.rollback(function() {
                    err.response="Failed to create  category"
                    reject(err);
                  })
                }

          
                let postCategory = {
                    postId: resultSet1.insertId,
                    categoryId: resultSet2.insertId
                  }
                  
              

            
                let postCategoryQuery = "INSERT INTO post_category SET postId = :postId  , categoryId = :categoryId"

                db_client.query(postCategoryQuery,postCategory, function(err,resultSet3) {
                  if(err) {
                    console.log(err);
                    db_client.rollback(function() {
                      err.response="Failed to create post category"
                      reject(err);
                    })

                  }

                  db_client.commit(function(err) {
                    if (err) {
                      db_client.rollback(function() {
                        err.response="Failed to create post"
                        reject(err);
                      })

                
                    }

                    resolve();
                  })
                })

            })
          

        })

    })

  });
} 


// delete post by id
router.delete('/post',validateRequestBody([query('id').isNumeric()]) ,function(req,res,next){
    id = {
      id: req.query.id
    }
  deletePost(id)
  .then(resultSet => {
      return sendHttpSuccess(req,res,null);
  }).catch(err => {
    return sendHttpError(req,res,err);
  })
})


const deletePost = async (id) => {
  return new Promise((resolve,reject) => {
      let query = "DELETE FROM post WHERE id = :id;"
      db_client.query(query,id, function(err,resultSet) {
        if(err) {
          err.response = "Failed to delete post"
          reject(err)
        } else {
          resolve("Post deleted");
        }
      })
  });
}



// get post 
router.get('/post',validateRequestBody([query('id').isNumeric()]),function(req,res,next){
      id = {
        id: req.query.id
      }
    getPost(id)
    .then(resultSet => {
        return sendHttpSuccess(req,res,resultSet);
    }).catch(err => {
      return sendHttpError(req,res,err);
    })
})


const getPost = async(id) => {
  return new Promise((resolve,reject) => {

      let query = `SELECT p.id, p.createdBy, p.title,p.slug,p.createdAt, p.updatedAt,p.content,p.banner,p.rating FROM post p WHERE p.id = :id;`

        db_client.query(query,id,function(err,resultSet) {

            if(err){
              console.log(err)
              err.response="Failed to get post";
              reject(err);

            } else {
              resolve(resultSet);
            }

        })



  })
}





// get post  comments
router.get('/comment',validateRequestBody([query('id').isNumeric()]),function(req,res,next){
  id = {
    id: req.query.id
  }
getComments(id)
.then(resultSet => {
    return sendHttpSuccess(req,res,resultSet);
}).catch(err => {
  return sendHttpError(req,res,err);
})
})


const getComments = async(id) => {
return new Promise((resolve,reject) => {

  let query = `SELECT c.id, c.createdBy, c.postId,c.parentId,c.createdAt, c.updatedAt,c.content FROM comment  c WHERE c.postId = :id;`

    db_client.query(query,id,function(err,resultSet) {

        if(err){
          console.log(err)
          err.response="Failed to get comments";
          reject(err);

        } else {
          resolve(resultSet);
        }

    })



})
}



module.exports = router;





