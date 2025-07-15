import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/AutoAuth';


// This is a final, robust version of the component.
// The CSS has been made more specific to prevent conflicts with other stylesheets.
export default function SignupForm() {
      const {oldUser,newUser} =useUser();
      const navigateto = useNavigate();
      const [fullname,setFullname] = useState('');
      const [email,setEmail] = useState('');
      const [dob,setDob] = useState('');
      const [username,setUserame] = useState('');
      const [password,setPassword] = useState('');
      const oldForm={
        fullname:fullname,
        email:email,
        dob:dob,
        username:username,
        password:password
      }

      const sendData = async(e)=>{
        e.preventDefault();
      const response =await axios.post('/backend/signin',oldForm);
      console.log('SignupForm');
      console.log(response.data)
      newUser(response.data)
      navigateto('/')
      }
  return (
    <>
      <style>{`
        /* Resetting body styles for consistency */
        body {
            margin: 0;
            background-color: #eff6ff; /* Light blue background */
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
        }
        
        /* Using a wrapper to ensure proper stacking */
        .signup-page-wrapper {
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            width: 100%;
        }

        /* Header section -- Made styles more forceful */
        .signup-header {
            display: block !important; /* Force block display */
            width: 100%;
            padding: 1rem;
            background-color: #ffffff;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            box-sizing: border-box;
            position: relative; /* Ensure it respects document flow */
            z-index: 10;
        }

        .header-content {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            max-width: 1280px;
            margin: 0 auto;
            padding: 1rem 1rem;
            box-sizing: border-box;
        }

        /* Logo styles */
        .logo-container {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }
        .logo-icon {
            width: 2rem;
            height: 2rem;
            color: #4f46e5;
        }
        .logo-text {
            font-size: 1.5rem;
            font-weight: 700;
            color: #1f2937;
        }

        /* Login button styles */
        .login-button {
            padding: 0.5rem 1.5rem;
            background-color: rgba(70,120,250);   
            color: #ffffff;
            font-weight: 600;
            border-radius: 0.5rem;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            border: none;
            cursor: pointer;
            transition: all 200ms;
        }
        .login-button:hover {
            background-color: #4338ca;
        }

        /* Main content area */
        .main-content {
    flex-grow: 1;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 2.5rem 1rem 1rem 1rem;
    /* Ensures there's always space for the navbar */
    margin-top: 130px; /* Use your actual navbar height (adjust if your navbar height changes) */
    box-sizing: border-box;
}


        /* The sign-up form card */
        .signup-card {
                
            width: 100%;
            max-width: 42rem;
            margin: auto;
            background-color: #ffffff;
            padding: 2rem;
            border-radius: 1rem;
            box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
            border: 1px solid #e5e7eb;
        }

        .card-title {
            font-size: 1.875rem;
            font-weight: 700;
            text-align: center;
            color: #1f2937;
            margin-top: 0;
            margin-bottom: 2rem;
        }

        /* Form and input styling */
        .signup-form {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }
        .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 500;
            color: #374151;
            margin-bottom: 0.25rem;
        }
        .form-input {
            min-width: 100%;
            padding: 0.75rem 1rem;
            background-color: #dae5fb;
            border: 1px solid #d1d5db;
            border-radius: 0.5rem;
            box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
            transition: border-color 200ms, box-shadow 200ms;
            box-sizing: border-box;
        }
        .form-input:focus {
            outline: none;
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.3);
        }
        /* Submit button */
        .submit-button {
            width: 100%;
            margin-top: 1rem;
            padding: 0.75rem 1.5rem;
            background-color: rgba(70,120,250);
            color: #ffffff;
            font-weight: 700;
            font-size: 1.125rem;
            border-radius: 0.5rem;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
            transition: all 200ms ease-in-out;
        }
        .submit-button:hover {
            background-color: #4338ca;
            transform: scale(1.02);
        }

        /* Responsive adjustments */
        @media (min-width: 640px) {
            .signup-card {
                padding: 2.5rem;
            }
            .card-title {
                font-size: 2.25rem;
            }
        }
      `}</style>

      <div className="signup-page-wrapper">
        {/* Header Navigation */}
        {/* Main Content */}
        <main className="main-content">
          <div className="signup-card">
            <h1 className="card-title">
              Create An Account
            </h1>
            <form onSubmit={sendData} className="signup-form">
              <div className="form-group">
                <label htmlFor="fullName" className="form-label">Name</label>
                <input value={fullname} onChange={(e)=>{setFullname(e.target.value)}}required type="text" id="fullName" placeholder="Enter Full Name" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="dob" className="form-label">Date of Birth</label>
                <input value={dob} onChange={(e)=>{setDob(e.target.value);console.log(typeof(e.target.value))}} required type="date"  id="dob" placeholder="DD/MM/YYYY" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">Email Address</label>
                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required type="email" id="email" placeholder="Input Email Address" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="form-label">User Name</label>
                <input value={username} onChange={(e)=>{setUserame(e.target.value)}} required type="text" id="username" placeholder="Input Username" className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <input value={password} onChange={(e)=>{setPassword(e.target.value)}} required type="password" id="password" placeholder="Type here..." className="form-input" />
              </div>
              <div className="form-group">
                <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                <input required type="password"  id="confirmPassword" placeholder="Type here..." className="form-input" />
              </div>
              <button type="submit" className="submit-button">
                Create Account
              </button>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}
