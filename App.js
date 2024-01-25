

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Services from './components/Services';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Connexion from './pages/Connexion';
import RechercheAvocat from './pages/RechercheAvocat';
import Admin from './pages/Admin';
import Erreur from './pages/Erreur';

function App() {
  return (
    <div className="App">
      <div className='contenu'>
        <Navbar />
        {/* Routage */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Footer />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/recherche" element={<RechercheAvocat />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Erreur />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;





/*import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Services from './components/Services'
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Connexion from './pages/Connexion';
import RechercheAvocat from './pages/RechercheAvocat';
import Admin from './pages/Admin';
import Erreur from './pages/Erreur';




function App() {
  return (
 
    <div className="App">

       <Router>
      <div className='contenu'>

      <Navbar/>
       
        {/*Routage}
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/services" element={<Services/> } />
          <Route path="/contact" element={<Footer/>}/>
          <Route path="/connexion" element={<Connexion/>} />
          <Route path="/recherche" element={<RechercheAvocat/>}/>
          <Route path="/admin" element={<Admin/>}/>
          <Route path="*" element={<Erreur/>}/>

        </Routes>
       <Footer/> 
      </div>
    </Router>
    
       
       
       
    </div>
    
  );
}

export default App;*/