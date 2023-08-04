// import jwt from "jsonwebtoken";
import axios from 'axios'

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
  GET_USER_LISTS
} from './types'

export const signupUser = (
  username,
  email,
  password,
  confirmPassword
) => {
  return function (dispatch) {
    var OPTIONS = {
      url: '/user',
      method: 'POST',
      data: {
        username: username,
        email: email,
        password: password,
        confirmpassword: confirmPassword
      },

      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        dispatch({
          // type: SIGNUP_USER,
          isLoggedIn: true
        })
        localStorage.setItem('token', res.data.token)
        // setAuthenticationToken(res.data.token);
        dispatch(
          setCurrentUser({
            user: res.data.user
            // token: jwt.decode(res.data.token),
          })
        )
        dispatch({
          type: LOGIN_USER,
          isLoggedIn: true
        })
        window.location.href = '/'
      })
      .catch(err => {
        dispatch()
        // showMessage("warning", err.response.data.message, 900)
        dispatch({
          // type: SIGNUP_USER_ERROR,
          payload: ''
        })
        console.log(err)
      })
  }
}

export const loginUser = (username, password) => {
  return function (dispatch) {
    // var OPTIONS = {
    //     url: "/auth",
    //     method: "POST",
    //     data: {
    //         username: username,
    //         password: password,
    //         type: "Student",
    //     },
    //     headers: {
    //         "content-type": "application/json",
    //     },
    // };

    // axios(OPTIONS)
    //     .then((res) => {
    //         const token = res.data.token;
    //         localStorage.setItem("token", token);
    //         setAuthenticationToken(token);
    //         dispatch(
    //             setCurrentUser({
    //                 user: res.data.user,
    //                 token: jwt.decode(res.data.token),
    //             })
    //         );
    //         dispatch({
    //             type: LOGIN_USER,
    //             isLoggedIn: true,
    //         });
    //         window.location.href = "/";
    //     })
    //     .catch((err) => {
    //         dispatch(showMessage("warning", "Invalid credentials", 900));
    //         dispatch({
    //             type: LOGIN_USER_ERROR,
    //             payload: "Invalid credentials",
    //             isLoggedIn: false,
    //         });
    //         console.log(err);
    //     });
    console.log(username, password)
    dispatch(
      setCurrentUser({
        user: { username, password }
        // token: jwt.decode(res.data.token),
      })
    )
    dispatch({
      type: LOGIN_USER,
      isLoggedIn: true
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
       
                dispatch(setCurrentUser({ user: {}, token: {} }));
                dispatch({
                    type: LOGOUT_USER,
                });
                window.location.href = "/";
    };
};

export const getBlogById = (id) => {
    console.log(id);
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
                type: GET_BLOG_BY_ID,
                payload: id,
            });
    };
}
export const addComment = (id,comment) => {
    console.log(id,comment);
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
                type: ADD_COMMENT,
                payload: {id,comment},
            });
    };
}
export const saveForLater = (id) => {

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
              payload: {id},
          });
  };
}

export const updateUser = (data) => {
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
          });
  };
}

export const getBlogs = () => {
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
                type: GET_BLOGS,
                payload: [],
            });
  };
}
export const getUserBlogs = (userId) => {
  console.log(userId);
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
                payload: [],
            });
  };
}

export const likeBlog = (id) => {
  console.log(id)
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
                type: LIKE_BLOG,
                payload: id,
            });
  };
}
export const unLikeBlog = (id) => {
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
                payload: id,
            });
  };
}

export const followUser = (id) => {
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
                payload: id,
            });
  };
}
export const getUserLists = (id) => {
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
    console.log(id);
               dispatch({
                type: GET_USER_LISTS,
                payload: [{id:1,list_name:'Technology'},{id:2,list_name:'React.js'}],
            });
  };
}
