# Generated by Django 5.0 on 2024-01-24 13:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0003_avocat_lien_localisation'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='avocat',
            name='lien_localisation',
        ),
    ]
