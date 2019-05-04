# -*- coding: utf-8 -*-

from django.conf.urls import url
from .views import ConfirmView, IndexView, SurveyCompleted, SurveyDetail
from .views.survey_result import serve_result_csv

from django.conf.urls import url, include
from rest_framework import routers
from . import viewsets

router = routers.DefaultRouter()

urlpatterns = [
    url(r'^$', IndexView.as_view(), name='survey-list'),
    url(r'^(?P<id>\d+)/', SurveyDetail.as_view(), name='survey-detail'),
    url(r'^csv/(?P<pk>\d+)/', serve_result_csv, name='survey-result'),
    url(r'^(?P<id>\d+)/completed/', SurveyCompleted.as_view(),
        name='survey-completed'),
    url(r'^(?P<id>\d+)-(?P<step>\d+)/', SurveyDetail.as_view(),
        name='survey-detail-step'),
    url(r'^confirm/(?P<uuid>\w+)/', ConfirmView.as_view(),
        name='survey-confirmation'),
]


urlpatterns = urlpatterns+[
    url(r'^auth/', include('rest_framework.urls', namespace='rest_framework')),
    # url(r'^', include(router.urls)),
    url(r'^survey/$', viewsets.survey_list),
    url(r'^survey/(?P<id>\d+)/$', viewsets.get_survey),
    url(r'^client_survey/(?P<id>\d+)/$', viewsets.get_client_survey),
    url(r'^question/$', viewsets.question_list),
    url(r'^question_submit/$', viewsets.question_submit),
    url(r'^tabs_submit/$', viewsets.tabs_submit),
    url(r'^get_all_tabs/$', viewsets.get_all_tabs),
    url(r'^get_all_survey_tabs/(?P<id>\d+)/$', viewsets.get_all_survey_tabs),
    url(r'^survey_question/(?P<id>\d+)/$', viewsets.get_survey_question),
    url(r'^response/$', viewsets.response_list),
    url(r'^response/(?P<id>\d+)/$', viewsets.get_response),
    url(r'^answer/$', viewsets.answer_list),
    url(r'^survey_responses/(?P<id>\d+)/$', viewsets.get_survey_responses),
    url(r'^response/(?P<id>\d+)/$', viewsets.get_response),
    url(r'^response_answers/(?P<id>\d+)/$', viewsets.get_response_answers),
    url(r'^signup/$', viewsets.user_list),
    url(r'^signup/(?P<id>\d+)/$', viewsets.update_user),
    url(r'^client_profile/$', viewsets.client_profile_list),
    url(r'^respondent_profile/$', viewsets.respondent_profile_list),
    url(r'^cost/$', viewsets.survey_cost),
    url(r'^login/$', viewsets.login_validator),
    url(r'^login/google/$', viewsets.login_google),
    url(r'^survey_template_brand/$', viewsets.template_brand_list),
    url(r'^survey_template_competition/$', viewsets.template_competition_list),
    url(r'^survey_template_communication/$', viewsets.template_communication_list),
    url(r'^survey_template_product/$', viewsets.template_product_list),
    url(r'^survey_template_custom/$', viewsets.template_custom_list),

    url(r'^user/details/(?P<id>\d+)$', viewsets.UserDetail.as_view()),
    url(r'^respondent/firstsurvey/$', viewsets.RespondentFirstSurvey.as_view()),
    url(r'^client/estimate/(?P<surveyID>\d+)$', viewsets.ClientEstimate.as_view()),

    url(r'^question_submit/delete/(?P<questionId>\d+)/$', viewsets.delete_question_submit),
    url(r'^update/survey/$', viewsets.SurveyImage),

    url(r'^client_active_survey/(?P<id>\d+)/$', viewsets.get_client_active_survey),
    url(r'^survey/question/update/(?P<id>\d+)/$', viewsets.get_survey_with_question),

    # url(r'^respondent_survey/$', viewsets.respondent_survey_answer),
    url(r'^response/survey/status/(?P<survey>\d+)/$', viewsets.response_survey_status),

    url(r'^client/survey/$', viewsets.survey_by_client),
    url(r'^client/search/survey/(?P<surveyId>\d+)/$', viewsets.survey_search_respondent),
    url(r'^client/search/criteria', viewsets.search_criteria_for_respondent),
    url(r'^client/search/profile/(?P<id>\d+)/$', viewsets.search_profile_of_respondent),
    url(r'^respondent/assign/survey/$', viewsets.survey_assign_respondent),
    url(r'^assign/survey/(?P<id>\d+)/$', viewsets.get_assign_survey),

    url(r'^respondent_active_survey/(?P<id>\d+)/$', viewsets.get_respondent_active_survey),
    url(r'^respondent/credit/$', viewsets.get_respondent_credit_point),

    url(r'^delete/(?P<surveyId>\d+)/$', viewsets.survey_delete),
    # url(r'^pay/', viewsets.survey_pay),
    url(r'^pay/(?P<surveyId>\d+)/$', viewsets.survey_pay),
    url(r'^paystatus/', viewsets.survey_pay_status),
    url(r'^bind_ans_on_dropdown/$', viewsets.bind_ans_on_dropdown),
    # url(r'^search-respondent/$', viewsets.search_respondent),
    url(r'search-respondent/', viewsets.SearchRespondent.as_view(), name='search_respondent'),
    url(r'^assigned-survey-report/$', viewsets.assigned_survey_report),

    url(r'state-wise-respondent/(?P<surveyId>\d+)', viewsets.StateWiseRespondent.as_view()),
]
