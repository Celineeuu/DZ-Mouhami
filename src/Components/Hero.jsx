
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
//import { Link } from 'react-router-dom';
import './Hero.css'
import image from '../Assets/Rectangle 2.svg'
import { useTranslation } from 'react-i18next';

const Hero = () => {

  const { t } = useTranslation();
  //logique pour le bouton de recherche
  const navigate = useNavigate();
  const { connected_id } = useParams()

  const handleClick = () => {
    if(connected_id){
        navigate(`/${connected_id}/Recherche`)
    }else {
        navigate("/Recherche")
    }
}




  return (
    <section className="hero">
      <div className="hero-text">
        <h1 className='hero-blanc'>{t('Répertoire d’avocats expérimentés')}</h1>
        <h1 className='hero-orange'>{t('à votre service')}</h1>

        <p>{t('Explorez notre vaste annuaire d avocats qualifiés prêts à vous aider dans votre parcours juridique.')}</p>

        <button className='btn' onClick={handleClick} >{t('Rechercher')}</button>


        
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