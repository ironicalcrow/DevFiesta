import React from 'react'
import '../layouts/verifyemail.css'
const verifyemail = () => {
  return (
  <div className="framee">
      <div className='headerr'>DEVFIESTA</div>
    <div className='carddiv'>
    <div class="card">
      <label for="email">Email Address</label>
      <input type="email" id="email" placeholder="Input Email Address" />

      <button class="verify">Verify</button>
    </div>
    </div>
  </div>
  )
}

export default verifyemail