from django.db import models
from main.models import *
from rest_framework.decorators import api_view


class commentaire(models.Model):
    
    contenu = models.TextField(max_length=255)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)
    client = models.ForeignKey(client, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.client} : {self.contenu}'


class Rdv(models.Model):
    nom = models.CharField(max_length=255,default='null')  
    prenom = models.CharField(max_length=255,default='null') 
    telephone = models.CharField(max_length=12, blank=True)
    heure = models.TimeField(default='00:00')
    jour = models.DateField()
    sujet = models.CharField(max_length=255, null=True, blank=True)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE)


  
    def __str__(self) :
        return f'{self.jour} : {self.heure}'
 



class Note(models.Model):
    
    avocat=models.ForeignKey(avocat,on_delete=models.CASCADE)
    client = models.ForeignKey(client,on_delete=models.CASCADE)
    note=models.IntegerField()
    

    def __str__(self):
        return f'{self.id}:  la note: {self.note}'
    
