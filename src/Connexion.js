import React from "react";
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useState } from "react";
import "./connexion.css"
import logoGoogle from "./Assets/logoGoogle.svg"

const Connexion = () => {
    //preparer la data du form pour l'envoyer au back
    const [formData, setFormData] = useState({
        email: '',
        password: '',
      });

    
      // pour changer constament l'etat des variables du formulaires
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };
    
      // ça c'est pour le linking
      const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
           console.log(formData)
           const response = await fetch("http://127.0.0.1:8000/auth/signup/", { //ici on doit mettre l'url du back
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
          const data = await response.json();
          console.log("Réponse du back: ", data);
        } catch (error) {
          console.error("Erreur lors du fetch: ", error);
        }
      }

    return(
    <div className="signUpDiv">
      <NavBar />
      <div className="boxDiv">
        <h1 className="title">Connexion</h1>
        <form className="form" type= 'POST' encType="multipart/form-data" onSubmit={handleFormSubmit}>
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
          <div className="formRow">
          <button className="button" type="submit">
             Se connecter
          </button>
          <p className="text1">Vous n'avez pas de compte?<a className="lienInsc" href="./Inscription">S'inscrire</a></p>
          </div>
          <div className="formRow">
            <p className="text2">Vous n'etes pas avocat? <a className="lienInsc" href="./Connexion">Se connecter avec Google<img src={logoGoogle} className="logoGoogle" alt="aaa"></img></a></p>
          </div>
        </form>
      </div>
      <Footer />
    </div>

    )
}


export default Connexion;