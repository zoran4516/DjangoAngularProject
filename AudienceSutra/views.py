from django.shortcuts import render, HttpResponseRedirect
from accounts.models import UserProfile
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from accounts.forms import UserProfileForm, UserProfileCompleteForm, UserCompleteForm
from accounts import models, serializers
from survey.models import Survey
from rest_framework.views import APIView


class UpdateProfilePic(APIView):

    def post(self, request):
        # import pdb
        # pdb.set_trace()
        user = models.UserProfile.objects.filter(user=request.user).order_by('-pk')
        profileImage_serializer = serializers.SurveySerializer(user, many=True)
        return Response(profileImage_serializer.data, status=status.HTTP_200_OK)


def charts(request):
    survey_list = Survey.objects.filter(creator=request.user.pk)
    return render(request, 'charts.html', {'survey_list': survey_list})


def home(request):
    return render(request, 'home.html')


def check_profile(request):
    # account_uid = SocialAccount.objects.filter(user_id=request.user.id, provider='google')
    if request.user.is_authenticated() is True:
        user_profile = UserProfile.objects.filter(user=request.user)
        if len(user_profile) > 0:
            user_profile = user_profile[0]
        else:
            user_profile = None

        if user_profile is None:
            user_profile = UserProfile.objects.create(user=request.user)
        user_type = user_profile.user_type

        if user_type == "Respondent" and request.user.is_superuser is False:
            # if user_profile.first_name is None:
            #     return HttpResponseRedirect("/respondent/intro")
            # elif user_profile.age is None:
            #     return HttpResponseRedirect("/signup/respondent/firstSurvey")
            # else:
            return HttpResponseRedirect("/respondent/profile")
        elif user_type == "Client" and request.user.is_superuser is False:
            return HttpResponseRedirect("/client/profile")
        elif request.user.is_superuser:
            return HttpResponseRedirect("/super/survey/list")
        else:
            # print("new social login/signup")
            return HttpResponseRedirect("/user/type")
    else:
        return HttpResponseRedirect("/")


