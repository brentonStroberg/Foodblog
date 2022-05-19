function reset_password() {
    console.log('forgot password');
}
function switch_to_OTP() {
    let registerfields_list = document.getElementById('register_form');
    registerfields_list.style.display = 'none'
    //for (let i=0; i < registerfields_list.length; i++) {
    //   registerfields_list[i].style.display = 'none';
    //}
    document.getElementById('OTP_section').style.display = 'block';
}

function switch_sign_in(value){

    switch_from_OTP();

    document.getElementById('login_page').style.display = value ? 'block' : 'none';
    document.getElementById('btn_switch_signin').className = value ? 'sign_in_switch inset_shadow_button sign_in_switch_right' : 'sign_in_switch sign_in_switch_right   ';
    document.getElementById('register_page').style.display = value ? 'none' : 'block';
    document.getElementById('btn_switch_register').className = value ? 'sign_in_switch sign_in_switch_right' : 'sign_in_switch inset_shadow_button sign_in_switch_right';
}

function switch_from_OTP(){
    let registerfields_list = document.getElementById('register_form');
    registerfields_list.style.display = 'block'
    //for (let i=0; i < registerfields_list.length; i++) {
    //   registerfields_list[i].style.display = 'none';
    //}
    document.getElementById('OTP_section').style.display = 'none';
}