import React from 'react'
import '../App.css'

const Frame29 = () => {
  return (
    <div class="credentials-frame">
        <h1 class="credentials-title">Enter Credentials to host your First Hackathon</h1>
        
        <div class="name-fields-container">
            <div class="form-group name-field">
                <label class="input-label">First Name</label>
                <input type="text" class="text-input"/>
            </div>
            
            <div class="form-group name-field">
                <label class="input-label">Last Name</label>
                <input type="text" class="text-input"/>
            </div>
        </div>
        
        <div class="form-group about-field">
            <label class="input-label">What is your hackathon about ?</label>
            <input type="text" class="text-input"/>
        </div>
        
        <div class="form-group email-field">
            <label class="input-label">Email</label>
            <input type="email" class="text-input"/>
        </div>
        
        <div class="form-group phone-field">
            <label class="input-label">Phone Number</label>
            <input type="tel" class="text-input"/>
        </div>
    </div>
  )
}

export default Frame29