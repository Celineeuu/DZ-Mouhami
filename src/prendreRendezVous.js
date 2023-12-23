import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useState } from "react";
import "./prendreRendezVous.css";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import moment from "moment";

const PrendreRendezVous = () => {
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)

    const handleDate = (date) => {
        setDate(date)
    }

    const handleTime = (time) => {
        setTime(time)
    }

    const filterDays = (date) => {
        const day = date.getDay()
        return day !== 5 && day !== 6
    }

    const handleFormSubmit = () => {

    }

    return(
        <div className="rendezVous">
            <NavBar />
            <div className="container">
                <h1 className="title">Prendre un rendez vous</h1>
                <form className="form" type="POST" onSubmit={handleFormSubmit}>
                    <div className="item">
                        <label className="labels">Date *</label>
                        <DatePicker 
                            required
                            selected={date}
                            onChange={handleDate}
                            filterDate={filterDays}
                            dateFormat="MM/dd/yyyy"
                            minDate={moment().toDate()}
                        />
                    </div>
                    <div className="item">
                        <label className="labels">Heure *</label>
                        <DatePicker 
                            required
                            selected={time}
                            onChange={handleTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            timeFormat="HH:mm"
                            dateFormat="HH: mm"
                            minTime={moment().hours(8).minutes(0).toDate()}
                            maxTime={moment().hours(16).minutes(0).toDate()}
                        />
                    </div>
                    <button className="bouton" type="submit">Envoyer</button>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export default PrendreRendezVous;