
const makePost = () => {

let token ="eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJmYjE0NjAwMy1lMGIwLTRhZjYtOGIzMC1jOWUzMWQ2NDllMTUiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiYWYxNmVlOTAtNTMzZS00MjdmLWJkN2QtNTMwOTYwMGFhZGI0IiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI5NzYzNDUsImV4cCI6MTY1MzA2Mjc0NSwiaWF0IjoxNjUyOTc2MzQ1LCJqdGkiOiJhZTM2NmVjNC1lMDY3LTRhMjMtYTA1NS1mMmVkOGE0ODViNmUiLCJ1c2VybmFtZSI6InBoMW5kMSJ9.vpRiM-MaJplEI8mMfkDyReUk4LJf7E-8PZnQASXAjjg3mIykZ4TGONtsNnFTCnH_tKeJ3dcnXISqRUZyReeXN1MaSn_BMMoYfAUhr7xbOjLuWZMFqAlv8ioVfSkKjzmYqo3BJLTwAqJ8fYndbD80VMDU_ZsSclNHYF9KHgHmxK_x14YUElrnJ9_8hNxL6krbua5Fzwftd5cdHl-z1225UzvQp3utaYaX5BnEqZwk5ElIdWwB1Qat_rxd5K15wHXLHTQ68MCK9g6yfdbb2jq3VoUqxxssS1wkkm-XrOQj0zA_Dwy_ODSLtOcxQYEd8zFr13HHYgkUFYxi-6VSfAztMg"
let data = new FormData();
let file=document.getElementById('image-input')
let title = document.getElementById('title-input').value
let content = document.getElementById('description-input').value
let category = document.getElementById('categories-input').value

data.append("file", file.files[0]);
data.append("title", title);
data.append("content", content);
data.append('category',category);
data.append('createdAt',new Date().toISOString());



let { endpoint, request } = new ApiCall('http://3.226.187.18:8080/api/post', 'POST')
  .withCredentials()
  .withHeader("Authorization", `Bearer ${token}`)
  .withBody(data)
  .build();

    Promise.allSettled([callAPI(endpoint,request)])
    .then(results => {
          alert('results',results)
    }).catch(err => alert(err));

    document.getElementById("form-createPost").reset();
      
}
