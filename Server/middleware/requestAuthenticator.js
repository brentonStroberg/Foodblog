const cognitoExpress = require("cognito-express");

require('dotenv').config();

const {
    sendHttpUnauthorised
  } = require('../utils/httpUtils.js');
  

const cognito = new cognitoExpress({
    region: process.env.DEFAULT_REGION,
	cognitoUserPoolId: process.env.COGNITO_USERPOOL_ID,
	tokenUse: "access",
	tokenExpiration: 3600000 
})

const validateRequest = async (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer" ) {
            try {
                const token = req.headers.authorization.split(" ")[1]
                const response = await cognito.validate(token);
                req.user=response;
                next();
            } catch (e) {
                res.locals.user = response;
                return   sendHttpUnauthorised(req,res,{response: {
                    status: 401,
                    data: "Unauthorised"
                }});
            }
    } else {
        return sendHttpUnauthorised(req,res,{response: {
            status: 401,
            data: "access token not found"
        }});
    }

}

module.exports = validateRequest;