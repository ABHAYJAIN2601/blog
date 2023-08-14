import React, { useEffect } from 'react'
import './ProfileModal.css' // Import your CSS file
import {
  createList,
  getRevision,
  getUserLists,
  saveForLater
} from '../../Redux/useraction'
import { connect } from 'react-redux'
import Blog from './Blog'
import BlogCard from './BlogCard'
import { Link } from 'react-router-dom'

function RevisionList (props) {
  useEffect(() => {
    console.log(props)
    console.log('hey')
    props.getRevision(props.postId)
  }, []);
  const handleVersion = (post) => {
    props.setState(post);
    props.onClose();
  }
  return (
    <div className='profile-modal'>
      <div className='profile-content'>
        <div className='profile-header'>
          <div>
            <span>Your Revisions</span>
          </div>

          <button className='close-button' onClick={props.onClose}>
            Close
          </button>
        </div>
        <div className='profile-details'>
          {!props.listLoding &&
            props.userLists &&
            props.userLists.revisions.map(post => {
              return (
                <div>
                  <div className='blog-card' key={post.id}>
                    
                    <div className='blog-card-content-div'>
                      <div className='content-wrapper'>
                        <h3 className='blog-card-title'>{post.title}</h3>

                        <p className='blog-card-content'>
                          {post.body.slice(0, 150)}
                        </p>
                      </div>
                      <img
                        className='blog-card-img'
                        src={
                          'https://miro.medium.com/v2/resize:fit:720/0*a6ca3dUuTTQqcDHJ'
                        }
                        alt={post.title}
                      />
                    </div>

                    <div className='meta-data-div'>
                      <p className='blog-topic'>{post.topic}</p>
                    </div>
                    <div className = 'card-footer'>
                    <button className='blog' onClick={()=>handleVersion(post)} >Shift This Version</button>
                   </div>
                    
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    user: state.userDetails,
    userLists: state.blogRevisionData,
    listLoding: state.revisionListLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserLists: data => dispatch(getUserLists(data)),
    createList: data => dispatch(createList(data)),
    saveForLater: (data, postId) => dispatch(saveForLater(data, postId)),
    getRevision: data => dispatch(getRevision(data))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RevisionList)
