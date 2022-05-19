function onloadProfile() {
  loadUserPost();
}

function loadUserPost() {
  fetchUserProfile();
  fetchUserPosts();
}

function addUserPost(Posts) {
  Posts.forEach(element => {
    let main = document.getElementById('userposts');
    let article = elementCreate('article', 'section carousel item');
    let sectionCardFlip = elementCreate('section', 'card-flip');
    let sectionCardFlipInner = elementCreate('section', 'card-flip-inner');
    let sectionCardFlipBack = elementCreate('section', "card-flip-back");
    article.append(sectionCardFlip);
    sectionCardFlip.append(sectionCardFlipInner);
    sectionCardFlip.append(sectionCardFlipBack);
    sectionCardFlipInner.append(elementCreate('img', 'card-flip-image', 2, element.banner));
    sectionCardFlipInner.append(elementCreate('h1', 'card-flip-header', 1,element.title));
    sectionCardFlipBack.append(elementCreate('h2', 'card-flip-header', 1, element.title));
    sectionCardFlipBack.append(elementCreate('article', 'card-flip-text', 1, element.createdAt));
    main.append(article);
  })
}

// text 1, src 2, 
function elementCreate(typeOfElement, classList, num, value) {
  let ele = document.createElement(typeOfElement);
  ele = addClass(classList, ele);
  if (num === 1) {
    ele.innerHTML = value;
  } else if (num === 2) {
    ele.src = value;
  }
  return ele;
}


function addClass(str, article) {
  var arr = str.split(' ');
  arr.forEach(element => {
    article.classList.add(element);
  });
  return article;
}




function fetchUserProfile() {
  let userpost_endpoint = `http://${hosts[currentHost]}${endpoints.getProfile}`


  let { endpoint, request } = new ApiCall(userpost_endpoint, 'GET')
    .withCredentials()
    .withQueryParams()
    .withHeader('Content-Type', 'application/json;')
    .withHeader('Accept', 'application/json')
    .withHeader('Authorization', 'Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2IxMmEwYy1kMjU3LTRiNDctOTBmZC1jMzY1M2U1MTExZTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiMDQ0ZTM4NTgtNjg3NC00YjljLWFiM2EtYzdiNzU0MWU3N2RmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI5NjAzNjEsImV4cCI6MTY1MzA0Njc2MSwiaWF0IjoxNjUyOTYwMzYxLCJqdGkiOiIxMzQ0MmU3MS1iMzE0LTRhNDUtODIxMy00MzllMmNiYTBhZmYiLCJ1c2VybmFtZSI6IlJhemVlbiJ9.YrdPUxvfVOBUsMFJWMDUUpOtkHaCieLtBSjJx_IlvfqpzZRzB-6veUUgpXZoed4h0pVJTZoqcrUcdqTpUAAUGv3QDRhWtkB88hv36h_a6h2UFI8Xj7yy_2MDSboaCviAIufAGTpRNnZchnmpy2_ng0FoDwfayi-qzH55n7D4MI1apJgywr7Jf1bSxcys-BelUhFi548YYRskVtFD7qethdbE-WHDtuzQiu9PM4ZW8WI5pdbSIRg6gkyS49ZARov1n0Pxc6ZB8Njbx7GUmxKfm71AdLAqUut5daA430bKdNILduo79iYazFPCd4hq4eCgsQowKgTVGrYF4PdbSPGXHg')

    .build()

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    loadUserInfo(results[0].value);
    return results[0].value;
  })
}

function loadUserInfo(User){
  User = User[0]
  document.getElementById('userprofile').src = User.avatarUrl;
  document.getElementById('name').innerHTML = User.username;
  document.getElementById('userprofileDescription').innerHTML = User.intro;
}


function fetchUserPosts() {
  let userpost_endpoint = `http://${hosts[currentHost]}${endpoints.getUserPosts}`


  let { endpoint, request } = new ApiCall(userpost_endpoint, 'GET')
    .withCredentials()
    .withQueryParams()
    .withHeader('Content-Type', 'application/json;')
    .withHeader('Accept', 'application/json')
    .withHeader('Authorization', 'Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2IxMmEwYy1kMjU3LTRiNDctOTBmZC1jMzY1M2U1MTExZTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiMDQ0ZTM4NTgtNjg3NC00YjljLWFiM2EtYzdiNzU0MWU3N2RmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI5NjAzNjEsImV4cCI6MTY1MzA0Njc2MSwiaWF0IjoxNjUyOTYwMzYxLCJqdGkiOiIxMzQ0MmU3MS1iMzE0LTRhNDUtODIxMy00MzllMmNiYTBhZmYiLCJ1c2VybmFtZSI6IlJhemVlbiJ9.YrdPUxvfVOBUsMFJWMDUUpOtkHaCieLtBSjJx_IlvfqpzZRzB-6veUUgpXZoed4h0pVJTZoqcrUcdqTpUAAUGv3QDRhWtkB88hv36h_a6h2UFI8Xj7yy_2MDSboaCviAIufAGTpRNnZchnmpy2_ng0FoDwfayi-qzH55n7D4MI1apJgywr7Jf1bSxcys-BelUhFi548YYRskVtFD7qethdbE-WHDtuzQiu9PM4ZW8WI5pdbSIRg6gkyS49ZARov1n0Pxc6ZB8Njbx7GUmxKfm71AdLAqUut5daA430bKdNILduo79iYazFPCd4hq4eCgsQowKgTVGrYF4PdbSPGXHg')

    .build()
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    addUserPost(results[0].value);
    return results[0].value;
  })
}


