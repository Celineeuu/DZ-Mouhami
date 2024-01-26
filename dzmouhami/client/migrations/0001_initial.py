# Generated by Django 5.0 on 2024-01-26 17:39

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):
    initial = True

    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="commentaire",
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
                ("contenu", models.TextField(max_length=255)),
                (
                    "avocat",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="main.avocat",
                    ),
                ),
                (
                    "client",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        to="main.client",
                    ),
                ),
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
        migrations.CreateModel(
            name="Rdv",
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
                ("nom", models.CharField(default="null", max_length=255)),
                ("prenom", models.CharField(default="null", max_length=255)),
                ("telephone", models.CharField(blank=True, max_length=12)),
                ("heure", models.TimeField(default="00:00")),
                ("jour", models.DateField()),
                ("sujet", models.CharField(blank=True, max_length=255, null=True)),
                (
                    "avocat",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE, to="main.avocat"
                    ),
                ),
            ],
        ),
    ]
