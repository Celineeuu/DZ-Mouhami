from django.urls import path,include
from .views import *

urlpatterns = [
    #Admin+ rechercher avocat + signup
    path("signup/", SignUpView.as_view(), name="signup"),
    path("liste_avocats/", lister_avocats),
    path("supprimer_avocat/<int:id>", supprimer_avocat),
    
    #filtres
    path('lister/',avocatsViewSet.as_view({'get':'list'})),
    path('lister/<int:pk>',avocatsViewSet.as_view({'get':'retrieve'})),
    path('filtre_avocats/',filtre_avocats),

    #googleee
    path("",home),
    path("logout/",logout_view),

]
