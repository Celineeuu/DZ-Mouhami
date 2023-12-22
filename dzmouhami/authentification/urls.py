from django.urls import path,include
from rest_framework.authtoken.views import obtain_auth_token
from . import views

urlpatterns = [
    path("signup/", views.SignUpView.as_view(), name="SignUpview"),
    path("liste_avocats", views.lister_avocats),
    path('login/', views.LoginView.as_view(), name='api_token_auth'),
]