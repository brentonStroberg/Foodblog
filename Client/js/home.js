loadFunction = () => {
    fetchRecents();
}

fetchRecents = () => {
  let favourites_endpoint = `http://${hosts[currentHost]}${endpoints.getRecents}`

  let { endpoint, request } = new ApiCall(favourites_endpoint, 'GET')
    .withCredentials()
    .withQueryParams({ date: new Date().toISOString() })
    .withHeader('Authorization', `Bearer eyJraWQiOiJ5VzE5UDNadExTaDJLQXdqbVUwemk0OXlFTmJTamhoK3VmMXlQekF6WHB3PSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiM2IxMmEwYy1kMjU3LTRiNDctOTBmZC1jMzY1M2U1MTExZTgiLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV8xWkhnd3M1aHMiLCJ2ZXJzaW9uIjoyLCJjbGllbnRfaWQiOiIzcjJwc2VuNTJkZ2tpbmJqdXZub3MzanZvZSIsImV2ZW50X2lkIjoiZGFhOTg3NDgtMTZjYS00ZTU5LWFkM2MtYmZlMGI3ZmFjMzMxIiwidG9rZW5fdXNlIjoiYWNjZXNzIiwic2NvcGUiOiJhd3MuY29nbml0by5zaWduaW4udXNlci5hZG1pbiBwaG9uZSBvcGVuaWQgZW1haWwiLCJhdXRoX3RpbWUiOjE2NTI4NzMxNDAsImV4cCI6MTY1Mjk1OTU0MCwiaWF0IjoxNjUyODczMTQwLCJqdGkiOiJkMjQ2YmQxMi1iZGZiLTQ3NWItODA2OS0zNWQ3NzA3YmYyMmYiLCJ1c2VybmFtZSI6IlJhemVlbiJ9.CV0cy57Q7J0maJNhl7USmwF4sur2Fs1Nwqu7M4oW8uLj93ndFfdYpLgQCeRZ0yK55rdX2Jfa7SET8VAQqrpehBI0GoMBS0uhk-JePC1Q7LEhB49H5ByKovv3AtP1yywdZuzgPgYnQebw8mSDM3VyZWjLQgWZATe_MXedP3i1Vp4-wEiaC2uvOyJ9uPwnQv7fbUCmpmW1TJO17mqgZNDhQ_TRo3oG3uyk1Un6uJuZETEbQs2ZKZMO-Kgyt15jkMrOLKkxKSzDuExcByi2u3z-vTmuMjRCQB7T97Es6P2I3kcXEsKhcD3l7cbNY6LOlrDzQWc_Z-AiI2AILJiIzHjCYw`)
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
    // console.log(posts)

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
  setCookie('testing', 'a bunch of info', 7)
  console.log(getCookie('testing'))
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
