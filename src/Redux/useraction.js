// import jwt from "jsonwebtoken";
import axios from 'axios'
import setAuthenticationToken from "./setAuth";

import {
  // SIGNUP_USER,
  // SIGNUP_USER_ERROR,
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
  ADD_BLOG
} from './types'

export const signupUser = (email, password) => {

  return function (dispatch) {
    var OPTIONS = {
      url: 'http://localhost:3000/signup',
      method: 'POST',
      data: {
        user:{
          email:email,
          password:password,
        }
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
        if(res.data.status.code===200){
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
      url: 'http://localhost:3000/login',
      method: 'POST',
      data: {
        user: {
          email: username,
          password: password
        }
      },
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
        .then((res) => {
          console.log(res)
            const token = res.headers.authorization;
            localStorage.setItem("token", token);
            setAuthenticationToken(token);
            console.log(res)

            if(res.data.status.code===200){
              dispatch(
                setCurrentUser({
                  user: {username:res.data.data.email,...res.data.data}
                  // token: jwt.decode(res.data.token),
                })
              )
              dispatch({
                type: LOGIN_USER,
                isLoggedIn: true
              })
            }
          
        })
        .catch((err) => {
            // dispatch(showMessage("warning", "Invalid credentials", 900));
            // dispatch({
            //     type: LOGIN_USER_ERROR,
            //     payload: "Invalid credentials",
            //     isLoggedIn: false,
            // });
            console.log(err);
        });
  
   
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
    // var OPTIONS = {
    //   url: 'http://localhost:3000/posts/' + id,
    //   method: 'GET',
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }

    // axios(OPTIONS)
    //   .then(res => {
    //     dispatch({
    //       type: GET_BLOG_BY_ID,
    //       payload: res.data
    //     })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
      dispatch({
        type: GET_BLOG_BY_ID,
        payload: id
      })
  }
}
export const addBlog = blog => {
  console.log(blog)
  return function (dispatch) {
    // var OPTIONS = {
    //   url: 'http://localhost:3000/posts',
    //   method: 'POST',
    //   data: blog,
    //   headers: {
    //     'content-type': 'application/json'
    //   }
    // }

    // axios(OPTIONS)
    //   .then(res => {
        
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })

      dispatch({
        type: ADD_BLOG,
        payload: blog
      })
  }
}
export const addComment = (id, comment) => {
  console.log(id, comment)
  return function (dispatch) {
    var OPTIONS = {
        url: "http://localhost:3000/comments",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data:{post_id:id,text:comment}
    };

    axios(OPTIONS)
        .then((res) => {
          console.log(res)
          dispatch({
            type: ADD_COMMENT,
            payload: res.data
          })
        })
        .catch((err) => {
            console.log(err);
        });
   
  }
}
export const saveForLater = id => {
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
      payload: { id }
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
      url: 'http://localhost:3000/posts',
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          type: GET_BLOGS,
          payload: res.data
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
    dispatch({
      type: GET_USER_BLOGS,
      payload: []
    })
  }
}

export const likeBlog = id => {
  console.log(id)
  return function (dispatch) {
    var OPTIONS = {
        url: "http://localhost:3000/likes",
        method: "POST",
        headers: {
            "content-type": "application/json",
        },
        data:{post_id:id}
    };

    axios(OPTIONS)
        .then((res) => {
          console.log(res.data)
          dispatch({
            type: LIKE_BLOG,
            payload: res.data
          })
        })
        .catch((err) => {
            console.log(err);
        });
   
  }
}
export const unLikeBlog = id => {
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
    dispatch({
      type: UNLIKE_BLOG,
      payload: id
    })
  }
}

export const followUser = id => {
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
    dispatch({
      type: FOLLOW_USER,
      payload: id
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
        { id: 1, list_name: 'Technology' },
        { id: 2, list_name: 'React.js' }
      ]
    })
  }
}

export const getList = id => {
  return function (dispatch) {
    dispatch({
      type: GET_LIST,
      payload: [
        {
          author_id: 2,
          id: 2,
          title: 'Introduction to JavaScript',
          topic: 'JavaScript',
          featuredImage: './blog1.webp',
          text: 'In this blog post, we introduce JavaScript and its features...',
          created_at: '2023-08-02T0:30:00',
          author: 'Jane Smith',
          comments: [],
          likes: []

        }
      ]
    })
  }
}

export const getFilterBlogs = (searchText, filter) => {
  console.log(searchText, filter)

  return function (dispatch) {
    dispatch({
      type: GET_FILTER_BLOGS,
      payload: { searchText, filter }
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
