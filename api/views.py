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
from users.models import User


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer

    def get_queryset(self):
        queryset = None
        teachers = User.objects.filter(is_teacher=True)
        print('LLLLLLLLLLLLLLLLLLLLLLLLLLL')
        print(teachers, type(teachers))
        username = getattr(self.request, 'user', None)
        print('----------------', username)
        is_student = False
        teachers_list = []
        if teachers:
            queryset = Assignment.objects.filter(teacher__username=username)

        else:
            queryset = Assignment.objects.filter(is_hide=False)
        return queryset

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
        print(request.data)
        serializer = GradedAssignmentSerializer(data=request.data)
        serializer.is_valid()
        graded_assignment = serializer.create(request)
        if graded_assignment:
            return Response(status=HTTP_201_CREATED)
        return Response(status=HTTP_400_BAD_REQUEST)
