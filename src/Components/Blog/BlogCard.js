import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import {
  deleteBlog,
  followUser,
  getUserById,
  logoutUser,
  saveForLater
} from '../../Redux/useraction'
import './Blogs.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import FollowerList from '../UserProfile/FollowerList'
import ProfileModal from './ProfileModal'
import ListModal from './ListModal'

const BlogCard = props => {
  const [authorDetails, setAuthorDetails] = useState({})
  const [authorLoading, setAuthorLoading] = useState(true)

  const [modal, setModal] = useState(false)
  const [listModal, setListModal] = useState(false)
  useEffect(() => {
    var OPTIONS = {
      url: 'http://localhost:3000/profile?id=' + props.post.user_id,
      method: 'GET',
      headers: {
        'content-type': 'application/json'
      }
    }

    axios(OPTIONS)
      .then(res => {
        setAuthorDetails(res.data)
        setAuthorLoading(false)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  
  const followUser = () => {
    if (authorLoading === false) {
      return props.user.followed_user_ids.some(function (el) {
        return el === authorDetails.id
      })
    }
  }
  const handlelistModal = () => {
    setListModal(!listModal)
  }
  return (
    <div className='blog-card' key={props.post.id}>
      <div className='blog-card-author'>
        <img
          className='author-avatar'
          src={'http://localhost:3001/man.png'}
          alt={props.post.title}
          onClick={() => setModal(true)}
        />
        <div className='modal' style={{ display: modal ? 'block' : 'none' }}>
          <ProfileModal user={authorDetails} onClose={() => setModal(false)} />
        </div>
        <div
          className='modal'
          style={{ display: listModal ? 'block' : 'none' }}
        >
          <ListModal
            user={authorDetails}
            onClose={handlelistModal}
            postId={props.post.id}
          />
        </div>
        {!authorLoading ? (
          <p className='blog-author'>{authorDetails.name}</p>
        ) : null}
        <p className='blog-date'>{props.post.created_at.split('T')[0]}</p>
        {followUser() ? (
          <p className='follow'>Following</p>
        ) : (
          <p
            className='follow'
            onClick={() => props.followUser(props.post.user_id)}
          >
            Follow
          </p>
        )}
      </div>
      <div className='blog-card-content-div'>
        <div className='content-wrapper'>
          <h3 className='blog-card-title'>{props.post.title}</h3>

          <p className='blog-card-content'>{props.post.body.slice(0, 150)}</p>
        </div>
        <img
          className='blog-card-img'
          src={'https://miro.medium.com/v2/resize:fit:720/0*a6ca3dUuTTQqcDHJ'}
          alt={props.post.title}
        />
      </div>

      <div className='meta-data-div'>
        <p className='blog-topic'>{props.post.topic}</p>
      </div>
      {props.draft ? (
        <div>
          <div className='card-footer'>
            <Link to={`/blog/${props.post.id}`}>Open</Link>
            <div className='blog-like-container'>
              <img className='like-clap' src='http://localhost:3001/clap.png' />
              <span className='like-count'>{props.post.likes.length}</span>
              <img className='like-clap' src='http://localhost:3001/chat.png' />
              <span className='like-count'>{props.post.comment.length}</span>
            </div>

            {
              <button
                className='blog-topic'
                onClick={() => props.deleteDraft(props.post.id)}
              >
                Delete Draft
              </button>
            }
          </div>
        </div>
      ) : (
        <div className='card-footer'>
          <Link to={`/blog/${props.post.id}`}>View Blog</Link>
          <div className='blog-like-container'>
            <img className='like-clap' src='http://localhost:3001/clap.png' />
            <span className='like-count'>{props.post.likes.length}</span>
            <img className='like-clap' src='http://localhost:3001/chat.png' />
            <span className='like-count'>{props.post.comment.length}</span>
            <span className='like-count'>{'views ' + props.post.views}</span>
          </div>
          <img
            className='save-later-img'
            src='http://localhost:3001/ribbon.png'
            onClick={() => handlelistModal()}
          />

          {props.post.user_id === props.user.id ? (
            <>
              <Link to={`/edit-blog/` + props.post.id} className='blog-topic'>
                Edit Blog
              </Link>
              <button
                className='blog-topic'
                onClick={() => props.deleteBlog(props.post.id)}
              >
                Delete Post
              </button>
            </>
          ) : null}
          {/* <button onClick={()=>editBlog(props.post.id)}>Edit Blog</button> */}
        </div>
      )}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.userDetails
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addBlog: blog => dispatch({ type: 'ADD_BLOG', payload: blog }),
    deleteBlog: id => dispatch(deleteBlog(id)),
    editBlog: id => dispatch({ type: 'EDIT_BLOG', payload: id }),
    saveForLater: id => dispatch(saveForLater(id)),
    followUser: id => dispatch(followUser(id)),
    getUserByID: id => dispatch(getUserById(id)),
    deleteDraft: id => dispatch({ type: 'DELETE_DRAFT', payload: id })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogCard)
