import React, { useEffect, useState } from 'react'
import './Blog.css'
const { connect } = require('react-redux')
const { useParams } = require('react-router-dom')

const { getBlogById, addComment, likeBlog } = require('../../Redux/useraction')
function Blog (props) {
  const params = useParams()
  const [comment, setComment] = useState('')
  const handleComment = () => {
    if (comment) {
      props.addComment(params.id, comment)
      setComment('')
    } else {
      //   alert('Invalid Credentials');
    }
  }
  useEffect(() => {
    props.getBlogById(params.id)
    console.log(props)
  }, [])
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <div>
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
              src={'http://localhost:3000/blog1.webp'}
              alt={props.blogData.title}
            />
            <span className='blog-author'>{props.blogData.author}</span>
            <span className='blog-date'>{props.blogData.dateTime}</span>
            <p className='blog-topic'>{props.blogData.topic}</p>
          </div>

          
        
          <img
            src={'http://localhost:3000/blog1.webp'}
            alt={props.blogData.title}
          />
          <p className='blog-content'>{props.blogData.text}</p>
          <div className='blog-like-container'>
          <img className='like-clap' src='http://localhost:3000/clap.png' onClick={()=>props.likeBlog(props.blogData.id)}/>
            <span className='like-count'>{props.blogData.likes}</span>
           <img className='like-clap' src='http://localhost:3000/chat.png'/>
            <span className='like-count'>{props.blogData.comments.length}</span>
            </div>
          <div className='comment-section'>
            <h1>Comments</h1>
            {props.blogData.comments.length>0 && props.blogData.comments.map(comment => {
              return (
                <div className='comment'>
                  <div className='author-section'>
                  <img
                    className='author-avatar'
                    src={'http://localhost:3000/blog1.webp'}
                    alt={props.blogData.title}
                  />
                  <span className='blog-author'>{comment.author}</span>
                  </div>
                  <p className='comment-text'>{comment.comment}</p>
                </div>
              )
            })}
            <input
              type='text'
              placeholder='Comment'
              value={comment}
              onChange={e => setComment(e.target.value)}
            />
            <button onClick={() => handleComment()}>Comment</button>
          </div>
        </div>
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    blogData: state.blogData,
    blogLoading: state.blogLoading
  }
}
const dispatchToProps = dispatch => {
  return {
    getBlogById: id => dispatch(getBlogById(id)),
    likeBlog: id => dispatch(likeBlog(id)),
    addComment: (id, comment) => dispatch(addComment(id, comment))
  }
}

export default connect(mapStateToProps, dispatchToProps)(Blog)
