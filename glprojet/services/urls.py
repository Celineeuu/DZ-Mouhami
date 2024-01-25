from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RdvCreateView,DetailsClientRdvView


urlpatterns = [

 path('detailrdv/<int:id_avocat>/', DetailsClientRdvView.as_view(), name='details-client-rendez-vous'),
 path('rdvcreate/', RdvCreateView.as_view(), name='rdv-create'),
]