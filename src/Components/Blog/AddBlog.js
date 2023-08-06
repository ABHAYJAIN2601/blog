import React, { useState } from 'react';
import { connect } from 'react-redux';
import './AddBlog.css';
import { addBlog } from '../../Redux/useraction';

const AddBlog = (props) => {
    const [blogData , setBlogData] = useState({});
    const onChange = (e) => {
      setBlogData({...blogData, [e.target.name]: e.target.value});
    };
  
    const addBlog = () => {
        const newPost = {
          title: blogData.title,
          topic: blogData.topic,
          featured_image: blogData.featuredImage,
          text: blogData.text,
          created_at: new Date().toISOString(),
          author: props.user.username,
          likes:[],
          comments:[]
        }
          props.addBlog(newPost);
        // setPosts([...posts, newPost]);
      };
    return (
        <div className='add-post-container'>
          <div className='add-post-form'>
          <input type="text"  name="title" placeholder="Title" onChange={onChange} />
      <input type="text" name="topic" placeholder="Topic" onChange={onChange} />
      <input type="text" name="featuredImage" placeholder="Featured Image" onChange={onChange} />
      <textarea type="text" name="text" placeholder="Text" onChange={onChange} />
      <button className='btn-primary'onClick={() => addBlog()}>Add Post</button>
          </div>
       
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
      blogs: state.blogs,
      user: state.userDetails,
    };
  }
  const mapDispatchToProps = (dispatch) => {
    return {
      addBlog: (blog) => dispatch(addBlog(blog)),
    };
  }
  
  export default connect(mapStateToProps,mapDispatchToProps)(AddBlog);
  