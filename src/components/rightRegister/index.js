import React from 'react';
import "./style.scss";
import Input from '../Input/Input'

const RightRigister = () => {
  return (
    <div className="container">
      <form className='right-register'>
        <h3>Personal Details</h3>
        <Input  label="Firt Name"/>
      </form>
    </div>
  )
}

export default RightRigister