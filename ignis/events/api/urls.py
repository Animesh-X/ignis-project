from django.urls import path
from . import views

urlpatterns = [
    path('list/', views.EventList.as_view(),name='list'),
    path('add/', views.EventList.as_view(),name='add'),
    path('<int:event_id>/like/', views.EventLike.as_view(),name='like'),
]