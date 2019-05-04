from django.conf.urls import url, include
from . import views
from .views import home, privacy, terms, refund

urlpatterns = [
    url(r'^intro/$', views.intro, name='intro'),
    url(r'^profile/$', views.profile, name='profile'),
    url(r'^profile/client/$', views.client_profile, name='client_profile'),
    url(r'^$', home, name='home'),
    url(r'^accounts/signup/respondent/$', views.respondent_signup, name='account_signup_respondent'),
    url(r'^accounts/signup/client/$', views.client_signup, name='account_signup_client'),
    url(r'^accounts/signup/$', views.client_signup, name='account_signup_client'),
    url(r'^api/users/respondent/$', views.RespondentUserCreate.as_view(), name='respondent-account-create'),
    url(r'^api/users/client/$', views.ClientUserCreate.as_view(), name='client-account-create'),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^rest-auth/registration/', include('rest_auth.registration.urls')),
    url(r'^rest-auth/facebook/$', views.FacebookLogin.as_view(), name='fb_login'),
    url(r'^rest-auth/google/$', views.GoogleLogin.as_view(), name='google_login'),

    url(r'^country', views.Country.as_view(), name='get_all_country'),
    url(r'^state/(?P<country>\d+)', views.State.as_view(), name='get_state'),
    url('import/country', views.import_country, name='import_country'),
    url('import/state', views.import_state, name='import_state'),
    url(r'^clientchart', views.ClientChart.as_view(), name='get_survey_list'),

    url(r'privacy', privacy, name='privacy'),
    url(r'terms', terms, name='terms'),
    url(r'refund', refund, name='refund'),
    url(r'clientFeedback/', views.Support.as_view(), name='support'),
]
