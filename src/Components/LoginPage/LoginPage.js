import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useNavigate ,Link} from 'react-router-dom'
import { loginUser } from '../../Redux/useraction'
import './LoginPage.css'
function LoginPage (props) {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const handleLogin = () => {
    if (username && password) {
      // alert('Login Successful');
      console.log(props)
      localStorage.setItem('isLoggedIn', true)
      localStorage.setItem('username', username)

      props.loginUser(username, password)
      navigate('/')
    } else {
      alert('Invalid Credentials')
    }
  }
  return (
    <div>
      <div class='container'>
        <div class='login-body'>
          <div class='row align-items-center justify-content-center'>
            <div class='col-md-5'>
              <div class='login-img'>
                <img src='imgs/login.jpg' alt='' class='img-fluid' />
              </div>
            </div>
            <div class='col-md-12'>
              <div class='login-form'>
                <h3>SIGN IN</h3>
                <form action=''>
                  <div class='mail-input'>
                    <div class='input-group flex-nowrap'>
                      <span class='input-group-text' id='addon-wrapping'>
                        <i class='fa-solid fa-envelope'></i>
                      </span>
                      <input
                        id='signInEmail'
                        type='text'
                        class='form-control'
                        placeholder='Username'
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                      />
                    </div>
                  </div>
                  <div class='password-input'>
                    <div class='input-group flex-nowrap'>
                      <span class='input-group-text' id='addon-wrapping'>
                        <i class='fa-solid fa-lock'></i>
                      </span>
                      <input
                        id='signInPassword'
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        class='form-control'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                      />
                    </div>
                  </div>
                  <p id='loginError' class='alert text-danger d-none'>
                    Your email or password is wrong or cant be empty
                  </p>
                  <a id='signInBtn' class='submit d-block m-auto mb-5 ' onClick={handleLogin}>
                    Login
                  </a>
                </form>
                <Link to='/signup'>Do not have an account ? Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    // addBlog: (newPost) => dispatch(addBlog(newPost)),
    // deleteBlog: (id) => dispatch(deleteBlog(id)),
    loginUser: (username, password) => dispatch(loginUser(username, password))
  }
}
export default connect(null, mapDispatchToProps)(LoginPage)