@api_view(['GET'])
def get_logedin_user(request):
    user_profile = UserProfile.objects.get(user=request.user)
    user_profile_serializer = serializers.UserProfileSerializer(user_profile)
    data = user_profile_serializer.data
    data["super_user"] = request.user.is_superuser
    return Response(data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def set_account_type(request):
    if request.GET.get("user_type", None) is None:
        return render(request, 'user_type.html')
    else:
        user_type = request.GET.get("user_type")
        user_profile = UserProfile.objects.get(user=request.user)
        user_profile.user_type = user_type
        user_profile.save()
        if user_type == "Respondent":
            if user_profile.first_name is None:
                return HttpResponseRedirect("/respondent/intro")
            elif user_profile.age is None:
                return HttpResponseRedirect("/signup/respondent/firstSurvey")
            else:
                return HttpResponseRedirect("/respondent/profile")
        elif user_type == "Client":
            if user_profile.first_name is None:
                return HttpResponseRedirect("/client/intro")
            else:
                return HttpResponseRedirect("/client/profile")


@api_view(['GET', 'POST'])
def client_intro(request, id=None):
    countries = models.CountryMaster.objects.filter(is_active=True).order_by('country_name')
    user_profile = UserProfile.objects.get(user=request.user)
    img_profile = user_profile.profile_pic
    img_company = user_profile.company_logo
    if request.method == 'POST':
        # print("============ Client Intro ============")
        # print("************ Client POST  ************")
        if request.data.get("skip", None):
            # print("skip-1")
            form_class = UserProfileForm(request.POST, request.FILES, instance=user_profile)
            if form_class.is_valid():
                # print("valid-1")
                obj = form_class.save(commit=False)
                obj.save()
                form_class = UserProfileCompleteForm(instance=user_profile)
                context = {'form': form_class, 'skip': '1', 'company_src': img_company, 'countries': countries}
            else:
                # print("error-1")
                context = {'form': form_class, 'profile_src': img_profile, 'countries': countries}
            return render(request, 'client_intro.html', context=context)
        else:
            # print("skip-2")
            form_class = UserProfileCompleteForm(request.POST, request.FILES, instance=user_profile)
            if form_class.is_valid():
                # print("valid-2")
                obj = form_class.save(commit=False)
                obj.save()
                context = {'form': form_class, 'skip': '2', 'countries': countries}
            else:
                # print("error-2")
                context = {'form': form_class, 'skip': '1', 'company_src': img_company, 'countries': countries}
            return render(request, 'client_intro.html', context=context)
    else:
        # print("============ Client Intro ============")
        # print("************ Client GET   ************")

        if user_profile.first_name is None or user_profile.city is None or user_profile.state is None \
                or user_profile.pincode is None or user_profile.country is None:
            form_class = UserCompleteForm(instance=user_profile)
            context = {'form': form_class, 'profile_src': img_profile, 'countries': countries}
        elif user_profile.company_name is None or user_profile.email is None or user_profile.designation is None \
                or user_profile.address is None or user_profile.phone is None:
            form_class = UserProfileCompleteForm(instance=user_profile)
            context = {'form': form_class, 'skip': '1', 'company_src': img_company, 'countries': countries}
        else:
            form_class = UserCompleteForm(instance=user_profile)
            context = {'form': form_class, 'profile_src': img_profile,
                       'company_src': img_company, 'countries': countries}

        if id is None:
            context["profile"] = False
        else:
            context["profile"] = True
        return render(request, 'client_intro.html', context=context)


# =====================================


@api_view(['GET', 'POST'])
def respondent_intro(request):
    countries = models.CountryMaster.objects.filter(is_active=True).order_by('country_name')
    user_profile = UserProfile.objects.get(user=request.user)
    img_profile = user_profile.profile_pic
    # img_company = user_profile.company_logo
    if request.method == 'POST':
        if request.data.get("skip", None):
            # print("skip-1")
            form_class = UserProfileForm(request.POST, request.FILES, instance=user_profile)
            if form_class.is_valid():
                # print("valid-1")
                obj = form_class.save(commit=False)
                obj.save()
                # form_class = UserProfileCompleteForm(instance=user_profile)
                context = {'form': form_class, 'skip': '1',  'countries': countries}
            else:
                # print("error-1")
                context = {'form': form_class, 'profile_src': img_profile, 'countries': countries}
            return render(request, 'respondent_intro.html', context=context)

    else:
        # print("============ Client Intro ============")
        # print("************ Client GET   ************")

        if user_profile.first_name is None or user_profile.city is None or user_profile.state is None \
                or user_profile.pincode is None or user_profile.country is None:
            form_class = UserCompleteForm(instance=user_profile)
            context = {'form': form_class, 'profile_src': img_profile, 'countries': countries}

        else:
            form_class = UserCompleteForm(instance=user_profile)
            context = {'form': form_class, 'profile_src': img_profile, 'countries': countries}
        return render(request, 'respondent_intro.html', context=context)

# ==================================================


from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.shortcuts import render, redirect


def login(request):
    # import pdb
    # pdb.set_trace()
    if request.method == "POST":
        email = request.POST.get('login', None)
        password = request.POST.get('password', None)
        if email and password:
            user = authenticate(username=email, password=password)
            login(request, user)
            return redirect('/client/profile')
    return render(request, 'account/login.html')

#
# # ================================
# from django.shortcuts import render, redirect
# from django.http import HttpResponse, HttpResponseRedirect
# from django.contrib.auth.decorators import login_required
# from django.core.urlresolvers import reverse
# from django.contrib import messages
# import logging, traceback
# import hashlib
# import requests
# from random import randint
# from django.views.decorators.csrf import csrf_exempt
# from django.conf import settings
#
# def payment(request):
#     # import pdb
#     # pdb.set_trace()
#
#     data = {}
#     txnid = get_transaction_id()
#     hash_ = generate_hash(request, txnid)
#     hash_string = get_hash_string(request, txnid)
#     data["action"] = settings.PAYMENT_URL_TEST
#     data["amount"] = float(settings.PAID_FEE_AMOUNT)
#     data["productinfo"] = settings.PAID_FEE_PRODUCT_INFO
#     data["key"] = settings.KEY
#     data["txnid"] = txnid
#     data["hash"] = hash_
#     data["hash_string"] = hash_string
#     data["name"] = "{} {}".format(request.user.first_name, request.user.last_name)
#     data["email"] = request.user.email
#     data["phone"] = "9832175467"
#     data["service_provider"] = settings.SERVICE_PROVIDER
#     data["furl"] = request.build_absolute_uri(reverse("payment_failure"))
#     data["surl"] = request.build_absolute_uri(reverse("payment_success"))
#
#     return render(request, "payment.html", data)
#
#
# # generate the hash
# def generate_hash(request, txnid):
#     try:
#         # get keys and SALT from dashboard once account is created.
#         hash_string = get_hash_string(request, txnid)
#         generated_hash = hashlib.sha512(hash_string.encode('utf-8')).hexdigest().lower()
#         return generated_hash
#     except Exception as e:
#         # log the error here.
#         logging.getLogger("error_logger").error(traceback.format_exc())
#         return None
#
#
# # create hash string using all the fields
# def get_hash_string(request, txnid):
#     hash_string = settings.KEY+"|"+txnid+"|"+str(float(settings.PAID_FEE_AMOUNT))+"|"+settings.PAID_FEE_PRODUCT_INFO+"|"
#     hash_string += "{} {}".format(request.user.first_name, request.user.last_name)+"|"+request.user.email+"|"
#     hash_string += "||||||||||"+settings.SALT
#
#     return hash_string
#
#
# # generate a random transaction Id.
# def get_transaction_id():
#     hash_object = hashlib.sha256(str(randint(0, 9999)).encode("utf-8"))
#     # take approprite length
#     txnid = hash_object.hexdigest().lower()[0:32]
#     return txnid
#
#
# # no csrf token require to go to Success page.
# # This page displays the success/confirmation message to user indicating the completion of transaction.
# @csrf_exempt
# def payment_success(request):
#     data = {"msg": "Success"}
#     return render(request, "info.html", data)
#
#
# # no csrf token require to go to Failure page. This page displays the message and reason of failure.
# @csrf_exempt
# def payment_failure(request):
#     data = {"msg": "Failed"}
#     return render(request, "info.html", data)
#
