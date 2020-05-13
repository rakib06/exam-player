from django.contrib import admin
from django.db.models import Q
from .models import Choice, Question, Assignment, GradedAssignment

teacher_ID = None


@admin.register(GradedAssignment)
class AdminGradedAssignment(admin.ModelAdmin):
    list_display = ['student', 'assignment',
                    'right_answer', 'wrong_answer', 'obtained_marks', 'total_marks', 'grade']
    search_fields = ('student__username', 'assignment__title')
    ordering = ('assignment',)
    list_filter = (

        'assignment__title',
    )

    def get_queryset(self, request):
        results = super().get_queryset(request)
        teacher_ID = request.user.id
        t_assigntments = Assignment.objects.filter(teacher=teacher_ID)
        # print(type(assignment))
        if request.user.is_superuser:
            return qs

        return results.filter(assignment__in=t_assigntments)


@admin.register(Assignment)
class AdminAssignment(admin.ModelAdmin):
    exclude = ('teacher',)
    list_display = ['title', 'is_hide']
    search_fields = ('title',)
    list_display_links = ('title',)
    list_editable = ('is_hide',)
    ordering = ('title',)
    list_filter = (
        # ('teacher', admin.RelatedOnlyFieldListFilter),
        'title',
    )

    def get_queryset(self, request):

        qs = super().get_queryset(request)
        print(qs)
        if request.user.is_superuser:
            return qs
        return qs.filter(teacher=request.user.id)


@admin.register(Question)
class AdminQuestion(admin.ModelAdmin):
    list_display = ['order', 'question', 'answer', ]
    search_fields = ('assignment__title', 'question')
    # ordering = ('order',)
    list_display_links = ('question',)
    list_editable = ('answer',)

    ordering = ('order',)

    def get_queryset(self, request):
        results = super().get_queryset(request)
        teacher_ID = request.user.id
        t_assigntments = Assignment.objects.filter(teacher=teacher_ID)
        # print(type(assignment))
        if request.user.is_superuser:
            return qs

        return results.filter(assignment__in=t_assigntments)


admin.site.register(Choice)
