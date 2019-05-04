# -*- coding: utf-8 -*-


from builtins import object

from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.urls import reverse


class Survey(models.Model):
    STATUS = (
        ('Draft', 'Draft'),
        ('Pending Approval', 'Pending Approval'),
        ('Approved', 'Approved'),  # Pending Payment
        ('Paid', 'Paid'),
        ('Active', 'Active'),
        ('Inactive', 'Inactive')
    )

    name = models.CharField(_("Name"), max_length=400)
    description = models.TextField(_("Description"), )
    need_logged_user = models.BooleanField(_("Only authenticated users can see it and answer it"),)
    display_by_question = models.BooleanField(_("Display by question"),)
    template = models.CharField(_("Template"), max_length=255, null=True, blank=True)
    creator = models.IntegerField(blank=True, null=True)
    survey_img = models.ImageField(upload_to='survey/', null=True, blank=True)
    published_date = models.DateTimeField(null=True, blank=True)
    expiry_date = models.DateTimeField(null=True, blank=True)
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    status = models.CharField(choices=STATUS, default='Draft', max_length=20)
    cost = models.DecimalField(blank=True,null=True,decimal_places=2, max_digits=15)
    updated_on = models.DateTimeField(auto_now=True, null=True, blank=True)
    updated_by = models.IntegerField(blank=True, null=True)
    is_deleted = models.BooleanField(default=False, blank=True)

    class Meta(object):
        verbose_name = _('survey')
        verbose_name_plural = _('surveys')

    def __str__(self):
        return self.name

    def latest_answer_date(self):
        """ Return the latest answer date.

        Return None is there is no response. """
        min_ = None
        for response in self.responses.all():
            if min_ is None or min_ < response.updated:
                min_ = response.updated
        return min_

    # @models.permalink
    def get_absolute_url(self):
        return 'survey-detail', [self.pk]

    # maintain prev_status
    def __init__(self, *args, **kwargs):
        super(Survey, self).__init__(*args, **kwargs)
        self.prev_status = self.status


class TemplateBrand(models.Model):

    age = models.CharField(_("Age"), max_length=400)
    gender = models.TextField(_("Gender"), )
    nccs = models.TextField(_("NCSS"), )
    details = models.CharField(_("Details"), max_length=400)
    report = models.TextField(_("Report"), )
    brand = models.TextField(_("Brand"), blank=True, null=True)
    associated = models.TextField(_("Associated"), blank=True, null=True)
    category = models.TextField(_("Category"), blank=True, null=True)
    newcategory = models.TextField(_("Newcategory"), blank=True, null=True)
    new = models.TextField(_("New"), blank=True, null=True)
    new2 = models.TextField(_("New2"), blank=True, null=True)
    concerns = models.CharField(_("Concerns"), max_length=400, blank=True, null=True)
    creator = models.IntegerField(blank=True, null=True)


class TemplateCompetition(models.Model):

    age = models.CharField(_("Age"), max_length=400)
    gender = models.TextField(_("Gender"), )
    nccs = models.TextField(_("NCSS"), )
    details = models.CharField(_("Details"), max_length=400)
    report = models.TextField(_("Report"), )
    c6 = models.TextField(_("C6"), blank=True, null=True)
    c7 = models.TextField(_("C7"), blank=True, null=True)
    c8 = models.TextField(_("C8"), blank=True, null=True)
    c9 = models.TextField(_("C9"), blank=True, null=True)
    c10 = models.CharField(_("C10"), max_length=400, blank=True, null=True)
    creator = models.IntegerField(blank=True, null=True)

class TemplateCommunication(models.Model):

    age = models.CharField(_("Age"), max_length=400)
    gender = models.TextField(_("Gender"), )
    nccs = models.TextField(_("NCSS"), )
    details = models.CharField(_("Details"), max_length=400)
    report = models.TextField(_("Report"), )
    c6 = models.TextField(_("C6"), blank=True, null=True)
    c7 = models.TextField(_("C7"), blank=True, null=True)
    c8 = models.TextField(_("C8"), blank=True, null=True)
    c9 = models.TextField(_("C9"), blank=True, null=True)
    c10 = models.TextField(_("C9"), blank=True, null=True)
    c11 = models.CharField(_("C10"), max_length=400, blank=True, null=True)
    creator = models.IntegerField(blank=True, null=True)

class TemplateProduct(models.Model):

    age = models.CharField(_("Age"), max_length=400)
    gender = models.TextField(_("Gender"), )
    nccs = models.TextField(_("NCSS"), )
    details = models.CharField(_("Details"), max_length=400)
    report = models.TextField(_("Report"), )
    c6 = models.TextField(_("C6"), blank=True, null=True)
    c7 = models.TextField(_("C7"), blank=True, null=True)
    c8 = models.TextField(_("C8"), blank=True, null=True)
    c9 = models.TextField(_("C9"), blank=True, null=True)
    c10 = models.TextField(_("C10"), blank=True, null=True)
    creator = models.IntegerField(blank=True, null=True)


class TemplateCustom(models.Model):

    age = models.CharField(_("Age"), max_length=400)
    gender = models.TextField(_("Gender"), )
    nccs = models.TextField(_("NCSS"), )
    details = models.CharField(_("Details"), max_length=400)
    creator = models.IntegerField(blank=True, null=True)