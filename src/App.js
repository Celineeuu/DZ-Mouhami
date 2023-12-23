import React from "react";
import { Route , BrowserRouter as Router , Routes } from "react-router-dom";
import Inscription from "./Inscription";
import PrendreRendezVous from "./prendreRendezVous";
import Connexion from "./Connexion";
const App = () => {
    return ( 
        <Router>
         <div className="App">
           <Routes>
             <Route path="/Inscription" element={<Inscription />}></Route>
             <Route path="/PrendreRendezVous" element={<PrendreRendezVous />}></Route>
     <Route path="/Connexion" element={<Connexion />}></Route>
           </Routes>   
         </div>
        </Router>    
     );
}
 
export default App;
