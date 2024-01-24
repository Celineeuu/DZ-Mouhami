import React from "react";
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import Calendar from "../Components/Calendar"
import "./rendezVousAvocat.css"

const RendezVousAvocats = () => {

    return (
        <div className="rendezVousAvocat">
            <NavBar />
            <div className="content">
              <div className="partie">
                <p className="titre">Agenda</p>
                <Calendar />
              </div>
            </div>
            <Footer />
        </div>
    )
}

export default RendezVousAvocats;