from rest_framework import serializers      
from .models import commentaire




class CommentaireSerializer(serializers.ModelSerializer):
    class Meta:
        model = commentaire
        fields = '__all__'