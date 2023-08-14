import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import UserProfile from '../UserProfile/UserProfile'
import { addComment,likeBlog ,sortBlogs,getBlogs ,getFilterBlogs, postType} from '../../Redux/useraction'
import './Blogs.css'
import { Link, Route, Routes } from 'react-router-dom'
import { Navbar, Modal } from 'react-bootstrap'
import Blog from './Blog'
import BlogCard from './BlogCard'
const BlogList = (props) => {

  useEffect(() => {
    props.getBlogs();
    // props.likeBlog(3);
    // props.addComment(3, 'hello');
  }, [props.user.followed_user_ids])

  const[searchText,setSearchText]=useState('');
  const[filter,setFilter]=useState('Author');
  const[sortBy ,setSortBy]=useState('Date');
  const handleSort=(e)=>{
    setSortBy(e.target.value);
    props.sortBlogs(sortBy);
  }

  return (
    <div>
      <div className='blogs-container'>
        <div>
        <select className='filter' onChange={(e)=>setFilter(e.target.value)}>
          <option value='Author'>Author</option>
          <option value='Topic'>Topic</option>
          <option value='Title'>Title</option>
          </select>
          <input className='search' type='text' placeholder='Search' onChange={(e)=>setSearchText(e.target.value)} />

          <button className='search-btn' onClick={()=>props.getFilterBlogs(searchText,filter)}>Search</button>
          <select className='sort' onChange={handleSort}>
          <option value='Like'>Like</option>
          <option value='Comment'>Comment</option>
          <option value='Views'>Views</option>
          </select>
          <button className='sort-btn' onClick={()=>{props.getBlogs();setSearchText('');}}>Reset</button>
          </div>
          <div className='blog-container'>
          <span className='blog-type'onClick={()=>props.postType('top')}>Top</span>
          <span className='blog-type'onClick={()=>props.postType('latest')}>Latest</span>
          {/* <span className='blog-type'onClick ={()=>props.postType('recommend')}>Recommend Post</span> */}
          
         <div>
        
         {!props.blogsLoading? props.blogs.map(post => (
          <BlogCard post={post} />

        )): <h1>Loading...</h1>}
         </div>
       
         </div>
         {/* <div className='top-post'>
        {!props.blogsLoading? props.blogs.map(post => (
          <BlogCard post={post} />
          
        )): <h1>Loading...</h1>}
      </div> */}
      </div>
     
    </div>
  )
}
const mapStateToProps = (state) => {
  return {
    blogs: state.blogs,
    blogsLoading: state.blogsLoading,
    user: state.userDetails
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getBlogs: () => dispatch(getBlogs()),
    getFilterBlogs: (searchText,filter) => dispatch(getFilterBlogs(searchText,filter)),
    sortBlogs: (sortBy) => dispatch(sortBlogs(sortBy)),
    addComment: (id, comment) => dispatch(addComment(id, comment)),
    likeBlog: (id) => dispatch(likeBlog(id)),
    postType: (type) => dispatch(postType(type))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
