# Generated by Django 4.0 on 2022-04-17 14:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('escape', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='progress',
            field=models.IntegerField(default=0),
        ),
    ]
