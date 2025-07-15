import React from 'react'
import '../layouts/securitycode.css'

const Securitycode = () => {
  return (
   <div class="framee">
    <header>
      <div class="logo">
        <img src="logo.png" alt="DevFiesta Logo" />
      </div>
    </header>

    <main>
      <div class="card">
        <h1>Enter Security Code</h1>
        <p class="instruction">We sent a code to your gmail to verify it's you.</p>
        <input type="text" placeholder="Enter code" class="code-input" />

        <div class="buttons">
          <button class="continue">Continue</button>
          <button class="cancel">Cancel</button>
        </div>

        <a href="#" class="resend">Resend Code</a>
      </div>
    </main>
  </div>
  )
}

export default Securitycode