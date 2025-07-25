import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingPage from '../components/Landingpage'
import Signup from '../components/SignupOps'
import Profileinfo from '../components/Profileinfo'
import Settings from '../components/Settings'
import Changepassword from '../components/Changepassword'
import Hackathons from '../components/Hackathons'
import Loginpage from '../components/Loginpage'
import Projects from '../components/Projects'
import SignupForm from '../components/SignupForm'
import Addproject from '../components/Addproject'
import Viewproject from '../components/Viewproject'
import HackathonHostingpage from '../components/HackathonHostingpage'
import ViewHackathon from '../components/ViewHackathon'
import Markingpage from '../components/Markingpage'
const Routing = () => {
  return (
    <div >
        <Routes>
            <Route path='/' element={<LandingPage/>}></Route>
               <Route path='/signup' element={<Signup/>}></Route>
                <Route path='/profileinfo' element={<Profileinfo/>}></Route>
                <Route path='/settings' element={<Settings/>}></Route>
                <Route path='/signupform' element={<SignupForm/>}></Route>
                <Route path='/hackathons' element={<Hackathons/>}></Route>
                <Route path='/login' element={<Loginpage/>}></Route>
                <Route path='/projects' element={<Projects/>}></Route>
                <Route path='/changepassword' element={<Changepassword/>}></Route>
                <Route path='/addproject' element={<Addproject/>}></Route>
                <Route path='/viewproject' element={<Viewproject/>}></Route>
                <Route path='/hostingpage' element={<HackathonHostingpage/>}></Route>
                 <Route path='/viewhackathon' element={<ViewHackathon/>}></Route>
                  <Route path='/markingpage' element={<Markingpage/>}></Route>

        </Routes>
    </div>
  )
}

export default Routing