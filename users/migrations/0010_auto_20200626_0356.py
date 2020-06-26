# Generated by Django 2.2 on 2020-06-25 21:56

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_remove_myteacher_batch_name'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='myteacher',
            options={'verbose_name': 'My PromoCode'},
        ),
        migrations.RemoveField(
            model_name='mystudent',
            name='is_deleted',
        ),
        migrations.AlterField(
            model_name='myteacher',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL, verbose_name='My Account'),
        ),
    ]