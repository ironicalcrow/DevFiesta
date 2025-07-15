import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Frame29 from './components/Frame29'
import Projectframe from './components/projectFrame'
import Securitycode from './components/Securitycode'
import Verifyemail from './components/verifyemail'
import Enteremail from './components/enteremail'
import Profileinfo from './components/profileinfo'
import Bios from './components/Bios'
import Loginpage from './components/loginpage'
import Changepassword from './components/changepassword'
import Routing from './routes/Routing'
import { Link } from 'react-router-dom'
function App() {



  return (
    <div>
      <Routing/>
      <Link to="/supervisorlist">Click</Link>
      
    </div>
  )
}

export default App
