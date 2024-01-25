import React from "react";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";
import "./prendreRendezVous.css"
import { useParams } from 'react-router-dom';

const PrendreRendezVous = () => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const { connected_id, avocat_id } = useParams();
    const [formData, setFormData] = useState({
        nom: "",
        prenom: "",
        numtel: "",
        sujet: "",
        idUser: connected_id,
        idAvocat: avocat_id
    })
    const [busyTimes, setBusyTimes] = useState(["12:30", "11:30"])

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
      }, []);

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

    const excludeTimes = () => {
        const busyTimesAsDates = busyTimes.map((busyTime) =>
          moment(busyTime, "HH:mm").toDate()
        );
        return busyTimesAsDates;
      };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const formDataToSend = new FormData();
            for (const key in formData) {
                formDataToSend.append(key, formData[key]);
            }
            formDataToSend.append("date", date.toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }))
            formDataToSend.append("time", time.toLocaleString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }))
            console.log(formDataToSend.get("date"))
            console.log(formDataToSend.get("time"))
            console.log(formDataToSend.get("nom"))
            console.log(formDataToSend.get("prenom"))
            console.log(formDataToSend.get("email"))
            console.log(formDataToSend.get("sujet"))
            console.log(formDataToSend.get("idUser"))
            console.log(formDataToSend.get("idAvocat"))
            const response = await fetch("", { // ajouter l'url du back
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log("Réponse du back: ", data);
        } catch (error) {
            console.error("Erreur lors du fetch du submit du form de prendre rendez vous: ", error);
        }
    }

    return(
        <div className="rendezVous">
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
                                filterDate={filterDays}
                                dateFormat="MM/dd/yyyy"
                                minDate={moment().add(1, 'days').toDate()}
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
                                excludeTimes={excludeTimes()}
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

  