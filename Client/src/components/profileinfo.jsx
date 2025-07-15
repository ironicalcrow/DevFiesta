import React, { useContext } from 'react';
import { useUser } from '../hooks/AutoAuth';
import { useNavigate } from 'react-router-dom';

// This component has been updated to exactly match the new image provided.
export default function ProfileInfo() {
  const navigateto = useNavigate();
    const {oldUser,newUser} = useUser();
    console.log('THis isnt working')
    console.log(oldUser)
  return (
    <>
      <style>{`
:root {
  --primary-blue: #407BFF;
  --primary-blue-dark: #2256bc;
  --accent-blue: #8ca9f3;
  --background-color: #e9f2ff;
  --card-background-color: #fff;
  --text-main: #232e3d;
  --text-medium: #4066b3;
  --text-light: #7ca7e3;
  --border-color: #c6dbf7;
  --sidebar-active-bg: #eaf2fc;
  --shadow: 0 8px 32px 0 rgba(64, 123, 255, 0.09);
}

/* General */
body, #root {
  font-family: 'Inter', 'Segoe UI', Arial, sans-serif;
  margin: 0;
  color: var(--text-main);
  background: var(--background-color);
}

/* Page Wrapper */
.varia-page-wrapper {
  width: 100%;
}

/* Header */
.varia-main-header {
  background: var(--card-background-color);
  border-bottom: 1.5px solid var(--border-color);
  min-height: 10px;
}

.varia-navbar {
  background: var(--card-background-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 90px;
  max-width: 1600px;
  margin: 0 auto;
}

.varia-brand-logo {
  color: var(--primary-blue);
  font-weight: 700;
  font-size: 1.45rem;
  letter-spacing: 1px;
}

/* Settings Title Bar */
.varia-settings-title-bar {
  background: linear-gradient(90deg, var(--primary-blue), var(--accent-blue));
  color: #fff;
  min-height: 120px;
  display: flex;
  align-items: center;
}

.varia-settings-title-content {
  padding: 2.4rem 2rem 1.1rem 2.6rem;
  max-width: 1600px;
  margin: 0 auto;
}

.varia-settings-title-content h1 {
  font-size: 2.9rem;
  font-weight: 700;
  margin: 0;
  text-align: start;
  color: #fff;
  letter-spacing: 1px;
}

/* Main Content Layout */
.varia-main-content {
  background: var(--background-color);
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  max-width: 1400px;
  margin: 2.5rem auto;
  padding: 1.7rem 2vw;
}
@media (min-width: 1024px) {
  .varia-main-content {
    grid-template-columns: 250px 1fr;
    gap: 5.5rem;
  }
}
@media (max-width: 850px) {
  .varia-main-content {
    grid-template-columns: 1fr;
    gap: 2.2rem;
    max-width: 99vw;
    padding: 1.2rem 1vw;
  }
}

/* Sidebar Navigation */
.varia-sidebar-nav {
  margin-left: 1.1rem;
  display: flex;
  flex-direction: column;
  gap: 2.1rem;
  min-width: 180px;
  width: 90%;
}

.varia-sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.varia-sidebar-section-title {
  font-size: 1.09rem;
  font-weight: 800;
  color: var(--text-medium);
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 0.5rem;
  margin-left: 0.1rem;
}

.varia-sidebar-link {
  text-decoration: none;
  color: var(--primary-blue);
  font-weight: 500;
  font-size: 1.03rem;
  padding: 0.48rem 1.05rem;
  border-radius: 7px;
  margin-bottom: 0.1rem;
  transition: background 0.15s, color 0.14s;
  display: block;
}
.varia-sidebar-link.varia-active, .varia-sidebar-link:hover {
  background: var(--sidebar-active-bg);
  color: var(--primary-blue-dark);
  font-weight: 700;
}

/* Profile Card */
.varia-profile-form-card {
  border-radius: 1.15rem;
  padding: 2.3rem 2.7rem 2rem 2.7rem;
  background: var(--card-background-color);
  box-shadow: var(--shadow);
  border: 1.5px solid var(--border-color);
  min-width: 310px;
  max-width: 100%;
  min-height: 580px;
  display: flex;
  flex-direction: column;
}

@media (max-width: 700px) {
  .varia-profile-form-card {
    padding: 1.2rem 1rem;
    border-radius: 0.9rem;
    min-width: 90vw;
  }
}

/* Profile Form Header */
.varia-form-header h1 {
  font-size: 2rem;
  margin: 0 0 0.18rem 0;
  font-weight: 700;
  color: var(--primary-blue);
}
.varia-form-header p {
  font-size: 1.07rem;
  color: var(--text-medium);
  margin: 0 0 2.1rem 0;
  font-weight: 500;
}

/* Upload Profile Image */
.varia-profile-upload-section {
  display: flex;
  align-items: center;
  gap: 2.1rem;
  margin-bottom: 2.1rem;
  padding-bottom: 1.4rem;
  border-bottom: 1.5px solid var(--border-color);
}
.varia-profile-image {
  width: 102px;
  height: 102px;
  background: var(--blue-light);
  border-radius: 50%;
  border: 2px solid var(--accent-blue);
  object-fit: cover;
  box-shadow: 0 2px 18px 0 rgba(64, 123, 255, 0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}

.varia-upload-button {
  font-weight: 700;
  font-size: 1.04rem;
  color: var(--primary-blue);
  background: none;
  border: 1.4px solid var(--primary-blue);
  border-radius: 8px;
  padding: 9px 22px;
  cursor: pointer;
  transition: background 0.14s, color 0.14s;
}
.varia-upload-button:hover {
  background: var(--primary-blue);
  color: #fff;
}

/* Form Fields */
.varia-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
}

.varia-form-row {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.4rem;
}
@media (min-width: 700px) {
  .varia-form-row {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
}

.varia-form-group {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
  width: 100%;
}

.varia-form-group label {
  font-size: 1.12rem;
  font-weight: 600;
  color: var(--text-medium);
  margin-bottom: 0.14rem;
}

.varia-form-input, .varia-form-textarea {
  border: 1.3px solid var(--border-color);
  border-radius: 7px;
  padding: 0.7rem 1.1rem;
  font-size: 1.05rem;
  width: 100%;
  box-sizing: border-box;
  background: var(--blue-light);
  color: var(--text-main);
  transition: border 0.13s, background 0.13s;
  resize: none;
  font-family: inherit;
}
.varia-form-input:focus, .varia-form-textarea:focus {
  outline: none;
  border: 1.3px solid var(--primary-blue);
  background: #fff;
}
.varia-form-textarea {
  min-height: 74px;
  max-height: 250px;
  resize: vertical;
}

.varia-form-section-heading {
  font-size: 1.25rem;
  font-weight: 700;
  margin: 1.2rem 0 0.6rem 0;
  color: var(--primary-blue-dark);
}

/* Inputs with Prefix */
.varia-input-with-prefix {
  display: flex;
  align-items: center;
  background: var(--card-background-color);
  border-radius: 7px;
}
.varia-input-with-prefix span {
  padding: 0.7rem 1rem;
  background: var(--card-background-color);
  border: 1.3px solid var(--border-color);
  border-right: none;
  border-radius: 7px 0 0 7px;
  color: var(--text-medium);
  font-size: 1rem;
}
.varia-input-with-prefix input {
  border-radius: 0 7px 7px 0;
  background: var(--blue-light);
  border: 1.3px solid var(--border-color);
  border-left: none;
  padding-left: 0.5rem;
}
.varia-input-with-prefix input:focus {
  background: #fff;
}

/* Form Actions */
.varia-form-actions {
  display: flex;
  gap: 1.1rem;
  margin-top: 2.1rem;
  padding-top: 2.1rem;
  border-top: 1.5px solid var(--border-color);
  justify-content: flex-end;
}
@media (max-width: 700px) {
  .varia-form-actions {
    flex-direction: column;
    gap: 0.7rem;
    align-items: stretch;
  }
}
.varia-action-button {
  padding: 12px 35px;
  border-radius: 8px;
  font-size: 1.09rem;
  font-weight: 700;
  border: none;
  cursor: pointer;
  transition: background 0.17s, color 0.14s, box-shadow 0.17s;
  box-shadow: 0 2px 10px 0 rgba(64, 123, 255, 0.07);
}

.varia-save-button {
  background: var(--primary-blue);
  color: #fff;
}
.varia-save-button:hover {
  background: var(--primary-blue-dark);
  color: #fff;
}
.varia-cancel-button {
  background: var(--blue-light);
  color: var(--primary-blue);
  border: 1.3px solid var(--accent-blue);
}
.varia-cancel-button:hover {
  background: var(--accent-blue);
  color: #fff;
  border-color: var(--primary-blue-dark);
}

/* Floating Help Button */
.varia-help-button {
  position: fixed;
  bottom: 2.2rem;
  right: 2.2rem;
  width: 50px;
  height: 50px;
  background: var(--primary-blue-dark);
  color: #fff;
  border-radius: 50%;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: bold;
  box-shadow: 0 4px 16px rgba(64, 123, 255, 0.18);
  cursor: pointer;
  z-index: 999;
}
.varia-help-button:hover {
  background: var(--primary-blue);
}

/* Small device tweaks */
@media (max-width: 500px) {
  .varia-settings-title-content h1 {
    font-size: 1.29rem;
  }
  .varia-profile-form-card {
    min-width: 93vw;
    padding: 0.5rem 0.1rem;
  }
}
`}</style>

      <div className="varia-page-wrapper">
        <header className='varia-main-header'>
        </header>

        <div className='varia-settings-title-bar'>
          <div className="varia-settings-title-content">

          </div>
        </div>
        
        <main className='varia-main-content'>
          <aside className='varia-sidebar-nav'>
            <div className="varia-sidebar-section">
              <h3 className="varia-sidebar-section-title">Portfolio</h3>
              <a href="#" className="varia-sidebar-link varia-active">Profile info</a>
            </div>
            <div className="varia-sidebar-section">
              <h3 className="varia-sidebar-section-title">Hackathon Recommendations</h3>
              <a href="#" className="varia-sidebar-link">Preferences & Eligibility</a>
            </div>
            <div className="varia-sidebar-section">
              <h3 className="varia-sidebar-section-title">Account Management</h3>
              <a href="#" className="varia-sidebar-link">Email notifications</a>
              <a href="#" className="varia-sidebar-link">Account & privacy</a>
              <a onClick={()=>{navigateto('/changepassword')}} href="#" className="varia-sidebar-link">Password</a>
            </div>
          </aside>

          <div className='varia-profile-form-card'>
            <header className='varia-form-header'>
              <h1>Profile info</h1>
              <p>This information will appear on your public Devpost profile.</p>
            </header>

            <section className='varia-profile-upload-section'>
              <div className='varia-profile-image'></div>
              <button className='varia-upload-button'>Upload Photo</button>
            </section>

            <form>
              <div className='varia-form-fields'>
                <div className='varia-form-row'>
                  <div className='varia-form-group'>
                    <label htmlFor='Full_name'>Fullname</label>
                    <input type='text' id='Fullname' className='varia-form-input' defaultValue={oldUser?.user?.fullname} />
                  </div>
                  <div className='varia-form-group '>
                    <label htmlFor='last_name'>Email</label>
                    <input type='text' id='Email' className='varia-form-input' defaultValue={oldUser?.user?.email} />
                  </div>
                </div>
                
                <div className='varia-form-group'>
                  <label htmlFor='bio'>Bio</label>
                  <textarea id='bio' className='varia-form-input varia-form-textarea'></textarea>
                </div>
                
                <h2 className='varia-form-section-heading'>Social</h2>
                
                <div className='varia-form-row'>
                  <div className='varia-form-group'>
                    <label htmlFor="github">GitHub</label>
                    <div className="varia-input-with-prefix">
                      <span className='h-[3rem] w-[3-rem] font-normal relative top-[-4px]'>@</span>
                      <input type='text' id="github" className='varia-form-input' />
                    </div>
                  </div>
                  <div className='varia-form-group'>
                    <label htmlFor="linkedin">LinkedIn</label>
                    <div className="varia-input-with-prefix">
                      <input type='text' id="linkedin" placeholder="e.g., https://www.linkedin.com/in/yourname" className='varia-form-input' />
                    </div>
                  </div>
                </div>
              </div>
               <div className='varia-form-actions'>
                <button type='submit' className='varia-action-button varia-save-button'>Save changes</button>
                <button type='button' className='varia-action-button varia-cancel-button'>Cancel</button>
              </div>
            </form>
          </div>
        </main>
        <button className="varia-help-button">?</button>
      </div>
    </>
  );
}