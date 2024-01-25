from rest_framework import serializers      
from .models import *



class noteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields ='__all_'


class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = commentaire
        fields = '__all__'



class RdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rdv
        fields = ['nom', 'prenom', 'telephone', 'heure', 'jour', 'sujet', 'avocat']