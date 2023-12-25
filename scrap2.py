import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import json



#je n'ai pas mis toutes les pages
nbr_pages = 8

#je récup toutes les pages
def get_all_pages():

  urls=[]

  page_number=1

  for i in range(nbr_pages):
        i=f"https://avocatalgerien.com/listings/avocat-{page_number}/"
        page_number+=1
        urls.append(i)
    
  return urls

    

#get_all_pages()

#je récup les avocats d'une page 
def parse_avocats(url):

    r=requests.get(url , verify=False)
    soup=BeautifulSoup(r.content , "html.parser")
    
    #je récup la stucture liée à un avocat 
    avocats = soup.find_all('div', class_='details-left' )
    #print(len(avocats))"""

    #j'initialise les données à NULL
    nom = categories = adresse = "NULL"

    #j'ai initialisé un tableau pour mettre dedans les données des avocats 
    toutes_les_entrees = []

    
    #je récup les données de l'avocat 
    for avocat in avocats:
        entree = {
            "nom": avocat.find('h1', class_='entry-title').text.strip() if avocat.find('h1', class_='entry-title') else "NULL",
            "categories": avocat.find('p', class_="listing-cat").text.strip() if avocat.find('p', class_="listing-cat") else "NULL",
            "adresse": avocat.find('li', class_="address").text.strip() if avocat.find('li', class_="address") else "NULL",
            "email": avocat.find('li', id="listing-email").find('a')['href'].split(":")[1].strip() if avocat.find('li', id="listing-email") else "NULL",
        }
        
        #j'ai récup les données d'un avocat 
        
        #j'ajoute au tableau
        toutes_les_entrees.append(entree)


    print(toutes_les_entrees)

 

#pour créer un fichier json
""" chemin_json='D:\\Scrap_project\\Scrap_annuaire\\annuaire_avocats.json'

        with open(chemin_json, 'a', encoding='utf-8') as json_file:
           json.dump(toutes_les_entrees, json_file, ensure_ascii=False, indent=4)"""





#je récup les avocats de toutes les pages 
def parse_all_avocats():

  pages=get_all_pages()

  for page in pages:
     parse_avocats(url=page)
     print(f"on scrappe {page}")





parse_all_avocats()
