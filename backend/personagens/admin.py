from django.contrib import admin

from .models import Personagem


@admin.register(Personagem)
class PersonagemAdmin(admin.ModelAdmin):
    list_display = ('nome', 'nivel', 'classe', 'tipo', 'ativo', 'campanha')
    list_filter = ('tipo', 'ativo', 'campanha')
    search_fields = ('nome', 'classe', 'raca', 'campanha')
