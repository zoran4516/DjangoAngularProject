from allauth.account.views import SignupView
from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required

# Create your views here.
from .forms import RespondentSignupForm, ClientSignupForm
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.serializers import RespondentProfileSerializer, ClientProfileSerializer


from allauth.socialaccount.providers.facebook.views import FacebookOAuth2Adapter
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from rest_auth.registration.views import SocialLoginView
from accounts import models, serializers
from survey.models import Survey
from EmailSercives.tasks import send_feedback


class FacebookLogin(SocialLoginView):
    adapter_class = FacebookOAuth2Adapter


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class RespondentUserCreate(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = RespondentProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ClientUserCreate(APIView):
    """
    Creates the user.
    """

    def post(self, request, format='json'):
        serializer = ClientProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def home(request):
    # if request.user.is_anonymous:
    #     return render(request, "../templates/index_anonymous.html")
    # else:
    #     return render(request, "../templates/index_anonymous.html")
    # else:
    #     return render(request, "../templates/index.html")
    # else:
    #     return render(request, "home.html")
    return render(request, "../templates/index_anonymous.html")


@login_required()
def intro(request):
    return render(request, "intro.html")


@login_required()
def profile(request):
    # import pdb
    # pdb.set_trace()

    user = request.user
    # if hasattr(user, 'clientprofile') or user.is_admin:
    if hasattr(user, 'clientprofile') or user.is_superuser:
        return redirect('client_profile')
    elif hasattr(user, 'respondentprofile'):
        return redirect('respondent_profile')
    else:
        return redirect('/accounts/signup/')


@login_required()
def client_profile(request):
    if request.method == 'GET':
        if hasattr(request.user, 'clientprofile'):
            return render(request, "client_profile.html")
    return render(request, "error.html")


class ClientSignupView(SignupView):
    template_name = 'client_signup.html'
    form_class = ClientSignupForm
    view_name = 'client_signup'

    def dispatch(self, request, *args, **kwargs):
        # request.session["userType"] = 'Client'
        return super(ClientSignupView, self).dispatch(request, *args, **kwargs)  # Don't forget this


class RespondentSignupView(SignupView):
    template_name = 'respondent_signup.html'
    form_class = RespondentSignupForm
    view_name = 'respondent_signup'

    def dispatch(self, request, *args, **kwargs):
        # request.session["userType"] = 'Respondent'
        # request.session.set_expiry(99999999999)
        # print('************************************* Dispatch: ', request.session["userType"])
        return super(RespondentSignupView, self).dispatch(request, *args, **kwargs)  # Don't forget this


respondent_signup = RespondentSignupView.as_view()
client_signup = ClientSignupView.as_view()


# ========================================


class Country(APIView):

    def get(self, request):
        countries = models.CountryMaster.objects.filter(is_active=True).order_by('country_name')
        country_serializer = serializers.CountrySerializer(countries, many=True)
        return Response(country_serializer.data, status=status.HTTP_200_OK)


class State(APIView):

    def get(self, request, country=None):

        states = models.StateMaster.objects.filter(country_id=country).order_by('state_name')
        state_serializer = serializers.StateSerializer(states, many=True)
        return Response(state_serializer.data, status=status.HTTP_200_OK)


class ClientChart(APIView):

    def get(self, request, client_id=None):
        surveys = Survey.objects.filter(creator=request.user.pk).order_by('-pk')
        survey_serializer = serializers.SurveySerializer(surveys, many=True)
        return Response(survey_serializer.data, status=status.HTTP_200_OK)


def import_country(request):
    if request.method == 'POST':
        csv_file = request.FILES["csv_file"]
        file_data = csv_file.read().decode("utf-8")
        lines = file_data.split("\n")
        for line in lines:
            fields = line.split(",")
            country_name = fields[0]
            country_code = fields[1]
            country = models.CountryMaster.objects.filter(country_code=country_code)
            if country is None or len(country) == 0:
                country = models.CountryMaster.objects.create(country_name=country_name, country_code=country_code)
                country.save()
        return render(request, 'country_import.html')
    else:
        return render(request, 'country_import.html')


def import_state(request):
    if request.method == 'POST':
        csv_file = request.FILES["csv_file"]
        file_data = csv_file.read().decode("utf-8")
        lines = file_data.split("\n")
        for line in lines:
            fields = line.split(",")
            country_code = fields[0]
            state_code = fields[1]
            state_name = fields[2]
            country = models.CountryMaster.objects.filter(country_code=country_code)
            state = models.StateMaster.objects.filter(state_code=state_code)
            if state is None or len(state) == 0:
                state = models.StateMaster.objects.create(
                    state_name=state_name, state_code=state_code, country=country[0])
                state.save()
        return render(request, 'country_import.html')
    else:
        return render(request, 'country_import.html')


# ==================================================


def privacy(request):
    return render(request, "../templates/privacy.html")


def refund(request):
    return render(request, "../templates/refund_and_cancellation.html")


def terms(request):
    return render(request, "../templates/terms_and_conditions.html")


class Support(APIView):

    def post(self, request):
        ctx = request.data
        send_feedback(ctx)
        return Response({"msg": "success"}, status=status.HTTP_200_OK)
