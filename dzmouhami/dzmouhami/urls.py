
from django.contrib import admin
from django.urls import path,include,re_path
from main.urls import *

from django.conf import settings
from django.conf.urls.static import static

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


main_schema_view = get_schema_view(
    openapi.Info(
        title="Documentation api backend DzMouhami",
        default_version='v1',
        description="Annuaire d'avocats en ligne",
        terms_of_service="https://www.dzmouhami.com/terms/",
        contact=openapi.Contact(email="dzmouhamii@gmail.com"),
        license=openapi.License(name="Lylia Alitouche & Aida Douaibia"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

# Créer une vue de schéma pour l'API 'client'
client_schema_view = get_schema_view(
    openapi.Info(
        title="Client",
        default_version='v1',
        description="Votre description d'API client ici",
        terms_of_service="https://www.votreapp.com/terms/",
        contact=openapi.Contact(email="votre@email.com"),
        license=openapi.License(name="Douaibia Aida"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)
urlpatterns = [
    
    path("admin/", admin.site.urls),
    path("api/", include("main.urls")),
    path('', include('client.urls')),

    path('main/', main_schema_view.with_ui('swagger', cache_timeout=0),
         name='schema-swagger-ui'),
   
    
   
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 