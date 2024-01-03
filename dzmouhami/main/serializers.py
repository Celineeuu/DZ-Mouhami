from rest_framework import serializers
#from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from .models import avocat

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

        avocaat = avocat.objects.create(
            email=validated_data["email"],
            password=validated_data["password"],
           
            specialite=validated_data["specialite"],
            nom=validated_data["nom"],
            prenom=validated_data["prenom"],
            telephone=validated_data["telephone"],
            adresse=validated_data["adresse"],
            photo=validated_data["photo"],
            bio=validated_data["bio"],
           
        )

        

        avocaat.save()


        return avocaat