# Generated by Django 5.0 on 2024-01-23 22:21

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="avocat",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("nom", models.CharField(blank=True, max_length=255)),
                ("prenom", models.CharField(blank=True, max_length=255)),
                ("specialite", models.CharField(max_length=45, null=True)),
                ("telephone", models.CharField(blank=True, max_length=12)),
                ("adresse", models.CharField(blank=True, max_length=256)),
                ("evaluation", models.IntegerField(default=0)),
                (
                    "photo",
                    models.ImageField(
                        blank=True,
                        default="utilisateur.jpg",
                        max_length=256,
                        null=True,
                        upload_to="utilisateurs/",
                    ),
                ),
                ("bio", models.CharField(blank=True, default="", max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name="client",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("password", models.CharField(max_length=255)),
                ("email", models.EmailField(max_length=255, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Note",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("note", models.IntegerField()),
                (
                    "avocat",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.avocat"
                    ),
                ),
                (
                    "client",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.client"
                    ),
                ),
            ],
        ),
    ]
