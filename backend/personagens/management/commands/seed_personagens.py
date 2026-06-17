from django.core.management.base import BaseCommand

from personagens.models import Personagem

DADOS_ARTHAS = {
    'nome': 'Arthas',
    'nivel': 10,
    'ativo': True,
    'classe': 'Paladino / Death Knight',
    'descricao': (
        'Príncipe herdeiro de Lordaeron, Arthas foi corrompido pela runa lâmina Frostmourne '
        'e tornou-se o Lich King. Um dos antagonistas mais icônicos do universo Warcraft.'
    ),
    'imagem': 'https://i.pinimg.com/736x/e0/21/be/e021be95108888de62ab5ac48ccd7a03.jpg',
    'tipo': 'jogador',
    'raca': 'Humano',
    'alinhamento': 'Leal Maligno',
    'campanha': 'Warcraft: Queda de Lordaeron',
    'antecedente': 'Cavaleiro da Ordem da Prata',
    'local': 'Lordaeron',
    'faccao': 'Culto dos Malditos',
    'idade': 24,
}


class Command(BaseCommand):
    help = 'Cria ou restaura o personagem de demonstração Arthas'

    def add_arguments(self, parser):
        parser.add_argument(
            '--force',
            action='store_true',
            help='Restaura os dados do Arthas mesmo se ele já existir',
        )

    def handle(self, *args, **options):
        if options['force']:
            personagem, criado = Personagem.objects.update_or_create(
                id=1,
                defaults=DADOS_ARTHAS,
            )
            acao = 'criado' if criado else 'restaurado'
            self.stdout.write(self.style.SUCCESS(f'Personagem Arthas {acao} com sucesso.'))
            return

        if Personagem.objects.exists():
            self.stdout.write(self.style.WARNING('Personagens já existem no banco. Nenhum dado foi criado.'))
            return

        Personagem.objects.create(**DADOS_ARTHAS)
        self.stdout.write(self.style.SUCCESS('Personagem de demonstração criado com sucesso.'))
