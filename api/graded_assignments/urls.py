from django.urls import path
from api.views import GradedAssignmentListView, GradedAssignmentCreateView, AnswerSheetListView

urlpatterns = [
    path('', GradedAssignmentListView.as_view()),
    path('create/', GradedAssignmentCreateView.as_view()),
    path('answer/', AnswerSheetListView.as_view()),
]
