# Generated by Django 5.0 on 2024-01-03 15:46

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentification', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='avocat',
            options={},
        ),
        migrations.AlterModelManagers(
            name='avocat',
            managers=[
            ],
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='date_joined',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='first_name',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='groups',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='is_active',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='is_staff',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='is_superuser',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='last_login',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='last_name',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='tarif',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='user_permissions',
        ),
        migrations.RemoveField(
            model_name='avocat',
            name='username',
        ),
        migrations.RemoveField(
            model_name='client',
            name='nom',
        ),
        migrations.RemoveField(
            model_name='client',
            name='prenom',
        ),
        migrations.RemoveField(
            model_name='client',
            name='telephone',
        ),
        migrations.RemoveField(
            model_name='client',
            name='username',
        ),
        migrations.AddField(
            model_name='avocat',
            name='bio',
            field=models.CharField(blank=True, default='', max_length=255),
        ),
        migrations.AddField(
            model_name='client',
            name='password',
            field=models.CharField(default='mdpss', max_length=255),
        ),
        migrations.AlterField(
            model_name='avocat',
            name='email',
            field=models.EmailField(max_length=255, unique=True),
        ),
        migrations.AlterField(
            model_name='avocat',
            name='password',
            field=models.CharField(max_length=255),
        ),
        migrations.AlterField(
            model_name='avocat',
            name='photo',
            field=models.ImageField(blank=True, default='utilisateur.jpg', max_length=256, null=True, upload_to='utilisateurs/'),
        ),
    ]
