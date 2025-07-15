import React from 'react'
//import '../App.css'
//import '../index.css'
import '../layouts/profileinfo.css'
const projectInfo = () => {

  return (
   <div class="profile-frame">
        <h1 class="profile-title">Profile Info</h1>
        <p class="profile-subtitle">The information will appear on your profile</p>
        
        <hr class="section-divider"/>
        
        <div class="upload-photo">
            <img className='uploadImage'></img>
            <input type='file' accept='images' ></input>    
        </div>
        
        <div class="input-section">
            <div class="input-column">
                <label class="input-label">First Name</label>
                <input type="text" class="text-input"/>

                 <label class="input-label">Last Name</label>
                <input type="text" class="text-input"/>
                
                <label class="social-label">Github</label>
                <input type="text" class="text-input"/>
                
               
                
                <label class="social-label">Facebook</label>
                <input type="text" class="text-input"/>
            </div>
            
            <div class="input-column">
                <label class="input-label">Bio</label>
                <textarea class="text-input bios-input"></textarea>
            </div>
        </div>
        
        <div class="action-buttons">
            <button class="save-button">Save</button>
            <button class="cancel-button">cancel</button>
        </div>
    </div>
)
}
export default projectInfo