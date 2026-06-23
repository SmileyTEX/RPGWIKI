from django.contrib.auth.models import User
from django.core.management.base import BaseCommand


class Command(BaseCommand):
    help = 'Cria o usuário padrão de desenvolvimento para login na aplicação'

    def add_arguments(self, parser):
        parser.add_argument('--username', default='admin', help='Nome de usuário')
        parser.add_argument('--password', default='admin123', help='Senha do usuário')

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']

        user, created = User.objects.get_or_create(username=username, defaults={'is_staff': True})

        user.set_password(password)
        user.save(update_fields=['password'])

        if created:
            self.stdout.write(self.style.SUCCESS(f'Usuário "{username}" criado com sucesso.'))
        else:
            self.stdout.write(self.style.SUCCESS(f'Senha do usuário "{username}" atualizada.'))
