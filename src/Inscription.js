import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useState } from "react";
import "./inscription.css"

const Inscription = () => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    adresse: '',
    telephone: '',
    specialite: '',
    photo: null, // Changé de '' à null
    password: '',
    username: '',
    tarif: null,
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

      const response = await fetch("http://127.0.0.1:8000/auth/signup/", {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await response.json();
      console.log("Réponse du back: ", data);
    } catch (error) {
      console.error("Erreur lors du fetch: ", error);
    }
  };

    return(
    <div className="signUpDiv">
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
              <input onChange={handleInputChange} className="input" id="specialite" name="specialite" placeholder="Specialitée" required></input>
            </div>
            <div className="item">
              <label className="labels" for = "telephone">Numéro de telephone *</label>
              <input onChange={handleInputChange} className="input" id="telephone" name="telephone" placeholder="Numéro de telephone" required></input>
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
