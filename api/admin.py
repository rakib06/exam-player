from django.contrib import admin

from .models import Choice, Question, Assignment, GradedAssignment


@admin.register(GradedAssignment)
class AdminGradedAssignment(admin.ModelAdmin):
    list_display = ['student', 'assignment', 'grade']
    search_fields = ('student__username', 'assignment__title')
    ordering = ('assignment',)


@admin.register(Assignment)
class AdminAssignment(admin.ModelAdmin):
    list_display = ['title', 'teacher', ]
    search_fields = ('title',)
    ordering = ('title',)


admin.site.register(Choice)
admin.site.register(Question)
