
import './App.css';
import Login from "./pages/Login/Login";
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home/Home';
import Register from './pages/Register';
import RegisterEmail from './components/registerEmail';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />}/>
      <Route path='/register/confirm-email' element={< RegisterEmail />} />
    </Routes>
  );
}

export default App;
