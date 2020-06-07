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
    time_in_min = models.IntegerField(null=True)

    def __str__(self):
        return self.title

    @property
    def total_marks(self):
        tq = Question.objects.filter(assignment__id=self.id).count()
        return tq

    @property
    def batch(self):
        return self.teacher.first_name

    class Meta:
        verbose_name = "Exam"


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
    t = 0

    @property
    def position(self):
        global t
        q = GradedAssignment.objects.filter(
            assignment=self.assignment).order_by('-obtained_marks')
        # print('QQQQQQQQQQQ', q)
        # print(len(q))
        t = len(q)
        i = 0
        for item in q:
            i = i + 1
            if item.obtained_marks == self.obtained_marks:
                break
        return "Highest: ", q[0].obtained_marks, ",  Your Postion: (", i, ")  Total Participant: ", t

    @property
    def highest(self):

        q = GradedAssignment.objects.filter(
            assignment=self.assignment).order_by('-obtained_marks')
        # print('QQQQQQQQQQQ', q)
        # print(len(q))
        t = len(q)
        i = 0
        for item in q:
            i = i + 1
            if item.obtained_marks == self.obtained_marks:
                break
        return q[0].obtained_marks

    @property
    def total_participant(self):
        global t
        return t

    @property
    def rank(self):
        q = GradedAssignment.objects.filter(
            assignment=self.assignment).order_by('-obtained_marks')
        # print('QQQQQQQQQQQ', q)
        # print(len(q))
        t = len(q)
        i = 0
        for item in q:
            i = i + 1
            if item.obtained_marks == self.obtained_marks:
                break
        return i

    def wrong_answer(self):
        return -(self.right_answer - self.obtained_marks)

    def __str__(self):
        return self.student.username

    @property
    def assignment_title(self):
        return self.assignment.title

    class Meta:
        verbose_name = "Result"


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
