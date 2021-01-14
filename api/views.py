from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)
from django.db.models import Q

from .models import Assignment, GradedAssignment
from .serializers import AssignmentSerializer, GradedAssignmentSerializer
from users.models import *


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer

    def get_queryset(self):

        teachers = User.objects.filter(is_teacher=True)
        
        username = getattr(self.request, 'user', None)
        # print('----------------', username)
        is_teacher = False
        for item in teachers:
            # (item.username)
            if str(item.username) == str(username):
                is_teacher = True
        if is_teacher:
            # print('LLLLLLLLLLLLLLLLLLLLLLLLLLL')
            # print(teachers, type(teachers))
            queryset = Assignment.objects.filter(teacher__username=username)
            return queryset

        else:
            
            # don't show exam after a student have finished it
            
            '''
            Teacher match korlei prosno dekha jabe 
            '''
            stu = MyStudent.objects.filter(user__username=username)
            queryset = None
            teachers = []
            for item in stu:
                if item.is_accepted:
                    t = item.teachers
                    t_username = t.user.username
                    teachers.append(t_username)
            queryset = Assignment.objects.filter(teacher__username__in=teachers)
            queryset = queryset.filter(is_hide=False)
            return queryset
            # esa = GradedAssignment.objects.filter(student__username=username )
            # esa = GradedAssignment.objects.filter(student__username=username )
            # esa = GradedAssignment._meta.get_field('assignmet')
            '''
            done = []
            for item in esa:
                done.append(item.assignment)
            # print('Studenrt--------------------------<<<<<<<<<<<<<<>>>>>>>>>>>>>>>>>>>>>...')
            queryset = queryset.exclude(assignment__in=done)
            '''
            return None

    def create(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            assignment = serializer.create(request)
            if assignment:
                return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)


class GradedAssignmentListView(ListAPIView):
    serializer_class = GradedAssignmentSerializer

    def get_queryset(self):
        queryset = GradedAssignment.objects.all().order_by('id')
        username = self.request.query_params.get('username', None)
        if username is not None:
            queryset = queryset.filter(
                student__username=username).order_by('-id')
            # print(type(queryset))

        return queryset
    '''
            for item in queryset:
                item.assignment = item.assignment.title
                print("LLLLLLLLLLLLL", item.assignment.title)
        '''


class GradedAssignmentCreateView(CreateAPIView):
    serializer_class = GradedAssignmentSerializer
    queryset = GradedAssignment.objects.all()

    def post(self, request):
        # print(request.data)
        serializer = GradedAssignmentSerializer(data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.create(request)
        if graded_assignment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
