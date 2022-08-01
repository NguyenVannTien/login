import axios from 'axios';
import React, { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
import { useLocation, useNavigate } from "react-router-dom";
import LeftRegister from "../leftRegister/index";
import './style.scss';


const VerifyEmail = () => {

  const getDataSignUp = JSON.parse(localStorage.getItem('dataSignup'))
  const [dataSignUp, setDataSignUp] = useState(getDataSignUp || {})
  
  const getDataRegister = JSON.parse(localStorage.getItem('dataRegister'))
  const [dataRegister, setDataRegister] = useState(getDataRegister || {})

  const [otp, setOtp] = useState('')
  const [countDownOTP, setCountDownOTP] = useState('')

  const [dataConfirm, setDataConfirm] = useState('')

  const location = useLocation()
  const arrType = location.pathname.split('/')
  const navigate = useNavigate();

  const [error, setError] =useState('')

  useEffect (() => {
    if(arrType[2] === 'confirm-phone'){
      ConfirmPhone();
    }else ConfirmEmail();
  },[location.pathname])

  useEffect( () => {
    let countDown;
    handleCountDownOtp(countDown);
    return clearTimeout(countDown)
  })

  const ConfirmEmail = async () => {
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
      'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
    }
    const params = {
      emailAddress:
        arrType[1] === 'register' ? dataRegister?.emailAddress : dataSignUp.account.emailAddress,
      confirmationPurpose: 'onboarding',
      firstName:
        arrType[1] === 'register'? dataRegister?.firstName : dataSignUp.user.firstName,
    }
      
      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/confirm-email', params, {headers})
      .then((res) => {
        setCountDownOTP(res.data.data.countDown);
        setDataConfirm(res.data.data)
      })
      .catch((res) => {
        setError(res.data.data.errors[0].message)
      })
      
    }

    const VerifyEmail = async () => {
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
        'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
      }

      const params = {
        verificationReference: dataConfirm?.verificationReference,
        otpCode: otp,
        userIdentity:dataRegister?.emailAddress,
      }

      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/verify-email', params , {headers})

      .then(() => {
        handleCheckParams();
      })
      .catch((res) => {
        setError(res.data.data.errors[0].message)
      })

    }

    const ConfirmPhone = async () => {

      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
        'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
      }
      const params = {
        phoneNumber:
         arrType[1] === 'register' ? dataRegister?.phoneNumber : dataSignUp.account.phoneNumber,
        confirmationPurpose: 'onboarding',
        diallingCode: 
          arrType[1] === 'register' ? dataRegister?.countryCode[0].diallingCode : dataSignUp.country.diallingCode
      }

      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/confirm-phonenumber', params , {headers})

      .then((res) => {
        setCountDownOTP(res.data.data.countDown);
        setDataConfirm(res.data.data)
      })
      .catch((res) => {
        setError(res.data.data.errors[0].message)
      })
    }

    const VerifyPhone = async () => {
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
        'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
      }

      const params = {
        verificationReference: dataConfirm?.verificationReference,
        otpCode: otp,
        userIdentity:dataRegister?.phoneNumber,
      }

      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/verify-phonenumber', params , {headers})

      .then((res) => {
        handleCheckParams();
      })
      .catch((res) => {
        setError(res.data.data.errors[0].message)
      })

    }

    const handleClickProcess = () => {

      if(arrType[2] === 'confirm-email'){
        VerifyEmail();
      }
      if(arrType[2] ==='confirm-phone'){
        VerifyPhone();
      }
    }

    const handleCheckParams = () => {
      if (otp.length === 6 && arrType[1] === 'login'){
        localStorage.clear();
        navigate('/')
      }else if(otp.length === 6 && arrType[1] === 'register'){
        navigate('/register/confirm-password')
      }else{
        setError('Nhập đủ otp-6 kí tự')
      }
    }

    
    const handleCountDownOtp = (countDown) => {
      if(countDownOTP > 0){
        countDown = setTimeout(() => {
          setCountDownOTP(countDownOTP - 1)
        },1000)
      }
    }

    const handleClickResendOTP = () => {
      if(countDownOTP === 0 && arrType[2] === 'confirm-email'){
        ConfirmEmail();
        handleCountDownOtp();
      }else if(countDownOTP === 0 && arrType[2] === 'confirm-phone'){
        ConfirmPhone();
        handleCountDownOtp();
      }
      else{
        setError("Sau 30s mới được gửi mã mới");
      }
            
    }
    
  return (
    <div className='register'>
      <LeftRegister />
      <div className='register-email'>
        <div className='register-email__description'>
          {arrType[2] ==='confirm-email' ?
            <>
              <div className='register-email__description__logo'>
                <i class="logo__icon fa-solid fa-envelope-open-text"></i>
              </div>
              <h3>Verify your Email Address</h3>
              <p>Enter the 6-digits OTP sent to your mail</p>
            </> :
            <>
              <div className='register-email__description__logo'>
              <i class="logo__icon fa-solid fa-mobile-screen-button"></i>
              </div>
              <h3>Verify your Phone Number</h3>
              <p>Enter the 6-digits OTP sent to your phone number <br/> <span>+{dataRegister.phoneNumber} {dataSignUp.account.phoneNumber}</span></p>
            </>
          } 
          <OtpInput
            value={otp}
            onChange={(e)=> setOtp(e) }
            numInputs={6}
            required
            inputStyle={{
              width:'60px',
              border:'none',
              height:'67px',
              fontSize:'32px',
              marginBottom:'32px',
              background: '#F2F2F2',
              borderRadius:'8px',
            }}
            separator={<span style={{margin:'0 15px'}}></span>}
            
          />
          <p className='register-email__description__error'>{error}</p>
          <button 
            className={
              otp.length === 6 ? 
              'register-email__description__proceed active--otp' : 
              'register-email__description__proceed'
            }
            onClick= {() => handleClickProcess()}
          >
            Continue
          </button>
          {countDownOTP > 0 &&
            <span>Resend OTP in 00:{countDownOTP}</span>
          }
          <button 
            className = { 
              !countDownOTP ? 
              'register-email__description__resend resend--otp' : 
              'register-email__description__resend' 
            }
            onClick={handleClickResendOTP}
          >
            Resend OTP
          </button>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail;