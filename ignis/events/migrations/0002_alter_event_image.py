# Generated by Django 4.2 on 2024-03-16 02:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('events', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='image',
            field=models.BinaryField(),
        ),
    ]
