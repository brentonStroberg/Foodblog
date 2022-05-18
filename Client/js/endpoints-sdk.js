


/*

 EXAMPLE USAGE

let token = 'eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2IxMmEwYy1kMjU3LTRiNDctOTBmZC1jMzY1M2U1MTExZTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiZGFhOTg3NDgtMTZjYS00ZTU5LWFkM2MtYmZlMGI3ZmFjMzMxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI4NzMxNDAsImV4cCI6MTY1Mjk1OTU0MCwiaWF0IjoxNjUyODczMTQwLCJqdGkiOiJkMjQ2YmQxMi1iZGZiLTQ3NWItODA2OS0zNWQ3NzA3YmYyMmYiLCJ1c2VybmFtZSI6IlJhemVlbiJ9.CV0cy57Q7J0maJNhl7USmwF4sur2Fs1Nwqu7M4oW8uLj93ndFfdYpLgQCeRZ0yK55rdX2Jfa7SET8VAQqrpehBI0GoMBS0uhk-JePC1Q7LEhB49H5ByKovv3AtP1yywdZuzgPgYnQebw8mSDM3VyZWjLQgWZATe_MXedP3i1Vp4-wEiaC2uvOyJ9uPwnQv7fbUCmpmW1TJO17mqgZNDhQ_TRo3oG3uyk1Un6uJuZETEbQs2ZKZMO-Kgyt15jkMrOLKkxKSzDuExcByi2u3z-vTmuMjRCQB7T97Es6P2I3kcXEsKhcD3l7cbNY6LOlrDzQWc_Z-AiI2AILJiIzHjCYw';
let favourites_endpoint=`http://${hosts[currentHost]}${endpoints.getComments}`


let {endpoint, request} = new ApiCall(favourites_endpoint,'GET')
.withCredentials()        
.withQueryParams({id: 1})
.withHeader('Authorization', `Bearer ${token}`)
.withHeader('Content-Type', 'application/json')
.build();


Promise.allSettled([callAPI(endpoint,request)])
.then(results => {
    do whaterver you want with the results
    
})

*/

let currentHost = 'remote';
let hosts = {
    localhost: 'localhost:8080',
    remote: '3.226.187.18:8080'
};

let endpoints = {
    getFavourites : '/api/favourite',
    addToFavourites: '/api/favourite',  // specify id of the post as query param id=<insert id>
    removeFromFavourites: '/api/favourite',  // specify id of the post as query param id=<insert id>    
    getComments : '/api/comment',      // specify query param id=<insert id here>
    createPost : '/api/post/create',
    deletePost : '/api/post/delete',  // specify id of the post as query param id=<insert id>
    getPost : '/api/post',  // specify id of the post as query param id=<insert id>
    createProfile : '/api/user/profile',
    deleteProfile: '/api/user/profile',
    updateIntro: '/user/intro',  // specify intro in body,
    updateAvatar: '/user/avatar'  // specify file
    
};



class ApiCall {

    request = {
        
    };

    constructor(endpoint, method) {
        this.endpoint = endpoint;
        this.request.method = method;
    }

    withQueryParams(params) {
        this.endpoint = this.endpoint + '?' +  new URLSearchParams(params).toString();
        return this;
    }

    withCredentials() {
        this.request.withCredentials=true;
        this.request.credentials='include';
        return this;
    }

    withHeader(requestHeader, value) {
        this.request.headers = this.request.headers || {}
        this.request.headers[requestHeader] = value;
        return this;
    }

    withBody(body) {
        this.request.body = body;
        return this;
    }

    build() {
        return {endpoint: this.endpoint, request: this.request};
    }

}

const   callAPI = (endpoint,request) => {
    return new Promise((resolve,reject) => {
        fetch(endpoint,request)
        .then(resp => resp.json())
        .then(json_data =>{ 
            resolve(json_data);
        })
        .catch(err => {reject(err)});
    });
}
