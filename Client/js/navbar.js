function onload(){
    setNavbar();
    setNavbarRoutes();
}

function setNavbar(){
    document.getElementById("sidebar").style.display = "none";
}

function toggleNavbar(){
    let element = document.getElementById("sidebar");
    console.log(element);
    console.log(element.style.display)
    if(element.style.display === "" || element.style.display==="none"){
        document.getElementById("sidebar").style.display = "block";
    }else{
        document.getElementById("sidebar").style.display = "none";
    }

    console.log(document.getElementById("sidebar").style.display);
}

function setNavbarRoutes(){
    setRoute('home', 'home.html');
    setRoute('post','');
    setRoute('contactUs','contact_us.html');
    setRoute('subscribe','');
}

function setRoute(routeName, route){
    var home = document.getElementsByClassName("home");
    for( let i =0; i < home.length; i++){
        console.log(home[i]);
        home[i].href = route;
    }
}