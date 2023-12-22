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
            <div className='titre'>  
            <h3 className='num'>1</h3>
            <h2 className='num-text'>Chercher</h2>
            </div> 
            <p className='des'>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>

            <div className='element'>
            <div className='titre'>  
            <h3 className='num'>2</h3>
            <h2 className='num-text'>Contacter</h2>
            </div> 
            <p className='des'>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>


            <div className='element'>
            <div className='titre'>  
            <h3 className='num'>3</h3>
            <h2 className='num-text'>Comparer</h2>
            </div> 
            <p className='des'>Trouvez rapidement l'avocat idéal en utilisant notre barre de recherche. 
                Filtrez par région et spécialité pour des résultats précis.</p>
            </div>
            </div>

            <aside>
            <img className='balance' src={image} alt="justice" />
            </aside>
            

    </main> 
    </>);
}








      
 

export default Hero;