from django.urls import path, include
from .views import *
from .views import CommentaireParAvocatView
urlpatterns = [
    path('commentaires/', CommentaireListCreateView.as_view(), name='commentaire-list'),
    path('commentaires/<int:pk>/', CommentaireDetailView.as_view(), name='commentaire-detail'),
    path('comment_avocat/<int:avocat_id>/', CommentaireParAvocatView.as_view(), name='commentaires-par-avocat'),
]