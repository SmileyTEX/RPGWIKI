from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import PersonagemViewSet

router = DefaultRouter()
router.register('personagens', PersonagemViewSet, basename='personagem')

urlpatterns = [
    path('', include(router.urls)),
]
