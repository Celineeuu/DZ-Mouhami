from django.urls import path,include
from .views import *

urlpatterns = [
    path("signup/", SignUpView.as_view(), name="signup"),
    path("liste_avocats/", lister_avocats),
    path("supprimer_avocat/<int:id>", supprimer_avocat),
    
    path('lister/',avocatsViewSet.as_view({'get':'list'})),
    path('lister/<int:pk>',avocatsViewSet.as_view({'get':'retrieve'})),
]
