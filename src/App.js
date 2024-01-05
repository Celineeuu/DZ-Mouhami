import React from "react";
import { Route , BrowserRouter as Router , Routes } from "react-router-dom";
import Inscription from "./Pages/Inscription";
import PrendreRendezVous from "./Pages/prendreRendezVous";
import RendezVousAvocat from "./Pages/rendezVousAvocat"
import Calendar from "./Components/calendar"
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer"
import "./App.css"

const App = () => {
    return ( 
        <Router>
         <div className="App">
          
           <div>
              <Routes>
                <Route path="/Inscription" element={<Inscription />}></Route>
                <Route path="/PrendreRendezVous" element={<PrendreRendezVous />}></Route>
                <Route path="/RendezVousAvocat" element={<RendezVousAvocat />}></Route>
                <Route path="/Calendar" element={<Calendar />}></Route>
              </Routes> 
           </div>
            
         </div>
        </Router>    
     );
}
 
export default App;