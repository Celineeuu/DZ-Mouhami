import React from "react";
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import { useState, useEffect } from "react";
import Calendar from "../Components/calendar"
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import "./rendezVousAvocat.css"

const RendezVousAvocats = () => {
    const [demandes, setDemandes] = useState([
        {id: 0, nom: "Falouz", prenom: "Dihia", email: "d_falouz@estin.dz", sujet: "Consultation sur un problème avec un prof", date: "28/12/2023", heure: "15:00" },
        {id: 1, nom: "Falouz", prenom: "Zahra", email: "zahra@gmail.com", sujet: "Consultation sur un problème familial", date: "29/12/2023", heure: "8:00"}
    ])

    const [taches, setTaches] = useState([])
    const [date, setDate] = useState(null)
    const filterDays = (date) => {
        const day = date.getDay()
        return day !== 5 && day !== 6
    }
    // link des demandes
    useEffect(() => {
        const fetchDemandes = async () => {
          try {
            const response = await fetch(""); // ajouter l'url du back
            const data = await response.json();
            setDemandes(data.demandes); // je dois demander à lilia de nomer la liste des demandes demandes 
          } catch (error) {
            console.error("Erreur lors du fetch des demandes: ", error);
          }
        };
        fetchDemandes();
      }, []);

    // link des taches de l'avocat
    useEffect(() => {
        const fetchTaches = async () => {
          try {
            const response = await fetch(""); // ajouter l'url du back
            const data = await response.json();
            setTaches(data.taches); // je dois demander à lilia de nomer la liste des taches taches 
          } catch (error) {
            console.error("Erreur lors du fetch des taches: ", error);
          }
        };
        fetchTaches();
      }, []);

    //link le delete 
    const handleDelete = async (e, value) => {
        e.preventDefault();
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('id', value.id);
          console.log(formDataToSend.get("id"))
          const response = await fetch("", { // n'oublie pas d'ajouter l'url du back
            method: 'POST',
            body: formDataToSend,
          });
    
          const data = await response.json();
          console.log("Réponse du back: ", data);
        } catch (error) {
          console.error("Erreur lors du fetch du form Inscription: ", error);
        }
      };


    //link le accepte
    const handleAccept = async (e, value) => {
        e.preventDefault();
        try {
          const formDataToSend = new FormData();
          formDataToSend.append('id', value.id);
          console.log(formDataToSend.get("id"))
          const response = await fetch("", { //n'oublie pas d'ajouter l'url du back
            method: 'POST',
            body: formDataToSend,
          });
    
          const data = await response.json();
          console.log("Réponse du back: ", data);
        } catch (error) {
          console.error("Erreur lors du fetch du form Inscription: ", error);
        }
      };

    return (
        <div className="rendezVousAvocat">
            <NavBar />
            <div className="content">
                <div className="demandes-container">
                <div className="demandes">
                    {demandes.map((value) => (
                        <div className="card" key={value.id}>
                            <div className="card-content">
                                    <div className="row">
                                        <div className="item">
                                            <p className="key">Nom : </p>
                                            <p className="value">{value.nom}</p>
                                        </div>
                                        <div className="item">
                                            <p className="key">Prenom : </p>
                                            <p className="value">{value.prenom}</p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="item">
                                            <p className="key">Date : </p>
                                            <p className="value">{value.date}</p>
                                        </div>
                                        <div className="item">
                                            <p className="key">Heure : </p>
                                            <p className="value">{value.heure}</p>
                                        </div>
                                    </div>
                                    <div className="item">
                                        <p className="key">Email : </p>
                                        <p className="value">{value.email}</p>
                                    </div>
                                    <div className="item">
                                        <p className="key">Sujet : </p>
                                        <p className="value">{value.sujet}</p>
                                    </div>
                                </div>
                            <div className="buttons">
                                <button className="accepte" onClick={(event) => handleAccept(event, value)}>Accepter</button>
                                <button className="delete" onClick={(event) => handleDelete(event, value)}>Refuser</button>
                            </div>
                        </div>
                    ))}
                </div> 
                </div>
                <div className="agenda">
                    <Calendar />
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default RendezVousAvocats;