from rest_framework import viewsets

from .models import Personagem
from .serializers import PersonagemSerializer


class PersonagemViewSet(viewsets.ModelViewSet):
    queryset = Personagem.objects.all()
    serializer_class = PersonagemSerializer
