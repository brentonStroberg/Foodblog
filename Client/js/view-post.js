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
    createdBy: "",
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
  document.getElementById("comment-form").reset();
};

fetchComment = () => {
  // TODO: fetch/read post id and token from storage
  let comments_endpoint = `http://${hosts[currentHost]}${endpoints.getComments}`;
  let accessToken = getCookie('accessToken');
  console.log(accessToken)
  let { endpoint, request } = new ApiCall(comments_endpoint, "GET")
    .withCredentials()
    .withQueryParams({ id: 1 })
    .withHeader("Authorization", `Bearer ${accessToken}`)
    .withHeader("Content-Type", "application/json")
    .build();

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    let comments = results[0].value;

    populateComments(comments);
    console.log(results[0].value);
  });
};