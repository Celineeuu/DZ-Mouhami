from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from .models import avocat
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
#import bleach


class avocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = avocat
        fields =('id','nom','email','telephone',"photo",'prenom','evaluation','adresse','specialite','bio')



class SignUpSerializer(serializers.ModelSerializer):
    
   
    email = serializers.EmailField(max_length=255)
    nom = serializers.CharField(max_length=255)
    prenom = serializers.CharField(max_length=255)
    specialite = serializers.CharField(max_length=45)
    telephone = serializers.CharField(max_length=12)
    adresse = serializers.CharField(max_length=256)
    photo=serializers.ImageField(max_length=256)
   

    class Meta:

        model = avocat
        fields = [
            "nom",
            "prenom",
            "telephone",
            "email",
            "password",
            "photo",
            "specialite",
            "adresse",
            "bio",  
        ]
        #S'assurer que les champs username et telephone sont uniques dans la BDD pour le modele avocat
        validators = [UniqueTogetherValidator(queryset=avocat.objects.all(),fields=[ 'telephone',]),]





    def validate(self, attrs):

        email_exists = avocat.objects.filter(email=attrs["email"]).exists()

        if email_exists:
            raise ValidationError("Compte deja existant avec cet email")

        return super().validate(attrs)

    def create(self, validated_data):

        
        # Récupérer et hasher le mot de passe avant de l'enregistrer dans la base de données
        password = validated_data.pop('password')
        hashed_password = make_password(password)
        validated_data['password'] = hashed_password
        
        avocaat = avocat.objects.create(**validated_data)
        return avocaat


#login:

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})