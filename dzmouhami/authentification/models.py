from django.contrib.auth.models import AbstractUser
from django.db import models
from rest_framework import generics, status, serializers
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.validators import UniqueTogetherValidator

class Avocat(AbstractUser):


    nom = models.CharField(max_length=255, blank=True)
    prenom = models.CharField(max_length=255, blank=True)
    specialite = models.CharField(max_length=45, null=True)
    telephone = models.CharField(max_length=12, blank=True)
    adresse = models.CharField(max_length=256, blank=True)
    tarif = models.FloatField()
    evaluation = models.IntegerField(default=0)
    photo = models.CharField(max_length=256, default='utilisateur.jpg', blank=True, null=True)

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='avocats_groups',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.'
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='avocats_permissions',
        blank=True,
        help_text='Specific permissions for this user.'
    )

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "telephone", "specialite", "tarif"]

    def __str__(self):
        return f'{self.id}: {self.nom} {self.prenom} email: {self.email}'

class Client(models.Model):
    # Vos champs existants

    username = models.CharField(max_length=45)
    email = models.EmailField(max_length=255, unique=True)
    nom = models.CharField(max_length=255, blank=True)
    prenom = models.CharField(max_length=255, blank=True)
    telephone = models.CharField(max_length=12, blank=True)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username", "telephone"]

    def __str__(self):
        return f'{self.id}: {self.nom} {self.prenom} email: {self.email}'