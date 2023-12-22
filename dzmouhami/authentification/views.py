from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.views import APIView
from .serializers import *
from .models import *
from rest_framework.decorators import api_view
# Create your views here.



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


@api_view(['GET'])
def lister_avocats(request):
    avocats=Avocat.objects.all()

    if (len(avocats) ==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer=avocatSerializer(avocats,many=True)

    return Response(serializer.data,status=status.HTTP_200_OK)




class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Recherche de l'utilisateur Avocat par email
        user = Avocat.objects.filter(email=email).first()

        if user and user.check_password(password):
            # Authentification réussie, générer un jeton d'authentification (si besoin)
            # ... (Votre logique pour générer un jeton, par exemple Token.objects.create(user=user))
            return Response({'message': 'Authentification réussie'}, status=status.HTTP_200_OK)
        else:
            # Identifiants invalides
            return Response({'error': 'login failed'}, status=status.HTTP_401_UNAUTHORIZED)