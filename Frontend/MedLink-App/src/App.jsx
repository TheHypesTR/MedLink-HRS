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
import Header from './components/Header.jsx';
import PolyCards from './PolyCards.jsx';

function App() {
  return (
    <div className="App">
        <Router>
        <Header />
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/Forgot" element={<Forgot />} />
          <Route path="/Appointment" element={<Appointment />} />
          <Route path="/PasswordForgot" element={<PasswordForgot />} />
          <Route path="/Doctors" element={<Doctors />} />
          <Route path="/Polyclinics" element={<Polyclinics />} />
          <Route path="/AdminPanel" element={<AdminPanel />} />
          <Route path="/PolyCards" element={<PolyCards />} />
          <Route path="/auth/user/reset-password/:userid/:token" element={<RedirectWithParams />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;