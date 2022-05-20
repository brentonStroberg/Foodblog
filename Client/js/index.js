const saveUser = () => {
    let userName = document.getElementById('user-name').value
    // setCookie('UserName', userName, 900000000000)
    localStorage.setItem("UserName", userName.toString());
    window.location.href = '/home.html'
    document.getElementById("user-name-form").reset();
}