function load_overlay() {

    if (getCookie('cookie_consent') !== null) {
        console.log('cookie_consent cookie exists');
        console.log(getCookie('cookie_consent'));
        return;
    }
    console.log('loading overlay');

    consent_overlay = document.getElementById('cookie_overlay');

    consent_overlay.style.bottom = '0%';

}

function close_cookie_consent() {
    console.log('closed cookie consent');
    
    setCookie('cookie_consent', true, 1)
    consent_overlay = document.getElementById('cookie_overlay');

    consent_overlay.style.bottom = '-50%';
}

function setCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}
function eraseCookie(name) {   
    document.cookie = name +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}