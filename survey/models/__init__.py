# -*- coding: utf-8 -*-

"""
    Permit to import everything from survey.models without knowing the details.
"""

from .answer import Answer
from .category import Category
from .question import Question
from .response import Responses
from .survey import Survey, TemplateCompetition, TemplateBrand, TemplateCommunication, TemplateProduct, TemplateCustom
from .tabs import Tabs
from .ProfileQuestionMaster import ProfileQuestionMaster, \
    ProfileQuestionOptionMaster, ProfileQuestionAnswers, RespondentSurveyAssign

__all__ = ["Category", "Answer", "Category", "Responses", "Survey", "Question", "Tabs",
           "TemplateCompetition", "TemplateBrand", "TemplateCommunication", "TemplateProduct", "TemplateCustom",
           "ProfileQuestionMaster", "ProfileQuestionOptionMaster", "ProfileQuestionAnswers", "RespondentSurveyAssign"]
