

import React from 'react';
import './style.scss';

const LoginSide = () => {
  return (
    <div className="container">
      <div className="login--side">
        <div className="login--side__title">
          <h3>Sign In to Candawada</h3>
          <p>Please kindly fill in your details</p>
        </div>
        <div className='login--side__tabs'>
          <div className='login--side__tabs__btn'>
            <button className='login--side__tabs__btn--email'>Email</button>
            <button className='login--side__tabs__btn--phone'>Phone</button>
          </div>
          <div className='login--side__tabs__bar'>
          </div>
        </div>
        <form className='login--side__form'>
          <label>Email Address</label>
          <input type='email' placeholder='Enter Email Address'/>
          <label>Password</label>
          <div className='login--side__form__rel'>
            <input className="login--side__pwd" type='password' />
            <i class="login--side__form__rel--hide fa-solid fa-eye"></i>
            <i class="login--side__form__rel--show fa-solid fa-eye-slash"></i>
          </div>
          <span>Forgot Password?</span>
          <div className='login--side__form__sign'> 
            <button>Sign In</button>
            <div className='login--side__form__sign__text'>
              <p>Don't have an account yet?</p>
              <a href='/'>Create an account</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginSide