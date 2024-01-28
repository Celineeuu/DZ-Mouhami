import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import "./prendreRendezVous.css"
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const PrendreRendezVous = () => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [errorMessage, setErrorMessage] = useState("");
    const [showError, setShowError] = useState(false);
    const navigate = useNavigate()
    const { connected_id, avocat_id } = useParams();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        telephone: "",
        sujet: "",
        client: connected_id,
        avocat: avocat_id
    })
    /*const [busyTimes, setBusyTimes] = useState(["12:30", "11:30"])

    useEffect(() => {
        const fetchBusyTimes = async () => {
          try {
            const response = await fetch(""); // ajouter l'url du back
            const data = await response.json();
            setBusyTimes(data.busyTimes); // je dois demander à lilia de nomer la liste des busyTimes busyTimes 
          } catch (error) {
            console.error("Erreur lors du fetch de buzyTimes: ", error);
          }
        };
        fetchBusyTimes();
      }, []);*/

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        })
    }

    const filterDays = (date) => {
        const day = date.getDay()
        return day !== 5 && day !== 6
    }
/*
    const excludeTimes = () => {
        const busyTimesAsDates = busyTimes.map((busyTime) =>
          moment(busyTime, "HH:mm").toDate()
        );
        return busyTimesAsDates;
      };
    */

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            const formattedDate = moment(date).format('YYYY-MM-DD');
            const formattedTime = moment(time).format('HH:mm');

            formDataToSend.append("jour", formattedDate)
            formDataToSend.append("heure", formattedTime)
            console.log("c'est le type : ", typeof(formattedTime))
            console.log(formDataToSend.get("jour"))
            console.log(formDataToSend.get("heure"))
            console.log(formDataToSend.get("nom"))
            console.log(formDataToSend.get("prenom"))
            console.log(formDataToSend.get("telephone"))
            console.log(formDataToSend.get("sujet"))
            console.log(formDataToSend.get("client"))
            console.log(formDataToSend.get("avocat"))
            const response = await fetch("http://127.0.0.1:8000/rdvcreate/", { // ajouter l'url du back
                method: 'POST',
                body: formDataToSend,
            });
            if (response.ok) {
                const data = await response.json();
                console.log("Réponse du back: ", data);
                setErrorMessage("");
                setShowError(false);
                navigate(`/${connected_id}/ProfilVueUtilisateur/${avocat_id}`)
            } else if (response.status === 400) {
                const data = await response.json();
                console.log("Réponse d'erreur du back: ", data);
                setErrorMessage(data.message);
                setShowError(true);
            }
        } catch (error) {
            console.error("Erreur lors du fetch du submit du form de prendre rendez vous: ", error);
        }
    }

    return(
        <div className="rendezVous">
            <div>
        {showError && (
            <div style={{ backgroundColor: "lightcoral", padding: "10px", color: "white", textAlign: "center" }}>
                {errorMessage}
            </div>
        )}
    </div>
            <div className="container">
                <h1 className="title">Prendre un rendez vous</h1>
                <form className="form" type="POST" onSubmit={handleFormSubmit}>
                    <div className="formRow">
                        <div className="item">
                            <label className="labels" for = "nom">Nom *</label>
                            <input className="input" onChange={handleInputChange} id="nom" name="nom" placeholder="nom" required></input>
                        </div>
                        <div className="item">
                            <label className="labels" for = "prenom">Prenom *</label>
                            <input className="input" onChange={handleInputChange} id="prenom" name="prenom" placeholder="prenom" required></input>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="item">
                        <label className="labels" for = "telephone">Numéro de telephone *</label>
                <input onChange={handleInputChange} pattern="\d{10}" className="input" id="telephone" name="telephone" placeholder="Numéro de telephone" required></input>
                        </div>
                        <div className="item">
                            <label className="labels" for = "adresse">Sujet *</label>
                            <input className="input" onChange={handleInputChange} id="sujet" name="sujet" placeholder="Sujet" required></input>
                        </div>
                    </div>
                    <div className="formRow">
                        <div className="item">
                            <label className="labels">Date *</label>
                            <DatePicker 
                                required
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="MM/dd/yyyy"
                                minDate={moment().toDate()}
                            />
                        </div>
                        <div className="item">
                            <label className="labels">Heure *</label>
                            <DatePicker 
                                required
                                selected={time}
                                onChange={(time) => setTime(time)}
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={60}
                                timeFormat="HH:mm"
                                dateFormat="HH: mm"
                                minTime={moment().hours(8).minutes(0).toDate()}
                                maxTime={moment().hours(16).minutes(0).toDate()}
                                
                            />
                        </div>
                    </div>
                    <button className="bouton" type="submit">Envoyer</button>
                </form>
            </div>
        </div>
    )
}

export default PrendreRendezVous;

  