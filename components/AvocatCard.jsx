import React from 'react';
import './AvocatCard.css';
import { FaMapMarkerAlt } from 'react-icons/fa';
import image from '../Assets/photo_avocat.png'


/*ici je structure les cards des avocats en affichant leurs données*/

const AvocatCard = ({/*image , */ specialité, nom, prenom , adresse , note , sumnote }) => {
 return (


    <div className="card-avocat">
      <img src={image} alt="avocat" className="card-image" />
      <div className="card-info">
        <h4 className='data'>Avocat spécialisé en {specialité}</h4>
        <h5 className='data'>{nom}&nbsp;{prenom}</h5>    {/*le &nbsp c'est pour l'espace*/}
        <p className='data'><FaMapMarkerAlt /> {adresse}</p>
        <div className='eval'>
         <div className="stars">
          {Array.from({ length: note }, (_, i) => i < note ? '★' : '☆').join('')}
         </div>
         <p>({sumnote})</p>
      </div>
      </div>
    </div>
 );
};

export default AvocatCard;