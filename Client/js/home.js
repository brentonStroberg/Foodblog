let accessToken

loadFunction = () => {
  accessToken = getCookie('accessToken').split('=')[1]
  console.log(accessToken)

  fetchFavourites()
  fetchRecents()
  fetchExplore()
}

fetchFavourites = () => {
  let favourites_endpoint = `http://${hosts[currentHost]}${endpoints.getFavourites}`

  let { endpoint, request } = new ApiCall(favourites_endpoint, 'GET')
    .withCredentials()
    .withQueryParams({ id: 1 })
    .withHeader('Authorization', `Bearer ${accessToken}`)
    .withHeader('Content-Type', 'application/json')
    .build()

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    if (results[0].value.length === 0) {
      document.getElementById('favourites').style.display = 'none'
    } else {
      populateFavourites(results[0].value)
    }
  })
}

fetchRecents = () => {
  let recentEndpoint = `http://${hosts[currentHost]}${endpoints.getRecentPosts}`
  let { endpoint, request } = new ApiCall(recentEndpoint, 'GET')
    .withCredentials()
    .withHeader('Authorization', `Bearer ${accessToken}`)
    .withHeader('Content-Type', 'application/json')
    .build()
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    populateRecents(results[0].value)
  })
}

fetchExplore = () => {
  let exploreEndpoint = `http://${hosts[currentHost]}${endpoints.allPosts}`
  let { endpoint, request } = new ApiCall(exploreEndpoint, 'GET')
    .withCredentials()
    .withHeader('Authorization', `Bearer ${accessToken}`)
    .withHeader('Content-Type', 'application/json')
    .build()
  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    console.log(results[0].value)
    populateExplore(results[0].value)
  })
}

populateFavourites = (posts) => {
  let post = document.getElementById('posts-container-favs')

  posts.forEach((x) => {
    let item = document.createElement('section')
    item.classList.add('post-card')
    item.setAttribute('id', 'post-card')

    let y = `<figure class="post-image">
        <img src="${x.banner}" class="post-thumb" id="dish-img">
    </figure>
    <article class="post-info">
        <h2 class="post-name">${x.title}</h2>
        <p class="post-short-description">${x.content}</p>
    </article>`

    item.innerHTML = y
    post.appendChild(item)
    item.addEventListener('click', () => {
      onItemClick(x)
    })
  })
}

populateRecents = (posts) => {
  let post = document.getElementById('posts-container-recents')

  posts.forEach((x) => {
    let item = document.createElement('section')
    item.classList.add('post-card')
    item.setAttribute('id', 'post-card')

    let y = `<figure class="post-image">
        <img src="${x.banner}" class="post-thumb" id="dish-img">
    </figure>
    <article class="post-info">
        <h2 class="post-name">${x.title}</h2>
        <p class="post-short-description">${x.content}</p>
    </article>`

    item.innerHTML = y
    post.appendChild(item)
    item.addEventListener('click', () => {
      onItemClick(x)
    })
  })
}

populateExplore = (posts) => {
  let post = document.getElementById('posts-container-explore')

  posts.forEach((x) => {
    let item = document.createElement('section')
    item.classList.add('post-card')
    item.setAttribute('id', 'post-card')

    let y = `<figure class="post-image">
        <img src="${x.banner}" class="post-thumb" id="dish-img">
    </figure>
    <article class="post-info">
        <h2 class="post-name">${x.title}</h2>
        <p class="post-short-description">${x.content}</p>
    </article>`

    item.innerHTML = y
    post.appendChild(item)
    item.addEventListener('click', () => {
      onItemClick(x)
    })
  })
}

onItemClick = (e) => {
  console.log('clicked', e)
  setCookie('clickedPost', JSON.stringify(e), 432000)
  window.location.href = '/post/view-post.html'
}

const productContainers = [...document.querySelectorAll('.posts-container')]
const nxtBtn = [...document.querySelectorAll('.nxt-btn')]
const preBtn = [...document.querySelectorAll('.prev-btn')]

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect()
  let containerWidth = containerDimensions.width

  nxtBtn[i].addEventListener('click', () => {
    item.scrollLeft += containerWidth
  })

  preBtn[i].addEventListener('click', () => {
    item.scrollLeft -= containerWidth
  })
})
