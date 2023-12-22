from rest_framework import serializers
#from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from .models import avocat

#import bleach


class avocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = avocat
        fields =('id','username','nom','email','telephone',"photo",'prenom','evaluation','tarif','adresse','specialite')



class SignUpSerializer(serializers.ModelSerializer):
    
    username = serializers.CharField(max_length=45)
    email = serializers.EmailField(max_length=255)
    nom = serializers.CharField(max_length=255)
    prenom = serializers.CharField(max_length=255)
    tarif=serializers.FloatField()
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
            "username",
            "email",
            "password",
           "photo",
            "tarif",
            "specialite",
            "adresse",
        ]
        #S'assurer que les champs username et telephone sont uniques dans la BDD pour le modele avocat
        validators = [UniqueTogetherValidator(queryset=avocat.objects.all(),fields=['username', 'telephone',]),]
    def validate(self, attrs):

        email_exists = avocat.objects.filter(email=attrs["email"]).exists()

        if email_exists:
            raise ValidationError("Compte deja existant avec cet email")

        return super().validate(attrs)

    def create(self, validated_data):

        avocaat = avocat.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            tarif=validated_data["tarif"],
            username=validated_data["username"],
            specialite=validated_data["specialite"],
            nom=validated_data["nom"],
            prenom=validated_data["prenom"],
            telephone=validated_data["telephone"],
            adresse=validated_data["adresse"],
            photo=validated_data["photo"],
           
           
        )

        

        avocaat.save()


        return avocaat