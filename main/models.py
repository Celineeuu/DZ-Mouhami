from django.db import models
from django.contrib.auth.hashers import make_password, check_password,is_password_usable


class avocat(models.Model):
    
    password=models.CharField(max_length=255)
   
    email = models.EmailField(max_length=255, unique=True)
    nom = models.CharField(max_length=255, blank=True)
    prenom = models.CharField(max_length=255, blank=True)
    specialite = models.CharField(max_length=45, null=True)
    telephone = models.CharField(max_length=12, blank=True)
    adresse = models.CharField(max_length=256, blank=True)
    nbrvotes=models.IntegerField(default=0,)
    evaluation=models.IntegerField(default=0)
    photo=models.ImageField(max_length=256,default='utilisateur.jpg',upload_to='utilisateurs/',blank=True,null=True)
    bio=models.CharField(max_length=255,default="",blank=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["telephone","specialite",
    ]

    def __str__(self):
        return f'{self.id}: {self.nom} {self.prenom} email: {self.email}'
    
    
    def save(self, *args, **kwargs):
        # Vérifie si le mot de passe a été modifié ou s'il est vide
        if not is_password_usable(self.password):
            # Si le mot de passe est vide ou a été modifié, le hacher avant de l'enregistrer
            self.password = make_password(self.password)
        # Appel à la méthode save() du modèle parent
        super().save(*args, **kwargs)



class client(models.Model):
    
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.CharField(max_length=250, unique=True, null=False, blank=False)

    REGISTRATION_CHOICES = [
        ('email', 'Email'),
        ('google', 'Google'),
    ]
    registration_method = models.CharField(
        max_length=10,
        choices=REGISTRATION_CHOICES,
        default='email'
    )

    def __str__(self):
        return self.username or self.email
    


class Admin(models.Model):
    
    username = models.CharField(max_length=150, unique=True, blank=True, null=True)
    email = models.CharField(max_length=250, unique=True, null=False, blank=False)
    
    REGISTRATION_CHOICES = [
        ('email', 'Email'),
        ('google', 'Google'),
    ]
    registration_method = models.CharField(
        max_length=10,
        choices=REGISTRATION_CHOICES,
        default='email'
    )

    def __str__(self):
        return self.username or self.email
    



