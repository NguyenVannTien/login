import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import "./style.scss";
import Input from '../Input/Input';
import axios from 'axios';

const RightRigister = () => {

  const [listCountry, setListCountry] = useState([])
  const [selectCountry, setSelectCountry] = useState([])

  const [values, setValues] = useState({
    firstName: "",
    emailAddress: "",
    lastName: "",
    phoneNumber: "",
    countryCode: "",
  });
  
  const navigate = useNavigate();

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
      
    } catch (res) {
      console.log("call api error");
    }
  }, [])
  
  const handleChangeSelectCountry = (e) => {
    const value = e.target.value;
    const item = listCountry.filter((x)=> x.name === value)
    setSelectCountry(item)
  }

  const handleChangeSelectPhone = (e) => {
    const value = e.target.value;
    const item = listCountry.filter((x)=> x.diallingCode === value)
    setSelectCountry(item)
  }

  const handleSaveForm = (e) => {
    e.preventDefault();
    const data = {
      ...values,
      countryCode: selectCountry
    }
    localStorage.setItem('dataRegister', JSON.stringify(data))
    if(localStorage.getItem('dataRegister')){
      navigate('/register/confirm-email')
    }
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };


  return (
    <div className="container-register">
      <h3>Personal Details</h3>
      <form className='form-register'
        onSubmit={handleSaveForm}
      >
        <Input 
          name="firstName"  
          label="Firt Name" 
          value={values.firstName} 
          onChange={onChange}
          placeholder='Enter First Name' 
          type='text' 
          required
        />
        <Input 
          name="lastName"
          value={values.lastName} 
          onChange={onChange}
          label="Last Name"  
          placeholder='Enter Last Name' 
          type='text'
          required
        />
        <Input
          name="emailAddress"
          value={values.emailAddress} 
          onChange={onChange}
          label="Email Address"  
          placeholder='Enter Email Address' 
          type='email' 
        />
          <>  
            <label>Phone Number</label>
            <div className='form-register__phone'>
              <select name="phoneNumber"  
                onChange={handleChangeSelectPhone}
              >
                <option selected>Select...</option>

                {selectCountry.map((item)=>(
                  <option key={item.id} selected >+{item.diallingCode}</option>
                ))}

                {listCountry?.map((item)=>(
                  <option key={item.id} value={item.diallingCode} >
                    +{ item.diallingCode }
                  </option>
                ))}
              </select>
              <input   
                placeholder='Enter Phone Number' 
                type='text'
                name="phoneNumber"
                value={values.phoneNumber} 
                onChange={onChange}
                required
              /> 
            </div> 
          </>
          <>
            <label>Select Country</label>
            <div className='form-register__country'>
              <select name="countryCode"
                onChange={handleChangeSelectCountry}
              >
                <option selected>--Select Country--</option>
                {selectCountry.map((item)=>(
                  <option key={item.id} selected>{item.name}</option>
                ))}

                {listCountry.map((item)=>(
                  <option key={item.id} value={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </>
        <div className='form-register__btn'>
          <button className='form-register__btn__prev'>Previous</button>
          <button type='submit' className='form-register__btn__prev btn--color'>Save and Continue</button>
        </div>
      </form>
    </div>
  )
}

export default RightRigister