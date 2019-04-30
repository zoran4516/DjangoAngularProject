from builtins import object

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse

from .survey import Survey

class Tabs(models.Model):
    surveyId = models.ForeignKey(Survey, verbose_name=_("SurveyId"),
                               related_name="tabs")
    number = models.IntegerField(_("Number"),default=-1, blank=True, null=True)
    end = models.TextField(_("End"), blank=True, null=True)

    class Meta(object):
        verbose_name = _('tabs')
        verbose_name_plural = _('tabs')

    def __str__(self):
        return self.name