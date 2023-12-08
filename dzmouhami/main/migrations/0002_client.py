# Generated by Django 4.2.7 on 2023-12-08 14:11

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("main", "0001_initial"),
    ]

    operations = [
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
                ("username", models.CharField(max_length=45)),
                ("email", models.EmailField(max_length=255, unique=True)),
                ("nom", models.CharField(blank=True, max_length=255)),
                ("prenom", models.CharField(blank=True, max_length=255)),
                ("telephone", models.CharField(blank=True, max_length=12)),
            ],
        ),
    ]
