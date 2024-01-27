import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Services from './Components/Services';
import Navbar from './Components/NavBar';
import Footer from './Components/Footer';
import Connexion from './Pages/connexion';
import RechercheAvocat from './Pages/RechercheAvocat';
import Admin from './Pages/Admin';
import Erreur from './Pages/Erreur';
import Inscription from "./Pages/Inscription";
import PrendreRendezVous from "./Pages/prendreRendezVous";
import RendezVousAvocat from "./Pages/rendezVousAvocat"
import ProfilVueAvocat from "./Pages/ProfilVueAvocat";
import ProfilVueUtilisateur from "./Pages/ProfilVueUtilisateur";

import Home from "./Pages/Home"
import SocialAuth from "./Pages/social-auth"
import { useLocation } from 'react-router-dom';


function App() {
  const location = useLocation();
  const urlParams = location.pathname.split('/').filter(Boolean);

  const connected_id = urlParams[0] || null;
  const avocat_id = urlParams[2] || null;
  console.log("c'est avocat id ", avocat_id)
  console.log("c'est connected id ", connected_id)
  return (
    <div className="App">
      <div className='contenu'>
        <Navbar connected_id={connected_id} avocat_id={avocat_id} />
        {/* Routage */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:connected_id" element={<LandingPage />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/recherche" element={<RechercheAvocat />} />
          <Route path="/:connected_id/recherche" element={<RechercheAvocat />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<Erreur />} />
          <Route path="/Inscription" element={<Inscription />}></Route>
          <Route path="/:connected_id/ProfilVueAvocat"element={<ProfilVueAvocat />}></Route>
          <Route path="/:connected_id/ProfilVueUtilisateur/:avocat_id"element={<ProfilVueUtilisateur />}></Route>
          <Route path="/:connected_id/PrendreRendezVous/:avocat_id" element={<PrendreRendezVous />}></Route>
          <Route path="/:connected_id/RendezVousAvocat" element={<RendezVousAvocat />}></Route>

          <Route exact path="/test" element={<Home />} />
          <Route exact path="/google" element={<SocialAuth />} />
        </Routes>
        <Footer connected_id={connected_id} avocat_id={avocat_id} />
      </div>
    </div>
  );
}

export default App;