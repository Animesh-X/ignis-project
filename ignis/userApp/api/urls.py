from rest_framework.authtoken.views import obtain_auth_token
from django.urls import path
from .views import registraion_view,logout_view
urlpatterns=[
    path('login/',obtain_auth_token,name= 'login'),
    path('register/',registraion_view,name='register'),
    path('logout/',logout_view,name='logout')
]