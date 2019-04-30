from django.shortcuts import render
from accounts.models import *
from accounts.serializers import UserProfileSerializer

from rest_framework.viewsets import ModelViewSet
from survey.serializers import *
# from rest_framework import generics

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
import datetime
from accounts.models import UserProfile
from survey.models.ProfileQuestionMaster import DigitalLaser, RespondentSurveyAssign,EstimationQuestionMaster,\
            EstimationQuestionOptionMaster, EstimationQuestionAnswersHead, EstimationQuestionAnswers
from django.db.models import Q
from django.core.exceptions import ValidationError
from django.db.models import Count
import razorpay
from django.http import JsonResponse
# client1 = razorpay.Client(auth=("rzp_live_Mn0Xmp6gMCxQ5s", "9J1U5yEt2AOadxs6DpDMkNpm"))
client1 = razorpay.Client(auth=("rzp_test_vy04U28lNc4ieA", "hPdXUSuUJTvsgQ8wYTvN8M5Q"))
client1.set_app_details({"title" : "Django", "version" : "1.11"})
class QuestionViewSet(ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer


@api_view(['GET', 'POST'])
def survey_list(request):
    if request.method == 'GET':
        surveys = Survey.objects.all()
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        surveyId = request.data.get("surveyId", None)
        if surveyId is None or surveyId == 0:
            survey_name = Survey.objects.filter(name__icontains=request.data.get("name"))
            if survey_name.exists():
                return Response({"error": "duplicate title!"}, status=status.HTTP_409_CONFLICT)
            else:
                request.data["display_by_question"] = request.data.pop("displayByQuestion")
                request.data["need_logged_user"] = request.data.pop("needLoggedUser")
                request.data["cost"] = float(request.data.pop("cost"))
                request.data["creator"] = request.user.pk

                serializer = SurveySerializer(data=request.data)
                if serializer.is_valid():
                    val= serializer.save()
                    if val is not None:
                        head = EstimationQuestionAnswersHead.objects.get(head_id=request.data['head'])
                        head.Survey = val.pk
                        head.save()
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            survey_instance = Survey.objects.get(id=surveyId)
            request.data["display_by_question"] = request.data.pop("displayByQuestion")
            request.data["need_logged_user"] = request.data.pop("needLoggedUser")
            request.data["updated_by"] = request.user.pk
            request.data.pop("creator")
            request.data.pop("template")

            serializer = SurveySerializer(instance=survey_instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_survey(request, id):
    if request.method == 'GET':
        surveys = Survey.objects.filter(id=id)
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_client_survey(request, id):
    if request.method == 'GET':
        if request.user.is_superuser:
            surveys = Survey.objects.filter(is_deleted=False).order_by('-id')
        else:
            surveys = Survey.objects.filter(is_deleted=False, creator=request.user.id).order_by('-id')
        # surveys = Survey.objects.filter(creator=request.user.id, status__in=['Inactive', 'Draft'])
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def question_list(request):
    if request.method == 'GET':
        questions = Question.objects.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = QuestionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_survey_question(request, id):
    if request.method == 'GET':
        questions = Question.objects.filter(survey=id).order_by('id')
        # serializer = QuestionSerializer(questions, many=True)
        serializer = QuestionSerializerList(questions, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def response_list(request):
    if request.method == 'GET':
        response = Responses.objects.all()
        serializer = ResponseSerializer(response, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # import pdb
        # pdb.set_trace()
        # survey_instance = Survey.objects.get(id=request.data["survey"])
        # if Responses.objects.filter(user=request.user.id, survey=survey_instance).exists():
        #     return Response({"msg": "complete"}, status=status.HTTP_201_CREATED)
        # else:
        surveyLength = request.data['totalLength']
        surveyTime = request.data['totalTime']
        minTime = 10 * surveyLength
        maxTime = 60 * surveyLength
        extraQuestionLength = 0
        incentive = 0
        request.data["user"] = request.user.id
        serializer = ResponseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            laser_len = DigitalLaser.objects.filter(user=request.user).count()
            if laser_len > 0:
                laser = DigitalLaser.objects.get(user=request.user)
            else:
                laser = DigitalLaser.objects.create(user=request.user)
            if surveyLength <= 15:
                incentive = 100
            elif 15 < surveyLength <= 20:
                extraQuestionLength = surveyLength-15
                incentive = 100 + (extraQuestionLength * 5)
            elif surveyLength > 20:
                extraQuestionLength = surveyLength-20
                incentive = 100 + (extraQuestionLength * 10)
            if minTime < surveyTime <= maxTime:
                incentive = incentive + 10
            laser.credit_point = laser.credit_point + incentive
            laser.save()

            assign_survey = RespondentSurveyAssign.objects.get(survey=request.data['survey'])
            assign_survey.status = 'Taken'
            assign_survey.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def answer_list(request):
    if request.method == 'GET':
        questions = Answer.objects.all()
        serializer = AnswerSerializer(questions, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        serializer = AnswerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_response(request, id):
    if request.method == 'GET':
        response = Responses.objects.filter(id=id)
        serializer = ResponseSerializer(response, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_survey_responses(request, id):
    if request.method == 'GET':
        responses = Responses.objects.filter(survey=id)
        serializer = ResponseSerializer(responses, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_response_answers(request, id):
    if request.method == 'GET':
        answers = Answer.objects.filter(response=id)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def user_list(request):
    if request.method == 'GET':
        user = User.objects.all()
        serializer = UserSerializer(user, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        # serializer = UserSerializer(data=request.data)
        serializer = UserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def update_user(request, id):
    if request.method == 'PATCH':
        # user = User.objects.get(id=id)
        # serializer = UserSerializer(user, data=request.data)
        profile_instance = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(instance=profile_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def client_profile_list(request):
    if request.method == 'GET':
        client = ClientProfile.objects.all()
        serializer = ClientProfileSerializer(client, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ClientProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PATCH'])
def respondent_profile_list(request):
    if request.method == 'GET':
        # respondent = RespondentProfile.objects.all()
        respondent = UserProfile.objects.filter(user_type='Respondent')
        serializer = RespondentProfileSerializer(respondent, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':

        # answerList = [{"user": request.user.pk, "question_id": item['id'],
        #                "question_desc": item['question'],
        #                "answer_desc": item['answer']} for item in request.data]
        answerList = []
        for item in request.data:
            if 'answer' in item:
                pass
            else:
                item['answer'] = ""
            answerList.append({
                "user": request.user.pk, "question_id": item['id'],
                "question_desc": item['question'],
                "answer_desc": item['answer']
            })

        if ProfileQuestionAnswers.objects.filter(user=request.user).exists():
            for answer in answerList:
                if answer.get("question_id", None):
                    if ProfileQuestionAnswers.objects.filter(
                            user=request.user, question_id=answer["question_id"]).exists():
                        answer_instance = ProfileQuestionAnswers.objects.get(
                            user=request.user, question_id=answer["question_id"])
                        serializer = ProfileQuestionAnswerSerializer(instance=answer_instance, data=answer)
                        if serializer.is_valid():
                            serializer.save()
                        else:
                            pass
                    else:
                        serializer = ProfileQuestionAnswerSerializer(data=answer)
                        if serializer.is_valid():
                            serializer.save()
                        else:
                            pass
            return Response({"message": "OK"}, status=status.HTTP_201_CREATED)
        else:
            serializer = ProfileQuestionAnswerSerializer(data=answerList, many=True)
            if serializer.is_valid():
                profile = UserProfile.objects.get(user=request.user)
                laser_len = DigitalLaser.objects.filter(user=request.user).count()
                if laser_len > 0:
                    laser = DigitalLaser.objects.get(user=request.user)
                else:
                    laser = DigitalLaser.objects.create(user=request.user)
                # laser = DigitalLaser.objects.create(user=request.user)
                name = profile.first_name
                if profile.middle_name:
                    name = name + ' ' + profile.middle_name
                if profile.last_name:
                    name = name + ' ' + profile.last_name
                location = profile.city
                # Dob from profile and Request
                
                name_in_survey = ''
                location_in_survey = ''
                for item in answerList:
                    if item['question_desc']:
                        if 'name' in item['question_desc'] or 'Name' in item['question_desc']:
                            name_in_survey = item['answer_desc']
                        if 'city' in item['question_desc'] or 'City' in item['question_desc']:
                            location_in_survey = item['answer_desc']
                if name_in_survey.lower() == name.lower():
                    laser.credit_point = 20
                if location_in_survey.lower() == location.lower():
                    laser.credit_point = laser.credit_point + 20
                laser.credit_point = laser.credit_point + 100
                laser.save()

                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'PATCH':
        # user = User.objects.get(id=request.data.get('user'))
        profile_instance = UserProfile.objects.get(user=request.user)
        serializer = RespondentProfileSerializer(instance=profile_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PATCH'])
def survey_cost(request):
    if request.method == 'GET':
       pass

    elif request.method == 'POST':
        cost = 0
        answerList = []
        estimation_head = EstimationQuestionAnswersHead.objects.create()
        estimation_head.cost = request.data[0]['cost']
        estimation_head.save()
        for item in request.data:
            if 'answer' in item:
                item['answer']
            else:
                item['answer'] = ""
            answerList.append({
                "head": estimation_head.pk,
                "question_id": item['id'],
                "question_desc": item['question'],
                "answer_desc": item['answer']
            })

            # answerList.append({
            #     "user": request.user.pk, "question_id": item['id'],
            #     "question_desc": item['question'],
            #     "answer_desc": item['answer']
            # })
        # for ans in answerList:
        #     if ans['question_desc'].lower() == 'Survey response Size'.lower():
        #         cost = cost + 0
        #     if ans['question_desc'].lower() == 'Age'.lower():
        #         cost = cost + 50
        #     if ans['question_desc'].lower() == 'Gender'.lower():
        #         if ans['answer_desc'].lower() == 'All'.lower():
        #             cost = cost +0
        #         else:
        #             cost = cost + 50
        #     if ans['question_desc'].lower() == 'Relationship Status'.lower():
        #         if ans['answer_desc'].lower() == 'Any status'.lower():
        #             cost = cost +0
        #         elif ans['answer_desc'].lower() == '4 status'.lower():
        #             cost = cost + 20
        #         elif ans['answer_desc'].lower() == '3 status'.lower():
        #             cost = cost + 30
        #         elif ans['answer_desc'].lower() == '2 status'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '1 status'.lower():
        #             cost = cost + 75
        #     if ans['question_desc'].lower() == 'Parental Status'.lower():
        #         cost = cost + 30
        #     if ans['question_desc'].lower() == 'Age of children'.lower():
        #         cost = cost + 30
        #     if ans['question_desc'].lower() == 'City'.lower():
        #         if ans['answer_desc'].lower() == '1L+'.lower():
        #             cost = cost + 30
        #         elif ans['answer_desc'].lower() == '16'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '8'.lower():
        #             cost = cost + 75
        #         elif ans['answer_desc'].lower() == '4'.lower():
        #             cost = cost + 150
        #         elif ans['answer_desc'].lower() == '1'.lower():
        #             cost = cost + 300
        #     if ans['question_desc'].lower() == 'State'.lower():
        #         if ans['answer_desc'].lower() == 'All'.lower():
        #             cost = cost + 0
        #         elif ans['answer_desc'].lower() == 'Custom selection'.lower():
        #             cost = cost + 100
        #         elif ans['answer_desc'].lower() == 'v'.lower():
        #             cost = cost + 300
        #     if ans['question_desc'].lower() == 'Education'.lower():
        #         if ans['answer_desc'].lower() == 'Any'.lower():
        #             cost = cost + 0
        #         else:
        #             cost = cost + 100
        #     if ans['question_desc'].lower() == 'Employment'.lower():
        #         if ans['answer_desc'].lower() == 'Any'.lower():
        #             cost = cost + 0
        #         else:
        #             cost = cost + 100
        #     if ans['question_desc'].lower() == 'Language spoken'.lower():
        #         if ans['answer_desc'].lower() == 'Any'.lower():
        #             cost = cost + 0
        #         else:
        #             cost = cost + 50
        #     if ans['question_desc'].lower() == 'No of family members'.lower():
        #         if ans['answer_desc'].lower() == 'Any'.lower():
        #             cost = cost + 0
        #         else:
        #             cost = cost + 50
        #     if ans['question_desc'].lower() == 'Est HH income'.lower():
        #         if ans['answer_desc'].lower() == 'Below 10,000'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '10,001 - 25,000'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '25,001 - 50,000'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '50,000 - 1,00,000'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '1,00,001 - 2,50,000'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '2,50,001 - 5,00,000'.lower():
        #             cost = cost + 150
        #         elif ans['answer_desc'].lower() == '5,00,001 - 10,00,000'.lower():
        #             cost = cost + 150
        #         elif ans['answer_desc'].lower() == 'above 10,00,000'.lower():
        #             cost = cost + 300
        #     if ans['question_desc'].lower() == 'Earning members in the family (including self)'.lower():
        #         if ans['answer_desc'].lower() == '1'.lower():
        #             cost = cost + 0
        #         elif ans['answer_desc'].lower() == '2'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == '2+'.lower():
        #             cost = cost + 100
        #     if ans['question_desc'].lower() == 'Current position at present employment'.lower():
        #         if ans['answer_desc'].lower() == 'Trainee'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == 'Junior Team Member'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == 'Middle Management'.lower():
        #             cost = cost + 50
        #         elif ans['answer_desc'].lower() == 'Senior Mangement'.lower():
        #             cost = cost + 150
        #         elif ans['answer_desc'].lower() == 'Top Executive'.lower():
        #             cost = cost + 50
        #     if ans['question_desc'].lower() == 'Work sector'.lower():
        #         cost = cost + 50
        #     if ans['question_desc'].lower() == 'Ownership at home'.lower():
        #         cost = cost + 50

        for ans in answerList:
            estimation = EstimationQuestionAnswers()
            estimation.head = ans['head']
            estimation.question_id = ans['question_id']
            estimation.question_desc = ans['question_desc']
            estimation.answer_desc = ans['answer_desc']
            estimation.save()

        context = {'head':estimation_head.pk,'cost':estimation_head.cost}
        return Response(context, status=status.HTTP_201_CREATED)





@api_view(['POST'])
def login_validator(request):
    if request.method == 'POST':
        email=request.data['email']
        password=request.data['password']
        user=User.objects.get(email=email)
        if user.password == password:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'password': password}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login_google(request):
    if request.method == 'POST':
        email=request.data['email']
        user=User.objects.get(email=email)
        if user:
            serializer = UserSerializer(user, many=False)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response({'password': password}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'], ['GET'])
def question_submit(request):
    if request.method == 'POST':
        # import pdb
        # pdb.set_trace()

        if len(request.data) == 0:
            return Response({"msg": "empty"}, status=status.HTTP_200_OK)

        surveyId = request.data[0].get("survey", None)
        question_instance = Question.objects.filter(survey=surveyId)

        if question_instance.exists():
            # print("==============update===========")
            for question in request.data:
                question["dependent_question"] = question.pop("dependentQuestion")
                question["dependent_option"] = question.pop("dependentOption")
                if question.get("id", None):
                    question_instance = Question.objects.get(id=question["id"])
                    serializer = QuestionSerializer(instance=question_instance, data=question)
                else:
                    serializer = QuestionSerializer(data=question)

                if serializer.is_valid():
                    try:
                        serializer.save()
                    except ValidationError as er:
                        return Response({"error": er}, status=status.HTTP_409_CONFLICT)
                else:
                    pass
            questions = Question.objects.filter(survey=surveyId).order_by('id')
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            # print("====================create===================")
            questions = request.data
            for question in questions:
                question["dependent_question"] = question.pop("dependentQuestion")
                question["dependent_option"] = question.pop("dependentOption")
                serializer = QuestionSerializer(data=question)
                if serializer.is_valid():
                    serializer.save()
            questions = Question.objects.filter(survey=surveyId).order_by('id')
            serializer = QuestionSerializer(questions, many=True)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    # elif request.method == "GET":
    #
    #
    #     if Question.objects.get(id=questionId).exists():
    #         question_instance = Question.objects.get(id=questionId)
    #         question_instance.delete()
    #     # questions = Question.objects.filter(survey=query_set.get('survey')).order_by('id')
    #     # serializer = QuestionSerializer(questions, many=True)
    #     # return Response(serializer.data, status=status.HTTP_201_CREATED)
    #     return Response(status=status.HTTP_200_OK)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def delete_question_submit(request, questionId=None):
    if Question.objects.filter(id=questionId).exists():
        question_instance = Question.objects.get(id=questionId)
        question_instance.delete()

    # serializer = QuestionSerializer(questions, many=True)
    # return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response({"message": "success!"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def tabs_submit(request):
    if request.method == 'POST':
        tabs = request.data
        surveyId = 0
        tabId = 0
        for tab in tabs:
            surveyId = tab['questions'][0]['survey']
            tabId = tab['questions'][0]['tabs']
            endStatus = "True" if tab['end'] else "False"
            tabJSON = {'surveyId': surveyId, 'number': tabId, 'end': endStatus}
            ser = TabSerializer(data=tabJSON)
            if ser.is_valid():
                    ser.save()
            for question in tab['questions']:
                serializer = QuestionSerializer(data=question)
                if serializer.is_valid():
                    serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_tabs(request):
    if request.method == 'GET':
        tabs = Tabs.objects.all()
        serializer = TabSerializer(tabs, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_all_survey_tabs(request, id):
    if request.method == 'GET':
        tabs = Tabs.objects.filter(surveyId=id)
        serializer = TabSerializer(tabs, many=True)
        return Response(serializer.data)


@api_view(['GET', 'POST'])
def template_brand_list(request):
    if request.method == 'GET':
        template = TemplateBrand.objects.all()
        serializer = TemplateBrandSerializer(template, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TemplateBrandSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def template_competition_list(request):
    if request.method == 'GET':
        template = TemplateCompetition.objects.all()
        serializer = TemplateCompetitionSerializer(template, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TemplateCompetitionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def template_communication_list(request):
    if request.method == 'GET':
        template = TemplateCommunication.objects.all()
        serializer = TemplateCommunicationSerializer(template, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TemplateCommunicationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def template_product_list(request):
    if request.method == 'GET':
        template = TemplateProduct.objects.all()
        serializer = TemplateProductSerializer(template, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TemplateProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def template_custom_list(request):
    if request.method == 'GET':
        template = TemplateCustom.objects.all()
        serializer = TemplateCustomSerializer(template, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = TemplateCustomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# ================================================================================


from rest_framework.views import APIView


class UserDetail(APIView):
    def get(self, request, id=None):
        # user = User.objects.get(id=id)
        # user_profile = UserProfile.objects.get(user=user)
        user_profile = UserProfile.objects.get(user=request.user)
        serializer = UserProfileSerializer(user_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RespondentFirstSurvey(APIView):
    def get(self, request):
        profile_question = ProfileQuestionMaster.objects.all().order_by('sort_order')
        serializer = ProfileQuestionMasterListSerializer(profile_question, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class ClientEstimate(APIView):
    def get(self, request, surveyID=None):
        # surveyID = request.GET.get("surveyID", None)
        total_cost=0
        if surveyID == '0':
            surveyID = None
        context = {'survey': surveyID}
        profile_question = EstimationQuestionMaster.objects.all().order_by('sort_order')
        serializer = EstimationQuestionMasterListSerializer(profile_question, many=True, context=context)
        if surveyID:
            survey = Survey.objects.get(pk=surveyID)
            total_cost = survey.cost
        return Response({"totalCost": total_cost, "data": serializer.data}, status=status.HTTP_200_OK)


@api_view(['POST', 'PATCH'])
def SurveyImage(request):
    if request.method == 'PATCH':
        if request.data.get('is_status', None):
            survey_instance = Survey.objects.get(id=request.data.get('id'))
            survey_instance.status = request.data.get('status')
            survey_instance.published_date = datetime.datetime.now()
            survey_instance.save()
            data = {'status': survey_instance.status}
            return Response(data, status=status.HTTP_202_ACCEPTED)
        else:
            survey_instance = Survey.objects.get(id=request.data.get('survey'))
            serializer = SurveyImageSerializer(instance=survey_instance, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_client_active_survey(request, id):
    if request.method == 'GET':
        if request.user.is_superuser:
            surveys = Survey.objects.filter(status='Active').order_by('-id')
        else:
            surveys = Survey.objects.filter(creator=request.user.id, status='Active').order_by('-id')
        serializer = SurveySerializer(surveys, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def get_survey_with_question(request, id):
    if request.method == 'GET':
        surveys = Survey.objects.get(id=id)
        serializer = SurveyListSerializer(surveys, context={'request': request})
        return Response(serializer.data)


# Respondent survey

@api_view(['POST'])
def respondent_survey_answer(request):
    if request.method == 'POST':
        # import pdb
        # pdb.set_trace()

        answerList = [{"user": request.user.pk, "question_id": item['id'],
                       "question_desc": item['text'],
                       "answer_desc": item['answer']} for item in request.data]

        if ProfileQuestionAnswers.objects.filter(user=request.user).exists():
            for answer in answerList:
                if answer.get("question_id", None):
                    answer_instance = ProfileQuestionAnswers.objects.get(
                        user=request.user, question_id=answer["question_id"])
                    serializer = ProfileQuestionAnswerSerializer(instance=answer_instance, data=answer)
                    if serializer.is_valid():
                        serializer.save()
                    else:
                        pass
            return Response({"message": "OK"}, status=status.HTTP_201_CREATED)
        else:
            serializer = ProfileQuestionAnswerSerializer(data=answerList, many=True)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def response_survey_status(request, survey):
    if request.method == 'GET':
        survey_instance = Survey.objects.get(id=survey)
        if Responses.objects.filter(user=request.user.id, survey=survey_instance).exists():
            return Response({"msg": "complete"}, status=status.HTTP_200_OK)
        else:
            return Response({"msg": "first"}, status=status.HTTP_200_OK)


# ==============================================================


@api_view(['GET'])
def survey_by_client(request):
    if request.method == 'GET':
        users = UserProfile.objects.filter(user_type='Client')
        serializer = ClientSurveySerializer(users, many=True)
        listOfUser = [item for item in serializer.data if item['surveys'] != "remove"]
        return Response(listOfUser, status=status.HTTP_200_OK)


@api_view(['GET'])
def survey_search_respondent(request, surveyId):
    if request.method == 'GET':
        searchStr = request.GET.get("search")
        users = ProfileQuestionAnswers.objects.filter(answer_desc__icontains=searchStr)
        usersList = [user.user_id for user in users]
        usersList = list(set(usersList))
        serializer = RespondentSerializer(usersList, many=True, context={'survey': surveyId})
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_criteria_for_respondent(request):
    if request.method == 'GET':
        # searchStr = request.GET.get("search")
        users = ProfileQuestionAnswers.objects.values('answer_desc').distinct()
        serializer = RespondentSelectionCriteriaSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def search_profile_of_respondent(request, id):
    if request.method == 'GET':
        # searchStr = request.GET.get("search")
        users = ProfileQuestionAnswers.objects.filter(user=id)
        serializer = RespondentSelectionCriteriaSerializerList(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET', 'POST'])
def survey_assign_respondent(request):
    if request.method == 'POST':
        # import pdb
        # pdb.set_trace()

        # assignList = [{"survey": request.data.get("survey"), "user": user}
        #               for user in request.data.get("users")]

        assignList = [{"survey": request.data.get("survey"), "user": user}
                      for user in request.data.get("users")["add"]]

        for user_id in request.data.get("users")["remove"]:
            survey = RespondentSurveyAssign.objects.filter(
                user=user_id, survey=request.data.get("survey"))
            if survey.exists():
                for item in survey:
                    item.delete()

        for assign in assignList:
            # serializer = AssignSurveySerializer(data=assignList, many=True)
            survey = RespondentSurveyAssign.objects.filter(
                user=assign["user"], survey=assign["survey"])
            if survey.exists():
                pass
            else:
                serializer = AssignSurveySerializer(data=assign)
                if serializer.is_valid():
                    serializer.save()
                else:
                    pass
        return Response({"msg": "OK"}, status=status.HTTP_200_OK)
    # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_assign_survey(request, id):
    if request.method == 'GET':
        survey = Survey.objects.get(id=id)
        survey_data = {
            "name": survey.name,
            "description": survey.description,
            "img_src": "/media/{0}".format(survey.survey_img.name)
        }
        return Response(survey_data)


# =====================


@api_view(['GET'])
def get_respondent_active_survey(request, id):
    if request.method == 'GET':
        # ...
        # survey_instance = Survey.objects.get(id=id)
        # if Responses.objects.filter(user=request.user.id, survey=survey_instance).exists():
        #     pass
        # ...

        assigns = RespondentSurveyAssign.objects.filter(user=request.user.id, status='Assigned')
        surveys_id = [assign.survey for assign in assigns]
        surveys_id = list(set(surveys_id))
        surveys = Survey.objects.filter(id__in=surveys_id)
        # surveys = Survey.objects.filter(creator=request.user.id)
        serializer = SurveySerializer(surveys, many=True)

        if ProfileQuestionAnswers.objects.filter(user=request.user).exists():
            profile_survey = {"flag": True, "img": ""}
        else:
            user = UserProfile.objects.get(user=request.user)
            profile_survey = {"flag": False, "img": user.profile_pic.name}

        data = {
            "active_survey": serializer.data,
            "profile_survey": profile_survey
        }
        return Response(data)


@api_view(['GET'])
def get_respondent_credit_point(request):
    if request.method == 'GET':
        if DigitalLaser.objects.filter(user=request.user).exists():
            credit_points = DigitalLaser.objects.get(user=request.user)
            serializer = DigitalLaserSerializer(credit_points)
            data = serializer.data
        else:
            user_profile = UserProfile.objects.get(user=request.user)
            user_serializer = UserProfileSerializer(user_profile)
            data = {
                "credit_point": 0,
                "debit_point": 0,
                "description": "---",
                "userInfo": user_serializer.data
            }
        return Response(data, status=status.HTTP_200_OK)


# ======================


@api_view(['GET'])
def survey_delete(request, surveyId):
    if Survey.objects.filter(id=surveyId).exists():
        survey_instance = Survey.objects.get(id=surveyId)
        survey_instance.is_deleted = True
        survey_instance.save()
    return Response({"message": "success!"}, status=status.HTTP_200_OK)

@api_view(['GET'])
def survey_pay_status(request, paymentId=None):
    surveyId = request.GET.get('surveyId')
    PAYMENT_ID = request.GET.get('paymentId')
    payment = client1.payment.fetch(PAYMENT_ID)
    success = ''
    amount = float(payment['amount'])
    amount = int(amount) / 100
    if payment['status'] == 'authorized':
        success = 'Received payement of Rs.{} against payment id: {}'.format(amount, payment['id'])
    if surveyId:
        survey_instance = Survey.objects.get(id=surveyId)
        survey_instance.status = 'Paid'
        survey_instance.save()
    return JsonResponse({"data":success})


@api_view(['GET'])
def survey_pay(request, surveyId):
    if Survey.objects.filter(id=surveyId).exists():
        user = UserProfile.objects.get(user=request.user)
    survey_instance = Survey.objects.get(id=surveyId)
    description = ''
    if survey_instance.cost:
        amount = int(survey_instance.cost) * 100
    else:
        amount = 100
    # description = 'Paid by {} for survey {}'.format(user.first_name, survey_instance.name)
    context = {"options":{
        "key": "rzp_test_vy04U28lNc4ieA",
        "amount": amount,
        "name": "Merchant Name",
        "currency": "INR",
        "surveyId" : surveyId
    }}

    return render(request, 'survey/payment.html', context=context)
    # if Survey.objects.filter(id=surveyId).exists():
    #     user = UserProfile.objects.get(user=request.user)
    #     import pdb
    #     pdb.set_trace()
    #     pay = client1.payment.all()
    #     survey_instance = Survey.objects.get(id=surveyId)
    #     if survey_instance.cost:
    #         amount = int(survey_instance.cost)
    #     else:
    #         amount = 0
    #     context = {"options":{
    #         "key": "rzp_test_vy04U28lNc4ieA",
    #         "amount": amount,
    #         "name": "Merchant Name",
    #         "currency": "INR"
    #     }}
    #     return render(request, 'survey/payment.html', context=context)
    #     c_data = {
    #         "amount": amount,
    #         "currency": "INR",
    #         "receipt": 'fgffg',
    #         "payment_capture": 1,
    #     }
    #     client1.order.create(data=c_data)
    #     DATA = {
    #         "customer": {
    #             "email": user.email
    #         },
    #         "type": "link",
    #         "amount": amount,
    #         "currency": "INR",
    #         "description": "Payment link for this purpose - xyz"
    #     }
    #     client1.invoice.create(data=DATA)
    #     # survey_instance.status = 'Paid'
    #     # survey_instance.save()
    # return Response({"message": "success!"}, status=status.HTTP_200_OK)



@api_view(['GET'])
def bind_ans_on_dropdown(request):
    if request.method == 'GET':
        # print("Hi, Are you there?")
        gender = ProfileQuestionMaster.objects.get(question__icontains="What is your gender")
        answers_list = ProfileQuestionOptionMaster.objects.filter(question=gender)
        serializer = GenderSerializer(answers_list, many=True)

        state_list = []
        states = UserProfile.objects.filter(user_type="Respondent").values_list('state')
        states = set(list(states))
        for item in states:
            try:
                state = StateMaster.objects.get(state_id=int(item[0]))
                state_dict = {"state_id": state.state_id, "state_name": state.state_name}
                state_list.append(state_dict)
            except StateMaster.DoesNotExist:
                continue

        cities = UserProfile.objects.filter(user_type="Respondent").values_list('city')
        cities = set(list(cities))
        cities = [{"city_name": i[0]} for i in cities]
        context = {"gender": serializer.data, "states": state_list, "cities": cities}
        return Response(context)


@api_view(['POST'])
def search_respondent(request):
    if request.method == 'POST':
        # print("======================================================================")
        # print("Hi, Are you there?")
        survey = request.POST.get("survey", None)
        gender = request.POST.get("gender", None)
        state = request.POST.get("state", None)
        city = request.POST.get("city", None)
        users = ProfileQuestionAnswers.objects.filter(answer_desc__icontains=gender)
        users_list = [user.user_id for user in users]
        users_list = list(set(users_list))
        serializer = RespondentSerializer(users_list, many=True, context={'survey': survey})
        return Response(serializer.data, status=status.HTTP_200_OK)


class SearchRespondent(APIView):

    def post(self, request):
        survey = request.data.get("survey", None)
        gender = request.data.get("gender", None)
        state = request.data.get("state", None)
        city = request.data.get("city", None)
        age = request.data.get("age", None)
        users = []
        if gender is not None and gender != '':
            users_answer = ProfileQuestionAnswers.objects.filter(answer_desc__icontains=gender)
            users = [user.user_id for user in users_answer]
            users = UserProfile.objects.filter(user_id__in=users)

        if state is not None and state != '':
            if len(users) > 0:
                users = users.filter(state=state)
            else:
                users = UserProfile.objects.filter(state=state)

        if city is not None and city != '':
            if len(users) > 0:
                users = users.filter(city__icontains=city)
            else:
                users = UserProfile.objects.filter(city__icontains=city)

        if age is not None and age != '':
            age = age.split('_')
            age_range = [str(_x) for _x in range(int(age[0]), int(age[1]) + 1)]
            if len(users) > 0:
                my_users = [user.pk for user in users]
                profile_answers = ProfileQuestionAnswers.objects.filter(
                    user_id__in=my_users, answer_desc__in=age_range)
            else:
                profile_answers = ProfileQuestionAnswers.objects.filter(
                    answer_desc__in=age_range)
            users = [user.user_id for user in profile_answers]
            users = UserProfile.objects.filter(user_id__in=users)

        users_id = [user.user_id for user in users]
        users_list = list(set(users_id))
        serializer = RespondentSerializer(users_list, many=True, context={'survey': survey})
        return Response(serializer.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def assigned_survey_report(request):
    if request.method == 'GET':
        assigned_survey = RespondentSurveyAssign.objects.filter(status="Assigned")
        surveys = []
        for _x in assigned_survey:
            try:
                assigned_survey = Survey.objects.get(pk=_x.survey, is_deleted=False)
                survey_assign_user = UserProfile.objects.get(user_id=_x.user)
                survey_creator_user = UserProfile.objects.get(user_id=assigned_survey.creator)
                assigned_survey.__dict__["assign_user"] = survey_assign_user
                assigned_survey.__dict__["creator_user"] = survey_creator_user
                surveys.append(assigned_survey)
            except Survey.DoesNotExist:
                continue
            except UserProfile.DoesNotExist:
                continue
        serializer = AssignedSurveySerializer(surveys, many=True)
        return Response(serializer.data)


@api_view(['GET'])
def total_survey_report(request):
    if request.method == 'GET':
        total, assign, taken = 0, 0, 0
        # total_survey = Survey.objects.filter(status="Active")
        # total = total_survey.count()
        # total_assigned_survey = RespondentSurveyAssign.objects.all(status="Assigned")
        # assign = total_survey.filter(pk__in=assign_survey)
        context = {"total": 20, "assign": 10, "taken": 5}
        return Response(context)


class StateWiseRespondent(APIView):

    @staticmethod
    def get(request, surveyId):
        list_of_state = []
        assigned_respondent = RespondentSurveyAssign.objects.filter(survey=surveyId)
        assigned_respondent = [_x.user for _x in assigned_respondent]
        state_based_respondents = UserProfile.objects.filter(
            user_id__in=assigned_respondent,
            user_type="Respondent").values(
            'state').annotate(count=Count('user'))
        for x_state in state_based_respondents:
            try:
                state = StateMaster.objects.get(state_id=x_state["state"])
                x_state["state"] = replace_state(state.state_name)
                list_of_state.append(x_state)
            except StateMaster.DoesNotExist:
                continue

        """ GENDER BASE VIZ """
        list_of_gender = []
        gender_based_respondents = UserProfile.objects.filter(
            user_id__in=assigned_respondent, user_type="Respondent").values(
            'gender').annotate(count=Count('user'))
        for x_gender in gender_based_respondents:
            if x_gender["gender"] == "Male":
                list_of_gender.append({"name": "Male", "y": x_gender["count"]})
            elif x_gender["gender"] == "Female":
                list_of_gender.append({"name": "Female", "y": x_gender["count"]})
            else:
                list_of_gender.append({"name": "Others", "y": x_gender["count"]})

        # """ AGE BASE VIZ """
        list_of_age = []
        list_of_age_10_17 = []
        list_of_age_18_25 = []
        list_of_age_26_40 = []
        list_of_age_41_80 = []
        age_based_respondents = ProfileQuestionAnswers.objects.filter(
            question_desc__icontains='What is your age',user__in=assigned_respondent)
        for item in age_based_respondents:
            if int(item.answer_desc) <= 17:
                list_of_age_10_17.append(item.answer_desc)
            if int(item.answer_desc) > 17 and int(int(item.answer_desc) <= 25):
                list_of_age_18_25.append(item.answer_desc)
            if int(item.answer_desc) > 25 and int(int(item.answer_desc) <= 40):
                list_of_age_26_40.append(item.answer_desc)
            if int(item.answer_desc) > 40 and int(int(item.answer_desc) <= 80):
                list_of_age_41_80.append(item.answer_desc)
        list_of_age.append({"name": "10-17", "y": len(list_of_age_10_17)})
        list_of_age.append({"name": "18-25", "y": len(list_of_age_18_25)})
        list_of_age.append({"name": "26-40", "y": len(list_of_age_26_40)})
        list_of_age.append({"name": "41-80", "y": len(list_of_age_41_80)})

        # for x_age in age_based_respondents:
        #     if x_age["gender"] == "Male":
        #         list_of_age.append({"name": "Male", "y": x_age["count"]})
        #     elif x_age["gender"] == "Female":
        #         list_of_age.append({"name": "Female", "y": x_age["count"]})
        #     else:
        #         list_of_age.append({"name": "Others", "y": x_age["count"]})

        context = {"state": list_of_state, "gender": list_of_gender, "age": list_of_age}
        return Response(context, status=status.HTTP_200_OK)


def replace_state(state_name):
    if state_name == "Andhra Pradesh":
        state_name = "in-ap"
    elif state_name == "Arunachal Pradesh":
        state_name = "in-ar"
    elif state_name == "Assam":
        state_name = "in-as"
    elif state_name == "Bihar":
        state_name = "in-br"
    elif state_name == "Chhattisgarh":
        state_name = "in-ct"
    elif state_name == "Delhi":
        state_name = "in-dl"
    elif state_name == "Goa":
        state_name = "in-ga"
    elif state_name == "Haryana":
        state_name = "in-hr"
    elif state_name == "Himachal Pradesh":
        state_name = "in-hp"
    elif state_name == "Jammu and Kashmir":
        state_name = "in-jk"
    elif state_name == "Jharkhand":
        state_name = "in-jh"
    elif state_name == "Karnataka":
        state_name = "in-ka"
    elif state_name == "Kerala":
        state_name = "in-kl"
    elif state_name == "Lakshadweep":
        state_name = "in-ld"
    elif state_name == "Madhya Pradesh":
        state_name = "in-mp"
    elif state_name == "Maharashtra":
        state_name = "in-mh"
    elif state_name == "Manipur":
        state_name = "in-mn"
    elif state_name == "Meghalaya":
        state_name = "in-ml"
    elif state_name == "Mizoram":
        state_name = "in-mz"
    elif state_name == "Nagaland":
        state_name = "in-nl"
    elif state_name == "Orissa":
        state_name = "in-or"
    elif state_name == "Pondicherry":
        state_name = "in-py"
    elif state_name == "Punjab":
        state_name = "in-pb"
    elif state_name == "Rajasthan":
        state_name = "in-rj"
    elif state_name == "Sikkim":
        state_name = "in-sk"
    elif state_name == "Tamil Nadu":
        state_name = "in-tn"
    elif state_name == "Uttaranchal":
        state_name = "in-ut"
    elif state_name == "Uttar Pradesh":
        state_name = "in-up"
    elif state_name == "West Bengal":
        state_name = "in-wb"
    elif state_name == "Daman and Diu":
        state_name = "in-3464"
    elif state_name == "Gujarat":
        state_name = "in-2984"
    elif state_name == "Chandigarh":
        state_name = ""
    elif state_name == "Andaman and Nicobar Islands":
        state_name = ""
    elif state_name == "Dadra and Nagar Haveli":
        state_name = ""
    elif state_name == "Tripura":
        state_name = ""
    return state_name
