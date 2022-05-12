function sendHttpError(req, res, error) {
    const statusCode = error.response ? error.response.status : 500;
    return handleError(req, res, error, statusCode);
}

function sendHttpBadRequest(req, res, errorMessage) {
    return handleError(req, res, errorMessage, 400);
}

function sendHttpNotFound(req, res, errorMessage) {
    return handleError(req, res, errorMessage, 404);
}

function sendHttpNoContent(req, res) {
    return res.status(204).json('No content');
}

function sendHttpSuccess(req, res, responseModel, statusCode) {
    const code = !statusCode ? 200 : statusCode;
    if (responseModel) {
        return res.status(code).json(responseModel);
    } else {
        return res.status(code).send();
    }
}

function handleError(req, res, error, statusCode) {
    const responseCode = !statusCode ? 500 : statusCode;
    let errorMessage = error ? error.response : error;
 
    if (error && error.response && error.response.data) {
        errorMessage = error.response.data;
    }
    const responseModel = {
        errorCode: responseCode.toString(),
        errorMessage: errorMessage
    }
    console.log(responseModel);
    return res.status(responseCode).json(responseModel);
}


module.exports.sendHttpError = sendHttpError;
module.exports.sendHttpBadRequest = sendHttpBadRequest;
module.exports.sendHttpNoContent = sendHttpNoContent;
module.exports.handleError = handleError;

module.exports.sendHttpSuccess = sendHttpSuccess;
module.exports.sendHttpNotFound = sendHttpNotFound;