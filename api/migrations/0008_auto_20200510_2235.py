# Generated by Django 2.2 on 2020-05-10 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_auto_20200510_2215'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='gradedassignment',
            name='date_time',
        ),
        migrations.AddField(
            model_name='gradedassignment',
            name='exam_start_at',
            field=models.CharField(default='NA', max_length=50),
        ),
    ]