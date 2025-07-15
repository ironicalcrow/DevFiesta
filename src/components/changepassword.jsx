import '../layouts/changepass.css'
const changepassword = () => {
  return (
  <div class="page-container">
        <nav class="navbar">
                <div class="brand-logo">
                    <span class="brand-name">DevFiesta</span>
                </div>
            
        </nav>

        <main class="main-content">
            <div className='round'></div>
            <div class="login-card change-password-card">
                <h2 class="title">Change Password</h2>
                <hr class="card-divider"/>
                
                <form>
                    <div class="form-group">
                        <label for="new-password" class="form-label">Enter new Password</label>
                        <input type="password" id="new-password" name="new-password" placeholder=""
                               class="form-input"/>
                    </div>
                    <div class="form-group">
                        <label for="confirm-password" class="form-label">Confirm new Password</label>
                        <input type="password" id="confirm-password" name="confirm-password" placeholder=""
                               class="form-input"/>
                    </div>
                    <div class="button-container">
                        <button type="submit" class="verify-button">
                            Save Password
                        </button>
                        <button type="submit" class="verify-button-cancel">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </main>
    </div>
  )
}

export default changepassword