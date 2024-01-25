from rest_framework import serializers
from .models import Rdv   



class RdvSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rdv
        fields = ['nom', 'prenom', 'telephone', 'heure', 'jour', 'sujet', 'avocat']