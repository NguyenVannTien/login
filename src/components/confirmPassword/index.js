import axios from 'axios';
import React, { useState } from 'react';
import Input from '../Input/Input';
import LeftRegister from '../leftRegister';
import { useNavigate } from 'react-router-dom';
import'./style.scss'

const ConfirmPassword = () => {

  const getDataRegister = JSON.parse(localStorage.getItem('dataRegister'));
  const [dataRegister, setDataRegister] = useState(getDataRegister || {});

  const [type, setType] = useState('password');
  const [password, setPassword] = useState('');;
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmitConfirmPassword = (e) =>{
    e.preventDefault();
    if(isSubscribed === true){
      if(password !== confirmPassword){
        setError('Thông tin mật khẩu không khớp!')
      }else if(password === '' || confirmPassword === ''){
        setError('Vui lòng nhập đầy đủ thông tin tài khoản password')
      }else{
        ConfirmPassword();
      }
    }else{
      setError('Hãy chấp nhận thoản thuận của chúng tôi');
    }
  }

  const ConfirmPassword = async () => {
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
      'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
    }

    const params = {
      phoneNumber: dataRegister?.phoneNumber,
      emailAddress: dataRegister?.emailAddress,
      firstName:dataRegister?.firstName,
      lastName: dataRegister?.lastName,
      countryCode:dataRegister?.countryCode[0].shortCode,
      businessName:'onboarding',
      accountType: 'Personal',
      password: password,
    }

    axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/onboarding/signup', params, {headers})
    .then(() => {
      localStorage.clear();
      navigate('/register/success')
    })
    .catch((res) => {
      setError(res.response.data.data.errors[0].message);
    })
  }
  console.log('error', error);

  const handleChangeCheckEccept = (event) => {
    if (event.target.checked) {
      setIsSubscribed(true)
    } else {
      setIsSubscribed(false)
    }
  };
 
  return (
    <div className='register'>
      <LeftRegister />
      <div className='container-register'>
        <h3>Confirm Password</h3>
        <p>Kindy select your account type</p>
        <form className='form-register'
          onSubmit={handleSubmitConfirmPassword}
        >
          <div className='login--side__form__rel'>
            <Input label='Enter Password' className="login--side__pwd" type={type}
              onChange = {(e) => {
                setPassword(e.target.value)
              }} 
            />
            {
              type === 'password' &&
              <i className="login--side__form__rel--show password__reset fa-solid fa-eye-slash"
                onClick={() => setType('text')}
              /> 
            }
            {
              type === 'text' &&
              <i className="login--side__form__rel--hide password__reset fa-solid fa-eye"
                onClick={() => setType('password')}
              />  
            }
          </div>
          <div className='login--side__form__rel'>
            <Input label='Confirm Password' className="login--side__pwd" type={type}
              onChange = { (e) => {
                setConfirmPassword(e.target.value)
              }}
            />
            {
              type === 'password' &&
              <i className="login--side__form__rel--show password__reset fa-solid fa-eye-slash"
                onClick={() => setType('text')}
              /> 
            }
            {
              type === 'text' &&
              <i className="login--side__form__rel--hide password__reset fa-solid fa-eye"
                onClick={() => setType('password')}
              />  
            }
          </div>
          <div className='form-register__accept'>
            <input 
              type='checkbox' 
              className='input__checked' 
              onChange={handleChangeCheckEccept}
            />
            <p>I agree to the <a href='#'>Terms of Sevice</a> and <a href='#'>Sevice Agreement</a></p>
          </div>
          {
            error.length > 0 && 
            <div className='form-register__error'>
              <p>{error}</p>
            </div>
          }
          <button 
            className={isSubscribed ? 
              'form-register__accept__btn btn__active': 
              'form-register__accept__btn ' 
            }
            type='submit'
          >
            Continue
          </button>
        </form>
      </div>

    </div>
  )
}

export default ConfirmPassword;