from rest_framework.serializers import ModelSerializer
from survey.models import *
from accounts.models import *
from survey.models.ProfileQuestionMaster import DigitalLaser, EstimationQuestionAnswersHead, \
    EstimationQuestionMaster, EstimationQuestionOptionMaster, EstimationQuestionAnswers
from accounts.serializers import UserProfileSerializer


class SurveySerializer(ModelSerializer):

    class Meta:
        model = Survey
        fields = '__all__'


class QuestionSerializer(ModelSerializer):

    class Meta:
        model = Question
        fields = '__all__'


class ResponseSerializer(ModelSerializer):

    class Meta:
        model = Responses
        fields = '__all__'


class AnswerSerializer(ModelSerializer):

    class Meta:
        model = Answer
        fields = '__all__'


class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'


class ClientProfileSerializer(ModelSerializer):

    class Meta:
        model = UserProfile
        fields = '__all__'


# class RespondentProfileSerializer(ModelSerializer):
#
#     class Meta:
#         model = UserProfile
#         fields = '__all__'


class TabSerializer(ModelSerializer):

    class Meta:
        model = Tabs
        fields = '__all__'


class TemplateBrandSerializer(ModelSerializer):

    class Meta:
        model = TemplateBrand
        fields = '__all__'


class TemplateCompetitionSerializer(ModelSerializer):

    class Meta:
        model = TemplateCompetition
        fields = '__all__'


class TemplateCommunicationSerializer(ModelSerializer):

    class Meta:
        model = TemplateCommunication
        fields = '__all__'


class TemplateProductSerializer(ModelSerializer):

    class Meta:
        model = TemplateProduct
        fields = '__all__'


class TemplateCustomSerializer(ModelSerializer):

    class Meta:
        model = TemplateCustom
        fields = '__all__'

# ================================================


from rest_framework import serializers


class RespondentProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserProfile
        fields = ('age', 'gender', 'relationship_status', 'parential_status', 'child_age',
                  'current_city', 'current_state', 'education', 'employment', 'date_of_birth',
                  'language_count', 'language_known', 'family_count', 'household_income',
                  'earning_members_count', 'employment_position', 'work_sector',
                  'vehicle_count', 'vehicle_known')

    def update(self, instance, validated_data):
        instance.age = validated_data.get('age', instance.age)
        instance.gender = validated_data.get('gender', instance.gender)
        instance.relationship_status = validated_data.get('relationship_status', instance.relationship_status)
        instance.parential_status = validated_data.get('parential_status', instance.parential_status)
        instance.child_age = validated_data.get('child_age', instance.child_age)
        instance.current_city = validated_data.get('current_city', instance.current_city)
        instance.current_state = validated_data.get('current_state', instance.current_state)
        instance.education = validated_data.get('education', instance.education)
        instance.employment = validated_data.get('employment', instance.employment)
        instance.date_of_birth = validated_data.get('date_of_birth', instance.date_of_birth)
        instance.language_count = validated_data.get('language_count', instance.language_count)
        instance.language_known = validated_data.get('language_known', instance.language_known)
        instance.family_count = validated_data.get('family_count', instance.family_count)
        instance.household_income = validated_data.get('household_income', instance.household_income)
        instance.earning_members_count = validated_data.get('earning_members_count', instance.earning_members_count)
        instance.employment_position = validated_data.get('employment_position', instance.employment_position)
        instance.work_sector = validated_data.get('work_sector', instance.work_sector)
        instance.vehicle_count = validated_data.get('vehicle_count', instance.vehicle_count)
        instance.vehicle_known = validated_data.get('vehicle_known', instance.vehicle_known)
        instance.save()
        return instance


class ProfileQuestionOptionMasterListSerializer(serializers.ModelSerializer):
    # sort_order = serializers.IntegerField()

    class Meta:
        model = ProfileQuestionOptionMaster
        fields = '__all__'
        # fields = ( 'option_detail', 'is_correct')


