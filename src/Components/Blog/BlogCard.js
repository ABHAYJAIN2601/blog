import React  from 'react'
import { connect } from 'react-redux'
import { followUser, logoutUser ,saveForLater} from '../../Redux/useraction'
import './Blogs.css'
import { Link } from 'react-router-dom'

const BlogCard = (props) => {
  console.log(props)
    return (
        <div className='blog-card' key={props.post.id}>
            <div className='blog-card-author'>
              <img
                className='author-avatar'
                src={'http://localhost:3001/man.png'}
                alt={props.post.title}
              />
              <p className='blog-author'>{props.post.author}</p>
              <p className='blog-date'>{props.post.created_at.split('T')[0]}</p>
              <p className='follow' onClick={()=>followUser(props.post.author_id)}>Follow</p>
            </div>
            <div className='blog-card-content-div'>
              <div className='content-wrapper'>
                <h3 className='blog-card-title'>{props.post.title}</h3>

                <p className='blog-card-content'>{props.post.text.slice(0, 150)}</p>
              </div>
              <img
                className='blog-card-img'
                src={props.post.featuredImage}
                alt={props.post.title}
              />
            </div>

            <div className='meta-data-div'>
              <p className='blog-topic'>{props.post.topic}</p>
            </div>
            <div className='card-footer'>
              <Link to={`/blog/${props.post.id}`}>View Blog</Link>
              <div className='blog-like-container'>
          <img className='like-clap' src='http://localhost:3001/clap.png' />
            <span className='like-count'>{props.post.likes.length}</span>
           <img className='like-clap' src='http://localhost:3001/chat.png'/>
            <span className='like-count'>{props.post.comments.length}</span>
            </div>
              <img className='save-later-img' src='http://localhost:3001/ribbon.png' onClick={()=> props.saveForLater(props.post.id)}/>
              {(<button className="blog-topic" onClick={() => props.deleteBlog(props.post.id)}>Delete Post</button>)}
          {/* <button onClick={()=>editBlog(props.post.id)}>Edit Blog</button> */}
            </div>
          </div>
    );
}
const mapStateToProps = (state) => {
    return {
      blogs: state.blogs,
      user: state.userDetails
    }
  }
  const mapDispatchToProps = dispatch => {
    return {
      addBlog: blog => dispatch({ type: 'ADD_BLOG', payload: blog }),
      deleteBlog: id => dispatch({ type: 'DELETE_BLOG', payload: id }),
      editBlog: id => dispatch({ type: 'EDIT_BLOG', payload: id }),
      saveForLater: id =>dispatch(saveForLater(id)),
      followUser: id => dispatch(followUser(id)),  
    }
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(BlogCard)
  
