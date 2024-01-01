from django.db import models

# Create your models here.

from django.db import models
from django.contrib.auth.models import AbstractUser

class Utilisateur(AbstractUser):
    is_client = models.BooleanField(default=False)
    is_avocat = models.BooleanField(default=False)
    is_admin= models.BooleanField(default=False)

    def __str__(self):
        return f'{self.email} username: {self.username} '

class Client(models.Model):
    user= models.OneToOneField(Utilisateur,on_delete=models.CASCADE,primary_key=True)

    def __str__(self):
        return f'{self.email} username: {self.username} '
    

class Admin(models.Model):
    user= models.OneToOneField(Utilisateur,on_delete=models.CASCADE,primary_key=True)

    def __str__(self):
        return f'{self.email} username: {self.username} '
    

class Avocat(models.Model):

    user= models.OneToOneField(Utilisateur,on_delete=models.CASCADE,primary_key=True)
    nom = models.CharField(max_length=255, blank=True)
    prenom = models.CharField(max_length=255, blank=True)
    specialite = models.CharField(max_length=45, null=True)
    telephone = models.CharField(max_length=12, blank=True)
    adresse = models.CharField(max_length=256, blank=True)
    tarif=models.FloatField()
    evaluation=models.IntegerField(default=0)
    photo=models.ImageField(max_length=256,default='utilisateur.jpg',upload_to='utilisateurs/',blank=True,null=True)
    bio=models.CharField(max_length=256, blank=True,null=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["telephone","specialite","tarif",]

    def __str__(self):
        return f' {self.nom} {self.prenom} email: {self.user.email}'
    


