import React from "react";
import { useState } from "react"
import "./inscription.css"
import { useNavigate } from 'react-router-dom';


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
  const navigate = useNavigate();


  const [image, setImage] = useState(null);
  const [speciality, setSpeciality] = useState('');

  const handleOptionChange = (e) => {
    console.log(e.target.value)
    setSpeciality(e.target.value);
  };

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
      formDataToSend.append('specialite', speciality);
      console.log(formDataToSend.get("specialite"))
      const response = await fetch("http://127.0.0.1:8000/api/signup/", {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Réponse du back: ", data);
      navigate("/Connexion");
    } catch (error) {
      console.error("Erreur lors du fetch du form Inscription: ", error);
    }
  };

    return(
      <div className="inscription"> 
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
                <select value={speciality} onChange={handleOptionChange} className="input" id="specialite" name="specialite" placeholder="Specialitée" required>
                  <option selected value="default">Please Select</option>
                  <option value="Droit de l’arbitrage">Droit de l’arbitrage</option>
                  <option value="Droit des associations et des fondations">Droit des associations et des fondations</option>
                  <option value="Droit des assurances">Droit des assurances</option>
                  <option value="Droit bancaire et boursier">Droit bancaire et boursier</option>
                  <option value="Droit commercial, des affaires et de la concurrence">Droit commercial, des affaires et de la concurrence</option>
                  <option value="Droit du crédit et de la consommation">Droit du crédit et de la consommation</option>
                  <option value="Droit du dommage corporel">Droit du dommage corporel</option>
                  <option value="Droit des enfants">Droit des enfants</option>
                  <option value="Droit de l’environnement">Droit de l’environnement</option>
                  <option value="Droit des étrangers et de la nationalité">Droit des étrangers et de la nationalité</option>
                  <option value="Droit de la famille, des personnes et de leur patrimoine">Droit de la famille, des personnes et de leur patrimoine</option>
                  <option value="Droit de la fiducie">Droit de la fiducie</option>
                  <option value="Droit fiscal et droit douanier">Droit fiscal et droit douanier</option>
                  <option value="Droit des garanties, des sûretés et des mesures d’exécution">Droit des garanties, des sûretés et des mesures d’exécution</option>
                  <option value="Droit immobilier">Droit immobilier</option>
                  <option value="Droit international et de l’Union européenne">Droit international et de l’Union européenne</option>
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
      </div>
      

    )
}


export default Inscription;