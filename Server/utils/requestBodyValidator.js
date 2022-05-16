const {  validationResult } = require('express-validator');
const { sendHttpBadRequest } = require('./httpUtils');

const validateRequestBody = validations => {
    return async (req,res,next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        const errors = validationResult(req);
        return errors.isEmpty() ? next() : sendHttpBadRequest(req,res,{response : errors.array()});
    }
}

module.exports = validateRequestBody;