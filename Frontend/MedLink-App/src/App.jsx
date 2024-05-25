import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login'
import Register from './Register'
import Forgot from './Forgot';
import Appointment from './Appointment';
import PasswordForgot from './PasswordForgot';

function App() {



  return (
    <Router>
      <nav id='gizli'>
        <ul>
          <li>
            <Link to="/Login">Giriş</Link>
          </li>
          <li>
            <Link to="/Register">Kayıt</Link>
          </li>
          <li>
            <Link to="/Forgot">Şifremi Unuttum</Link>
          </li>
          <li>
            <Link to="/Appointment">Randevu Al</Link>
          </li>
          <li>
            <Link to="/PasswordForgot">Şifre Sıfırlama</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Forgot" element={<Forgot />}/>
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/PasswordForgot" element={<PasswordForgot />} />
      </Routes>
    </Router>
  )
}

export default App;