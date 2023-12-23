from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view

#Pour le truc de la recherche
from rest_framework import viewsets 


class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = ()

    def post(self, request: Request):
        data = request.data
        
        serializer = self.serializer_class(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()

            response = {"message": "Avocat crée !", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def lister_avocats(request):
    avocats=avocat.objects.all()

    if (len(avocats) ==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer=avocatSerializer(avocats,many=True)

    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET','DELETE'])
def supprimer_avocat(request,id):

    avocats=avocat.objects.all()
    if (len(avocats)==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        avocaat=avocat.objects.get(id=id)
    except:
        return Response(
            {"message": "Avocat inexistant."}, status=status.HTTP_404_NOT_FOUND
        )
    avocaat.delete()
    return Response(
        {"message":f"Avocat {id}  supprime avec succes"}
    )


@api_view(["GET"])
def filtre_avocats(request):
    avocats = avocat.objects.all()
    specialite_nom = request.query_params.get('specialite')
    adresse_nom = request.query_params.get('adresse')
    search= request.query_params.get('search')
    ordering=request.query_params.get('ordering')

    if specialite_nom:
        avocats = avocats.filter(specialite=specialite_nom)
    if adresse_nom:
        avocats = avocats.filter(adresse=adresse_nom)
    
    if search:#le i dans startswith pour qu'elle soit insensible a la casse
        avocats=avocats.filter(titre__istartswith=search)
    if ordering:
        avocats=avocats.order_by('ordering')
    serializedavocs = avocatSerializer(avocats, many=True)

    if len(avocats) == 0:
        return Response(
            {"message": "Pas d'avocats correspondants a votre recherche."}, status=status.HTTP_404_NOT_FOUND
        )

    return Response(serializedavocs.data, status=status.HTTP_200_OK)
    

class avocatsViewSet(viewsets.ModelViewSet):
    queryset = avocat.objects.all()
    serializer_class = avocatSerializer
    ordering_fields=['tarif']
    search_fields=['specialite','adresse']