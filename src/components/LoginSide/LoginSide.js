

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import './style.scss';
// import onLogin from '../../pages/auth/api';

const LoginSide = () => {

  const [check, setCheck] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  
  useEffect( () => {
    if(localStorage.getItem('login-info')){
    }
  },[])

  const handleLoginForm = async (e) =>{
    e.preventDefault();
    const item = {email, password}
    const response = await fetch('https://cadawada-api-dev.niw.com.vn/api/v1/authenticate/login', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
        'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd'
      },
      body: JSON.stringify(item),
    });
    const res = await response.json();
    localStorage.setItem('login-info', JSON.stringify(res));
    navigate('/')
  }
  
  
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
        <form className='login--side__form'
          onSubmit={handleLoginForm}
        >
          {check ?
            <>
            <label>Phone Number</label>
            <div className='login--side__form__phone'>
              <select name="cars" id="cars">
                <option value="vietnamese">+84</option>
                <option value="USA">+213</option>
                <option value="English">+63</option>
                <option value="Lao">+1</option>
              </select>
              <input   placeholder='Enter Phone Number' type='text' /> 
            </div> 
            </> :
            <Input label='Email Address'  placeholder='Enter Email Address' type='email' 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            /> 
          }
          <div className='login--side__form__rel'>
            <Input label='Password' className="login--side__pwd" type='password' 
              value={password}
              onChange={(event) => setPassword(event.target.value)} 
            />
            <i className="login--side__form__rel--hide fa-solid fa-eye"></i>
            <i className="login--side__form__rel--show fa-solid fa-eye-slash"></i>
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