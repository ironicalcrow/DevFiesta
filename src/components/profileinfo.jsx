import React from 'react'
import '../layouts/profileinfo.css'
const profileinfo = () => {
  return (
    <div className="page-container">
      <div className='heading_part'>
        <nav className="navbarr">
          
                <div className="brand-logo text-2xl">
                    <div className="brand_namee">DevFiesta</div>
                </div>
        </nav>
        <nav className='heads'>
        <h1>Edit your settings </h1>
        </nav>
      </div>
      <div className='info'>
        <div className='extra '>extra</div>
        <div className='form_div'>
            <div className='form_head'>
                <h1>Profile Info</h1>
                <p>This information will appear on your public Devpost profile.</p>
                <div className='flex row'>
                <div className='profile_image'></div>
                <button className='font-black text-2xl text-blue-500 '>Upload</button>
                </div>
            </div>
            <div>
            <form>
                <div className='inside_form_div'>
                    <div className='local_info'>
                        <div className='text-2xl font-bold labs'>
                            <label htmlFor='first_name'>First name</label>
                            <input type='text' id='first_name'/>
                        </div>
                        <div className='text-2xl font-bold  labs'>
                            <label htmlFor='last_name'>Last name</label>
                            <input type='text' id='last_name'/>
                        </div>
                        </div>
                        <div>
                            <div className='text-2xl font-bold  labs '>
                                <label htmlFor='Bio'>Bio</label>
                                <input type='text'  id='Bio' />
                            </div>     
                    
                        </div>
                <h1 className='h1'>Social</h1>
                <div className='social'>
                
                <div>
                <label htmlFor='facebook'>Facebook</label>
                <input type='text' id='facebook'/>
                </div>
                <div>
                <label htmlFor='Github'>Github</label>
                <input type='text' id='Github'/>
                </div>
             
                </div>
                </div>
                <div className='button_div'>
                    <button className='final_button save'>Save</button>
                    <button className='final_button cancel'>cancel</button>
                </div>
            </form>
            </div>
        </div>
      </div>
        
    </div>
  )
}

export default profileinfo