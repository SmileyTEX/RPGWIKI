from django.db import models


class TipoPersonagem(models.TextChoices):
    JOGADOR = 'jogador', 'Jogador'
    NPC = 'npc', 'NPC'


class Personagem(models.Model):
    nome = models.CharField(max_length=80)
    nivel = models.PositiveIntegerField(default=1)
    ativo = models.BooleanField(default=True)
    classe = models.CharField(max_length=120)
    descricao = models.TextField()
    imagem = models.URLField(max_length=500)
    tipo = models.CharField(max_length=10, choices=TipoPersonagem.choices, default=TipoPersonagem.JOGADOR)
    raca = models.CharField(max_length=80)
    alinhamento = models.CharField(max_length=80)
    campanha = models.CharField(max_length=120)
    antecedente = models.CharField(max_length=120)
    local = models.CharField(max_length=120)
    faccao = models.CharField(max_length=120)
    idade = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['nome']
        verbose_name = 'Personagem'
        verbose_name_plural = 'Personagens'

    def __str__(self):
        return self.nome
