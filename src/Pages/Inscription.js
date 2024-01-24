import React from "react";
import NavBar from "../Components/NavBar"
import Footer from "../Components/Footer"
import { useState } from "react"
import "./inscription.css"

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: '',
    specialite: '',
    photo: null,
    password: '',
    username: '',
    tarif: null,
    bio: ""
  });

  const [image, setImage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    console.log(e.target.files);
    setImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }
      formDataToSend.append('photo', image);
      console.log(formDataToSend)
      const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Réponse du back: ", data);
    } catch (error) {
      console.error("Erreur lors du fetch du form Inscription: ", error);
    }
  };

    return(
      <div className="inscription">
          <NavBar />  
          <div className="boxDiv">
          <h1 className="title">Inscription</h1>
          <form className="form" type= 'POST' encType="multipart/form-data" onSubmit={handleFormSubmit}>
            <div className="formRow">
              <div className="item">
                <label className="labels" for = "nom">Nom *</label>
                <input onChange={handleInputChange} className="input" id="nom" name="nom" placeholder="nom" required></input>
              </div>
              <div className="item">
                <label className="labels" for = "prenom">Prenom *</label>
                <input onChange={handleInputChange} className="input" id="prenom" name="prenom" placeholder="prenom" required></input>
              </div>
            </div>
            <div className="formRow">
              <div className="item">
                <label className="labels" for = "username">Nom d'utilisateur *</label>
                <input onChange={handleInputChange} className="input" id="username" name="username" placeholder="Nom d'utilisateur" required></input>
              </div>
              <div className="item">
                <label className="labels" for = "adresse">Adresse *</label>
                <input onChange={handleInputChange} className="input" id="adresse" name="adresse" placeholder="Adresse" required></input>
              </div>
            </div>
            <div className="formRow">
              <div className="item">
                <label className="labels" for = "specialite">Specialitée *</label>
                <select onChange={handleInputChange} className="input" id="specialite" name="specialite" placeholder="Specialitée" required>
                  <option value="option1">Droit de l’arbitrage</option>
                  <option value="option1">Droit des associations et des fondations</option>
                  <option value="option1">Droit des assurances</option>
                  <option value="option1">Droit bancaire et boursier</option>
                  <option value="option1">Droit commercial, des affaires et de la concurrence</option>
                  <option value="option1">Droit du crédit et de la consommation</option>
                  <option value="option1">Droit du dommage corporel</option>
                  <option value="option1">Droit des enfants</option>
                  <option value="option1">Droit de l’environnement</option>
                  <option value="option1">Droit des étrangers et de la nationalité</option>
                  <option value="option1">Droit de la famille, des personnes et de leur patrimoine</option>
                  <option value="option1">Droit de la fiducie</option>
                  <option value="option1">Droit fiscal et droit douanier</option>
                  <option value="option1">Droit des garanties, des sûretés et des mesures d’exécution</option>
                  <option value="option1">Droit immobilier</option>
                  <option value="option1">Droit international et de l’Union européenne</option>
                  <option value="option1">Droit du numérique et des communications</option>
                  <option value="option1">Droit pénal</option>
                  <option value="option1">Droit de la propriété intellectuelle</option>
                  <option value="option1">Droit de la protection des données personnelles</option>
                  <option value="option1">Droit public</option>
                  <option value="option1">Droit rural</option>
                  <option value="option1">Droit de la santé</option>
                  <option value="option1">Droit de la sécurité sociale et de la protection sociale</option>
                  <option value="option1">Droit des sociétés</option>
                  <option value="option1">Droit du sport</option>
                  <option value="option1">Droit des transports</option>
                  <option value="option1">Droit du travail</option>
                </select>
              </div>
              <div className="item">
                <label className="labels" for = "telephone">Numéro de telephone *</label>
                <input onChange={handleInputChange} pattern="\d{10}" className="input" id="telephone" name="telephone" placeholder="Numéro de telephone" required></input>
              </div>
            </div>
            <div className="formRow">
              <div className="item">
                <label className="labels" for = "image">Photo de profil</label>
                <input onChange={handleImageChange} className="input" id="photo" name="photo" type="file" alt=""></input>
              </div>
              <div className="item">
                <label className="labels" for = "tarif">Tarifs *</label>
                <input onChange={handleInputChange} className="input" id="tarif" name="tarif" placeholder="Tarifs" type="number" required></input>
              </div>
            </div>
            <div className="formRow">
              <div className="item">
                <label className="labels" for = "email">Email *</label>
                <input onChange={handleInputChange} className="input" id="email" name="email" placeholder="Email" type="email" required></input>
              </div>
              <div className="item">
                <label className="labels" for = "password">Mot de passe *</label>
                <input onChange={handleInputChange} className="input" id="password" name="password" placeholder="Mot de passe" type="password" required></input>
              </div>
            </div>
            <div className="item">
                <label className="labels" for = "bio">Compétences et expériences *</label>
                <input onChange={handleInputChange} className="input" id="bio" name="bio" placeholder="Compétences et expériences" required></input>
              </div>
            <label className="checkLabel">
                <input type="checkbox" className="checkbox"></input>
                J'ai lu et j'accepte <a className="checkLink" href="_blank" target="blank"> les termes et conditions d'utilisation</a> *
            </label>
            <button className="button" type="submit">
              S'inscrire
            </button>
          </form>
        </div>
        <Footer />
      </div>
      

    )
}


export default Inscription;