class ProfileQuestionMasterListSerializer(serializers.ModelSerializer):
    question = serializers.CharField(read_only=True)
    options_type = serializers.CharField(read_only=True)
    sort_order = serializers.IntegerField()
    choices = serializers.SerializerMethodField(method_name='options_details')

    class Meta:
        model = ProfileQuestionMaster
        fields = ('id', 'is_required', 'question', 'options_type',  'sort_order', 'choices')

    def options_details(self, obj):
        if obj is not None:
            question_option_detail = ProfileQuestionOptionMaster.objects.filter(question=obj)
            question_option_detail_serializer = ProfileQuestionOptionMasterListSerializer(
                                        question_option_detail, many=True)
            return question_option_detail_serializer.data
        else:
            return None


class EstimationQuestionOptionMasterListSerializer(serializers.ModelSerializer):
    selected = serializers.SerializerMethodField(method_name='options_selected')
    # option_detail = serializers.SerializerMethodField(method_name='options_details')

    class Meta:
        model = EstimationQuestionOptionMaster
        fields = ('question', 'option_detail', 'estimated_value', 'sort_order', 'selected')

    def options_selected(self, obj):
        if obj is not None:
            # import pdb
            # pdb.set_trace()

            surveyID = self.context.get("survey")
            if surveyID:
                head = EstimationQuestionAnswersHead.objects.get(Survey=surveyID)
                question = EstimationQuestionAnswers.objects.get(head=head.pk, question_id=obj.question.pk)

                if obj.question.options_type == 'Multiple Choice':
                    answerList = question.answer_desc.split('@@@')
                    if obj.option_detail in answerList:
                        return True
                    else:
                        return False
                else:
                    if question.answer_desc.strip() == obj.option_detail.strip():
                        return True
                    else:
                        return False
            else:
                return False
        else:
            return None

    def options_details(self, obj):
        if obj is not None:
            surveyID = self.context.get("survey")
            if surveyID:
                head = EstimationQuestionAnswersHead.objects.get(Survey=surveyID)
                question = EstimationQuestionAnswers.objects.get(head=head.pk, question_id=obj.question.pk)
                if obj.question.options_type == 'Multiple Choice':
                    return question.answer_desc
                elif obj.question.options_type == 'Single Line Text':
                    return question.answer_desc
                else:
                    return obj.option_detail
            else:
                return ""
        else:
            return ""


class EstimationQuestionMasterListSerializer(serializers.ModelSerializer):
    question = serializers.CharField(read_only=True)
    options_type = serializers.CharField(read_only=True)
    sort_order = serializers.IntegerField()
    choices = serializers.SerializerMethodField(method_name='options_details')

    class Meta:
        model = EstimationQuestionMaster
        fields = ('id', 'is_required', 'question', 'options_type',  'sort_order', 'choices')

    def options_details(self, obj):
        if obj is not None:
            surveyID = self.context.get("survey")
            context = {'survey': surveyID}
            if obj.options_type == 'Single Line Text':
                if surveyID:
                    head = EstimationQuestionAnswersHead.objects.get(Survey=surveyID)
                    question = EstimationQuestionAnswers.objects.get(head=head.pk, question_id=obj.pk)
                    return question.answer_desc
                else:
                    return ""
            else:
                question_option_detail = EstimationQuestionOptionMaster.objects.filter(question=obj)
                question_option_detail_serializer = EstimationQuestionOptionMasterListSerializer(
                                            question_option_detail, many=True, context=context)
                return question_option_detail_serializer.data
        else:
            return None
# ========================new


class ProfileQuestionAnswerSerializer(serializers.ModelSerializer):

    class Meta:
        model = ProfileQuestionAnswers
        fields = '__all__'

    # def create(self, validated_data):
    #     return ProfileQuestionAnswers.objects.create(**validated_data)


# ====================================


class SurveyImageSerializer(serializers.ModelSerializer):

    class Meta:
        model = Survey
        fields = ('survey_img', )

    def update(self, instance, validated_data):
        instance.survey_img = validated_data.get("survey_img", instance.survey_img)
        instance.save()
        return instance


