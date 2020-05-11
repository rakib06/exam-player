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
    list_display = ['id', 'title', 'teacher', 'is_hide']
    search_fields = ('title',)
    ordering = ('title',)


@admin.register(Question)
class AdminQuestion(admin.ModelAdmin):
    list_display = ['id', 'question', 'assignment', 'answer', 'order']
    search_fields = ('assignment__title', 'question')
    # ordering = ('order',)
    list_display_links = ('question',)
    list_editable = ('answer', 'order')


admin.site.register(Choice)
