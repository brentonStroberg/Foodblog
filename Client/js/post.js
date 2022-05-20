const makePost = () => {
  let token = getCookie("accessToken").split("=")[1];
  let data = new FormData();
  let file = document.getElementById("image-input");
  let title = document.getElementById("title-input").value;
  let content = document.getElementById("description-input").value;
  let category = document.getElementById("categories-input").value;

  data.append("file", file.files["0"]);
  data.append("title", title);
  data.append("content", content);
  data.append("category", category);
  data.append("createdAt", new Date().toISOString());


  let { endpoint, request } = new ApiCall(
    `http://${hosts[currentHost]}${endpoints.createPost}`,
    "POST"
  )
    .withCredentials()
    .withHeader("Authorization", `Bearer ${token}`)
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
