function load_overlay() {
    console.log('loading overlay');

    consent_overlay = document.getElementById('cookie_overlay');

    consent_overlay.style.bottom = '0%';

}

function close_cookie_consent() {
    console.log('closed cookie consent');

    consent_overlay = document.getElementById('cookie_overlay');

    console.log(consent_overlay);
    consent_overlay.style.bottom = '-50%';
}