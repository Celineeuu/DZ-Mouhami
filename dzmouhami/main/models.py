from django.db import models
# Create your models here.


class avocat(models.Model):
    
    password=models.CharField(max_length=255)
   
    email = models.EmailField(max_length=255, unique=True)
    nom = models.CharField(max_length=255, blank=True)
    prenom = models.CharField(max_length=255, blank=True)
    specialite = models.CharField(max_length=45, null=True)
    telephone = models.CharField(max_length=12, blank=True)
    adresse = models.CharField(max_length=256, blank=True)
    tarif=models.FloatField()
    evaluation=models.IntegerField(default=0)
    photo=models.ImageField(max_length=256,default='utilisateur.jpg',upload_to='utilisateurs/',blank=True,null=True)
    bio=models.CharField(max_length=255,default="",blank=True)
    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["telephone","specialite","tarif",
    ]

    def __str__(self):
        return f'{self.id}: {self.nom} {self.prenom} email: {self.email}'
    


class client(models.Model):
    
    password=models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)

    
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    def __str__(self):
        return f'{self.id}:  email: {self.email}'
    




