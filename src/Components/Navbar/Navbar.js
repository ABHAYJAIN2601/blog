import React from 'react'
import { connect } from 'react-redux'
import './Navbar.css'
import { Link } from 'react-router-dom';
import { logoutUser } from '../../Redux/useraction';
const Navbar = (props) => {
  return (
    <div>
      <nav class='navbar'>
        <div class='navbar-container'>
          <div class='logo'>
            <a href='#'>Your Blog</a>
          </div>
          <ul class='nav-links'>
            <li>
                <Link to='/'>Home</Link>
              {/* <a href='/dashboard'>Home</a> */}
            </li>
            <li>
              <Link to='/my-profile'>My Profile</Link>
            </li>
            <li>
              <Link to='/login'>{props.userName?props.userName: 'Sign In'}</Link>
            </li>
            <li>
            <Link to='/add-blog'>Add Blog</Link>
            </li>
            <li className='logout-btn'>
            <Link onClick={()=>props.logoutUser()}>Log Out</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    userName: state.userDetails.username,
    isLoggedIn: state.isLoggedIn
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logoutUser: () => dispatch(logoutUser())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)
