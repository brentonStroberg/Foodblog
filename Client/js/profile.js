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
    .withHeader('Authorization', 'Bearer ${accessToken}')

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
    .withHeader('Authorization', 'Bearer ${accessToken}')


    .build()
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    addUserPost(results[0].value);
    return results[0].value;
  })
}