class QuestionListSerializer(ModelSerializer):
    # dependentQuestion = serializers.CharField(source='dependent_question')
    # dependentOption = serializers.CharField(source='dependent_option')
    setType = serializers.SerializerMethodField(method_name='obj_set_type')
    choices = serializers.SerializerMethodField(method_name='obj_choices')
    tabNames = serializers.SerializerMethodField(method_name='obj_tabes')
    temp_id = serializers.CharField(source='id')

    dependentQuestion = serializers.SerializerMethodField(method_name='obj_question')
    dependentOption = serializers.SerializerMethodField(method_name='obj_option')

    class Meta:
        model = Question
        fields = ('text', 'order', 'required', 'admin_question', 'category', 'survey',
                  'type', 'choices', 'min', 'setType', 'max', 'tabs', 'placeholder',
                  'dependentQuestion', 'dependentOption', 'tabNames', 'id', 'temp_id')

    def obj_set_type(self, obj):
        return "optionSet"

    def obj_choices(self, obj):
        if obj.choices is None or obj.choices == 'null':
            choicesList = [""]
        else:
            choicesList = obj.choices.split("@@@")
        return choicesList

    def obj_tabes(self, obj):
        if obj.tab_names is None or obj.tab_names == 'null':
            tabsList = [""]
        else:
            tabsList = obj.tab_names.split(",")
        return tabsList

    def obj_question(self, obj):
        if obj.dependent_question is None or obj.dependent_question == 'null':
            return ""
        else:
            questions = obj.dependent_question
        return questions

    def obj_option(self, obj):
        if obj.dependent_option is None or obj.dependent_option == 'null':
            return ""
        else:
            options = obj.dependent_option
        return options


class SurveyListSerializer(ModelSerializer):
    # surveyQuestions = QuestionListSerializer(source='questions', many=True)
    surveyQuestions = serializers.SerializerMethodField(method_name='obj_questions')

    needLoggedUser = serializers.BooleanField(source='need_logged_user')
    displayByQuestion = serializers.BooleanField(source='display_by_question')

    class Meta:
        model = Survey
        fields = ('name', 'description', 'status', 'needLoggedUser', 'displayByQuestion',
                  'template', 'creator', 'surveyQuestions')

    def obj_questions(self, obj):
        if obj.id is None or obj.id == 'null':
            return ""
        else:
            request = self.context.get("request")
            user_profile = UserProfile.objects.get(user=request.user.id)
            if request.user.is_superuser or user_profile.user_type == 'Respondent':
                questions = Question.objects.filter(survey=obj.id).order_by('id')
            else:
                questions = Question.objects.filter(survey=obj.id, admin_question=False).order_by('id')
            questions_serializer = QuestionListSerializer(questions, many=True)
        return questions_serializer.data


# =====================================


class ClientSurveySerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)
    first_name = serializers.CharField(max_length=30, allow_null=True)
    middle_name = serializers.CharField(max_length=30, allow_null=True)
    last_name = serializers.CharField(max_length=30, allow_null=True)
    surveys = serializers.SerializerMethodField(method_name='obj_surveys')

    class Meta:
        model = UserProfile
        fields = ('id', 'first_name', 'middle_name', 'last_name', 'surveys')

    def obj_surveys(self, obj):
        if Survey.objects.filter(creator=obj.user_id, status="Active").exists():
            surveys = Survey.objects.filter(creator=obj.user_id, status="Active")
            surveys_serializer = SurveySerializer(surveys, many=True)
            return surveys_serializer.data
        else:
            return "remove"


