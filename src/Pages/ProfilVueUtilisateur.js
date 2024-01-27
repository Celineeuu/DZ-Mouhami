import React from "react";
import { useState } from "react";
import "./profilVueUtilisateur.css"
import avocat from "../Assets/avocat.png"
import avion from "../Assets/avion-en-papier.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';




const ProfilVueUtilisateur= () => {
   
  const [comment, setComment] = useState("");
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { connected_id, avocat_id } = useParams();

  const handleClickPremier = () => {
    navigate(`/${connected_id}/PrendreRendezVous/${avocat_id}`)
  };


  // et ça
  const handleCommentSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/commentaires/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contenu: comment, client: connected_id, avocat: avocat_id }),
      });

      if (response.ok) {
        console.log('Commentaire soumis avec succès!');
        setMessage('Commentaire soumis avec succès!');
        setTimeout(() => {
          setMessage('');
        }, 1000);
      } else {
        console.error('Erreur lors de la soumission du commentaire');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission du commentaire:', error);
    }
  };

  const rating = 5;
  
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
    /*latitude: 48.8583701,
    longitude: 2.2944813, */
  });
  const [commentaires, setCommentaires] = useState([
    { contenu: "Contenu du premier commentaire", nomPersonne: "Nom de la personne 1" },
      { contenu: "Contenu du deuxième commentaire", nomPersonne: "Nom de la personne 2" },
      { contenu: "Contenu du troisième commentaire", nomPersonne: "Nom de la personne 3" }
  ])

  
  useEffect(() => {
 fetchAvocatInfos();
  }, [avocatInfo]);

  const fetchAvocatInfos = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/afficher_avocat/${avocat_id}`);
      const responseData = await response.json();
      console.log("ici c'est infos avocat ", responseData)
        setAvocatInfo(responseData);
    } catch (error) {
      console.error("Erreur lors du fetch des avocats: ", error);
    }
  };

  useEffect(() => {
    fetchAvocatComments();
  },[commentaires])

  const fetchAvocatComments = async () => {
    try {
      const commentairesResponse = await fetch(`http://127.0.0.1:8000/comment_avocat/${avocat_id}/`);
      const commentairesData = await commentairesResponse.json();
      console.log("ici c'est comments ", commentairesData)
      setCommentaires(commentairesData);
    } catch (error) {
      console.error("Erreur lors du fetch des avocats: ", error);
    }
  };
  avocatInfo.latitude = 48.8583701; // Replace with actual latitude
avocatInfo.longitude = 2.2944813; // Replace with actual longitude
  // Accéder aux propriétés de l'objet avocatInfo pour obtenir les informations individuelles
  const ratingAvocat = avocatInfo.rating;
  const nomCompletAvocat = `${avocatInfo.nom} ${avocatInfo.prenom}`;
  const specialiteAvocat = avocatInfo.specialite;
  const bioAvocat=avocatInfo.bio;
  

  
  // Génère les étoiles en fonction du rating
  const generateStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= avocatInfo.evaluation ? (
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

// linker ça



const handleRatingSubmit = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/noter/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ note: selectedStars, idclient: connected_id, idavocat: avocat_id }),
      });

      if (response.ok) {
        console.log(response);
        setMessage('Note soumise avec succès!');
        setTimeout(() => {
          setMessage('');
        }, 1000);
      } else {
        console.error('Erreur lors de la soumission de la note');
      }
    } catch (error) {
      console.error('Erreur lors de la soumission de la note:', error);
    }
  }


    return(
    <div className="profilVueAvocatDiv">
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
          <button className="buton0" onClick={handleClickPremier} >Prendre Rendez-vous</button>
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

   
    <div className="centeredDiv"  >
<div className="avisAvocatDiv">
  <div className="titre7">Avis sur nous</div>
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
  {message && <div className="message">{message}</div>}

</div>
<div className="commenter"  style={{ display: 'inline-block' }}>
          <div className="titre8">Commenter</div>
          <div>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Votre commentaire..."/>
            <button onClick={handleCommentSubmit}><img src={avion} alt="aaa" /></button>
            {message && <div className="message">{message}</div>}
          </div>
        </div>
        </div>
</div>
    </div>
<div className="footer">
  
</div>
     
    </div>
    
    )

}


export default ProfilVueUtilisateur;