import BlogList from './Blog/BlogList'
import LoginPage from './LoginPage/LoginPage'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useNavigate
} from 'react-router-dom'
import SignUp from './SignUp'
import Blog from './Blog/Blog'
import { Nav } from 'react-bootstrap'
import Navbar from './Navbar/Navbar'
import AddBlog from './Blog/AddBlog'
import UserProfile from './UserProfile/UserProfile'
import ProtectedRoute from './ProtectedRoute'

function MainPage (props) {
  //   const [user, setUser] = useState('');
  let protectedRoutes
  const navigate = useNavigate()
  useEffect(() => {
    const user = localStorage.getItem('username')
    console.log(props.isLoggedIn)
    if (props.isLoggedIn) {
      //   setUser(user);
      console.log(user, props.user)
      protectedRoutes = (
        <>
          <Route path='/dashboard' element={<BlogList />} />
        </>
      )
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [])
  return (
    <div className='App'>
      <Navbar />
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
        <Route path='/blog/:id' element={<Blog />} />
        <Route path='/add-blog' element={<AddBlog />} />
        <Route path='/my-profile' element={<UserProfile />} />
      </Routes>
    </div>
  )
}
const mapStateToProps = state => {
  return {
    isLoggedIn: state.isLoggedIn
  }
}
export default connect(mapStateToProps, null)(MainPage)
