populatePost = () => {
  // TODO: read/fetch post info from storage
 // check if post info exist and display error msg
 let postHeader = document.createElement("main");
 if(false){
  document.getElementById('error-display').classList.add("error-display");
  let errorMsg = `<h1 class="error-msg">Opps! Something went wrong on our side.</h1>`;
  postHeader.innerHTML = errorMsg;
  return document.getElementById("error-display").appendChild(postHeader);
 }

  let dishName = `<h1 id="dish-name" class="post-name">title</h1>`;
  let dishDesc = `<p id="dish-desc" class="post-desc">description</p>`;

  postHeader.innerHTML = dishName + dishDesc;

  document.getElementById("post-content").appendChild(postHeader);

  document.getElementById("dish-img").src = "";
};


populateComments = (comments) => {
  let list = document.getElementById("comments-section");

  comments.forEach((item) => {
    let li = document.createElement("li");
    let date = new Date(item.createdAt)

    let comment = `<header class="comment-header" id="comment-header">
    <h3 id="created-by">${item.createdBy}</h3>
      <h5 id="created-at">${date.toLocaleDateString()}</h5>
    </header>
    <p id="content">${item.content}</p>`;

    li.innerHTML = comment;
    list.appendChild(li);
  });
};

loadPost = () => {
  fetchComment();
  populatePost();
};

postComment = () => {
  let content = document.forms[0][0].value;
  //TODO: get logged in username
  let comment = {
    postId: 1,
    createdBy: 'This guy',
    createdAt: new Date(),
    content: content,
  };

  let li = document.createElement("li");

  let commentDisplay = `<header class="comment-header" id="comment-header">
  <h3 id="created-by">${comment.createdBy}</h3>
    <h5 id="created-at">${comment.createdAt.toLocaleDateString()}</h5>
  </header>
  <p id="content">${comment.content}</p>`;

  li.innerHTML = commentDisplay;
  let commentSection = document.getElementById("comments-section");
  commentSection.appendChild(li);
  postRemoteComment()
  document.getElementById("comment-form").reset();
};

fetchComment = () => {
  // TODO: fetch/read post id and token from storage
  let comments_endpoint = `http://${hosts[currentHost]}${endpoints.getComments}`;
  // let accessToken = getCookie('accessToken');
  // console.log(accessToken)
  let { endpoint, request } = new ApiCall(comments_endpoint, "GET")
    .withCredentials()
    .withQueryParams({ id: 1 })
    .withHeader("Authorization", `Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZWZhMjhlOS02M2QwLTRiNTYtYWUxZS1lYzU5NWNjOTFlMWIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY1Mjk1OTc0NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfMVpIZ3dzNWhzIiwiZXhwIjoxNjUzMDQ2MTQ0LCJpYXQiOjE2NTI5NTk3NDQsInZlcnNpb24iOjIsImp0aSI6IjRlMzI5MmQxLWRkNGQtNDljZS05YTMyLWM1MWEwZWFiMGFmNiIsImNsaWVudF9pZCI6IjNyMnBzZW41MmRna2luYmp1dm5vczNqdm9lIiwidXNlcm5hbWUiOiJ0YXJzaGVuIn0.fehTt1r0BeXxVTyZpW0NWxCuvz5P_mYAoDyXtl8tC4Nr5gREfwdfvpZSY9d48QI3EsEPMQW5mLdcthVhlI7thsaHG8HKe57Ebw593UWPTvL2kxfTOzalecunKh07WG7L2ySCADTYXyZttL5KrMr9hMQQASs6W-eeKhiWpip1XWbVDR1AZvQrk4XLakVupPelWXa4H5ENcd6efiN5GUbrXM-NSk7ncSIJjRNguGUVFVCJ37fsifqQ3j9clegBRD-aSXYTGuH95pKhaS4o2pa8zwkl8NM3Gy5b-sUR8D0GJ0JwITisr5ZWEq3IyHeLl1hRFSpsxbC2Sjrsxj1G48MRdw`)
    .withHeader("Content-Type", "application/json")
    .build();

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    let comments = results[0].value;

    populateComments(comments);
    console.log(results[0].value);
  });
};


postRemoteComment = () => {
  // TODO: fetch/read post id and token from storage
  let comments_endpoint = `http://${hosts[currentHost]}${endpoints.postComment}`;
  let comment = {
    postId: 1,
    createdAt: new Date().toISOString(),
    content: 'yass ow yes'

  }
  console.log(JSON.stringify(comment))
  let { endpoint, request } = new ApiCall(comments_endpoint, "POST")
    .withCredentials()
    .withBody(JSON.stringify(comment))
    .withHeader("Authorization", `Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI2ZWZhMjhlOS02M2QwLTRiNTYtYWUxZS1lYzU5NWNjOTFlMWIiLCJ0b2tlbl91c2UiOiJhY2Nlc3MiLCJzY29wZSI6ImF3cy5jb2duaXRvLnNpZ25pbi51c2VyLmFkbWluIHBob25lIG9wZW5pZCBlbWFpbCIsImF1dGhfdGltZSI6MTY1Mjk1OTc0NCwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfMVpIZ3dzNWhzIiwiZXhwIjoxNjUzMDQ2MTQ0LCJpYXQiOjE2NTI5NTk3NDQsInZlcnNpb24iOjIsImp0aSI6IjRlMzI5MmQxLWRkNGQtNDljZS05YTMyLWM1MWEwZWFiMGFmNiIsImNsaWVudF9pZCI6IjNyMnBzZW41MmRna2luYmp1dm5vczNqdm9lIiwidXNlcm5hbWUiOiJ0YXJzaGVuIn0.fehTt1r0BeXxVTyZpW0NWxCuvz5P_mYAoDyXtl8tC4Nr5gREfwdfvpZSY9d48QI3EsEPMQW5mLdcthVhlI7thsaHG8HKe57Ebw593UWPTvL2kxfTOzalecunKh07WG7L2ySCADTYXyZttL5KrMr9hMQQASs6W-eeKhiWpip1XWbVDR1AZvQrk4XLakVupPelWXa4H5ENcd6efiN5GUbrXM-NSk7ncSIJjRNguGUVFVCJ37fsifqQ3j9clegBRD-aSXYTGuH95pKhaS4o2pa8zwkl8NM3Gy5b-sUR8D0GJ0JwITisr5ZWEq3IyHeLl1hRFSpsxbC2Sjrsxj1G48MRdw`)
    .withHeader("Content-Type", "application/json")
    .build();

  callAPI(endpoint, request).then((results) => {
    // let comments = results[0].value;

    console.log(results);
  });
};