import React from 'react';
import "./style.scss";
import Input from '../Input/Input'

const RightRigister = () => {
  return (
    <div className="container-register">
      <form className='form-register'>
        <h3>Personal Details</h3>
        <Input  label="Firt Name"  placeholder='Enter First Name' type='text' />
        <Input  label="Last Name"  placeholder='Enter Last Name' type='text' />
        <Input  label="Email Address"  placeholder='Enter Email Address' type='email' />
          <>
            <label>Phone Number</label>
            <div className='form-register__phone'>
              <select name="cars" id="cars">
                <option value="vietnamese">+84</option>
                <option value="USA">+213</option>
                <option value="English">+63</option>
                <option value="Lao">+1</option>
              </select>
              <input   placeholder='Enter Phone Number' type='text' /> 
            </div> 
          </>
      </form>
    </div>
  )
}

export default RightRigister