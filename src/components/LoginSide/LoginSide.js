

import React, { useState } from 'react';
import Input from '../Input/Input';
import './style.scss';

const LoginSide = () => {

  const [check, setCheck] = useState(false)

  return (
    <div className="container">
      <div className="login--side">
        <div className="login--side__title">
          <h3>Sign In to Candawada</h3>
          <p>Please kindly fill in your details</p>
        </div>
        <div className='login--side__tabs'>
          <div className='login--side__tabs__btn'>
            <button className={ check ? 'login--side__tabs__btn--email' : 
              'login--side__tabs__btn--email active '}
              onClick={() => setCheck(false)}
            >
              Email
            </button>
            <button className={ check ? 'login--side__tabs__btn--phone active' : 
              'login--side__tabs__btn--phone  '}
              onClick={()=> setCheck(true)}
            >
              Phone
            </button>
          </div>
          <div className='login--side__tabs__bar'>
            <div  className={check ? 
              'login--side__tabs__bar--active toggle' : 
              'login--side__tabs__bar--active'}
            >
            </div>
          </div>
        </div>
        <form className='login--side__form'>
          {check ?
            <Input  label='Phone Number' placeholder='Enter Phone Number' type='text' /> :
            <Input label='Email Address'  placeholder='Enter Email Address' type='text' /> 
          }
          <div className='login--side__form__rel'>
            <Input label='Password' className="login--side__pwd" type='password' />
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