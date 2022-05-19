function setNavbarRoutes(){
    setRoute('home', 'home.html');
    setRoute('post','');
    setRoute('contact','contact_us.html');
    setRoute('sub','');
}

function setRoute(routeName, route){
    var home = document.getElementsByClassName("home");
    for( let i =0; i < home.length; i++){
        console.log(home[i]);
        home[i].href = route;
    }
}