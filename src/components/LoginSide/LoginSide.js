

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../Input/Input';
import './style.scss';

const LoginSide = () => {

  const [check, setCheck] = useState(false);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [cshortCode, setCShortCode] = useState('');

  const [type, setType]= useState('password');
  const navigate = useNavigate();
  const [listCountry, setListCountry] = useState([]);


  useEffect(() => {
    try {
      const getFetchApi = async () =>{
        const headers = { 
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
          'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
        }
        const res = await axios.get('https://cadawada-api-dev.niw.com.vn/api/v1/country', {headers})
        setListCountry(res.data.data)
      }
      getFetchApi();
      
    } catch (error) {
      console.log("call api error");
    }
  }, [])

  const handleLoginForm =  (e) =>{
    e.preventDefault();
    const body = {
      userIdentity: check ? phone : email,
      password: password,
      countryCode: check ? cshortCode.shortCode : "",
    }
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
      'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
    }

    axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/authenticate/login',body, {headers})
    .then((res) => {
      if(res && res.data.data.login.token.accessToken) {
        localStorage.setItem('dataSignup', JSON.stringify(res.data.data.login))
        handleLoginCheck();
      }
    })
    .catch(() =>{
      alert('loiiii!!!!')
    })
  }

  const handleSelectDiallingCode = (e) => {
    const value = e.target.value;
    const item = listCountry.find((item) => item.diallingCode === value)
    setCShortCode(item)
  }

  const handleLoginCheck = () =>{
    if(check === false){
      navigate('/login/confirm-email')
    }else{
      navigate('/login/confirm-phone')
    }
  }

  return (
    <div className="container-register">
      <div className="login--side">
        <div className="login--side__title">
          <h3>Sign In to Candawada</h3>
          <p>Please kindly fill in your details</p>
        </div>
        <div className='login--side__tabs'>
          <div className='login--side__tabs__btn'>
            <button className={ check ? 'login--side__tabs__btn--email ' : 
              'login--side__tabs__btn--email active'}
              onClick={() => {
                setCheck(false)
                setPhone('')
                setPassword('')
              }}
            >
              Email
            </button>
            <button className={ check ? 'login--side__tabs__btn--phone active' : 
              'login--side__tabs__btn--phone  '}
              onClick={()=> {
                setCheck(true)
                setEmail('')
                setPassword('')
              }}
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
              <select name="diallingCode" id="diallingCode"
                onChange={handleSelectDiallingCode}
              >
                <option selected>Select...</option>
                {listCountry?.map((item)=>(
                  <option key={item.id} value={item.diallingCode} >
                    +{ item.diallingCode }
                  </option>
                ))}
              </select>
              <input   placeholder='Enter Phone Number' type='text'
                value={phone}
                onChange = {(e) => setPhone(e.target.value)}
              /> 
            </div>    
            </> :
            <Input label='Email Address'  placeholder='Enter Email Address' type='email' 
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            /> 
          }
          <div className='login--side__form__rel'>
            <Input label='Password' className="login--side__pwd" type={type}
              value={password}
              onChange={(event) => setPassword(event.target.value)} 
            />
            {
              type === 'password' &&
              <i className="login--side__form__rel--show fa-solid fa-eye-slash"
                onClick={() => setType('text')}
              /> 
            }
            {
              type === 'text' &&
              <i className="login--side__form__rel--hide fa-solid fa-eye"
                onClick={() => setType('password')}
              />  
            }
          </div>
          <span>Forgot Password?</span>
          <div className='login--side__form__sign'> 
            <button>Sign In</button>
            <div className='login--side__form__sign__text'>
              <p>Don't have an account yet?</p>
              <a href='/register'>Create an account</a>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginSide