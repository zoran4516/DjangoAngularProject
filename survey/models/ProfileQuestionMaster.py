from django.db import models
from django.contrib.auth.models import User
from survey.models import Survey

QUESION_TYPE = (('Single Choice', 'Single Choice'),
                ('Multiple Choice', 'Multiple Choice'),
                ('Single Line Text', 'Single Line Text'),
                ('Multi Line Text', 'Multi Line Text'),
                ('Dropdown', 'Dropdown'),
                ('Date', 'Date'))


class ProfileQuestionMaster(models.Model):
    question = models.TextField(null=False)
    options_type = models.CharField(max_length=100, choices=QUESION_TYPE)
    sort_order = models.IntegerField(default=0)
    is_required = models.BooleanField(default=False)

    def __str__(self):
        return self.question + ' ('+self.options_type+')'


class ProfileQuestionOptionMaster(models.Model):
    question = models.ForeignKey(ProfileQuestionMaster, on_delete=models.CASCADE)
    option_detail = models.TextField(null=True, default=None, blank=True)
    is_correct = models.BooleanField(default=False)
    sort_order = models.IntegerField(default=0)


class ProfileQuestionAnswers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    question_id = models.IntegerField(default=0)
    question_desc = models.TextField()
    answer_desc = models.TextField(blank=True)


class DigitalLaser(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.CharField(max_length=100)
    credit_point = models.IntegerField(default=0)
    debit_point = models.IntegerField(default=0)


# ======================================================

STATUS = (('Assigned', 'Assigned'),
          ('Taken', 'Taken'))


class RespondentSurveyAssign(models.Model):
    user = models.IntegerField(blank=True, null=True)
    survey = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=50, choices=STATUS, default='Assigned')
    assigned_date = models.DateTimeField(auto_now_add=True, null=True, )


class EstimationQuestionMaster(models.Model):
    question = models.TextField(null=False)
    options_type = models.CharField(max_length=100, choices=QUESION_TYPE)
    sort_order = models.IntegerField(default=0)
    is_required = models.BooleanField(default=False)
    # estimated_value = models.IntegerField(default=0, blank=True,null=True)
    def __str__(self):
        return self.question + ' ('+self.options_type+')'


class EstimationQuestionOptionMaster(models.Model):
    question = models.ForeignKey(EstimationQuestionMaster, on_delete=models.CASCADE)
    option_detail = models.TextField(null=True, default=None, blank=True)
    estimated_value = models.IntegerField(default=0, blank=True, null=True)
    sort_order = models.IntegerField(default=0)


class EstimationQuestionAnswersHead(models.Model):
    Survey = models.IntegerField(default=0)
    head_id = models.AutoField(primary_key=True)
    cost = models.IntegerField(default=0, blank=True, null=True)


class EstimationQuestionAnswers(models.Model):
    head = models.IntegerField(default=0)
    question_id = models.IntegerField(default=0)
    question_desc = models.TextField()
    answer_desc = models.TextField(blank=True)
