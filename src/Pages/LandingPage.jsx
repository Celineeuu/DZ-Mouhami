import React from 'react'
import "./LandingPage.css"
import Hero from '../Components/Hero'
import Services from '../Components/Services'




function LandingPage() {

  /*ici je rends les composants*/ 
  return (
    <div className='landing'>
        
        <Hero/>
        <Services/> 
      
      
    </div>
  )
}

export default LandingPage