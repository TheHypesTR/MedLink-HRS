import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx'
import Register from './Register.jsx'
import Forgot from './Forgot.jsx';
import Appointment from './Appointment.jsx';
import PasswordForgot from './PasswordForgot.jsx';
import Doctors from './Doctors.jsx';
import RedirectWithParams from './RedirectWithParams.jsx';

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
          <li>
            <Link to="/Doctors">Doktorlar</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Forgot" element={<Forgot />}/>
        <Route path="/Appointment" element={<Appointment />} />
        <Route path="/PasswordForgot" element={<PasswordForgot />} />
        <Route path="/auth/user/reset-password/:userid/:token" element={<RedirectWithParams />} />
        <Route path="/Doctors" element={<Doctors />} />
      </Routes>
    </Router>
  )
}

export default App;