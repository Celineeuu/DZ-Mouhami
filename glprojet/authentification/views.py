from django.shortcuts import render,redirect
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.contrib.auth.hashers import check_password
import folium
from django.http import HttpResponse,JsonResponse
from urllib.parse import urlparse, parse_qs


#Pour le truc de la recherche
from rest_framework import viewsets 
#google
from django.contrib.auth import logout


class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = ()

    def post(self, request: Request):
        data = request.data
        
        serializer = self.serializer_class(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()

            response = {"message": "Avocat crée !", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def lister_avocats(request):
    avocats=avocat.objects.all()

    if (len(avocats) ==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer=avocatSerializer(avocats,many=True)

    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET','DELETE'])
def supprimer_avocat(request,id):

    avocats=avocat.objects.all()
    if (len(avocats)==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        avocaat=avocat.objects.get(id=id)
    except:
        return Response(
            {"message": "Avocat inexistant."}, status=status.HTTP_404_NOT_FOUND
        )
    avocaat.delete()
    return Response(
        {"message":f"Avocat {id}  supprime avec succes"}
    )


@api_view(["GET"])
def filtre_avocats(request):
    avocats = avocat.objects.all()
    specialite_nom = request.query_params.get('specialite')
    adresse_nom = request.query_params.get('adresse')
    search= request.query_params.get('search')
    ordering=request.query_params.get('ordering')

    if specialite_nom:
        avocats = avocats.filter(specialite=specialite_nom)
    if adresse_nom:
        avocats = avocats.filter(adresse=adresse_nom)
    
    if search:#le i dans startswith pour qu'elle soit insensible a la casse
        avocats=avocats.filter(nom__istartswith=search)
    if ordering:
        avocats=avocats.order_by('ordering')
    serializedavocs = avocatSerializer(avocats, many=True)

    if len(avocats) == 0:
        return Response(
            {"message": "Pas d'avocats correspondants a votre recherche."}, status=status.HTTP_404_NOT_FOUND
        )

    return Response(serializedavocs.data, status=status.HTTP_200_OK)
    
def home(request):
    return render(request,"home.html")

def logout_view(request):
    logout(request)
    return redirect("/")





class avocatsViewSet(viewsets.ModelViewSet):
    queryset = avocat.objects.all()
    serializer_class = avocatSerializer
    ordering_fields=['tarif']
    search_fields=['specialite','adresse']




#login
            
class LoginView(APIView):
    serializer_class = LoginSerializer


    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        user = avocat.objects.filter(email=email).first()

        try:
            user = avocat.objects.get(email=email)
        except avocat.DoesNotExist:
            return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)

        if check_password(password, user.password):
            return Response({'message': 'Authentification réussie'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)


#affichage de la carte




def extraire_coordonnees_de_url_google_maps(url):
    parsed_url = urlparse(url)
    query_params = parse_qs(parsed_url.query)

    if 'q' in query_params:
        location = query_params['q'][0]
        if '@' in location:
            coordinates = location.split('@')[1].split(',')
            if len(coordinates) >= 2:
                latitude = float(coordinates[0])
                longitude = float(coordinates[1])
                return latitude, longitude
            else:
                return None, None
        elif ',' in location:
            coordinates = location.split(',')
            if len(coordinates) >= 2:
                latitude = float(coordinates[0])
                longitude = float(coordinates[1])
                return latitude, longitude
            else:
                return None, None
        else:
            return None, None
    else:
        return None, None
        
def afficher_carte_localisation_avocat(request, id_avocat):
    try:
        avocat_obj = avocat.objects.get(pk=id_avocat)
        if avocat_obj.lien_localisation:
            latitude, longitude = extraire_coordonnees_de_url_google_maps(avocat_obj.lien_localisation)
            if latitude is not None and longitude is not None:
                data = {'latitude': latitude, 'longitude': longitude}
                return JsonResponse(data)
            else:
                return JsonResponse({'error': 'Erreur lors de l\'extraction des coordonnées.'}, status=400)
        else:
            return JsonResponse({'error': 'Lien de localisation manquant pour cet avocat.'}, status=400)
    except avocat.DoesNotExist:
        return JsonResponse({'error': 'Avocat non trouvé.'}, status=404)