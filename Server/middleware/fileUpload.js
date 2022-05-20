
const upload = require('../utils/upload');
const { sendHttpBadRequest } = require('../utils/httpUtils');

exports.fileUploader = (req, res,next) => {
    upload.single('file')(req,res,function (err) {
        if (err) {
            return sendHttpBadRequest(req,res,{response: err.message});
        } else {
            next();
        }
    })
}