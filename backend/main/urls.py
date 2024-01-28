from django.urls import path,include
from .views import *
from . import views

urlpatterns = [
    #Admin+ signup
    path("signup/", SignUpView.as_view(), name="signup"),
    #lister tous les avocats
    path("liste_avocats/", lister_avocats),
    #supprimer un avocat
    path("supprimer_avocat/<int:id>", supprimer_avocat),
    #Afficher le profil d'un avocat
    path("afficher_avocat/<int:id>", afficher_avocat),
    #Authentification google
    path("auth/google/", views.GoogleLoginApi.as_view(), 
         name="login-with-google"),
 
    
    #connexion d'un avocat
    path('login/', LoginView.as_view(), name='login'), 
    
    #localisation
    path('carte/<int:id_avocat>/', views.afficher_carte_localisation_avocat, name='afficher_carte_avocat'),

]
