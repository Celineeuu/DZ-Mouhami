
from django.contrib import admin
from django.urls import path,include
from main.urls import *

from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    
    path("admin/", admin.site.urls),
    path("api/", include("main.urls")),
    path('', include('client.urls')),
   
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
 