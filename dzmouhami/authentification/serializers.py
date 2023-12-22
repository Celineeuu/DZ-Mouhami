from django.contrib import admin
from django.contrib.auth import authenticate
from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework import generics, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.validators import UniqueTogetherValidator
from .models import Avocat




class avocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avocat
        fields = ('id', 'username', 'nom', 'email', 'telephone', 'photo', 'prenom', 'evaluation', 'tarif', 'adresse', 'specialite')

class SignUpSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)  # Include password field

    class Meta:
        model = Avocat
        fields = [
            "nom",
            "prenom",
            "telephone",
            "username",
            "email",
            "password",
            "photo",
            "tarif",
            "specialite",
            "adresse",
        ]
        validators = [UniqueTogetherValidator(queryset=Avocat.objects.all(), fields=['username', 'telephone'])]

    def create(self, validated_data):
        password = validated_data.pop('password')

        avocat_instance = Avocat.objects.create_user(**validated_data)
        avocat_instance.set_password(password)
        avocat_instance.save()

        return avocat_instance

class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = ()

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response = {"message": "Avocat créé !", "data": serializer.data}
            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def lister_avocats(request):
    avocats = Avocat.objects.all()

    if len(avocats) == 0:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = avocatSerializer(avocats, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})