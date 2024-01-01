from django.shortcuts import render,redirect
from rest_framework import generics, status
from rest_framework.request import Request
from rest_framework.response import Response
from .serializers import *
from .models import *
from rest_framework.decorators import api_view

#Pour le truc de la recherche
from rest_framework import viewsets 
#google
from django.contrib.auth import logout
from django.db import transaction



class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer
    permission_classes = []

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)

        if serializer.is_valid():
            serializer.save()
            response_data = {"message": "Compte créé avec succès!", "data": serializer.data}
            return Response(data=response_data, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    


@api_view(['GET'])
def lister_avocats(request):
    avocats=Avocat.objects.all()

    if (len(avocats) ==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    serializer=AvocatListSerializer(avocats,many=True)
    
    return Response(serializer.data,status=status.HTTP_200_OK)


@api_view(['GET','DELETE'])
def supprimer_avocat(request,id):

    avocats=Avocat.objects.all()
    if (len(avocats)==0):
        return Response(status=status.HTTP_404_NOT_FOUND)
    try:
        avocaat=Avocat.objects.get(id=id)
    except:
        return Response(
            {"message": "Avocat inexistant."}, status=status.HTTP_404_NOT_FOUND
        )
    avocaat.delete()
    return Response(
        {"message":f"Avocat {id}  supprime avec succes"}
    )



#google
def logout_view(request):
    logout(request)
    return redirect("/")

  
def home(request):
    return render(request,"home.html")