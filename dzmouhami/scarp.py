import requests
from bs4 import BeautifulSoup
from selenium import webdriver
import json

# Je n'ai pas mis toutes les pages
nbr_pages = 20

# Je récup toutes les pages
def get_all_pages():
    urls = []
    page_number = 1
    for i in range(nbr_pages):
        i = f"https://avocatalgerien.com/listings/avocat-{page_number}/"
        page_number += 1
        urls.append(i)
    return urls

# Je récup les avocats d'une page
def parse_avocats(url):
    r = requests.get(url, verify=False)
    soup = BeautifulSoup(r.content, "html.parser")

    # Je récup la structure liée à un avocat
    avocats = soup.find_all('div', class_='details-left')

    # J'initialise les données à NULL
    nom = categories = adresse = "NULL"

    # J'ai initialisé un tableau pour mettre dedans les données des avocats
    toutes_les_entrees = []

    # Je récup les données de l'avocat
    for avocat in avocats:
        entree = {
            "nom": avocat.find('h1', class_='entry-title').text.strip() if avocat.find('h1', class_='entry-title') else "NULL",
            "categories": avocat.find('p', class_="listing-cat").text.strip() if avocat.find('p', class_="listing-cat") else "NULL",
            "adresse": avocat.find('li', class_="address").text.strip() if avocat.find('li', class_="address") else "NULL",
            "email": avocat.find('li', id="listing-email").find('a')['href'].split(":")[1].strip() if avocat.find('li', id="listing-email") else "NULL",
        }
        
        # J'ai récup les données d'un avocat
        # J'ajoute au tableau
        toutes_les_entrees.append(entree)

    return toutes_les_entrees

# Pour créer un fichier json
chemin_json = 'C:\\Users\\HP\\OneDrive\\Documents\\GL\\dzmouhami\\annuaireavocats.json'


def write_to_json(data):
    with open(chemin_json, 'a', encoding='utf-8') as json_file:
        json.dump(data, json_file, ensure_ascii=False, indent=4)

# Je récup les avocats de toutes les pages
def parse_all_avocats():
    pages = get_all_pages()
    for page in pages:
        avocats_data = parse_avocats(url=page)
        write_to_json(avocats_data)
        print(f"on scrappe {page}")

# Appel de la fonction pour effectuer le scrapping et générer le fichier JSON
parse_all_avocats()
