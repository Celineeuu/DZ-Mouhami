from django.db import models
from authentification.models import avocat , client

class commentaire(models.Model):
    
    contenu = models.TextField(max_length=255)
    avocat = models.ForeignKey(avocat, on_delete=models.CASCADE,default=None)
    client = models.ForeignKey(client, on_delete=models.CASCADE,default=None)

    
    def __str__(self) :
        return f'{self.client} : {self.contenu}'

