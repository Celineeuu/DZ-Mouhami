# Generated by Django 4.2.7 on 2023-12-08 14:13

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ("rendez", "0002_creneau_avocat"),
    ]

    operations = [
        migrations.CreateModel(
            name="rdv",
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
                ("heure", models.TimeField()),
                ("jour", models.DateField()),
                ("lieu", models.CharField(max_length=255)),
                (
                    "avocat",
                    models.ForeignKey(
                        default=None,
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
        ),
    ]
