let currentHost = 'remote'

let hosts = {
  localhost: 'localhost:8080',
  remote: '3.226.187.18:8080'
}

let endpoints = {
  getFavourites: '/api/favourite',
  addToFavourites: '/api/favourite', // specify id of the post as query param id=<insert id>
  removeFromFavourites: '/api/favourite', // specify id of the post as query param id=<insert id>
  getComments: '/api/comment', // specify query param id=<insert id here>
  createPost: '/api/post',
  deletePost: '/api/post/delete', // specify id of the post as query param id=<insert id>
  getPost: '/api/post', // specify id of the post as query param id=<insert id>
  createProfile: '/api/user/profile',
  deleteProfile: '/api/user/profile',
  updateIntro: '/user/intro', // specify intro in body,
  updateAvatar: '/user/avatar', // specify file
  getUserPosts: '/api//user/posts',
  getRecentPosts: '/api/recent', // specify date as query param
  makeComment: '/api/comment',
  allPosts: '/api/all',
  getProfile: '/api/user/profile'
}

class ApiCall {
  request = {}

  constructor(endpoint, method) {
    this.endpoint = endpoint
    this.request.method = method
  }

  withQueryParams(params) {
    this.endpoint = this.endpoint + '?' + new URLSearchParams(params).toString()
    return this
  }

  withCredentials() {
    this.request.withCredentials = true
    this.request.credentials = 'include'
    return this
  }

  withHeader(requestHeader, value) {
    this.request.headers = this.request.headers || {}
    this.request.headers[requestHeader] = value
    return this
  }

  withBody(body) {
    this.request.body = body
    return this
  }

  build() {
    return { endpoint: this.endpoint, request: this.request }
  }
}

const callAPI = (endpoint, request) => {
  return new Promise((resolve, reject) => {
    fetch(endpoint, request)
      .then((resp) => resp.json())
      .then((json_data) => {
        resolve(json_data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
