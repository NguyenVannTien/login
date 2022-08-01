
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import ConfirmPassword from './components/confirmPassword';
import Success from './components/Success';
import VerifyEmail from './components/verifyEmail';
import VerifyPhone from './components/verifyPhone';
import Home from './pages/Home/Home';
import Login from "./pages/Login/Login";
import Register from './pages/Register';


function App() {

  const navigate = useNavigate();

  useEffect(()=> {
    if(JSON.parse(localStorage.getItem('dataSignup'))){
      navigate('/home')
    }
  }, [])

  return (
    <Routes>
      <Route path='/home' element={<Home />} /> 
      <Route path='/login' element={<Login />}/>
      <Route path='/login/confirm-email' element={<VerifyEmail />} />
      <Route path='/login/confirm-phone' element={<VerifyPhone />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/register/confirm-email' element={<VerifyEmail />} />
      <Route path='/register/confirm-phone' element={<VerifyPhone />} />
      <Route path='/register/confirm-password' element={<ConfirmPassword />} />
      <Route path='/register/success' element = {<Success />} />
    </Routes>
  );
}

export default App;
