import React, { useState, useEffect } from "react";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import frLocale from '@fullcalendar/core/locales/fr';
import "./Calendar.css"
import { useParams } from 'react-router-dom';

const Calendar = () => {
    const [taches, setTaches] = useState([
        {id: 0, date: "2024-01-06", heure: "14:00", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 1, date: "2024-01-07", heure: "15:30", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 2, date: "2024-01-06", heure: "08:00", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 3, date: "2024-01-08", heure: "09:30", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 4, date: "2024-01-05", heure: "12:30", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 5, date: "2024-01-05", heure: "11:00", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"},
        {id: 6, date: "2024-01-05", heure: "14:00", numtel: "0123456789", nom: "test", prenom: "test", sujet: "bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla"}
    ]);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedDateTasks, setSelectedDateTAsks] = useState([]);
    const { connected_id } = useParams();

    // link des taches de l'avocat
    useEffect(() => {
        const fetchTaches = async () => {
            try {
                const response = await fetch(`/url/${connected_id}`); // ajouter l'url du back
                const data = await response.json();
                setTaches(data.taches); // je dois demander à lilia de nomer la liste des taches taches 
            } catch (error) {
                console.error("Erreur lors du fetch des taches: ", error);
            }
        };
        fetchTaches();
    }, []);  

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr);
        console.log(arg.dateStr)
        setSelectedDateTAsks(taches.filter(tache => tache.date === arg.dateStr));
    };

    function renderEventContent (eventInfo) {
        return (
            <b>{eventInfo.event.extendedProps.heure}</b>
        )
    }

    return (
        <div className="calendar">
            <FullCalendar
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                events={taches}
                eventContent={renderEventContent}
                dateClick={handleDateClick}
                locale={frLocale}
            />
            {selectedDateTasks.length > 0 ? (
                <div className="infos">
                <h2>Rendez vous pour le {selectedDate}</h2>
                {selectedDateTasks.map((tache, index) => (
                    <div className="tache" key={index}>
                        <p className="item-tache-heure"><b>Heure : </b>{tache.heure}</p>
                        <div className="item-tache-row">
                            <p className="item-tache"><b>Nom complet : </b>{tache.nom} {tache.prenom}</p>
                        </div>
                        <p className="item-tache"><b>Numéro de téléphone : </b>{tache.numtel}</p>
                        <p className="item-tache"><b>Sujet : </b>{tache.sujet}</p>
                    </div>
                ))}
                </div>
            ) : (
                <div className="infos">
                <h2>Vous n'avez aucun rendez le {selectedDate}</h2>
                </div>
            )}
        </div>
    );
}

export default Calendar;
