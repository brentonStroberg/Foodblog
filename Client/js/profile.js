function onloadProfile() {
  loadUserPost();
}

function loadUserPost() {
  console.log(fetchUserPosts());
  addUserPost()
  addUserPost()
  addUserPost()
  addUserPost()
  addUserPost()
  addUserPost()
  addUserPost()
  addUserPost()
}

function addUserPost() {
  let carousel = document.getElementById('userposts');
  let article = elementCreate('article', 'section carousel item');
  let sectionCardFlip = elementCreate('section', 'card-flip');
  let sectionCardFlipInner = elementCreate('section', 'card-flip-inner');
  let sectionCardFlipBack = elementCreate('section', "card-flip-back");
  article.append(sectionCardFlip);
  sectionCardFlip.append(sectionCardFlipInner);
  sectionCardFlip.append(sectionCardFlipBack);
  sectionCardFlipInner.append(elementCreate('img', 'card-flip-image'));
  sectionCardFlipInner.append(elementCreate('h1', 'card-flip-header'));
  sectionCardFlipBack.append(elementCreate('h2', 'card-flip-header'));
  sectionCardFlipBack.append(elementCreate('article', 'card-flip-text'));
  carousel.append(article);
}

function elementCreate(typeOfElement, classList) {
  let ele = document.createElement(typeOfElement);
  ele = addClass(classList, ele);
  return ele;
}


function addClass(str, article) {
  var arr = str.split(' ');
  arr.forEach(element => {
    article.classList.add(element);
  });
  return article;
}

function fetchUserPosts() {
  let userpost_endpoint = `http://${hosts[currentHost]}${endpoints.getUserPosts}`


  let { endpoint, request } = new ApiCall(userpost_endpoint, 'GET')
    .withCredentials()
    .withHeader('Authorization', `Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZWZhMjhlOS02M2QwLTRiNTYtYWUxZS1lYzU5NWNjOTFlMWIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY1Mjk2NzMxOCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfMVpIZ3dzNWhzIiwiZXhwIjoxNjUzMDUzNzE4LCJpYXQiOjE2NTI5NjczMTgsInZlcnNpb24iOjIsImp0aSI6IjAyM2NhZmNjLWQwYzQtNGI2OS1iMDUwLWIwY2RjYWVjZWY1YiIsImNsaWVudF9pZCI6IjNyMnBzZW41MmRna2luYmp1dm5vczNqdm9lIiwidXNlcm5hbWUiOiJ0YXJzaGVuIn0.yRt7phsGVYttlRbMv52W2bKUMILSp9BTkwT1wzoVb2wbMUG9nrTd71GhL_CRbv2icAzcR7cDj4cB6J1QVMpus-_vNNGQ6KF4b6faeQXHsExXl8lzaVzKuxZbdyCvIs3zq20YIxGjHrde9vV8Ecbn8E56Xr5smPRYA6KctS5CJjt5qnUtmv75oRnAL4b3a15LfGH7EW18EFdeaSdP7Bv21BE5lSXWmntkaxkA--PskH3s8YV-FYW6pXQUJkDVxOVmWdjFhc8q-UGCZEe0eMD-kTlw4yRXU7Lb1UPzGx5B41uLUZpNDHXQkwkXotGLroHuqTppyLZ-BNiQLnOZzXFfpg`)
    .withHeader('Content-Type', 'application/json')
    .build()

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    console.log(results[0].value)
    return results[0].value;
  })
}


