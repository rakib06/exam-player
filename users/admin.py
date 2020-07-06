# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# from django.contrib.auth.models import Group

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

from .models import User, MyStudent, MyTeacher
"""

class UserAdmin(BaseUserAdmin):
    add_fieldsets += (
        (None, {
            'fields': ('mobile', 'username', 'is_student', 'is_teacher', 'password1', 'password2')
        }),

    )
    fieldsets += (
        (None, {
            'fields': ('mobile', 'username', 'is_student', 'is_teacher', 'password')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    list_display = ['mobile', 'username', 'is_student', 'is_teacher']
    search_fields = ('mobile', 'username')
    ordering = ('mobile',)
"""

# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton


class UserCreateForm(UserCreationForm):

    class Meta:
        model = User
        fields = ('username',)


class UserAdmin(UserAdmin):
    add_form = UserCreateForm
    # prepopulated_fields = {'username': }

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'mobile', 'password1', 'password2', 'is_student', 'is_teacher'),
        }),
    )
    list_display = ['username', 'mobile',
                    'email', 'is_student', 'is_teacher', ]
    list_display_links = ('username',)
    search_fields = ( 'mobile', )
    list_editable = ( 'mobile', 'email')

    
            

        
# Define a new User admin
# @admin.register(User)
# class UserAdmin(admin.ModelAdmin):
#     list_display = ['username', 'mobile',
#                     'email', 'is_student', 'is_teacher', ]
#     search_fields = ('username', 'mobile', )
#     # ordering = ('order',)
#     fields = ('username', 'mobile', 'is_student',
#               'is_teacher', 'password', )

#     list_display_links = ('username',)
#     list_editable = ('is_student', 'is_teacher',)


@admin.register(MyStudent)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['user', 'is_accepted', 'class_id', 'teacher' ]
    search_fields = ('user__username', 'teachers__user__username', 'class_id',)
    list_editable = ('is_accepted',)
    
    def get_queryset(self, request):

        if request.user.is_superuser==False:
            try:
                self.list_display = ['user','mobile', 'is_accepted', 'class_id' ]
                self.list_editable =('is_accepted', )
                self.search_fields = ('user__username','class_id')
                self.list_display_links = (None,)
                teacher = MyTeacher.objects.get(user=request.user)
                qs1 = MyStudent.objects.filter(teachers=teacher)
                return qs1
            except:
                return None
        else:
            return MyStudent.objects.all()

@admin.register( MyTeacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['user', 'promo_code', ]
    def get_queryset(self, request):

        if request.user.is_superuser==False:
            try:
                self.list_display = ['user', 'promo_code', ]
                self.list_editable =('promo_code',)
                self.list_display_links = (None,)
                qs1 = MyTeacher.objects.filter(user=request.user)
                return qs1
            except:
                return None
        else:
            return MyTeacher.objects.all()
# admin.site.register(User, UserAdmin)
# admin.site.register(MyStudent)


admin.site.register(User, UserAdmin)
# python manage.py runserver
