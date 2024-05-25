import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Login from './Login.jsx'
import Register from './Register.jsx'
import Forgot from './Forgot.jsx';
import Appointment from './Appointment.jsx';
import PasswordForgot from './PasswordForgot.jsx';
import RedirectWithParams from './RedirectWithParams.jsx';
import Doctors from './Doctors.jsx';
import Polyclinics from './Polyclinics.jsx';
import AdminPanel from './AdminPanel.jsx';


function App() {


  return (
    <Router>
    <nav id='gizli'>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Login">Giriş</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Register">Kayıt</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Forgot">Şifremi Unuttum</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Appointment">Randevu Al</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/PasswordForgot">Şifre Sıfırlama</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Doctors">Doktorlar</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/Polyclinics">Poliklinikler</Link>
        </li>
        <li style={{ display: 'inline-block', marginRight: '10px' }}>
          <Link to="/AdminPanel">Admin Panel</Link>
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
        <Route path="/Polyclinics" element={<Polyclinics />} />
        <Route path="/AdminPanel" element={<AdminPanel />} />
      </Routes>
    </Router>
    
  )
}

export default App;