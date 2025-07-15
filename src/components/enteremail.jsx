import React from 'react'
import '../layouts/enteremail.css'
const enteremail = () => {
  return (
     <div class="page-container">
        {/* <!-- Navbar --> */}
        <nav class="navbar">
                <div class="brand-logo">
                    <div class="brand-name">DevFiesta</div>
                </div>
            
        </nav>

        {/* <!-- Main Content Area - Centered Card --> */}
        <main class="main-content">
            <div class="login-card">
                <h2 class="card-title"></h2>
                <form>
                    <div class="form-group">
                        <label for="email" class="form-label">Email Address</label>
                        <input type="email" id="email" name="email" placeholder="Input Email Address"
                               class="form-input"/>
                    </div>
                    <div class="button-container">
                        <button type="submit" class="verify-button">
                            Verify
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
  )
}

export default enteremail