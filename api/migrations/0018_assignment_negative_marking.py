# Generated by Django 2.2 on 2020-06-24 17:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0017_auto_20200612_1946'),
    ]

    operations = [
        migrations.AddField(
            model_name='assignment',
            name='negative_marking',
            field=models.BooleanField(blank=True, default=True, null=True),
        ),
    ]
