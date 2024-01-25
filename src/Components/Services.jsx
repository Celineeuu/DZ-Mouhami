import React from 'react';
/*import { Link } from 'react-router-dom';*/
import './Services.css'
import image from '../Assets/Rectangle 3.svg'
import { useTranslation } from 'react-i18next';

const Hero = () => {

    const { t } = useTranslation();
  return (

    <>
    <div className='s-titre'>
    <h1 className='s-blanc'>{t('NOS') }</h1>
    <h1 className='s-orange'>{t('SERVICES')}</h1>
    </div>


    <main>

        <div className='text'>
            <div className='element'>
            <div className='titre'>  
            <h3 className='num'>1</h3>
            <h2 className='num-text'>{t('Chercher')}</h2>
            </div> 
            <p className='des'> {t('Trouvez rapidement l avocat idéal en utilisant notre barre de recherche . Filtrez par région et spécialité pour des résultats précis.')}</p>
            </div>

            <div className='element'>
            <div className='titre'>  
            <h3 className='num'>2</h3>
            <h2 className='num-text'>{t('Contacter')}</h2>
            </div> 
            <p className='des'>{t('Trouvez rapidement l avocat idéal en utilisant notre barre de recherche . Filtrez par région et spécialité pour des résultats précis.')}</p>
            </div>


            <div className='element'>
            <div className='titre'>  
            <h3 className='num'>3</h3>
            <h2 className='num-text'>{t('Comparer')}</h2>
            </div> 
            <p className='des'>{t('Trouvez rapidement l avocat idéal en utilisant notre barre de recherche . Filtrez par région et spécialité pour des résultats précis.')}</p>
            </div>
            </div>

            <aside>
            <img className='balance' src={image} alt="justice" />
            </aside>
            

    </main> 
    </>);
}








      
 

export default Hero;