"""AudienceSutra URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls import url, include
from survey import urls as survey_url
from . import views
from django.conf import settings
from django.conf.urls.static import static

from django.contrib.auth import views as auth_views


urlpatterns = []

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

urlpatterns += [
    url(r'', include('accounts.urls')),
    url(r'^admin/', admin.site.urls),
    url(r'^accounts/', include('allauth.urls')),
    url(r'^survey/', include(survey_url)),
    # url(r'^survey/api/', include(survey_url)),
    url(r'^survey/api/', include('survey.urls')),
    url(r'^check_profile', views.check_profile),
    url(r'^api/user_info', views.get_logedin_user),
    url(r'^user/type', views.set_account_type, name='set_account_type'),
    url(r'^client/intro/(?P<id>\d+)', views.client_intro, name='client_intro'),
    url(r'^client/intro', views.client_intro, name='client_intro'),
    url(r'^respondent/intro', views.respondent_intro, name='respondent_intro'),
    url(r'^charts/$', views.charts, name='charts'),
    url(r'^api/profile_image', views.UpdateProfilePic.as_view(), name='update_profile_pic'),
    url('accounts/login/', auth_views.LoginView.as_view(), name='my_account_login'),
    url(r'.*', views.home)

    # url(r'^payment/$', views.payment, name="payment"),
    # url(r'^payment/success$', views.payment_success, name="payment_success"),
    # url(r'^payment/failure$', views.payment_failure, name="payment_failure"),

    # url(r'^$', 'home.views.home', name='home'),
    # url(r'^', include('payu_biz.urls')),
    # url(r'^payubiz-success$', views.payment_success, name="payment_success"),
    # url(r'^payubiz-failure$', views.payment_failure, name="payment_failure"),
    # url(r'^payubiz-cancel$', views.payment_failure, name="payment_cancel"),
]