class RespondentSerializer(ModelSerializer):
    user_id = serializers.SerializerMethodField(method_name='obj_userID')
    name = serializers.SerializerMethodField(method_name='obj_userName')
    assign = serializers.SerializerMethodField(method_name='obj_surveyAssign')
    status = serializers.SerializerMethodField(method_name='obj_surveyStatus')
    assign_date = serializers.SerializerMethodField(method_name='obj_surveyDate')
    class Meta:
        model = UserProfile
        fields = ('user_id', 'name', 'assign', 'status', 'assign_date')

    def obj_userID(self, obj):
        return obj

    def obj_userName(self, obj):
        user_profile = UserProfile.objects.get(user=obj, user_type='Respondent')
        return "{0} {1} {2}".format(user_profile.first_name, user_profile.middle_name, user_profile.last_name)

    def obj_surveyAssign(self, obj):
        if RespondentSurveyAssign.objects.filter(user=obj, survey=self.context.get('survey')).exists():
            return True
        else:
            return False

    def obj_surveyStatus(self, obj):
        if RespondentSurveyAssign.objects.filter(user=obj, survey=self.context.get('survey')).exists():
            status = RespondentSurveyAssign.objects.filter(user=obj, survey=self.context.get('survey'))
            return status[0].status
        else:
            return ' '


    def obj_surveyDate(self, obj):
        if RespondentSurveyAssign.objects.filter(user=obj, survey=self.context.get('survey')).exists():
            date = RespondentSurveyAssign.objects.filter(user=obj, survey=self.context.get('survey'))
            return date[0].assigned_date
        else:
            return ''


class AssignSurveySerializer(ModelSerializer):

    class Meta:
        model = RespondentSurveyAssign
        fields = '__all__'


class DigitalLaserSerializer(ModelSerializer):
    userInfo = serializers.SerializerMethodField(method_name='obj_userName')

    class Meta:
        model = DigitalLaser
        fields = ('description', 'credit_point', 'debit_point', 'userInfo')

    def obj_userName(self, obj):
        user_profile = UserProfile.objects.get(user=obj.user)
        user_serializer = UserProfileSerializer(user_profile)
        return user_serializer.data


class RespondentSelectionCriteriaSerializer(ModelSerializer):

    class Meta:
        model = ProfileQuestionAnswers
        fields = ('answer_desc',)


class RespondentSelectionCriteriaSerializerList(ModelSerializer):

    class Meta:
        model = ProfileQuestionAnswers
        fields = '__all__'


# ==========================================================================================

class QuestionSerializerList(ModelSerializer):
    dependentQuestion = serializers.CharField(source='dependent_question')
    dependentOption = serializers.CharField(source='dependent_option')
    tabNames = serializers.CharField(source='tab_names')

    class Meta:
        model = Question
        fields = ('text', 'order', 'required', 'admin_question', 'category', 'survey',
                  'type', 'choices', 'min', 'max', 'tabs', 'placeholder',
                  'dependentQuestion', 'dependentOption', 'tabNames', 'id')


class GenderSerializer(ModelSerializer):

    class Meta:
        model = ProfileQuestionOptionMaster
        fields = ('option_detail', 'question')


class AssignedSurveySerializer(ModelSerializer):
    assign_user = serializers.SerializerMethodField(method_name='assign_user_obj')
    creator_user = serializers.SerializerMethodField(method_name='creator_user_obj')

    class Meta:
        model = Survey
        fields = ('name', 'assign_user', 'creator_user', 'status')

    @staticmethod
    def assign_user_obj(obj):
        assign_user_dict = {}
        if obj.assign_user:
            user = obj.assign_user
            first_name = user.first_name if user.first_name else ""
            last_name = user.last_name if user.last_name else ""
            full_name = "{0} {1}".format(first_name, last_name)
            assign_user_dict["name"] = full_name.strip()
        return assign_user_dict

    @staticmethod
    def creator_user_obj(obj):
        creator_user_dict = {}
        if obj.creator_user:
            user = obj.creator_user
            first_name = user.first_name if user.first_name else ""
            last_name = user.last_name if user.last_name else ""
            full_name = "{0} {1}".format(first_name, last_name)
            creator_user_dict["name"] = full_name.strip()
        return creator_user_dict
