import * as ACI from AmazonCognitoIdentity;
import * as _config from '../js/config.js'

function Sign_in() {
    console.log('submitted');

    var authentication = {
        username : document.getElementById('email_textbox'),
        password : document.getElementById('email_textbox'),
    }

    authenticationDetails = new ACI.AuthenticationDetails(authentication);

    var poolData = {
        userPoolId : _config.cognito.UserPoolId,
        clientId : _config.cognito.clientId,
    }

    var userPool = new ACI.CognitoUserPool(poolData);
    var userData = {
        username : document.getElementById('email_textbox'),
        Pool : userPool,
    }

    var cognitoUser = new ACI.cognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
        ibSuccess: function (result) {
            var accessToken = result.getAccessToken().getJwtToken();
            console.log(accesssToken);
        },

        onFailure: function (err) {
            alert(err.message || JSON.stringify(err));
        }
    });
}

function Forgot_Password() {
    console.log('forgot password');
}

function Create_Account() {
    console.log('create account');
}