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
import { useParams } from 'react-router-dom';
import RendezVousAvocats from "./rendezVousAvocat"

const ProfilVueAvocat = () => {
  const [visibleCommentaires, setVisibleCommentaires] = useState([]);

  const [selectedSection, setSelectedSection] = useState('informations'); // 'informations' ou 'rendez-vous'


  const handleClickPremier = () => {
    setSelectedSection('informations')
  };

  const handleClickDeuxieme = () => {
        setSelectedSection('rendez-vous');

  };

  const rating = 5;

  //debut 
  const [avocatInfo, setAvocatInfo] = useState({
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
  });
  const [commentaires, setCommentaires] = useState([
    { contenu: "Contenu du premier commentaire", nomPersonne: "Nom de la personne 1" },
      { contenu: "Contenu du deuxième commentaire", nomPersonne: "Nom de la personne 2" },
      { contenu: "Contenu du troisième commentaire", nomPersonne: "Nom de la personne 3" }
  ])
  const { connected_id } = useParams();

  useEffect(() => {
 fetchAvocatInfos();
  }, [connected_id]);

  const fetchAvocatInfos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/afficher_avocat/${connected_id}`);
      const responseData = await response.json();
      console.log(responseData)
        setAvocatInfo(responseData);
    } catch (error) {
      console.error("Erreur lors du fetch des avocats: ", error);
    }
  };

  useEffect(() => {
    fetchAvocatComments();
  },[])

  const fetchAvocatComments = async () => {
    try {
      console.log("here we go")
      const commentairesResponse = await fetch(`http://127.0.0.1:8000/comment_avocat/${connected_id}/`);
      const commentairesData = await commentairesResponse.json();
      console.log("le deuxième here")
      console.log("ici ", commentairesData)
      setCommentaires(commentairesData);
    } catch (error) {
      console.error("Erreur lors du fetch des avocats: ", error);
    }
  };

  // Utilisez la fonction pour obtenir les informations de l'avocat
  const ratingAvocat = avocatInfo.rating;
  const nomCompletAvocat = `${avocatInfo.nom} ${avocatInfo.prenom}`;
  const specialiteAvocat = avocatInfo.specialite;
  const bioAvocat = avocatInfo.bio;
  const latitude = 36.7833; // Replace with actual latitude
  const longitude = 3.167; // Replace with actual longitude



  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= avocatInfo.evaluation ? (
          <FontAwesomeIcon key={i} icon={faStar} style={{ color: "gold", fontSize: "24px" }} />
        ) : null
      );
    }
    return stars;
  }

  
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
    {selectedSection === 'informations' && (
    <div>
    <div className="centeredDiv"  style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="avocatInfoDiv">
    <span className="photoAvocat"><img src={`http://127.0.0.1:8000/${avocatInfo.photo}`} alt="avocat"/></span>
    <br/>
          <div className="ratingAvocat">{generateStars()}  {avocatInfo.evaluation}</div>
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
    <div className="titre6">Profil élaboré</div>
      <div className="bioAvocatDiv">
      <div className="localisation"><b>Wilaya d'activité : </b>{avocatInfo.adresse}</div>
      <div className="localisation"><b>Points d'intérêt : </b>{bioAvocat}</div>
      </div>
    </div>

    <div className="centeredDiv"  style={{ display: 'flex', flexDirection: 'column' }}>
    <div className="titre6">Localisation</div>
    <div>
    <MapContainer  center={[latitude, longitude]} zoom={10} style={{ height: "30px" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          <span>{avocatInfo.nom} {avocatInfo.prenom}</span>
        </Popup>
      </Marker>
    </MapContainer>
    </div>
    </div>
   
    <div className="centeredDiv" >
    <div className="avisAvocatDiv">
          <div className="titre7">Avis</div>
          <div className="cartesContainer">
          {commentaires && commentaires.length > 0 ? (
  commentaires.map((commentaire, index) => (
    <div key={index} className="carte">
      <p className="contenuCommentaire">{commentaire.contenu}</p>
      {/*<hr />
      <div className="nomCommentaire">{commentaire.nomPersonne}</div>*/}
    </div>
  ))
) : (
  <div>Aucun commentaire disponible.</div>
)}        
</div>
        </div>
    </div>
    <div className="footer" >
      
      </div>
      </div>
      )}

{selectedSection === 'rendez-vous' && (
        <RendezVousAvocats />
      )}

    </div>
    
    )

}


export default ProfilVueAvocat;