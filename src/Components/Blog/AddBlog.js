import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './AddBlog.css'
import { addBlog, getBlogById, saveDraft ,editBlog, getRevision} from '../../Redux/useraction'
import { useParams } from 'react-router-dom'
import RevisionList from './RevisionList'

const AddBlog = props => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const [blogData, setBlogData] = useState({
    // title : "",
    // body : "",
    // user_id: props.user.id,
    // description : "",
    // created_at : "",
    // updated_at : "",
    // views : 0,
    // likes : [],
    // comment : [],
    // commenters : [],
    // // id:1,
    // image : "",
    // topic: "",
  })
  const onChange = e => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value })
  }
  useEffect(() => {
    if (id) {
      props.getBlogById(id);
    }else{
      console.log("else")
      setBlogData({
        title : "",
        body : "",
        user_id: props.user.id,
        description : "",
        created_at : "",
        updated_at : "",
        views : 0,
        likes : [],
        comment : [],
        commenters : [],
        // id:1,
        image : "",
        topic: "",
      })
      console.log(blogData)
    }
  
    if (!props.blogLoading && id) {
      setBlogData(props.blogData);
    }
    props.getRevision(id);
    return () => {
      setBlogData({});
    }
  }, [props.blogLoading,id]);
  const addBlog = () => {
    const newPost = {
      title: blogData.title,
      body: blogData.body,
      user_id: props.user.id,
      description: blogData.description,
      created_at: '',
      updated_at: '',
      views: 0,
      likes: [],
      comment: [],
      commenters: [],
      // id:1,
      image: blogData.image,
      topic: blogData.topic
    }
    props.addBlog(newPost)
  }
  const editBlog = () => {
    const newPost = {
      title: blogData.title,
      body: blogData.body,
      user_id: props.user.id,
      description: blogData.description,
      image: blogData.image,
      topic: blogData.topic,
      id:blogData.id
    }
    props.editBlog(id,newPost);
  }
  const saveDraft = () => {
    const newPost = {
      title: blogData.title,
      body: blogData.body,
      user_id: props.user.id,
      description: blogData.description,
      created_at: '',
      updated_at: '',
      views: 0,
      likes: [],
      comment: [],
      commenters: [],
      // id:1,
      image: blogData.image,
      topic: blogData.topic
    }
    props.saveDraft(newPost)
  }
  const handlelistModal = () => {
    setModal(!modal);
    props.getRevision(id);
  }
  return (
    <div className='add-post-container'>
      <div className='add-post-form'>
        <input
          type='text'
          name='title'
          placeholder='Title'
          value={blogData.title}
          onChange={onChange}
        />
        <input
          type='text'
          name='topic'
          placeholder='Topic'
          value={blogData.topic}
          onChange={onChange}
        />
        <input
          type='text'
          name='description'
          placeholder='Description'
          value={blogData.description}
          onChange={onChange}
        />
        <textarea
          type='text'
          name='body'
          placeholder='Body'
          value={blogData.body}
          onChange={onChange}
        />
        <input
          type='text'
          name='image'
          placeholder='Featured Image'
          value={blogData.image}
          onChange={onChange}
        />
         <div
          className='modal'
          style={{ display: modal ? 'block' : 'none' }}
        >
          <RevisionList
            // user={authorDetails}
            onClose={handlelistModal}
            postId={id}
            setState = {setBlogData}
          />
        </div>
        {/* <textarea type="text" name="text" placeholder="Text" onChange={onChange} /> */}
        {id? <div>
          <button className='btn-primary' onClick={() => editBlog()}>
          Edit Blog
        </button>
        <button className='btn-primary' onClick={handlelistModal}>See Revision</button>
        </div> : <button className='btn-primary' onClick={() => addBlog()}>Add Blog</button>}
       
        <button className='btn-primary' onClick={() => saveDraft()}>
          Save Drafts
        </button>
        
      </div>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    blogs: state.blogs,
    user: state.userDetails,
    blogLoading: state.blogLoading,
    blogData: state.blogData
  }
}
const mapDispatchToProps = dispatch => {
  return {
    addBlog: blog => dispatch(addBlog(blog)),
    saveDraft: blog => dispatch(saveDraft(blog)),
    getBlogById: id => dispatch(getBlogById(id)),
    editBlog: (id,blog) => dispatch(editBlog(id,blog)),
    getRevision: id => dispatch(getRevision(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddBlog)
