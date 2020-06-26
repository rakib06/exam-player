from rest_framework import viewsets
from django.shortcuts import render

from .models import User, MyTeacher, MyStudent
from .serializers import UserSerializer,MyStudentSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class MyStudentViewSet(viewsets.ModelViewSet):
    serializer_class = MyStudentSerializer
    queryset = MyStudent.objects.all()
