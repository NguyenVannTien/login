import React from 'react'
import LeftRigister from '../../components/leftRegister';
import RightRigister from '../../components/rightRegister';
import "./style.scss";

const Register = () => {
  return (
    <div className="register">
      <LeftRigister />
      <RightRigister />
    </div>
  )
}

export default Register;