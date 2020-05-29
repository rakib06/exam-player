from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    email = models.EmailField(blank=True, null=True)
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    mobile = models.CharField(max_length=20, default="NA")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username


class MyTeacher(models.Model):
    batch_name = models.CharField(max_length=150, blank=True, null=True)
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
    promo_code = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.batch_name


class MyStudent(models.Model):
    teachers = models.ForeignKey(
        MyTeacher, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, verbose_name='Student')
    is_accepted = models.BooleanField(default=False, verbose_name='Accept')
    is_deleted = models.BooleanField(default=False, verbose_name='Ignore')

    def __str__(self):
        return self.user
