const saveUser = () => {
    let userName = document.getElementById('user-name').value
    setCookie('UserName', userName, 43000)
    window.location.href = '/home.html'
}