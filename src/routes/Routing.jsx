// src/routes/Routing.jsx
import { Routes, Route } from 'react-router-dom';
import Frame29 from '../components/Frame29';
import Projectframe from '../components/projectFrame';
import Securitycode from '../components/Securitycode';
import Verifyemail from '../components/verifyemail';
import Enteremail from '../components/enteremail';
import Profileinfo from '../components/profileinfo';
import Bios from '../components/Bios';
import Def from '../components/def';
import Changepassword from '../components/changepassword';
import Addproject from '../components/addproject'
import Hostingpage from '../components/hostingpage'
import Loginpage from '../components/loginpage';
import Supervisorlist from '../components/supervisorlist'
import Teaminfo from '../components/teaminfo'

function Routing() {
  return (
    <Routes>
      <Route path="/" element={<Def />} />
      <Route path="/enteremail" element={<Enteremail />} />
      <Route path="/verifyemail" element={<Verifyemail />} />
      <Route path="/securitycode" element={<Securitycode />} />
      <Route path="/changepassword" element={<Changepassword />} />
      <Route path="/profileinfo" element={<Profileinfo />} />
      <Route path="/bios" element={<Bios />} />
      <Route path="/frame29" element={<Frame29 />} />
      <Route path="/projectframe" element={<Projectframe />} />
      <Route path='/addproject' element={<Addproject/>}></Route>
      <Route path='/hostingpage' element={<Hostingpage/>}></Route>
      <Route path='/loginpage' element={<Loginpage/>}></Route>
      <Route path='/supervisorlist' element={<Supervisorlist/>}></Route>  
      <Route path='/teaminfo' element={<Teaminfo/>}></Route>

    </Routes>
  );
}

export default Routing;
