populatePost = () => {
  document.getElementById("dish-name").innerHTML =
    "Fried Chicken and sweetchilli fries";

  document.getElementById(
    "dish-desc"
  ).innerHTML = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
    iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo
    assumenda voluptate expedita sed natus sint! Autem aliquid molestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
    iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo
    assumenda voluptate expedita sed natus sint! Autem aliquid molestiaeLorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
    iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo
    assumenda voluptate expedita sed natus sint! Autem aliquid molestiae`;

  document.getElementById("dish-img").src = "../assets/pancakes.jfif";
};
let comments = [
  {
    createdBy: "Steven",
    createdAt: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo",
  },
  {
    createdBy: "Mark",
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    createdBy: "Steven",
    createdAt: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo",
  },
  {
    createdBy: "Mark",
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    createdBy: "Mark",
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
  {
    createdBy: "Steven",
    createdAt: new Date(),
    content:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,iure atque! Ipsa quidem vero doloribus dolorem, ea, asperiores illo",
  },
  {
    createdBy: "Mark",
    createdAt: new Date(),
    content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. ",
  },
];
populateComments = () => {
  let list = document.getElementById("comments-section");

  comments.forEach((item) => {
    let li = document.createElement("li");

    let comment = `<header class="comment-header" id="comment-header">
    <h3 id="created-by">${item.createdBy}</h3>
      <h5 id="created-at">${item.createdAt.toLocaleDateString()}</h5>
    </header>
    <p id="content">${item.content}</p>`;

    li.innerHTML = comment;
    list.appendChild(li);
  });
};

loadPost = () => {
  populatePost();
  populateComments();
};

postComment = () => {
  //   console.log(document.forms[0][0].value);
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
  let commentSection = document.getElementById('comments-section')
  commentSection.appendChild(li);
  document.getElementById("comment-form").reset();
};
