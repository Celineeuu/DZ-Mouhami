from django.urls import path, include
from .views import *
from .views import CommentaireParAvocatView




urlpatterns = [
    #Commentaires
    path('commentaires/', CommentaireListCreateView.as_view(), name='commentaire-list'),
    path('commentaires/<int:pk>/', CommentaireDetailView.as_view(), name='commentaire-detail'),
    path('comment_avocat/<int:avocat_id>/', CommentaireParAvocatView.as_view(), name='commentaires-par-avocat'),
   
    #Rendez vous 
    path('detailrdv/<int:id_avocat>/', DetailsClientRdvView.as_view(), name='details-client-rendez-vous'),
    path('rdvcreate/', RdvCreateView.as_view(), name='rdv-create'),

    #Noter
    path("noter/",noter_avocat),
]