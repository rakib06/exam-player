from rest_framework import viewsets
from rest_framework.generics import ListAPIView, CreateAPIView
from rest_framework.response import Response
from rest_framework.status import (
    HTTP_201_CREATED,
    HTTP_400_BAD_REQUEST
)

from .models import Assignment, GradedAssignment, Question
from .serializers import AssignmentSerializer, GradedAssignmentSerializer, AnswerSheetSerializer


class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    queryset = Assignment.objects.filter(is_hide=False)

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


class AnswerSheetListView(ListAPIView):
    serializer_class = AnswerSheetSerializer

    def get_queryset(self):
        queryset = Question.objects.all().order_by('id')
        assignment = self.request.query_params.get('assignment_id', None)

        if assignment is not None:
            queryset = queryset.filter(
                assignment=username).order_by('order')
            # print(type(queryset))
        return queryset
