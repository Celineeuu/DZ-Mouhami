// Footer.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';
import logo from '../Assets/logo.svg'
import { FaFacebookF, FaTwitter, FaInstagram , FaLinkedin} from 'react-icons/fa';

const Footer = () => {


  //Logique pour les boutons de connexion et de recherche
  const navigate = useNavigate();

  const handleClickConnexion = () => {
    navigate('/connexion');
  };

  const handleClickRecherche = () => {
    navigate('/recherche');
  };





 return (
    <footer>
      {/*<div className='footer-row'>*/}

      <div className='logo-icons'>
      <div className="app-logo">
        <img src={logo} alt="App Logo" />
      </div>
      <div className="social-media">
        <FaFacebookF />
        <FaTwitter />
        <FaInstagram />
        <FaLinkedin/>
      </div>
      
      <div className="buttons">
        <button onClick={handleClickRecherche}>Chercher un avocat</button>
        <button onClick={handleClickConnexion}>Se connecter</button>
      </div>
      </div>
      <div className="copyright">
        <p>© 2022 DZ-Mouhami. All rights reserved.</p>
      </div>
    </footer>
 );
};

export default Footer;