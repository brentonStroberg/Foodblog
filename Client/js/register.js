





function register() {
    let username = document.getElementById("username").value
    let email = document.getElementById("email").value
    let password =  document.getElementById("pwd").value
    poolData = {
        UserPoolId: _config.cognito.UserPoolId,
        ClientId: _config.cognito.ClientId
    }
    let userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData)
    let attributes = []


    attributes.push(new AmazonCognitoIdentity.CognitoUserAttribute({
        Name:"email",
        Value: email
    }));

    userPool.signUp(username,password,attributes,null,function (err,result)  {
        if(err) {
            // displaye error
            return false;
        }

        return true;
    });
}