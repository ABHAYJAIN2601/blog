import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import UserProfile from '../UserProfile/UserProfile'
import { logoutUser ,saveForLater,getBlogs} from '../../Redux/useraction'
import './Blogs.css'
import { Link, Route, Routes } from 'react-router-dom'
import { Navbar, Modal } from 'react-bootstrap'
import Blog from './Blog'
import BlogCard from './BlogCard'
const BlogList = (props) => {

  useEffect(() => {
    props.getBlogs();
  }, [])

  return (
    <div>
      <div className='blogs-container'>
        {!props.blogsLoading? props.blogs.map(post => (
          <BlogCard post={post} />
        )): <h1>Loading...</h1>}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogList)
