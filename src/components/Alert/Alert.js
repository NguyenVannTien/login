import React, { useEffect } from 'react';

const Alert = ({ msg, removeAlert , status}) => {
  console.log('alert')
  useEffect(() => {
    console.log('run timeout')
    const timeout = setTimeout(() => {
      removeAlert();
    }, 3000);
    return () => clearTimeout(timeout);
  }, [status]);
  return <p>{msg}</p>;
};

export default Alert;