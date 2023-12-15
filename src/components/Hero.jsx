import React from 'react';
import { useNavigate } from 'react-router-dom';
/*import { Link } from 'react-router-dom';*/
import './Hero.css'
import image from '../Assets/Rectangle 2.svg'

const Hero = () => {


  //logique pour le bouton de recherche
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/Recherche');
  };




  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className='hero-blanc'>Répertoire d’avocats expérimentés</h1>
        <h1 className='hero-orange'>à votre service</h1>

        <p>Explorez notre vaste annuaire d'avocats qualifiés prêts à vous aider dans votre parcours juridique.</p>

        <button className='btn' onClick={handleClick} >Rechercher</button>


        
        {/*<Link to="/recherche" className="btn">Rechercher</Link>*/}
        {/*<a href="/">Rechercehe</a>*/}

      </div>

      <div className="hero-image">
        <img src={image} alt="Hero" />
      </div>
    </section>
  );
};

export default Hero;