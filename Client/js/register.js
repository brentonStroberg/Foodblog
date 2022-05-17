function switch_to_OTP() {
    console.log('switching');
    let registerfields_list = document.getElementById('register_form');
    registerfields_list.style.display = 'none'
    //for (let i=0; i < registerfields_list.length; i++) {
    //   registerfields_list[i].style.display = 'none';
    //}
    document.getElementById('OTP_section').style.display = 'block';
}