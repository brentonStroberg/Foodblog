populatePost = () => {
  // TODO: read/fetch post info from storage

  let postHeader = document.createElement("section");

  let dishName = `<h1 id="dish-name" class="post-name">title</h1>`;
  let dishDesc = `<p id="dish-desc" class="post-desc">description</p>`;

  postHeader.innerHTML = dishName + dishDesc;

  document.getElementById("post-content").appendChild(postHeader);

  document.getElementById("dish-img").src = "xxx";
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
  let comment = {
    createdBy: "Phindi",
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
