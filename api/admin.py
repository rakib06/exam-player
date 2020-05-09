from django.contrib import admin

from .models import Choice, Question, Assignment, GradedAssignment


@admin.register(GradedAssignment)
class AdminGradedAssignment(admin.ModelAdmin):
    list_display = ['student', 'assignment',
                    'right_answer', 'wrong_answer', 'obtained_marks', 'total_marks', 'grade']
    search_fields = ('student__username', 'assignment__title')
    ordering = ('assignment',)


@admin.register(Assignment)
class AdminAssignment(admin.ModelAdmin):
    list_display = ['title', 'teacher', 'is_hide']
    search_fields = ('title',)
    ordering = ('title',)


@admin.register(Question)
class AdminQuestion(admin.ModelAdmin):
    list_display = ['assignment', 'question', 'answer', 'order']
    search_fields = ('assignment__title', 'question')
    ordering = ('assignment',)
    list_display_links = ('assignment',)
    list_editable = ('question', 'answer', 'order')


admin.site.register(Choice)
