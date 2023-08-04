import {
  ADD_BLOG,
  DELETE_BLOG,
  LOGIN_USER,
  SET_CURRENT_USER,
  LOGOUT_USER,
  GET_BLOG_BY_ID,
  ADD_COMMENT,
  UPDATE_USER,
  GET_BLOGS,
  GET_USER_BLOGS,
  LIKE_BLOG,
  UNLIKE_BLOG,
  GET_USER_LISTS
} from './types'
const initialState = {
  isLoggedIn: false,
  username: '',
  email: '',
  profileImage: '',
  user_id: '',
  password: '',
  confirmPassword: '',
  action: 'Signup',
  msg: '',
  err: '',
  passmsg: '',
  userDetails: {},
  type: 'Student',
  blogData: {},
  blogLoading: true,
  blogsLoading: true,
  userLists: [],
  listLoading: true,
  blogs: [
    {
      author_id: 1,
      id: 1,
      title: 'Getting Started with React',
      topic: 'React',
      featuredImage: './blog1.webp',
      text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at quam lacus. Phasellus odio libero, consequat sed dolor at, faucibus bibendum mauris. Curabitur at metus sed libero tincidunt condimentum. Curabitur in lorem et dui pretium ultrices. Proin magna tellus, vehicula vel ante a, elementum dapibus erat. Integer et lobortis ante, sit amet euismod lectus. Donec id sapien eget ante condimentum pulvinar id ac lectus. Proin ac arcu est.

          Donec tristique viverra ex, in hendrerit dolor auctor at. Vestibulum porta tempus scelerisque. Sed sagittis malesuada elit nec congue. Sed vestibulum sapien sed massa egestas, suscipit sodales orci ornare. Curabitur dignissim congue purus sed rutrum. Phasellus faucibus quam ut fringilla condimentum. Aliquam et venenatis est. Aenean rhoncus enim a ipsum accumsan cursus. Donec tortor metus, consectetur eu lacus sed, hendrerit convallis leo.
          
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean faucibus mollis porttitor. Quisque varius semper suscipit. Cras lorem velit, maximus sed elit in, pretium vestibulum ante. Nam ante turpis, tincidunt eget facilisis eu, tincidunt ultrices nisi. Vestibulum semper hendrerit dapibus. Pellentesque pretium dolor eu mi semper vestibulum. Praesent at enim et nisi elementum molestie a ut quam. Maecenas in lectus feugiat, lobortis lectus id, dignissim dui. Vestibulum dignissim congue varius. Suspendisse in nibh nunc. Nunc ac ullamcorper elit, in porttitor eros. Cras fermentum, lectus eget blandit ultrices, eros felis tempus odio, a laoreet neque augue nec mauris.
          
          Duis tincidunt nisl nec eleifend condimentum. Ut at aliquam ligula. Duis volutpat at orci at aliquam. Pellentesque massa mi, congue a neque a, eleifend condimentum nisi. Curabitur elit nunc, scelerisque ut semper non, rutrum quis massa. Suspendisse vel finibus quam, nec auctor eros. Mauris vestibulum erat nisl, in efficitur dolor tincidunt nec. Fusce sagittis vulputate auctor. Donec gravida neque et eros suscipit, sit amet convallis turpis tempor. Fusce scelerisque mauris lorem, a finibus erat luctus at. Nam tempus mollis nisi. Aenean a sem vel neque mattis tristique. Nullam rhoncus ac ex ac fringilla. Maecenas hendrerit eget elit vitae eleifend.
          
          Fusce eleifend quam sed porta rutrum. Maecenas nec est id urna malesuada feugiat id at purus. Morbi pulvinar risus ut dolor finibus scelerisque. Integer eget augue odio. Nunc convallis mattis ipsum, vel auctor mauris convallis ut. Donec a mi finibus sapien blandit pretium. Curabitur ac malesuada odio, eget tempor tellus. Ut condimentum commodo sodales. Nam finibus feugiat urna. Nullam ut sem blandit, convallis ligula a, efficitur neque. Aenean sed sagittis dolor, sit amet dignissim leo. Nulla tincidunt dolor nec elit laoreet auctor. Nunc a nisi ex. Duis tortor ante, scelerisque id volutpat ut, lacinia et erat.`,
      dateTime: '2023-08-03 12:00:00',
      author: 'John Doe',
      comments: [],
      likes:0
    },
    {
      author_id: 2,
      id: 2,
      title: 'Introduction to JavaScript',
      topic: 'JavaScript',
      featuredImage: './blog1.webp',
      text: 'In this blog post, we introduce JavaScript and its features...',
      dateTime: '2023-08-02 10:30:00',
      author: 'Jane Smith',
      comments: []
    }
  ]
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SIGNUP_USER:
    //     return {
    //         ...state,
    //         isLoggedIn: action.isLoggedIn,
    //     };
    // case SIGNUP_USER_ERROR: {
    //     localStorage.removeItem("token");
    //     return {
    //         ...state,
    //         err: action.payload,
    //     };
    // };
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }

    case SET_CURRENT_USER:
      localStorage.setItem('user', action.payload.user)
      return {
        ...state,
        userDetails: {
          id:1,
          ...action.payload.user
        },
        isLoggedIn: true
      }

    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false
      }

    case GET_BLOG_BY_ID:
      const blog = state.blogs.find(blog => blog.id == action.payload)
      console.log(blog, action.payload)
      return {
        ...state,
        blogData: blog,
        blogLoading: false
      }
    case GET_BLOGS:
      return{
        ...state,
        blogs: [...state.blogs,...action.payload],
        blogsLoading: false
      }
    case GET_USER_BLOGS:
      return{
        ...state,
        blogs: [...state.blogs,...action.payload],
      }
    case LIKE_BLOG:
      return{
        ...state,
        blogData: {
          ...state.blogData,
          likes: state.blogData.likes + 1
        }
      }
    case UNLIKE_BLOG:
      return{
        ...state,
        blogs: state.blogs.map(blog => {
          if(blog.id === action.payload){
            return{
              ...blog,
              likes: blog.likes - 1
            }
          }else{
            return blog
          }
        })
      }
    case UPDATE_USER:
        return {
            ...state,
            userDetails: { ...state.userDetails, ...action.payload },
        };
  

    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      }
    case ADD_COMMENT:
      console.log(action.payload, state.blogs)
      let commentObj = {
        id: state.blogData.comments.length + 1,
        author: state.userDetails.username,
        comment: action.payload.comment,
        date: new Date()
      }
      return {
        ...state,
        blogData: {
          ...state.blogData,
          comments: [...state.blogData.comments, commentObj]
        }
      }
   
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => {
          return blog.id !== action.payload
        })
      }
    case GET_USER_LISTS:
      return{
        ...state,
        userLists: action.payload,
        listLoading: false
      }

      default:
      return state
  }
}

export default userReducer
