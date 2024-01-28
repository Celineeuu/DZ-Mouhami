import React from "react";
import Calendar from "../Components/Calendar"
import "./rendezVousAvocat.css"

const RendezVousAvocats = () => {

    return (
        <div className="rendezVousAvocat">
            <div className="content">
              <div className="partie">
                <p className="titre">Agenda</p>
                <Calendar />
              </div>
            </div>
        </div>
    )
}

export default RendezVousAvocats;