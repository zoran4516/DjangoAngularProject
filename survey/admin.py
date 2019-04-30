# -*- coding: utf-8 -*-

from django.contrib import admin

from .models import Answer, Category, Question, Responses, Survey

from .actions import make_published
from .models import ProfileQuestionOptionMaster, ProfileQuestionMaster, ProfileQuestionAnswers, RespondentSurveyAssign
from survey.models.ProfileQuestionMaster import DigitalLaser,EstimationQuestionAnswersHead,EstimationQuestionAnswers,\
    EstimationQuestionMaster, EstimationQuestionOptionMaster


class QuestionInline(admin.TabularInline):
    model = Question
    ordering = ('order', 'category',)
    extra = 1


class CategoryInline(admin.TabularInline):
    model = Category
    extra = 0


class SurveyAdmin(admin.ModelAdmin):
    list_display = ('name', 'created_on', 'status', 'need_logged_user', 'template')
    list_filter = ('status', 'need_logged_user')
    inlines = [CategoryInline, QuestionInline]
    actions = [make_published]


class AnswerBaseInline(admin.StackedInline):
    fields = ('question', 'body')
    readonly_fields = ('question',)
    extra = 0
    model = Answer


class DigitalLaserAdmin(admin.ModelAdmin):
    fields = ('description', 'credit_point', 'debit_point', 'user')
    readonly_fields = ('description',)
    model = DigitalLaser


class ResponseAdmin(admin.ModelAdmin):
    list_display = ('interview_uuid', 'survey', 'created', 'user')
    list_filter = ('survey', 'created')
    date_hierarchy = 'created'
    inlines = [AnswerBaseInline]
    # specifies the order as well as which fields to act on
    readonly_fields = (
        'survey', 'created', 'updated', 'interview_uuid', 'user'
    )


# admin.site.register(Question, QuestionInline)
# admin.site.register(Category, CategoryInline)
admin.site.register(Survey, SurveyAdmin)
admin.site.register(Responses, ResponseAdmin)
admin.site.register(DigitalLaser, DigitalLaserAdmin)


class ProfileQuestionMasterAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in ProfileQuestionMaster._meta.fields]


admin.site.register(ProfileQuestionMaster, ProfileQuestionMasterAdmin)


class ProfileQuestionOptionMasterAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in ProfileQuestionOptionMaster._meta.fields]


admin.site.register(ProfileQuestionOptionMaster, ProfileQuestionOptionMasterAdmin)


class ProfileQuestionAnswerAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in ProfileQuestionAnswers._meta.fields]


admin.site.register(ProfileQuestionAnswers, ProfileQuestionAnswerAdmin)


class RespondentSurveyAssignAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in RespondentSurveyAssign._meta.fields]


admin.site.register(RespondentSurveyAssign, RespondentSurveyAssignAdmin)


class EstimationQuestionMasterAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in EstimationQuestionMaster._meta.fields]


admin.site.register(EstimationQuestionMaster, EstimationQuestionMasterAdmin)


class EstimationQuestionOptionMasterAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in EstimationQuestionOptionMaster._meta.fields]


admin.site.register(EstimationQuestionOptionMaster, EstimationQuestionOptionMasterAdmin)


class EstimationQuestionAnswersHeadAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in EstimationQuestionAnswersHead._meta.fields]


admin.site.register(EstimationQuestionAnswersHead, EstimationQuestionAnswersHeadAdmin)


class EstimationQuestionAnswersAdmin(admin.ModelAdmin):
    list_per_page = 1000
    show_full_result_count = False
    list_display = [f.name for f in EstimationQuestionAnswers._meta.fields]


admin.site.register(EstimationQuestionAnswers, EstimationQuestionAnswersAdmin)
