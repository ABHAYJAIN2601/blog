import jwt from 'jsonwebtoken'
import axios from 'axios'
import setAuthenticationToken from './setAuth'

import {
  // SIGNUP_USER,
  // SIGNUP_USER_ERROR,
  GET_USER_BY_ID,
  LOGIN_USER,
  LOGOUT_USER,
  SET_CURRENT_USER,
  GET_BLOG_BY_ID,
  ADD_COMMENT,
  SAVE_FOR_LATER,
  UPDATE_USER,
  GET_BLOGS,
  GET_USER_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  FOLLOW_USER,
  GET_USER_LISTS,
  GET_LIST,
  GET_FILTER_BLOGS,
  CREATE_LIST,
  SORT_BLOGS,
  ADD_BLOG,
  SAVE_DRAFT,
  DELETE_BLOG,
  UNFOLLOW_USER,
  POST_TYPE,
  EDIT_BLOG,
  GET_REVISIONS
} from './types'

export const signupUser = (email, password, name) => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/signup',
      method: 'POST',
      data: {
        email: email,
        password: password,
        name: name
      },

      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res)
        // dispatch({
        //   // type: SIGNUP_USER,
        //   isLoggedIn: true
        // })
        // localStorage.setItem('token', res.data.token)
        // setAuthenticationToken(res.data.token);
        // dispatch(
        //   setCurrentUser({
        //     user: res.data.user
        //     // token: jwt.decode(res.data.token),
        //   })
        // )
        if (res.data.status.code === 200) {
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: true
          })
        }

        // window.location.href = '/'
      })
      .catch(err => {
        // dispatch()
        // // showMessage("warning", err.response.data.message, 900)
        // dispatch({
        //   // type: SIGNUP_USER_ERROR,
        //   payload: ''
        // })
        console.log(err)
      })
  }
}

export const loginUser = (username, password) => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/signin',
      method: 'POST',
      data: {
        email: username,
        password: password
      },
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res)
        const token = res.data.token
        localStorage.setItem('token', token)
        setAuthenticationToken(token)
        console.log(jwt.decode(token, 'SECRET'))

        if (res.data.msg === 'Signed In Successfully') {
          dispatch(getUserById(jwt.decode(token, 'SECRET').id))
          // dispatch(
          //   setCurrentUser({
          //     user: { id: jwt.decode(token, 'SECRET').id }
          //   })
          // )
          dispatch({
            type: LOGIN_USER,
            isLoggedIn: true
          })
        }
      })
      .catch(err => {
        // dispatch(showMessage("warning", "Invalid credentials", 900));
        // dispatch({
        //     type: LOGIN_USER_ERROR,
        //     payload: "Invalid credentials",
        //     isLoggedIn: false,
        // });
        console.log(err)
      })
  }
}

export const setCurrentUser = user => {
  return function (dispatch) {
    dispatch({
      type: SET_CURRENT_USER,
      payload: user
    })
  }
}
export const logoutUser = () => {
  return function (dispatch) {
    localStorage.removeItem('token')
    dispatch(setCurrentUser({ user: {}, token: {} }))
    dispatch({
      type: LOGOUT_USER
    })
    window.location.href = '/'
  }
}

