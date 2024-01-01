from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Utilisateur)

admin.site.register(Avocat)

admin.site.register(Admin)

admin.site.register(Client)