from rest_framework import serializers
from rest_framework.validators import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from .models import *


class AvocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avocat
        fields =["nom","prenom","specialite","telephone","adresse","tarif","evaluation","photo","bio"]


class AdminSerializer(serializers.ModelSerializer):
    class Meta:
        model=Admin
        fields=['user']



class UtilisateurSerializer(serializers.ModelSerializer):
    class Meta:
        model=Utilisateur
        fields=('is_client','is_avocat','is_admin')



class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model=Client
        fields=('user')


class SignUpSerializer(serializers.ModelSerializer):
    avocat_data = AvocatSerializer(required=False)

    class Meta:
        model = Utilisateur
        fields = ["username", "email", "password", "is_avocat", "avocat_data"]

    def create(self, validated_data):
        is_avocat = validated_data.pop("is_avocat", False)
        avocat_data = validated_data.pop("avocat_data", None)

        user = Utilisateur.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            username=validated_data["username"],
            is_avocat=is_avocat,
        )

        if is_avocat and avocat_data:
            Avocat.objects.create(
                user=user,
                nom=avocat_data.get("nom", ""),
                prenom=avocat_data.get("prenom", ""),
                telephone=avocat_data.get("telephone", ""),
                tarif=avocat_data.get("tarif", 0),
                specialite=avocat_data.get("specialite", ""),
                adresse=avocat_data.get("adresse", ""),
                photo=avocat_data.get("photo", ""),
                bio=avocat_data.get("bio",""),
            )

        return user
    
class AvocatListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Avocat
        fields = ["user","nom", "prenom", "specialite", "telephone", "adresse", "tarif", "evaluation", "photo"]
