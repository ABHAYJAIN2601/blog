import React, { useEffect, useState } from 'react'
import './Blog.css'
import Payment from '../Payment'
const { connect } = require('react-redux')
const { useParams } = require('react-router-dom')

const {
  getBlogById,
  addComment,
  likeBlog,
  unLikeBlog
} = require('../../Redux/useraction')
function Blog (props) {
  const params = useParams()
  const [comment, setComment] = useState('')
  const [author, setAuthor] = useState({})
  // Function to check if a user can view a blog based on their plan
  function canUserViewBlog (userId) {
    const usersData = JSON.parse(localStorage.getItem('usersData')) || {}

    if (!usersData[userId]) {
      return false // User doesn't exist in the data
    }

    const userPlan = usersData[userId].plan
    const maxAllowedViews = {
      50: 10000,
      60: 5,
      70: 6 // Premium users can view unlimited times
    }

    if (usersData[userId].views === undefined) {
      usersData[userId].views = 0
    }

    if (usersData[userId].views < maxAllowedViews[userPlan]) {
      usersData[userId].views++
      localStorage.setItem('usersData', JSON.stringify(usersData))
      return true // User can view the blog
    } else {
      return false // User has exceeded allowed views
    }
  }

 


  const handleComment = () => {
    if (comment) {
      props.addComment(params.id, comment)
      setComment('')
    } else {
      //   alert('Invalid Credentials');
    }
  }
  function userExists () {
    return props.blogData.likes.some(function (el) {
      return el === props.user.id
    })
  }
  useEffect(() => {
    props.getBlogById(params.id)
  }, [])
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div>
      {canUserViewBlog(props.user.id) ? <div>
      {props.blogLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className='blog-container'>
          {/* <button
            className='three-dots-btn'
            onClick={() => setShowDropdown(!showDropdown)}
          >
            ...
          </button>
          {showDropdown && (
            <div className='dropdown'>
              <button>Edit</button>
              <button>Delete</button>
            </div>
          )} */}
          <h1 className='blog-title'>{props.blogData.title}</h1>
          <div className='author-section'>
            <img
              className='author-avatar'
              src={'http://localhost:3001/blog1.webp'}
              alt={props.blogData.title}
            />
            <span className='blog-author'>{props.blogData.author}</span>
            <span className='blog-date'>
              {props.blogData.created_at.split('T')[0]}
            </span>
            <p className='blog-topic'>{props.blogData.topic}</p>
          </div>

          <img
            className='blog-img'
            src={
              'https://miro.medium.com/v2/resize:fit:4800/0*a6ca3dUuTTQqcDHJ'
            }
            alt={props.blogData.title}
          />
          <p className='blog-content'>{props.blogData.body}</p>
          <div className='blog-like-container'>
            {true ? (
              <img
                className='like-clap'
                src='http://localhost:3001/clap.png'
                onClick={() => props.likeBlog(props.blogData.id)}
              />
            ) : (
              <img
                className='like-clap'
                src='http://localhost:3001/clap_solid.png'
                onClick={() => props.unLikeBlog(props.blogData.id)}
              />
            )}
            <span className='like-count'>{props.blogData.likes.length}</span>
            <img className='like-clap' src='http://localhost:3001/chat.png' />
            <span className='like-count'>{props.blogData.comment.length}</span>
          </div>
          <div className='comment-section'>
            <h1>Comments</h1>
            {props.blogData.comment.length > 0 &&
              props.blogData.comment.map((comment, index) => {
                return (
                  <div className='comment'>
                    <div className='author-section'>
                      <img
                        className='author-avatar'
                        src={'http://localhost:3001/blog1.webp'}
                        alt={props.blogData.title}
                      />
                      <span className='blog-author'>
                        {props.blogData.commenters[index]}
                      </span>
                      {/* <span className='blog-date'>
                        {comment.created_at.split('T')[0]}
                      </span> */}
                    </div>
                    <p className='comment-text'>{comment}</p>
                  </div>
                )
              })}
            <div className='comment-input-div'>
              <input
                className='comment-input'
                type='text'
                placeholder='Comment'
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button className='comment-btn' onClick={() => handleComment()}>
                Comment
              </button>
            </div>
          </div>
        </div>
      )}</div> :<Payment />}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    blogData: state.blogData,
    user: state.userDetails,
    blogLoading: state.blogLoading
  }
}
const dispatchToProps = dispatch => {
  return {
    getBlogById: id => dispatch(getBlogById(id)),
    likeBlog: id => dispatch(likeBlog(id)),
    addComment: (id, comment) => dispatch(addComment(id, comment)),
    unLikeBlog: id => dispatch(unLikeBlog(id))
  }
}

export default connect(mapStateToProps, dispatchToProps)(Blog)
