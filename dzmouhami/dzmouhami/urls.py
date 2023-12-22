
from django.contrib import admin
from django.urls import path,include
from authentification import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('authentification/', include('authentification.urls')),
    path('signup/', views.SignUpView.as_view(), name='signUpView'),
    path('login/', views.LoginView.as_view(), name='api_token_auth'),  # Updated to use as_view() for class-based view
]
