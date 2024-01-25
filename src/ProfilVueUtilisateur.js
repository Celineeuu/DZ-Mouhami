import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useState } from "react";
import "./profilVueUtilisateur.css"
import avocat from "./Assets/avocat.png"
import avion from "./Assets/avion-en-papier.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";



const ProfilVueUtilisateur= () => {
   
  const [comment, setComment] = useState("");

  const handleCommentSubmit = () => {
    if (comment.trim() !== "") {
      const newComment = {
        contenu: comment,
      };

      avocatInfo.commentaires = [...avocatInfo.commentaires, newComment];
      setComment("");
    }
  };

  const rating = 5;
  
  const getAvocatInfo = () => {
    const avocatInfo = {
      photo: avocat, 
      rating: 5, 
      nomComplet: "Stefan A Rubin", 
      specialite: "La ou les specialites de l'avocat viendront se mettre ici" ,// Remplacez par le texte réel
      biographie:"la biographie de l'avocat viendra se mettre la",
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
  avocatInfo.latitude = 48.8583701; // Replace with actual latitude
avocatInfo.longitude = 2.2944813; // Replace with actual longitude
  // Accéder aux propriétés de l'objet avocatInfo pour obtenir les informations individuelles
  const photoAvocat = avocatInfo.photo;
  const ratingAvocat = avocatInfo.rating;
  const nomCompletAvocat = avocatInfo.nomComplet;
  const specialiteAvocat = avocatInfo.specialite;
  const bioAvocat=avocatInfo.biographie;
  

  
  // Génère les étoiles en fonction du rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= ratingAvocat ? (
          <FontAwesomeIcon
            key={i}
            icon={faStar}
            style={{ color: "gold", fontSize: "24px" }}
          />
        ) : null
      );
    }
    return stars;
  };
  
const [selectedStars, setSelectedStars] = useState(0);
const [averageRating, setAverageRating] = useState(ratingAvocat); // Utilisez la note initiale de l'avocat
const [totalRatings, setTotalRatings] = useState(0);

const handleStarClick = (stars) => {
  setSelectedStars(stars);
};

const handleRatingSubmit = () => {
  // Mettez à jour la moyenne des notes et le nombre total de notes
  const newTotalRatings = totalRatings + 1;
  const newAverageRating =
    (averageRating * totalRatings + selectedStars) / newTotalRatings;

  setTotalRatings(newTotalRatings);
  setAverageRating(newAverageRating);
};


    return(
    <div className="profilVueAvocatDiv">
      <NavBar />
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

    
<div className="centeredDiv" style={{ display: "flex", flexDirection: "column" }}>
  <div className="titre0">Localisation</div>
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

   
    <div className="centeredDiv"  >
<div className="avisAvocatDiv">
  <div className="titre7">Avis sur nous</div>
  <div className="cartesContainer">
    {avocatInfo.commentaires.map((commentaire, index) => (
      <div key={index} className="carte">
        <p className="contenuCommentaire">{commentaire.contenu}</p>
        <hr />
        <div className="nomCommentaire">{commentaire.nomPersonne}</div>
      </div>
    ))}
  </div>
        <div className="noterEtCommenter">
        <div className="noter">
  <div className="titre8">Noter</div>
  {[1, 2, 3, 4, 5].map((star) => (
    <FontAwesomeIcon
      key={star}
      icon={faStar}
      style={{
        color: star <= selectedStars ? "gold" : "gray",
        fontSize: "24px",
        cursor: "pointer",
      }}
      onClick={() => handleStarClick(star)}
    />
  ))}
   <button onClick={handleRatingSubmit} className="boutonNote">Soumettre</button>
  <div className="moyenneNotes">(Moyenne des notes: {averageRating.toFixed(1)})</div>
</div>
<div className="commenter"  style={{ display: 'inline-block' }}>
          <div className="titre8">Commenter</div>
          <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre commentaire..."/>
            <button onClick={handleCommentSubmit}><img src={avion} alt="aaa" /></button>
          </div>
        </div>
        </div>
</div>
    </div>
<div className="footer">
   <Footer />
</div>
     
    </div>
    
    )

}


export default ProfilVueUtilisateur;