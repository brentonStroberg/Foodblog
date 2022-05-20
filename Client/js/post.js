
const checkForUser = () => {
  let userName = localStorage.getItem("UserName");
  if(userName === null) {
    window.location.href = '../index.html'
  }
}
const makePost = () => {
  let userName = localStorage.getItem("UserName");
  console.log(userName)
  let data = new FormData();
  let file = document.getElementById("image-input");
  let title = document.getElementById("title-input").value;
  let content = document.getElementById("description-input").value;

  data.append("username", userName);
  data.append("file", file.files["0"]);
  data.append("title", title);
  data.append("content", content);
  data.append("createdAt", new Date().toISOString());


  let { endpoint, request } = new ApiCall(
    `http://${hosts[currentHost]}${endpoints.createPost}`,
    "POST"
  )
    .withBody(data)
    .build();

  callAPI(endpoint, request)
    .then((results) => {
      console.log(results);
      document.getElementById("form-createPost").reset();
    })
    .catch((err) => {
      document.getElementById("form-createPost").reset();
      console.log(err);
    });
};
