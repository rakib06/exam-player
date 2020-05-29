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


class Teacher(models.Model):
    user = models.OneToOneField(User, null=True, on_delete=models.SET_NULL)
    promo_code = models.CharField(max_length=50, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Teacher'


class Student(models.Model):
    teachers = models.OneToOneField(
        Teacher, null=True, on_delete=models.SET_NULL)
    is_accepted = models.BooleanField(default=False)
