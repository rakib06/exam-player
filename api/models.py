from django.db import models
from users.models import User


class CustomDateTimeField(models.DateTimeField):
    def value_to_string(self, obj):
        val = self.value_from_object(obj)
        if val:
            val.replace(microsecond=0)
            return val.isoformat()
        return ''


class Assignment(models.Model):
    title = models.CharField(max_length=50)
    teacher = models.ForeignKey(User, on_delete=models.CASCADE)
    is_hide = models.BooleanField(default=True)

    def __str__(self):
        return self.title


class GradedAssignment(models.Model):
    student = models.ForeignKey(User, on_delete=models.CASCADE)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.SET_NULL, blank=True, null=True)
    right_answer = models.FloatField(default=969.0)
    total_marks = models.FloatField(default=969.0)
    obtained_marks = models.FloatField(default=969.0)
    grade = models.FloatField()
    # exam_start_at = CustomDateTimeField(auto_now=True, null=True)
    exam_start_at = models.CharField(max_length=50, default='NA')
    
    def wrong_answer(self):
        return -(self.right_answer - self.obtained_marks)

    def __str__(self):
        return self.student.username


class Choice(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class Question(models.Model):
    question = models.CharField(max_length=2000)

    choices = models.ManyToManyField(Choice)
    answer = models.ForeignKey(
        Choice, on_delete=models.CASCADE, related_name='answer', blank=True, null=True)
    assignment = models.ForeignKey(
        Assignment, on_delete=models.CASCADE, related_name='questions', blank=True, null=True)
    order = models.SmallIntegerField()

    def __str__(self):
        return self.question


'''
class ExamSolution(models.Model):
    student_name = models.ForeignKey(User, on_delete=models.CASCADE)
    exam_name = models.ForeignKey(Assignment, on_delete=models.CASCADE)
    selected_answers = models.IntegerField()
'''
