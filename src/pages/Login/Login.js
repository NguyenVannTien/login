import React from 'react';
import LeftSide from '../../components/LeftSide/LeftSide';
import LoginSide from '../../components/LoginSide/LoginSide';
import './style.scss';


const Login = () => {
  return (
    <div className='login'>
      <LeftSide />
      <LoginSide />
    </div>
  )
}

export default Login