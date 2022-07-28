import React, { useEffect, useState } from 'react';
import LeftRegister from "../leftRegister/index";
import OtpInput from 'react-otp-input';
import './style.scss';
import { useLocation } from "react-router-dom";
import axios from 'axios';




const RegisterEmail = () => {
  
  const getDataSignUp = JSON.parse(localStorage.getItem('dataSignUp'))
  const [dataSignUp, setDataSignUp] = useState(getDataSignUp || {})
  
  const [checked, setChecked] = useState(false)

  const [otp, setOtp] = useState('')
  const [countDownOTP, setCountDownOTP] = useState('')

  const [dataConfirm, setDataConfirm] = useState('')

  const location = useLocation()
  const arrType = location.pathname.split('/') 

  useEffect (() => {
    confirmEmail();
  },[])

  useEffect( () => {
    let countDown;
    handleCountDownOtp(countDown);
    return clearTimeout(countDown)
  })

  const confirmEmail = async () => {
    
    const headers = { 
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
      'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
    }
    const params = {
      emailAddress:
        arrType[1] === 'register'
        && dataSignUp?.emailAddress,
        confirmationPurpose: 'onboarding',
        firstName:
        arrType[1] === 'register'
        && dataSignUp?.firstName,
      }
      
      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/confirm-email', params, {headers})
      .then((res) => {
        console.log(res);
        setCountDownOTP(res.data.data.countDown);
        setDataConfirm(res.data.data)
        setChecked(true)
      })
      .catch(() => {
        console.log('loiiiii');
      })
      
    }

    const getVerifyEmail = async () => {
      const headers = { 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ClientId': '2d4459cc-810b-40c9-86b2-414b5eb838fb',
        'ClientKey': 'CK_TestoPT9vqdI9h67B6n3YKxd',
      }

      const params = {
        verificationReference: dataConfirm?.verificationReference,
        otpCode: otp,
        userIdentity:dataSignUp?.emailAddress,
      }

      axios.post('https://cadawada-api-dev.niw.com.vn/api/v1/settings/verify-email', params , {headers})

      .then((res) => {
        console.log('verify',res);
      })
      .catch(() => {
        console.log('loiiiiii');
      })

    }
    
    const handleCountDownOtp = (countDown) => {
      if(countDownOTP > 0){
        countDown = setTimeout(() => {
          setCountDownOTP(countDownOTP - 1)
        },1000)
      }
    }

    const handleClickResendOTP = () => {
      if(countDownOTP === 0 ){
        console.log('okok');
        confirmEmail();
        handleCountDownOtp();
      }else{
        console.log("sau 30s mới được gửi mã mới");
      }
            
    }
    
    

  return (
    <div className='register'>
      <LeftRegister />
      <div className='register-email'>
        <div className='register-email__description'> 
          <div className='register-email__description__logo'>
            <i class="logo__icon fa-solid fa-envelope-open-text"></i>
          </div>
          <h3>Verify your Email Address</h3>
          <p>Enter the 6-digits OTP sent to your mail</p>
          <OtpInput
            value={otp}
            onChange={(e)=> setOtp(e) }
            numInputs={6}
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
          <button 
            className={
              otp ? 
              'register-email__description__proceed active--otp' : 
              'register-email__description__proceed'
            }
            onClick= {() => getVerifyEmail()}
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

export default RegisterEmail;