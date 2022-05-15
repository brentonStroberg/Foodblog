

function tregister() {

    let name =document.getElementById('name_textbox').value;
    let email =document.getElementById('email_textbox').value;
    let username =document.getElementById('username_textbox').value;
    let password =document.getElementById('password_textbox').value;
    let passwordConfirm =document.getElementById('re-enter_password_textbox').value;
    let poolData;

    if (password !== passwordConfirm) {
        alert('Passwords do not match');
        throw "Passwords do not match";
    }

    poolData = {
        userPoolId : _config.cognito.userPoolId,
        clientId : _config.cognito.clientId
    };

    let userPool = new ACI.CognitoUserPool (poolData);

    let attributeList = []

    let dataEmail = {
        name : 'email',
        value : email
    };

    let dataPersonalName = {
        Name : 'name',
        Value : name
    }

    let attributeEmail = new ACI.CognitoUserAttribute(dataEmail);
    let attributePersonalName = new ACI.CognitoUserAttribute(dataPersonalName);

    attributeList.push(attributeEmail);
    attributeList.push(attributePersonalName);

    userPool.signUp(username, password, attributeList, null, function (err, result) {
       if (err) {
           alert(err.message || JSON.stringify(err));
           return;
       }
       cognitoUser = result.user;
       console.log('username is ' + cognitoUser.getUsername());

       //add some UI confirmation

       let registerfields_list = document.getElementById('register_form');
       for (let i=0; i < registerfields_list.length; i++) {
           registerfields_list[i].type = 'hidden';
       }
    });
}