import React from 'react'
import '../layouts/bios.css'

const Bios = () => {
  return (
      <div class="page-container">
        <nav class="navbar">
            
                <div class="brand-logo">
                    <div class="brand-name">DevFiesta</div>
                </div>
                <div class="navbar-links">
                    <a href="#" class="navbar-link">Settings</a>
                    <a href="#" class="navbar-link">Add New Project</a>
                </div>
            
        </nav>

        <main class="bio-main-content">
            <div class="profile-header-section">
                <div class="profile-header-background"></div>
                <div class="profile-header-content">
                    <div class="profile-avatar"></div>
                    <div class="profile-details">
                        <h1 class="profile-name">Name</h1>
                        <p class="profile-tagline">Add your skills,interest,Bios and Address</p>
                    </div>
                </div>
            </div>

            <div class="profile-tabs">
                <button class="tab-button active">PROJECTS</button>
                <button class="tab-button">HACKATHONS</button>
            </div>
        </main>
    </div>
  )
}

export default Bios