from main.scheduler import shared_task
from django.core.management import call_command

@shared_task
def sauvegarde_donnees():
    call_command('dumpdata', 'main', 'client', '--indent', '2', '>', 'C:/Users/HP/OneDrive/Documents/Backup_DzMouhami/sauvegarde.json')