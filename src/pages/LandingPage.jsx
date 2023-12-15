import React from 'react'
import './Landing_page.css'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import Services from '../components/Services'
import Footer from '../components/Footer'



function LandingPage() {

  /*ici je rends les composants*/ 
  return (
    <div className='landing'>
        <Navbar/>
        <Hero/>
        <Services/> 
        <Footer/>
      
    </div>
  )
}

export default LandingPage
