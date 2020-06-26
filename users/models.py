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
    
    user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL, verbose_name='My Account')
    promo_code = models.CharField(max_length=50, blank=True, null=True)
    class Meta:
        verbose_name='My PromoCode'

    def __str__(self):
        return self.user.username


class MyStudent(models.Model):
    teachers = models.ForeignKey(
        MyTeacher, null=True, on_delete=models.SET_NULL)
    user = models.ForeignKey(
        User, null=True, on_delete=models.SET_NULL, verbose_name='Student')
    is_accepted = models.BooleanField(default=False, verbose_name='Accept')
    

    def __str__(self):
        return self.user.username
    
    @property
    def mobile(self):
        return self.user.mobile
        
    @property
    def username(self):
        return self.user.username
