import React, { useState } from 'react';
import LeftRegister from "../leftRegister/index";
import OtpInput from 'react-otp-input';
import './style.scss';



const RegisterEmail = () => {

  const [otp, setOtp] = useState('')



  return (
    <div className='register'>
      <LeftRegister />
      <div className='register-email'>
        <div className='register-email__description'> 
          <div className='register-email__description__logo'>
            <i class="logo__icon fa-solid fa-envelope-open-text"></i>
          </div>
          <h3>Verify your Email Address</h3>
          <p>Enter the 5-digits OTP sent to your mail</p>
          <OtpInput
            value={otp}
            onChange={(e)=> setOtp(e.target.value)}
            numInputs={5}
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
          <button>Continue</button>
          <button>Resend OTP</button>
        </div>
      </div>
    </div>
  )
}

export default RegisterEmail;