import React from 'react'
import '../App.css'

const projectFrame = () => {
  return (
<div className='projectFrame'>
  <header>
    <div class="logo"> 
      <span class="fish">🟦</span> 
      <span class="brand">DevFiesta</span>
    </div>
  </header>

  <nav>
    <ul class="nav-links">
      <a href='#'>Overview</a>
      <a href='#'>Updates</a>
      <a href='#'>Sponsors</a>
      <a href='#'>Rules</a>
      <a href='#'>Criteria</a>
      <a href='#'>Prizes</a>
    </ul>
  </nav>

  <div class="containers">
    <div class="left-panel">
      <div className=" project-name card  bg-amber-600">Hackathon Name</div>
      <div className='button-participate'>
         <button class="join-btn">Join Hackathon</button>
      <div class="participate-box">
        <ul>Who can participate ?
          <li>-Above legal age based on country </li>
          <li>-Above legal age based on country </li>
        </ul>
      </div>
     
        <input type="text" />
      </div>
      <div class="discussions">
        <label>Discussions</label>
        <div class="discussion-box card"> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ex neque, fugiat quaerat eos accusamus rerum itaque aliquam repudiandae, cum esse laudantium ullam quam, eum voluptas error voluptates eveniet sapiente odio.</div>
      </div>
    </div>

    <div class="right-panel">
      <div class="info-box card">Project Info and Schedule</div>
    </div>
  </div>
</div>  )
}

export default projectFrame