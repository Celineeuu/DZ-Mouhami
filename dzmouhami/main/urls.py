from django.urls import path,include
from . import views

urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="signup"),
    path("liste_avocats", views.lister_avocats),
]