export const getBlogById = id => {
  console.log(id)
  return function (dispatch) {
    var OPTIONS = {
      url: `http://localhost:3000/post/id/?id=${id}&viewing=true`,
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res.data.post)
        // dispatch({
        //   type: GET_BLOG_BY_ID,
        //   payload: res.data.post
        // })
      })
      .catch(err => {
        console.log(err)
      })
    dispatch({
      type: GET_BLOG_BY_ID,
      payload: id
    })
  }
}
export const addBlog = blog => {
  console.log(blog)
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/create',
      method: 'POST',
      data: blog,
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: ADD_BLOG,
          payload: blog
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const addComment = (id, comment) => {
  console.log(id, comment)
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/comment',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: id, comment: comment }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res)
        dispatch({
          type: ADD_COMMENT,
          payload: comment
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const saveForLater = (id, blogId) => {
  return function (dispatch) {
    // var OPTIONS = {
    //     url: "/blog/" + id,
    //     method: "GET",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // };

    // axios(OPTIONS)
    //     .then((res) => {

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    dispatch({
      type: SAVE_FOR_LATER,
      payload: { id, blogId }
    })
  }
}

export const updateUser = data => {
  console.log(data)
  return function (dispatch) {
    // var OPTIONS = {
    //     url: "/blog/" + id,
    //     method: "GET",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // };

    // axios(OPTIONS)
    //     .then((res) => {

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    dispatch({
      type: UPDATE_USER,
      payload: data
    })
  }
}

export const getBlogs = () => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/latest',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: GET_BLOGS,
          payload: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getUserBlogs = userId => {
  console.log(userId)
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/search/user_id',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: userId }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: GET_USER_BLOGS,
          payload: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const likeBlog = id => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/like',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: id }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: LIKE_BLOG,
          payload: id
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const unLikeBlog = id => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/unlike',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: {
        id: id
      }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: UNLIKE_BLOG,
          payload: id
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const followUser = id => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/follow',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: id }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res)
        dispatch({
          type: FOLLOW_USER,
          payload: id
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const getUserLists = id => {
  return function (dispatch) {
    // var OPTIONS = {
    //     url: "/blog",
    //     method: "GET",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // };

    // axios(OPTIONS)
    //     .then((res) => {

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    console.log(id)
    dispatch({
      type: GET_USER_LISTS,
      payload: [
        { id: 1, list_name: 'Technology', blogs: [] },
        { id: 2, list_name: 'React.js', blogs: [] }
      ]
    })
  }
}

export const getList = id => {
  return function (dispatch) {
    console.log(id)
    dispatch({
      type: GET_LIST,
      payload: id
    })
  }
}
export const editBlog = (id, blog) => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/edit',
      method: 'PUT',
      headers: {
        'content-type': 'application/json'
      },
      data: {...blog,image:'sd'}
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    dispatch({
      type: EDIT_BLOG,
      payload: { id, blog }
    })
  }
}
export const getFilterBlogs = (searchText, filter) => {
  console.log(searchText, filter)
  let url = ''
  let data = {}

  if (filter === 'Topic') {
    url = 'http://localhost:3000/post/search/topic'
    data = { topic: searchText }
  } else if (filter === 'Title') {
    url = 'http://localhost:3000/post/search/title'
    data = { title: searchText }
  } else if (filter === 'Author') {
    url = 'http://localhost:3000/post/search/author'
    data = { name: searchText }
  }

  return function (dispatch) {
    var OPTIONS = {
      url: url,
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: data
    }

    axios(OPTIONS)
      .then(res => {
        console.log('like', res.data)
        dispatch({
          type: GET_FILTER_BLOGS,
          payload: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const sortBlogs = sort => {
  console.log(sort)

  return function (dispatch) {
    dispatch({
      type: SORT_BLOGS,
      payload: sort
    })
  }
}
export const createList = data => {
  return function (dispatch) {
    dispatch({
      type: CREATE_LIST,
      payload: data
    })
  }
}
export const getRevision = id => {
  return function (dispatch) {
    // var OPTIONS = {
    //     url: "/blog",
    //     method: "GET",
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // };

    // axios(OPTIONS)
    //     .then((res) => {

    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
    console.log(id)
    dispatch({
      type: GET_REVISIONS,
      payload: id
    })
  }
}
export const getUserById = id => {
  console.log(id)
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/profile?id=' + id,
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        console.log('like', res.data)
        dispatch({
          type: GET_USER_BY_ID,
          payload: res.data
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export const saveDraft = data => {
  console.log(data)
  return function (dispatch) {
    // var OPTIONS = {
    //   url: 'http://localhost:3000/post/draft',
    //   method: 'POST',
    //   headers: {
    //     'content-type': 'application/json'
    //   },
    //   data: data
    // }

    // axios(OPTIONS)
    //   .then(res => {
    //     console.log(res.data)

    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    dispatch({
      type: SAVE_DRAFT,
      payload: data
    })
  }
}
export const deleteBlog = id => {
  console.log(id)
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/post/delete',
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: id }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: DELETE_BLOG,
          payload: id
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const unFollowUser = id => {
  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/unfollow',
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      data: { id: id }
    }

    axios(OPTIONS)
      .then(res => {
        console.log(res.data)
        dispatch({
          type: UNFOLLOW_USER,
          payload: res.data.id
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export const postType = type => {
  console.log(type)
  let url = '';
  let method = 'GET';
  if (type === 'top') {
    url = 'http://localhost:3000/posts/top'
  } else if (type === 'latest') {
    url = 'http://localhost:3000/post/latest'
  } else if (type ==='recommend'){
    url = 'http://localhost:3000/post/recommended'
    method = 'POST'
  }

  return function (dispatch) {
    const config = {
      url: url,
      method: method,
      headers: {
        'content-type': 'application/json'
      }
    }
    axios(config)
      .then(res => {
        dispatch({
          type: POST_TYPE,
          payload: res.data.posts
        })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
