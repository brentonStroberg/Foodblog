function setNavbarRoutes(){
    setRoute('home', '');
    setRoute('post','');
    setRoute('contact','');
    setRoute('sub','');
}

function setRoute(routeName, route){
    var home = document.getElementsByClassName("home");
    for( let i =0; i < home.length; i++){
        console.log(home[i]);
        home[i].href = route;
    }
}