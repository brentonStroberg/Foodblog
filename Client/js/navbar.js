function setNavbarRoutes(){
    setRoute('home', '');
    setRoute('post','');
    setRoute('contact','');
    setRoute('profile','profile.html');
}

function setRoute(routeName, route){
    var home = document.getElementsByClassName("home");
    for( let i =0; i < home.length; i++){
        home[i].href = route;
    }
}