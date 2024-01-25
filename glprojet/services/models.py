from django.db import models
from authentification.models import avocat , client

# Create your models here.
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
 