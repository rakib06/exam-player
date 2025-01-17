from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils import timezone
import time

class User(AbstractUser):
    email = models.EmailField(blank=True, null=True)
    is_student = models.BooleanField()
    is_teacher = models.BooleanField()
    mobile = models.CharField(max_length=20, default="NA")
    # mobile = models.CharField(max_length=200,unique=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    full_name = models.CharField(max_length=200, blank=True, null=True, default="Exam Player")
    # USERNAME_FIELD = 'mobile'

    def __str__(self):
        return self.username


class MyTeacher(models.Model):
    
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, verbose_name='My Account')
    promo_code = models.CharField(max_length=50, blank=True, null=True,verbose_name='Verification Code')
    class Meta:
        verbose_name='Verification Code'

    def __str__(self):
        return self.user.username


class MyStudent(models.Model):
    teachers = models.ForeignKey(
        MyTeacher, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, verbose_name='Student')
    is_accepted = models.BooleanField(default=False, verbose_name='Accept')
    class_id = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.user.username
    
    @property
    def mobile(self):
        return self.user.mobile
        
    @property
    def username(self):
        return self.user.username

    @property
    def teacher(self):
        return self.teachers.user.username