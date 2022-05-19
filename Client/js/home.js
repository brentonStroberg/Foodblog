loadFunction = () => {
  fetchRecents()
}

fetchRecents = () => {
  let favourites_endpoint = `http://${hosts[currentHost]}${endpoints.getFavourites}`

  let { endpoint, request } = new ApiCall(favourites_endpoint, 'GET')
    .withCredentials()
    .withQueryParams({ id: 1 })
    .withHeader(
      'Authorization',
      `Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2IxMmEwYy1kMjU3LTRiNDctOTBmZC1jMzY1M2U1MTExZTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiMDQ0ZTM4NTgtNjg3NC00YjljLWFiM2EtYzdiNzU0MWU3N2RmIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI5NjAzNjEsImV4cCI6MTY1MzA0Njc2MSwiaWF0IjoxNjUyOTYwMzYxLCJqdGkiOiIxMzQ0MmU3MS1iMzE0LTRhNDUtODIxMy00MzllMmNiYTBhZmYiLCJ1c2VybmFtZSI6IlJhemVlbiJ9.YrdPUxvfVOBUsMFJWMDUUpOtkHaCieLtBSjJx_IlvfqpzZRzB-6veUUgpXZoed4h0pVJTZoqcrUcdqTpUAAUGv3QDRhWtkB88hv36h_a6h2UFI8Xj7yy_2MDSboaCviAIufAGTpRNnZchnmpy2_ng0FoDwfayi-qzH55n7D4MI1apJgywr7Jf1bSxcys-BelUhFi548YYRskVtFD7qethdbE-WHDtuzQiu9PM4ZW8WI5pdbSIRg6gkyS49ZARov1n0Pxc6ZB8Njbx7GUmxKfm71AdLAqUut5daA430bKdNILduo79iYazFPCd4hq4eCgsQowKgTVGrYF4PdbSPGXHg`
    )
    .withHeader('Content-Type', 'application/json')
    .build()

  Promise.allSettled([callAPI(endpoint, request)]).then((results) => {
    console.log(results[0].value)
    populateCarousel(results[0].value)
  })
}

populateCarousel = (posts) => {
  let post = document.getElementById('posts-container')

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
    document.getElementById('post-card').addEventListener('click', onItemClick)
  })
}

onItemClick = () => {
  //   setCookie('testing', 'a bunch of info', 7)
  console.log('clicked')
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
