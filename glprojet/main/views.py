
from rest_framework.response import Response
from rest_framework import generics, status ,permissions
from django.shortcuts import get_object_or_404
from django.urls import reverse
from .models import commentaire
from .serializers import CommentaireSerializer
from authentification.models import avocat ,client 
from rest_framework.views import APIView


#permettre de commenter
class CommentaireListCreateView(generics.ListCreateAPIView):
    queryset = commentaire.objects.all()
    serializer_class = CommentaireSerializer



#le detail de chaque commentaire ecris 
class CommentaireDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = commentaire.objects.all()
    serializer_class = CommentaireSerializer



#pour avoir la liste de tout les commentaires pour chaque avocat
class CommentaireParAvocatView(APIView):
    def get(self, request, avocat_id):
        # Récupérer tous les commentaires pour un avocat spécifique
        commentaires = commentaire.objects.filter(avocat_id=avocat_id)
        
        # Sérialiser les commentaires
        serializer = CommentaireSerializer(commentaires, many=True)
        
        return Response(serializer.data)

