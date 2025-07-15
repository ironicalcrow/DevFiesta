import React from 'react'
import '../layouts/loginpage.css'
const loginpage = () => {
  return (
     <div class="page-container">
        <nav class="navbar">
                <div class="brand-logo">
                    <div class="brand-name">DevFiesta</div>
                </div>
          
        </nav>

        <main class="main-content">
            <div class="login-card">
                <h2 class="card-title">Log In</h2>
                <form>
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Input Email Address"
                               class="form-input"/>
                    </div>
                    <div class="form-group">
                        <label for="password" class="form-label">Password</label>
                        <input type="password" id="password" name="password" placeholder="Type here..."
                               class="form-input"/>
                    </div>
                    <div class="social-login-buttons">
                        <button type="button" class="social-button google-button">
                            Log in with Google
                        </button>
                        <button type="button" class="social-button github-button">
                            Log in with Github
                        </button>
                    </div>
                    <div class="forgot-password-container">
                        <a href="#" class="forgot-password-link">Forgot Password</a>
                    </div>
                </form>
            </div>
        </main>
    </div>
  )
}

export default loginpage