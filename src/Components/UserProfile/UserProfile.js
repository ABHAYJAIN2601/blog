import { React, useState } from 'react'
import { connect } from 'react-redux'
import './UserProfile.css'
import MyPosts from '../MyPost'
import { updateUser } from '../../Redux/useraction'
import UserList from './UserList'
const UserProfile = props => {
  console.log(props)
  const [formData, setFormData] = useState({})
  const onChange = e => {
    console.log(e.target.value,e.target.name)
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const [activeTab, setActiveTab] = useState(0)

  const handleTabClick = tabIndex => {
    setActiveTab(tabIndex)
  }

  return (
    <div className='profile-wrapper'>
      <h1>User Profile</h1>
      <div className='tab-container'>
        <div className='tab-header'>
          <div
            key={0}
            className={`tab-item ${0 === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(0)}
          >
            {'Post'}
          </div>
          <div
            key={1}
            className={`tab-item ${1 === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(1)}
          >
            {'Profile'}
          </div>
          <div
            key={2}
            className={`tab-item ${2 === activeTab ? 'active' : ''}`}
            onClick={() => handleTabClick(2)}
          >
            {'My List'}
          </div>
        </div>
      </div>
      {activeTab==1&&<div>
        <img src='http://localhost:3001/man.png' alt='profile' className='author-avatar'/>
        <p>{props.user.username}</p>
        <input
          type='text'
          name='bio'
          placeholder='Bio'
          onChange={e => onChange(e)}
          value={props.user.bio}
        />
        <button className="blog-topic" onClick={()=>props.updateUser(formData)}>Update</button>
      </div>}
      {activeTab==0&&<div>
        <MyPosts/>
      </div>}
      {activeTab==2 &&<div>
        <UserList/>
      </div>}
    </div>
  )
}
const mapStateToProps = state => {
  return {
    user: state.userDetails
  }
}
const dispatchStateToProps = dispatch => {
  return {
    updateUser: data => dispatch(updateUser(data))
  }
}
export default connect(mapStateToProps, dispatchStateToProps)(UserProfile)
