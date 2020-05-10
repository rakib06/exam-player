from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone


class User(AbstractUser):
    email = models.EmailField(blank=True, null=True)
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    mobile = models.CharField(max_length=20, default="NA")
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return self.username


class Student(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    created_at = models.DateField(default=timezone.now)
    updated_at = models.DateTimeField(default=timezone.now, null=True)

    def __str__(self):
        return self.user.username
