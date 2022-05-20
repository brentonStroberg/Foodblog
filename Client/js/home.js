let userName;

loadFunction = () => {
  userName = localStorage.getItem("UserName");
  if (userName === null) {
    window.location.href = "../index.html";
  }
  console.log(userName);

  fetchRecents();
  fetchExplore();
};

fetchRecents = () => {
  let recentEndpoint = `http://${hosts[currentHost]}${endpoints.getRecentPosts}`;
  let { endpoint, request } = new ApiCall(recentEndpoint, "GET")
    .withHeader("Content-Type", "application/json")
    .build();
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    populateRecents(results[0].value);
  });
};

fetchExplore = () => {
  let exploreEndpoint = `http://${hosts[currentHost]}${endpoints.allPosts}`;
  let { endpoint, request } = new ApiCall(exploreEndpoint, "GET")
    .withHeader("Content-Type", "application/json")
    .build();
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    populateExplore(results[0].value);
  });
};

populateRecents = (posts) => {
  let post = document.getElementById("posts-container-recents");

  posts.forEach((x) => {
    let item = document.createElement("section");
    item.classList.add("post-card");
    item.setAttribute("id", "post-card");

    let y = `<figure class="post-image">
        <img src="${x.banner}" class="post-thumb" id="dish-img">
    </figure>
    <article class="post-info">
        <h2 class="post-name">${x.title}</h2>
        <p class="post-short-description">${x.content}</p>
    </article>`;

    item.innerHTML = y;
    post.appendChild(item);
    item.addEventListener("click", () => {
      onItemClick(x);
    });
  });
};

populateExplore = (posts) => {
  let post = document.getElementById("posts-container-explore");

  posts.forEach((x) => {
    let item = document.createElement("section");
    item.classList.add("post-card");
    item.setAttribute("id", "post-card");

    let y = `<figure class="post-image">
        <img src="${x.banner}" class="post-thumb" id="dish-img">
    </figure>
    <article class="post-info">
        <h2 class="post-name">${x.title}</h2>
        <p class="post-short-description">${x.content}</p>
    </article>`;

    item.innerHTML = y;
    post.appendChild(item);
    item.addEventListener("click", () => {
      onItemClick(x);
    });
  });
};

onItemClick = (e) => {
  localStorage.setItem("clickedPost", JSON.stringify(e));
  window.location.href = "/post/view-post.html";
};

const productContainers = [...document.querySelectorAll(".posts-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".prev-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
