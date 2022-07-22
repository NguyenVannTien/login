

import React from 'react'

const Input = ( {label,...props}) => {
  return (
    <>
      <label>{label}</label>
      <input {...props} />
    </>
  )
}

export default Input;