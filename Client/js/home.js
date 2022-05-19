let posts = [
  {
    title: 'Dish name',
    content: 'ksvbilsdfvbfd irlrfbvgeiarl iebrgierbgilebgti ksvbilsdfvbfd irlrfbvgeiarl iebrgierbg ilebgti',
    createdAt: '12/12/12',
    createdBy: 'You',
    img: './assets/The-Best-Classic-Tacos-550.jpg'
  },
  {
    title: 'Dish name',
    content: 'ksvbilsdfvbfd irlrfbvgeiarl iebrgierbg ilebgti',
    createdAt: '12/12/12',
    createdBy: 'You',
    img: './assets/The-Best-Classic-Tacos-550.jpg'
  },
  {
    title: 'Dish name',
    content: 'ksvbilsdfvbfd irlrfbvgeiarl iebrgierbg ilebgti',
    createdAt: '12/12/12',
    createdBy: 'You',
    img: './assets/The-Best-Classic-Tacos-550.jpg'
  },
  {
    title: 'Dish name',
    content: 'ksvbilsdfvbfd irlrfbvgeiarl iebrgierbg ilebgti',
    createdAt: '12/12/12',
    createdBy: 'You',
    img: './assets/The-Best-Classic-Tacos-550.jpg'
  },
  {
    title: 'Dish name',
    content: 'ksvbilsdfvbfd irlrfbvgeiarl iebrgierbg ilebgti',
    createdAt: '12/12/12',
    createdBy: 'You',
    img: './assets/The-Best-Classic-Tacos-550.jpg'
  }
]

populateCarousel = () => {
  let post = document.getElementById('posts-container')

  posts.forEach((x) => {
    let item = document.createElement('section')
    item.classList.add('post-card')
    item.setAttribute('id', 'post-card')
    // console.log(posts)

    let y = `<figure class="post-image">
        <img src="${x.img}" class="post-thumb" id="dish-img">
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
    setCookie('testing', 'a bunch of info',7)
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
