Il faudrait travailler sur un environement virtuel 
Il faudrait effectuer ces instalations avant d'exécuter :

pip install requests
pip install beautifulsoup4
pip install selenium


scrap.py ====>  première version , je l'ai utilisée pour scrapper à partir de cette url "https://avocatalgerien.com/listings/page/1/" (cards de tous les avocats )
données = {nom , addresse , catégorie}

scrap2.py ====> deuxième version , je l'ai utilisée pour scrapper à partir de cette  url "https://avocatalgerien.com/listings/avocat-1/" (une page pour un avocat , l'ensemble de ces pages  est sécurisée )
données = {nom , addresse , catégorie, email}
