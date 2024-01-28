from django.shortcuts import render,redirect
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view

#Pour le truc de la recherche
from rest_framework import viewsets 
#google
from django.contrib.auth import logout

from rest_framework.views import APIView


from django.contrib.sessions.backends.db import SessionStore

from django.http import HttpResponse,JsonResponse
from urllib.parse import urlparse, parse_qs

from urllib.parse import urlencode
from rest_framework import serializers
from rest_framework.views import APIView
from django.conf import settings
from django.shortcuts import redirect
from rest_framework.response import Response
from .mixins import PublicApiMixin, ApiErrorsMixin
from .utils import google_get_access_token, google_get_user_info, generate_tokens_for_user

from rest_framework import status


from dzmouhami.settings import BASE_FRONTEND_URL

class GoogleLoginApi(PublicApiMixin, ApiErrorsMixin, APIView):
    class InputSerializer(serializers.Serializer):
        code = serializers.CharField(required=False)
        error = serializers.CharField(required=False)

    def get(self, request, *args, **kwargs):
        input_serializer = self.InputSerializer(data=request.GET)
        input_serializer.is_valid(raise_exception=True)

        validated_data = input_serializer.validated_data

        code = validated_data.get('code')
        error = validated_data.get('error')

        login_url = f'{BASE_FRONTEND_URL}'
    
        if error or not code:
            params = urlencode({'error': error})
            return redirect(f'{login_url}?{params}')

        redirect_uri = f'{BASE_FRONTEND_URL}/google'
        access_token = google_get_access_token(code=code, redirect_uri=redirect_uri)

        user_data = google_get_user_info(access_token=access_token)

        try:
            user = client.objects.get(email=user_data['email'])
            is_admin = False
        except client.DoesNotExist:
            try:
                admin = Admin.objects.get(email=user_data['email'])
                is_admin = True
            except Admin.DoesNotExist:
                # Si ni un client ni un admin n'est trouvé, créez un client
                username = user_data.get('given_name', '')
                user = client.objects.create(
                    email=user_data['email'],
                    username=username,
                )
                is_admin = False
        if not(is_admin):
            response_data = {
                'message': 'Authentification réussie',
                'id': user.id,
                'is_admin': is_admin,
            }
        else: 
             response_data = {
                'message': 'Authentification réussie',
                'id': admin.id,
                'is_admin': is_admin,
            }

        return Response(response_data, status=status.HTTP_200_OK)

    


class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = ()

    def post(self, request: Request):
        data = request.data
        
        serializer = self.serializer_class(data=data)
        
        if serializer.is_valid():
            serializer.save()

            response = {"message": "Avocat crée !", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)




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
          return Response({'message': 'Authentification réussie', 'avocat_id': user.id}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Mot de passe incorrect'}, status=status.HTTP_401_UNAUTHORIZED)




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



@api_view(['GET'])
def afficher_avocat(request,id):

    avocats=avocat.objects.all()
    if (len(avocats)==0):
        return Response(
            {"message": "Aucun avocat a afficher."}, status=status.HTTP_404_NOT_FOUND
        )
    try:
        avocaat=avocat.objects.get(id=id)
    except:
        return Response(
            {"message": "Avocat inexistant."}, status=status.HTTP_404_NOT_FOUND
        )
    
    serializer = avocatSerializer(avocaat, many=False)
    return Response(serializer.data, status=status.HTTP_200_OK)




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






"""
class registrationclientView(viewsets.ModelViewSet):
    serializer_class = registrationclientSerializer
    queryset = client.objects.all() 
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        headers = self.get_success_headers(serializer.data)
        return Response({'message': 'Registration successful!'}, status=status.HTTP_201_CREATED, headers=headers)
"""