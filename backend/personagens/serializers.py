from rest_framework import serializers

from .models import Personagem


class PersonagemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Personagem
        fields = [
            'id',
            'nome',
            'nivel',
            'ativo',
            'classe',
            'descricao',
            'imagem',
            'tipo',
            'raca',
            'alinhamento',
            'campanha',
            'antecedente',
            'local',
            'faccao',
            'idade',
        ]
