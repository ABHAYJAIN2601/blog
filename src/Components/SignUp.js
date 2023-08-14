import React, { useState } from 'react'
import { signupUser } from '../Redux/useraction'
import { connect } from 'react-redux'
const SignUp = (props) => {
  const [formData, setFormData] = useState({})
  const handleSubmit = () => {
    console.log(formData)
    props.signupUser(formData.email, formData.password,formData.name)
  }
  const onChange = e => {
    // console.log(e.target.value)
    setFormData({ ...formData, [e.target.name]: e.target.value });
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
                <h3>SIGN UP</h3>
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
                        placeholder='Email'
                        name='email'
                        onChange={onChange}
                        aria-label='Email'
                        aria-describedby='addon-wrapping'
                      />
                    </div>
                  </div>
                  <div class='mail-input'>
                    <div class='input-group flex-nowrap'>
                      <span class='input-group-text' id='addon-wrapping'>
                        <i class='fa-solid fa-envelope'></i>
                      </span>
                      <input
                        id='signInEmail'
                        type='text'
                        class='form-control'
                        placeholder='Name'
                        name='name'
                        onChange={onChange}
                        aria-label='Name'
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
                        name='password'
                        placeholder='Password'
                        onChange={onChange}
                        class='form-control'
                        aria-label='Username'
                        aria-describedby='addon-wrapping'
                      />
                    </div>
                  </div>
                  <p id='loginError' class='alert text-danger d-none'>
                    Your email or password is wrong or cant be empty
                  </p>
                  <a
                    id='signInBtn'
                    class='submit d-block m-auto mb-5 '
                    onClick={handleSubmit}
                  >
                    SignUp
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
const dispatchStateToProps = dispatch => {
  return {
    signupUser: (email,password,name) => dispatch(signupUser(email,password,name))
  }
}
export default connect(null, dispatchStateToProps)(SignUp)
