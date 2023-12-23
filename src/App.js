import React from "react";
import { Route , BrowserRouter as Router , Routes } from "react-router-dom";
import Inscription from "./Inscription";
import PrendreRendezVous from "./prendreRendezVous";

const App = () => {
    return ( 
        <Router>
         <div className="App">
           <Routes>
             <Route path="/Inscription" element={<Inscription />}></Route>
             <Route path="/PrendreRendezVous" element={<PrendreRendezVous />}></Route>
           </Routes>   
         </div>
        </Router>    
     );
}
 
export default App;