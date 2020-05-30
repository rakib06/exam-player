from rest_framework import serializers
import datetime
from users.models import User
from .models import Assignment, Question, Choice, GradedAssignment


class StringSerializer(serializers.StringRelatedField):
    def to_internal_value(self, value):
        return value


class QuestionSerializer(serializers.ModelSerializer):
    choices = StringSerializer(many=True)

    class Meta:
        model = Question
        fields = ('id', 'choices', 'question', 'order',)


class AssignmentSerializer(serializers.ModelSerializer):
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)
    total_marks = serializers.ReadOnlyField()

    class Meta:
        model = Assignment
        fields = ('__all__')
        # fields = ('title', 'teacher', 'is_hide', 'time_in_min', 'total_marks')

    def get_questions(self, obj):
        questions = QuestionSerializer(
            obj.questions.all().order_by('order'), many=True).data
        return questions

    def create(self, request):
        data = request.data

        assignment = Assignment()
        teacher = User.objects.get(username=data['teacher'])
        assignment.teacher = teacher
        assignment.title = data['title']
        assignment.save()

        order = 1
        for q in data['questions']:
            newQ = Question()
            newQ.question = q['title']
            newQ.order = order
            newQ.save()

            for c in q['choices']:
                newC = Choice()
                newC.title = c
                newC.save()
                newQ.choices.add(newC)
            # add a blank field
            # newC = Choice()
            # newC.title = "blank"
            # newC.save()
            newQ.choices.add(newC)
            newQ.answer = Choice.objects.filter(title=q['answer'])[:1].get()
            print("NewQ.anser", newQ.answer)
            newQ.assignment = assignment
            print("newQ.assignment", newQ.assignment)
            newQ.save()
            order += 1
        return assignment


class GradedAssignmentSerializer(serializers.ModelSerializer):
    student = StringSerializer(many=False)
    exam = serializers.SerializerMethodField('exam')
    # right_answer = serializers.SerializerMethodField('right_answer')
    # wrong_answer = serializers.SerializerMethodField('wrong_answer')
    assignment_title = serializers.ReadOnlyField()
    position = serializers.ReadOnlyField()
    rank = serializers.ReadOnlyField()
    highest = serializers.ReadOnlyField()
    total_participant = serializers.ReadOnlyField()

    def exam(self):
        return Assignment.objects.get(id=assignment)

    class Meta:
        model = GradedAssignment
        fields = ('__all__')

        # model.date_time = model.date_time.strftime("new Date(%Y, %m, %d)")

    def create(self, request):
        data = request.data
        print(data)

        assignment = Assignment.objects.get(id=data['asntId'])
        student = User.objects.get(username=data['username'])

        graded_asnt = GradedAssignment()
        graded_asnt.assignment = assignment
        graded_asnt.student = student
        # Exam solution

        questions = [q for q in assignment.questions.all().order_by('order')]
        print(type(assignment.questions.all()))
        answers = [data['answers'][a] for a in data['answers']]
        wrong_answer = 0
        answered_correct_count = 0
        blank = 0
        for i in range(len(questions)):
            if questions[i].answer.title == answers[i]:
                print("Answer--->>", answers[i])
                answered_correct_count += 1

            elif answers[i] == "blank":
                blank += 1

            else:
                wrong_answer += 1
        time = datetime.datetime.now()
        graded_asnt.exam_start_at = time.strftime("%B %d %Y %I:%M:%S %p")
        right_answer = graded_asnt.right_answer = answered_correct_count
        total_marks = graded_asnt.total_marks = len(questions)
        print("right answer", right_answer)
        print("wrong anser", wrong_answer)
        print("blank", blank)
        om = graded_asnt.right_answer - wrong_answer * .25

        graded_asnt.obtained_marks = om
        grade_1 = answered_correct_count / len(questions) * 100
        grade = om / len(questions) * 100
        graded_asnt.grade = "{:.2f}".format(grade)
        # graded_asnt.grade = round(grade, 2)
        graded_asnt.save()
        return graded_asnt


'''
class AnswerSheet(serializers.ModelSerializer):
    
    questions = serializers.SerializerMethodField()
    teacher = StringSerializer(many=False)

    class Meta:
        model = Assignment
        fields = ('__all__')

    def get_questions(self, obj):
        questions = QuestionSerializer(
            obj.questions.all().order_by('order'), many=True).data
        return questions
    
'''
