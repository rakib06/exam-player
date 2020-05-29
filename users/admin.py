from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.models import Group

from .models import User, Student,Teacher

'''
class UserAdmin(BaseUserAdmin):
    add_fieldsets += (
        (None, {
            'fields': ('email', 'username', 'is_student', 'is_teacher', 'password1', 'password2')
        }),

    )
    fieldsets += (
        (None, {
            'fields': ('email', 'username', 'is_student', 'is_teacher', 'password')
        }),
        ('Permissions', {
            'fields': ('is_superuser', 'is_staff')
        })
    )
    list_display = ['email', 'username', 'is_student', 'is_teacher']
    search_fields = ('email', 'username')
    ordering = ('email',)

'''
# Define an inline admin descriptor for Employee model
# which acts a bit like a singleton


# Define a new User admin
class UserAdmin(BaseUserAdmin):
    list_display = ['username', 'mobile', 'email', 'is_student', ]
    search_fields = ('username', 'mobile')
    # ordering = ('order',)
    list_display_links = ('username',)


'''
@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['username']
'''

admin.site.register(User, UserAdmin)
admin.site.register(Student)
admin.site.register(Teacher)