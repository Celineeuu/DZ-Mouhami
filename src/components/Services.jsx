import React from 'react';
/*import { Link } from 'react-router-dom';*/
import './Services.css'
import image from '../Assets/Rectangle 3.svg'

const Hero = () => {
  return (

    <>
    <div className='s-titre'>
    <h1 className='s-blanc'>NOS </h1>
    <h1 className='s-orange'>SERVICES</h1>
    </div>


    <main>

        <div className='text'>
            <div className='element'>
            <h3>1</h3>
            <h2>Chercher</h2>
            <p>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>

            <div className='element'>
            <h3>2</h3>
            <h2>Comparer</h2>
            <p>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>


            <div className='element'>
            <h3>3</h3>
            <h2>Contacter</h2>
            <p>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>
            </div>
            <aside>
            <img src={image} alt="justice" />
            </aside>
            

    </main> 
    </>);
}








      
 

export default Hero;