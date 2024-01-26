import React, { useState } from "react";
import "./profilVueAvocat.css";
import avocat from "../Assets/avocat.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const ProfilVueAvocat = () => {
  const [visibleCommentaires, setVisibleCommentaires] = useState([]);

  const handleClickPremier = () => {
    console.log("Cliqué sur le premier bouton !");
  };

  const handleClickDeuxieme = () => {
    console.log("Cliqué sur le deuxième bouton !");
  };

  const rating = 5;

  const getAvocatInfo = () => {
    const avocatInfo = {
      photo: avocat,
      rating: 5,
      nomComplet: "Stefan A Rubin",
      specialite: "La ou les specialites de l'avocat viendront se mettre ici",
      biographie: "la biographie de l'avocat viendra se mettre la",
      commentaires: [
        { contenu: "Contenu du premier commentaire", nomPersonne: "Nom de la personne 1" },
        { contenu: "Contenu du deuxième commentaire", nomPersonne: "Nom de la personne 2" },
        { contenu: "Contenu du troisième commentaire", nomPersonne: "Nom de la personne 3" },
      ],
      latitude: 48.8583701,
      longitude: 2.2944813, 
    };

    return avocatInfo;
  };

  // Utilisez la fonction pour obtenir les informations de l'avocat
  const avocatInfo = getAvocatInfo();
  const commentaires = avocatInfo.commentaires; // Déclarer commentaires ici
  const photoAvocat = avocatInfo.photo;
  const ratingAvocat = avocatInfo.rating;
  const nomCompletAvocat = avocatInfo.nomComplet;
  const specialiteAvocat = avocatInfo.specialite;
  const bioAvocat = avocatInfo.biographie;
  avocatInfo.latitude = 48.8583701; // Replace with actual latitude
  avocatInfo.longitude = 2.2944813; // Replace with actual longitude


  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingAvocat ? (
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold", fontSize: "24px" }} />
        ) : null
      );
    }
    return stars;
  };

  const [selectedStars, setSelectedStars] = useState(0);
  const [averageRating, setAverageRating] = useState(ratingAvocat);
  const [totalRatings, setTotalRatings] = useState(0);

  const handleStarClick = (stars) => {
    setSelectedStars(stars);
  };

  const handleRatingSubmit = () => {
    const newTotalRatings = totalRatings + 1;
    const newAverageRating = (averageRating * totalRatings + selectedStars) / newTotalRatings;

    setTotalRatings(newTotalRatings);
    setAverageRating(newAverageRating);
  };


    return(
    <div className="profilVueAvocatDiv">
      
      <div className="grandbouton" >
      <div style={{ width: "50%" }}>
        <button className="bouton1" onClick={handleClickPremier} href="ProfilVueAvocat.js">
          Informations personnelles
        </button>
        <button className="bouton3" onClick={handleClickDeuxieme} href="">
          Rendez-vous
        </button>
      </div>
    </div>
    <div className="centeredDiv"  style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="avocatInfoDiv">
    <span className="photoAvocat"><img src={avocatInfo.photo} alt="avocat"/></span>
    <br/>
          <div className="ratingAvocat">{generateStars()}({averageRating.toFixed(1)})</div>
         <div className="topInfo">
          <span className="nomCompletAvocat"><b>{nomCompletAvocat}</b></span>
          <br/>
          
          <br/>
          <div className="spec"><b>Specialite:</b></div>
          <span className="specialite">{specialiteAvocat}</span>
         </div>
      </div>
    </div>
    
    <div className="centeredDiv"  style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="titre6">Biographie</div>
      <div className="bioAvocatDiv">
     
      <div className="biographie">{bioAvocat}</div>
      </div>
    </div>

    <div className="centeredDiv"  style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="titre0">Localisation</div>
    <div>
    <MapContainer  center={[avocatInfo.latitude, avocatInfo.longitude]} zoom={10} style={{ height: "30px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[avocatInfo.latitude, avocatInfo.longitude]}>
        <Popup>
          <span>{avocatInfo.nomComplet}</span>
        </Popup>
      </Marker>
    </MapContainer>
      </div>
      </div>
   
    <div className="centeredDiv" >
    <div className="avisAvocatDiv">
          <div className="titre7">Avis</div>
          <div className="cartesContainer">
    {avocatInfo.commentaires.map((commentaire, index) => (
      <div key={index} className="carte">
        <p className="contenuCommentaire">{commentaire.contenu}</p>
        <hr />
        <div className="nomCommentaire">{commentaire.nomPersonne}</div>
      </div>
    ))}
</div>
        </div>
    </div>
    <div className="footer" >
      
      </div>
    </div>
    
    )

}


export default ProfilVueAvocat;