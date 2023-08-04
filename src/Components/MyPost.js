import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import BlogCard from './Blog/BlogCard';
const { getUserBlogs } = require('../Redux/useraction');

const MyPosts = props => {
    useEffect(() => {  
        props.getUserBlogs(props.user.id)
    },[]);
    return (
        <div>
        {!props.blogsLoading? props.blogs.map(blog => {
            return (
                <BlogCard post={blog}/>
            )
        }): <h1>Loading...</h1>}
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user: state.userDetails,
        blogs: state.blogs,
        blogsLoading: state.blogsLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getUserBlogs:(id)=>dispatch(getUserBlogs(id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MyPosts)