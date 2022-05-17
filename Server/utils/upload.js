require('dotenv').config();
const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
  


const s3Config = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    Bucket: process.env.AWS_BUCKET_NAME
  });


const mimefilter = (req,file,cb) => {
    file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ? cb(null,true) : cb(new Error("Invalid file type, only JPEG and PNG is allowed!"),false); 
}

const multerS3Config = multerS3({
    s3: s3Config,
    bucket: process.env.AWS_BUCKET_NAME,
    metadata: function (req,file,cb) {
        cb(null,{fieldName: file.fieldname});
    },
    key: function (req, file,cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage: multerS3Config,
    fileFilter: mimefilter,
    limits: {
        fileSize: 1024 * 1024 * 5 // we are allowing only 5 MB files
    }
});




module.exports = fileUpload;