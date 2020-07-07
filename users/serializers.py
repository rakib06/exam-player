from allauth.account.adapter import get_adapter
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework import serializers
from rest_framework.authtoken.models import Token

from .models import User, MyTeacher, MyStudent

from django.db.models import Q
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('mobile', 'username', 'password', 'is_student', 'is_teacher')


class CustomRegisterSerializer(RegisterSerializer):
    is_student = serializers.BooleanField()
    is_teacher = serializers.BooleanField()
    mobile = serializers.CharField()

    class Meta:
        model = User
        fields = ('mobile', 'username', 'password', 'is_student', 'is_teacher')

    def get_cleaned_data(self):

        return {
            'username': self.validated_data.get('username', ''),
            'password1': self.validated_data.get('password1', ''),
            'password2': self.validated_data.get('password2', ''),
            'mobile': self.validated_data.get('mobile', ''),
            'is_student': self.validated_data.get('is_student', ''),
            'is_teacher': self.validated_data.get('is_teacher', '')
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)

        self.cleaned_data = self.get_cleaned_data()
        user.username = self.cleaned_data.get('username')
        user.mobile = self.cleaned_data.get('mobile')
        user.is_student = self.cleaned_data.get('is_student')
        user.is_teacher = self.cleaned_data.get('is_teacher')
        # print('XXXXXXXXXXXXXXXXXXXX username', user.username)
        # print('XXXXXXXXXXXXXXXXXXXX mobile', user.mobile)
        # print('XXXXXXXXXXXXXXXXXXXX mobile', user.is_student)
        user.save()
        adapter.save_user(request, user, self)
        return user


class TokenSerializer(serializers.ModelSerializer):
    user_type = serializers.SerializerMethodField()

    class Meta:
        model = Token
        fields = ('key', 'user', 'user_type')

    def get_user_type(self, obj):
        serializer_data = UserSerializer(
            obj.user
        ).data
        is_student = serializer_data.get('is_student')
        is_teacher = serializer_data.get('is_teacher')
        return {
            'is_student': is_student,
            'is_teacher': is_teacher
        }


'''



Now we are going to add a student to teacher


Step 1 , get the promo code from a student 
let promo code = pc
let username = student 
Step 2, 
match the promo code
t = MyTeacher.objects.get(promo_code=pc)

s = User.objects.get(username="student")

Step 3, if match any promocode then

create my student 
ms = MyStudent()
>>> ms.teachers = x
>>> ms.user = y
>>> ms.save()
>>> ms
'''

class MyStudentSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField()
    class Meta:
        model = MyStudent
        fields = ('__all__')
    def create(self, request):
        data = request.data
        t = MyTeacher.objects.get(promo_code=data['code'])
        student = User.objects.get(username=data['student'])
        class_id = data['class_id']
        if len(MyStudent.objects.filter(user=student))>10:
            return None
        if len(MyStudent.objects.filter(Q(teachers=t) & Q(user=student))>0:
            return None
        else:
         
            try:   
                ms = MyStudent()
                ms.teachers = t
                ms.user = student
                ms.class_id = class_id
                ms.save()
                return ms
            except:
                return None