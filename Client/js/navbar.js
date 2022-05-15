function toggleNavbar(){

    let element = document.getElementById("sidebar");
    console.log(element);
    console.log(element.style.display)
    if(element.style.display === "" || element.style.display==="none"){
        document.getElementById("sidebar").style.display = "flex";
    }else{
        document.getElementById("sidebar").style.display = "none";
    }

    console.log(document.getElementById("sidebar").style.display);
}