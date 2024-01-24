import React from "react";
import { Route , BrowserRouter as Router , Routes } from "react-router-dom";
import Inscription from "./Pages/Inscription";
import PrendreRendezVous from "./Pages/prendreRendezVous";
import RendezVousAvocat from "./Pages/rendezVousAvocat"
import Calendar from "./Components/Calendar";
import "./App.css"

const App = () => {
    return ( 
        <Router>
         <div className="App">
          
           <div>
              <Routes>
                /* structure des liens : local../id connecté avocat ou user / la page / l'id de l'avocat avec le profil */
                <Route path="/Inscription" element={<Inscription />}></Route>
                <Route path="/:connected_id/PrendreRendezVous/:avocat_id" element={<PrendreRendezVous />}></Route>
                <Route path="/:connected_id/RendezVousAvocat" element={<RendezVousAvocat />}></Route>
                <Route path="/calendar" element={<Calendar />}></Route> /* juste pour tester le calendar */
              </Routes> 
           </div>
         </div>
        </Router>    
     );
}
 
export default App;