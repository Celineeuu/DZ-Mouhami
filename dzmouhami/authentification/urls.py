from django.urls import path,include
from .views import *

urlpatterns=[
    #LYLIA
    
    path("signup/",SignUpView.as_view()),
    path("afficher_avocats/",lister_avocats),
    path("supprimeravocat/",supprimer_avocat),
    #google
    path("",home),
    path("logout/",logout_view),




    #AIDA

]