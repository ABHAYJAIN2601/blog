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
  GET_USER_LISTS,
  GET_LIST,
  CREATE_LIST,
  GET_FILTER_BLOGS,
  SORT_BLOGS,
  GET_USER_BY_ID,
  SAVE_DRAFT,
  UNFOLLOW_USER,
  FOLLOW_USER,
  POST_TYPE,
  SAVE_FOR_LATER,
  DELETE_DRAFT,
  EDIT_BLOG,
  GET_REVISIONS,
  DELETE_LIST,
  DELETE_REVISION
} from './types'
const initialState = {
  isLoggedIn: false,

  userDetails: {},
  blogRevisionData: {},
  revisionListLoading: true,
  blogData: {},
  blogLoading: true,
  blogsLoading: true,
  userLists: [],
  listLoading: true,
  listData: [],
  listDataLoading: true,
  drafts: [],
  revisionBlog: [
    {
      id: 4,
      revisions: [
        {
          user_id: 1,
          id: 6,
          title: 'Introduction to JavaScript',
          topic: 'JavaScript',
          img_url: './blog1.webp',
          body: 'In this blog post, we introduce JavaScript and its features...',
          created_at: '2023-08-02T10:30:00',
          author: 'Jane Smith',
          comment: [],
          likes: [],
          views: 0
        }
      ]
    }
  ],
  blogs: [
    {
      user_id: 1,
      id: 10,
      title: 'Getting Started with React',
      topic: 'React',
      img_url: './blog1.webp',
      body: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi at quam lacus. Phasellus odio libero, consequat sed dolor at, faucibus bibendum mauris. Curabitur at metus sed libero tincidunt condimentum. Curabitur in lorem et dui pretium ultrices. Proin magna tellus, vehicula vel ante a, elementum dapibus erat. Integer et lobortis ante, sit amet euismod lectus. Donec id sapien eget ante condimentum pulvinar id ac lectus. Proin ac arcu est.

          Donec tristique viverra ex, in hendrerit dolor auctor at. Vestibulum porta tempus scelerisque. Sed sagittis malesuada elit nec congue. Sed vestibulum sapien sed massa egestas, suscipit sodales orci ornare. Curabitur dignissim congue purus sed rutrum. Phasellus faucibus quam ut fringilla condimentum. Aliquam et venenatis est. Aenean rhoncus enim a ipsum accumsan cursus. Donec tortor metus, consectetur eu lacus sed, hendrerit convallis leo.
          
          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aenean faucibus mollis porttitor. Quisque varius semper suscipit. Cras lorem velit, maximus sed elit in, pretium vestibulum ante. Nam ante turpis, tincidunt eget facilisis eu, tincidunt ultrices nisi. Vestibulum semper hendrerit dapibus. Pellentesque pretium dolor eu mi semper vestibulum. Praesent at enim et nisi elementum molestie a ut quam. Maecenas in lectus feugiat, lobortis lectus id, dignissim dui. Vestibulum dignissim congue varius. Suspendisse in nibh nunc. Nunc ac ullamcorper elit, in porttitor eros. Cras fermentum, lectus eget blandit ultrices, eros felis tempus odio, a laoreet neque augue nec mauris.
          
          Duis tincidunt nisl nec eleifend condimentum. Ut at aliquam ligula. Duis volutpat at orci at aliquam. Pellentesque massa mi, congue a neque a, eleifend condimentum nisi. Curabitur elit nunc, scelerisque ut semper non, rutrum quis massa. Suspendisse vel finibus quam, nec auctor eros. Mauris vestibulum erat nisl, in efficitur dolor tincidunt nec. Fusce sagittis vulputate auctor. Donec gravida neque et eros suscipit, sit amet convallis turpis tempor. Fusce scelerisque mauris lorem, a finibus erat luctus at. Nam tempus mollis nisi. Aenean a sem vel neque mattis tristique. Nullam rhoncus ac ex ac fringilla. Maecenas hendrerit eget elit vitae eleifend.
          
          Fusce eleifend quam sed porta rutrum. Maecenas nec est id urna malesuada feugiat id at purus. Morbi pulvinar risus ut dolor finibus scelerisque. Integer eget augue odio. Nunc convallis mattis ipsum, vel auctor mauris convallis ut. Donec a mi finibus sapien blandit pretium. Curabitur ac malesuada odio, eget tempor tellus. Ut condimentum commodo sodales. Nam finibus feugiat urna. Nullam ut sem blandit, convallis ligula a, efficitur neque. Aenean sed sagittis dolor, sit amet dignissim leo. Nulla tincidunt dolor nec elit laoreet auctor. Nunc a nisi ex. Duis tortor ante, scelerisque id volutpat ut, lacinia et erat.`,
      created_at: '2023-08-03T12:00:00',
      author: 'John Doe',
      comment: [],
      likes: [],
      views: 0
    },
    {
      user_id: 1,
      id: 21,
      title: 'Introduction to JavaScript',
      topic: 'JavaScript',
      img_url: './blog1.webp',
      body: 'In this blog post, we introduce JavaScript and its features...',
      created_at: '2023-08-02T10:30:00',
      author: 'Jane Smith',
      comment: [],
      likes: [],
      views: 0
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
    case GET_USER_BY_ID:
      return {
        ...state,
        userDetails: action.payload,
        isLoggedIn: true
      }
    case LOGIN_USER:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn
      }

    case SET_CURRENT_USER:
      localStorage.setItem('user', action.payload)
      return {
        ...state,
        userDetails: {
          ...action.payload.user
        },
        isLoggedIn: true
      }
    case FOLLOW_USER:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          followed_user_ids: [
            ...state.userDetails.followed_user_ids,
            action.payload
          ]
        }
      }
    case UNFOLLOW_USER:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          followed_user_ids: state.userDetails.followed_user_ids.filter(
            user => user !== action.payload
          )
        }
      }
    case LOGOUT_USER:
      return {
        ...state,
        isLoggedIn: false
      }
    case SAVE_DRAFT: {
      return {
        ...state,
        drafts: [...state.drafts, action.payload]
      }
    }
    case SAVE_FOR_LATER:
      const userIndex = state.userLists.findIndex(
        user => user.id === action.payload.id
      )
      const blogIndex = state.blogs.findIndex(
        blog => blog.id === action.payload.blogId
      )

      return {
        ...state,
        userLists: state.userLists.map(list => {
          if (list.id === action.payload.id) {
            const existingBlogIndex = list.blogs.findIndex(
              blog => blog.id === action.payload.blogId
            )

            if (existingBlogIndex !== -1) {
              return {
                ...list,
                blogs: list.blogs.map(blog => {
                  if (blog.id === action.payload.blogId) {
                    return {
                      ...blog
                    }
                  }
                  return blog
                })
              }
            } else {
              return {
                ...list,

                blogs: [
                  ...list.blogs,
                  state.blogs.find(blog => blog.id === action.payload.blogId)
                ]
              }
            }
          }
          return list
        })
      }

    case GET_BLOG_BY_ID:
      const blog = state.blogs.find(blog => blog.id == action.payload)
      return {
        ...state,
        blogData: blog,
        blogLoading: false
      }
    case GET_BLOGS:
      return {
        ...state,
        blogs: action.payload,
        blogsLoading: false
      }
    case POST_TYPE:
      return {
        ...state,
        blogs: action.payload
      }
    case GET_USER_BLOGS:
      return {
        ...state,
        blogs: action.payload
      }
    case LIKE_BLOG:
      return {
        ...state,
        blogData: {
          ...state.blogData,
          likes: [...state.blogData.likes, state.userDetails.id]
        }
      }

    case UNLIKE_BLOG:
      return {
        ...state,
        blogData: {
          ...state.blogData,
          likes: state.blogData.likes.filter(user => {
            return user !== state.userDetails.id
          })
        }
      }
    case UPDATE_USER:
      return {
        ...state,
        userDetails: { ...state.userDetails, ...action.payload }
      }

    case ADD_BLOG:
      return {
        ...state,
        blogs: [action.payload, ...state.blogs]
      }
    case EDIT_BLOG:
      return {
        ...state,

        revisionBlog: state.revisionBlog
          .map(blog => {
            if (blog.id === action.payload.id) {
              return {
                ...blog,
                revisions: [...blog.revisions, action.payload.blog]
              }
            }
            return blog
          })
          .concat(
            state.revisionBlog.find(blog => blog.id === action.payload.id)
              ? [] // If the blog is found, no need to add a new entry
              : [{ id: action.payload.id, revisions: [action.payload.blog] }] // If the blog is not found, add a new entry
          ),
        blogs: state.blogs.map(blog => {
          if (blog.id === action.payload.id) {
            return action.payload.blog
          }
          return blog
        })
      }
    case GET_REVISIONS:
      return {
        ...state,
        blogRevisionData: state.revisionBlog.find(
          blog => blog.id === action.payload
        ),
        revisionListLoading: false
      }
    case DELETE_REVISION:
      return {
        ...state,

        revisionBlog: state.revisionBlog.map(blog => {
          if (blog.id == action.payload.postId) {
            return {
              ...blog,
              revisions: blog.revisions
                .slice(0, action.payload.revisionIndex)
                .concat(blog.revisions.slice(action.payload.revisionIndex + 1))
            }
          }
          return blog
        })
      }
    case ADD_COMMENT:
      return {
        ...state,
        blogData: {
          ...state.blogData,
          comment: [...state.blogData.comment, action.payload],
          commenters: [...state.blogData.commenters, state.userDetails.name]
        }
      }
    case DELETE_DRAFT:
      return {
        ...state,
        drafts: state.drafts.filter(draft => {
          return draft.id !== action.payload
        })
      }
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter(blog => {
          return blog.id !== action.payload
        })
      }
    case GET_USER_LISTS:
      return {
        ...state,
        userLists: [...state.userLists],
        listLoading: false
      }
    case GET_LIST:
      const listIndex = state.userLists.findIndex(
        user => user.id == action.payload
      )

      if (listIndex !== -1) {
        return {
          ...state,
          listData: state.userLists[listIndex].blogs,
          listDataLoading: false
        }
      }
      return {
        ...state
      }
    case DELETE_LIST:
      return {
        ...state,
        userLists: state.userLists.filter(list => {
          return list.id !== action.payload
        })
      }
    case CREATE_LIST:
      return {
        ...state,
        userLists: [
          ...state.userLists,
          {
            id: state.listData.length + 1,
            list_name: action.payload,
            blogs: []
          }
        ]
      }
    case GET_FILTER_BLOGS:
      return {
        ...state,
        blogs: action.payload
      }
    case SORT_BLOGS:
      let sortedBlog = [...state.blogs]
      if (action.payload === 'Like') {
        sortedBlog.sort((a, b) => {
          return b.likes.length - a.likes.length
        })
      } else if (action.payload === 'Comment') {
        sortedBlog.sort((a, b) => {
          return b.comment.length - a.comment.length
        })
      } else if (action.payload === 'Views') {
        sortedBlog.sort((a, b) => {
          return b.views - a.views
        })
      }
      return {
        ...state,
        blogs: sortedBlog
      }
    default:
      return state
  }
}

export default userReducer
