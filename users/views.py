from rest_framework import viewsets
from django.shortcuts import render
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from rest_framework.response import Response
from .models import User, MyTeacher, MyStudent
from .serializers import UserSerializer,MyStudentSerializer


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class MyStudentViewSet(viewsets.ModelViewSet):
    serializer_class = MyStudentSerializer
    queryset = MyStudent.objects.all()

    def create(self, request):
        serializer = MyStudentSerializer(data=request.data)
        if serializer.is_valid():
            ms = serializer.create(request)
            if ms:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
