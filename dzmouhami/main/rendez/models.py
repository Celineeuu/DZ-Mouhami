from django.db import models
from main.models import *
# Create your models here.


class creneau(models.Model):
    
    heure = models.TimeField()
    jour = models.DateField()
    pris=models.BooleanField(default=False)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.jour} : {self.heure}'



class rdv(models.Model):
    
    heure = models.TimeField()
    jour = models.DateField()
    lieu=models.CharField(max_length=255)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)
    client = models.ForeignKey(client, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.jour} : {self.heure}'
    


class note(models.Model):
    
    point = models.IntegerField()
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)
    client = models.ForeignKey(client, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.avocat} : {self.point}'



class commentaire(models.Model):
    
    contenu = models.TextField(max_length=255)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)
    client = models.ForeignKey(client, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.client} : {self.contenu}'