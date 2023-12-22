import React from 'react'
import './Landing_page.css'
import Hero from '../components/Hero'
import Services from '../components/Services'




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
