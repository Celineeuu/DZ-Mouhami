from rest_framework import serializers
#from rest_framework.authtoken.models import Token
from rest_framework.validators import ValidationError
from rest_framework.validators import UniqueTogetherValidator
from .models import *

from django.contrib.auth.hashers import check_password,make_password


#import bleach


class avocatSerializer(serializers.ModelSerializer):
    class Meta:
        model = avocat
        fields =('id','nom','email','telephone',"photo",'prenom','evaluation','adresse','specialite','bio','nbrvotes')




class registrationclientSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    class Meta:
        model = client
        fields = ['email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        password1 = data.get('password')
        password2 = data.get('password2')

        if password1 and password2 and password1 != password2:
            raise serializers.ValidationError("Les mots de passe doivent correspondre.")

        return data

    def create(self, validated_data):
        validated_data.pop('password2', None)

        # Hash the password before saving
        validated_data['password'] = make_password(validated_data['password'])

        clieent =client.objects.create(
            email=validated_data['email'],
            password=validated_data['password'],
        )

        return clieent




class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(style={'input_type': 'password'}, write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        if email and password:
            user = self.authenticate_user(email, password)

            if user:
                data['user'] = user
            else:
                raise serializers.ValidationError('Invalid email or password')
        else:
            raise serializers.ValidationError('Email and password are required')

        return data

    def authenticate_user(self, email, password):
        try:
            # Try to retrieve the client by email
            clieent = client.objects.get(email=email)
            # Check the password
            if check_password(password, clieent.password):
                return clieent
        except client.DoesNotExist:
            pass

        try:
            # Try to retrieve the avocat by email
            avocat_instance = avocat.objects.get(email=email)
            # Check the password
            if check_password(password, avocat_instance.password_avocat):
                return avocat_instance
        except avocat.DoesNotExist:
            pass

        # Try to retrieve the admin by email (if needed)
        # Uncomment this block if you have an Admin model
        # try:
        #     admin_instance = admin.objects.get(email=email)
        #     if admin_instance.password_admin == password:
        #         return admin_instance
        # except admin.DoesNotExist:
        #     pass

        return None



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
            password=make_password(validated_data["password"]),
           
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
    


class clientSerializer(serializers.ModelSerializer):
    
    class Meta:
        model = client
        fields = ['first_name', 'last_name', 'email']

