import BlogList from './Blog/BlogList'
import LoginPage from './LoginPage/LoginPage'
import jwt from 'jsonwebtoken'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useNavigate,
  redirect
} from 'react-router-dom'
import SignUp from './SignUp'
import Blog from './Blog/Blog'
import { Nav } from 'react-bootstrap'
import Navbar from './Navbar/Navbar'
import AddBlog from './Blog/AddBlog'
import UserProfile from './UserProfile/UserProfile'
import ProtectedRoute from './ProtectedRoute'
import List from './UserProfile/List'
import { getUserById } from '../Redux/useraction'
import setAuthToken from '../Redux/setAuth'
// import Payment from './Payment'

function MainPage (props) {

  const navigate = useNavigate()
  useEffect(() => {
    function fetchData() {
      const token = localStorage.getItem('token');
      if(token){
        props.getUserById(jwt.decode(token, 'SECRET').id);
        setAuthToken(token);
      }
      
    }
    fetchData();
 
    if (props.isLoggedIn) {
      navigate('/')
    } else {
      navigate('/login')
    }
  
  }, [props.isLoggedIn])
  return (
    <div className='App'>
      <Navbar />
      {/* <Payment /> */}
      <Routes>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <BlogList />
            </ProtectedRoute>
          }
        />
        <Route
          path='/blog/:id'
          element={
            <ProtectedRoute>
              <Blog />
            </ProtectedRoute>
          }
        />
        <Route
          path='/user-list/:id'
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path='/add-blog'
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
          <Route
          path='/edit-blog/:id'
          element={
            <ProtectedRoute>
              <AddBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path='/my-profile'
          element={
            <ProtectedRoute>
              <UserProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn,
    user: state.userDetails
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getUserById: id => dispatch(getUserById(id))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
