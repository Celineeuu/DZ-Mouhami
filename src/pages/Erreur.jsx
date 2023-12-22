import React from 'react';
import './Erreur.css';

const Erreur= () => {
 return (
    <div className="error-page">
      <h1 className='oops'>Oups!</h1>
      <h2 className='err'>404</h2>
      <p className='text1'>Une erreur est survenue !</p>
      <p className='text2'>Veuillez réessayer plus tard </p>
    </div>
 );
};

export default Erreur ;