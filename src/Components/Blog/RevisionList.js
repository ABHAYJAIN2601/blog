import React, { useEffect } from 'react'
import './ProfileModal.css' // Import your CSS file
import {
  createList,
  deleteRevision,
  getRevision,
  getUserLists,
  saveForLater
} from '../../Redux/useraction'
import { connect } from 'react-redux'

function RevisionList (props) {
  useEffect(() => {
    props.getRevision(props.postId)
  }, [props.revisionBlog]);
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
            props.userLists.revisions.map((post,index) => {
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
                    <button className='blog' onClick={()=>props.deleteRevision(post.id,index)} >Delete Version</button>
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
    revisionBlog:state.revisionBlog,
    userLists: state.blogRevisionData,
    listLoding: state.revisionListLoading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserLists: data => dispatch(getUserLists(data)),
    createList: data => dispatch(createList(data)),
    saveForLater: (data, postId) => dispatch(saveForLater(data, postId)),
    getRevision: data => dispatch(getRevision(data)),
    deleteRevision: (postId,id) => dispatch(deleteRevision(postId,id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(RevisionList)
