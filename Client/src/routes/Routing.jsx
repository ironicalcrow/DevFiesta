// src/routes/Routing.jsx
import { Routes, Route } from 'react-router-dom';
import Frame29 from '../components/Frame29'; //css
import Projectframe from '../components/projectFrame';
import Securitycode from '../components/Securitycode';
import Verifyemail from '../components/verifyemail';
import Enteremail from '../components/enteremail';
import Profileinfo from '../components/profileinfo'; //tail
import Bios from '../components/Bios'; // routes to showproject //css
import Def from '../components/def';
import Changepassword from '../components/changepassword'; //css
import Addproject from '../components/Addproject'; //css
import Hostingpage from '../components/hostingpage' //css
import Loginpage from '../components/loginpage'; //css
import Supervisorlist from '../components/supervisorlist' //css
import Teaminfo from '../components/teaminfo' //css
import SignupForm from '../components/SignupForm' //tail
import Landingpage from '../components/Landingpage' // does not exist
import Signup from '../components/SIgnup'; //tail
import ShowProject from '../components/showproject'; //css

function Routing() {
  return (
    <Routes>
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
      <Route path='/signupform' element={<SignupForm/>}></Route>
      <Route path='/' element={<Landingpage/>}></Route>
      <Route path='/signup'element={<Signup/>}></Route>
      <Route path='/showproject' element={<ShowProject/>}></Route>
      

    </Routes>
  );
}

export default Routing;
