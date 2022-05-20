let userName;
let post;

loadPost = () => {
  userName = localStorage.getItem("UserName");

  post = JSON.parse(localStorage.getItem("clickedPost"));
  console.log(post)
  fetchComment(post.id);
  populatePost(post);

};

populateComments = (comments) => {
  let list = document.getElementById("comments-section");

  comments.forEach((item) => {
    let li = document.createElement("li");
    let date = new Date(item.createdAt);

    let comment = `<header class="comment-header" id="comment-header">
    <h3 id="created-by">${item.createdBy}</h3>
      <h5 id="created-at">${date.toLocaleDateString()}</h5>
    </header>
    <p id="content">${item.content}</p>`;

    li.innerHTML = comment;
    list.appendChild(li);
  });
};

fetchComment = (id) => {
  let comments_endpoint = `http://${hosts[currentHost]}${endpoints.getComments}`;

  let { endpoint, request } = new ApiCall(comments_endpoint, "GET")
    .withQueryParams({ id: id })
    .withHeader("Content-Type", "application/json")
    .build();

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    let comments = results[0].value;

    populateComments(comments);
  });
};

populatePost = (post) => {

  let postHeader = document.createElement("main");
  if (Object.keys(post).length === 0) {
    document.getElementById("error-display").classList.add("error-display");
    let errorMsg = `<h1 class="error-msg">Opps! Something went wrong on our side.</h1>`;
    postHeader.innerHTML = errorMsg;
    return document.getElementById("error-display").appendChild(postHeader);
  }

  let dishName = `<h1 id="dish-name" class="post-name">${post.title}</h1>`;
  let dishDesc = `<p id="dish-desc" class="post-desc">${post.content}</p>`;

  postHeader.innerHTML = dishName + dishDesc;

  document.getElementById("post-content").appendChild(postHeader);

  document.getElementById("dish-img").src = post.banner;
};

displayComment = () => {
  let content = document.forms[0][0].value;

  let comment = {
    username: userName,
    createdAt: new Date(),
    content: content,
    postId: post.id,
  };

  let li = document.createElement("li");

  let commentDisplay = `<header class="comment-header" id="comment-header">
  <h3 id="created-by">${comment.username}</h3>
    <h5 id="created-at">${comment.createdAt.toLocaleDateString()}</h5>
  </header>
  <p id="content">${comment.content}</p>`;

  li.innerHTML = commentDisplay;

  let commentSection = document.getElementById("comments-section");
  commentSection.appendChild(li);

  postRemoteComment(comment);
  document.getElementById("comment-form").reset();
};

postRemoteComment = (comment) => {

  let comments_endpoint = `http://${hosts[currentHost]}${endpoints.makeComment}`;

  let { endpoint, request } = new ApiCall(comments_endpoint, "POST")
    .withBody(JSON.stringify(comment))
    .withHeader("Content-Type", "application/json")
    .build();
  callAPI(endpoint, request).then((results) => {
    console.log(results);
  });
};
