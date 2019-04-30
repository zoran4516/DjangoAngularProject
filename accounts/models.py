from django.core.validators import RegexValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from utilities.jsonfield import JSONField
from django.contrib.auth.models import User


PHONE_VALIDATOR = RegexValidator(regex=r'^\+?1?\d{9,15}$',
                             message="Phone number must be entered in the format: '+999999999'. "
                                     "Up to 15 digits allowed.")


USER_TYPE_CHOICES = (
    ('Client', 'Client'),
    ('Respondent', 'Respondent'),
)


class UserProfile(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=60, blank=True, null=True)
    company_name = models.CharField(max_length=60, blank=True, null=True)
    address = models.CharField(max_length=200, blank=True, null=True)
    email = models.CharField(max_length=60, blank=True, null=True)
    phone = models.CharField(max_length=15, blank=True, null=True)

    age = models.IntegerField(blank=True, null=True)
    gender = models.CharField(max_length=10, blank=True, null=True)
    relationship_status = models.CharField(max_length=30, blank=True, null=True)
    parential_status = models.IntegerField(blank=True, null=True)
    child_age = JSONField(default={})
    current_city = models.CharField(max_length=30, blank=True, null=True)
    current_state = models.CharField(max_length=30, blank=True, null=True)
    education = models.CharField(max_length=30, blank=True, null=True)
    employment = models.CharField(max_length=30, blank=True, null=True)
    date_of_birth = models.CharField(max_length=30, null=True, blank=True)
    language_count = models.IntegerField(blank=True, null=True)
    language_known = JSONField(default={})
    family_count = models.IntegerField(blank=True, null=True)
    household_income = models.CharField(max_length=50, blank=True, null=True)
    earning_members_count = models.IntegerField(blank=True, null=True)
    employment_position = models.CharField(max_length=50, blank=True, null=True)
    work_sector = models.CharField(max_length=50, blank=True, null=True)
    vehicle_count = models.IntegerField(blank=True, null=True)
    vehicle_known = JSONField(default={})

    first_name = models.CharField(_('first name'), max_length=30, blank=True, null=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True, null=True)
    middle_name = models.CharField(_('middle name'), max_length=35, blank=True, null=True)
    phone_number = models.CharField(validators=[PHONE_VALIDATOR], max_length=15, blank=True)
    create_time = models.DateTimeField(auto_now=True)

    country = models.CharField(max_length=60, blank=True, null=True)
    state = models.CharField(max_length=60, blank=True, null=True)
    city = models.CharField(max_length=60, blank=True, null=True)
    pincode = models.CharField(max_length=6, blank=True, null=True)
    user_type = models.CharField(max_length=20, choices=USER_TYPE_CHOICES)
    profile_pic = models.ImageField(upload_to='profile/', null=True, blank=True)
    company_logo = models.ImageField(upload_to='profile/', null=True, blank=True)


class EmailTemplate(models.Model):
    email_name = models.CharField(max_length=255, default=None)
    email_description = models.CharField(max_length=255, default=None)
    email_type = models.CharField(max_length=255, default=None)
    email_weight = models.DecimalField(decimal_places=2, max_digits=4)
    email_category = models.CharField(max_length=255, default=None)
    tags = models.CharField(max_length=255, default=None)
    template_name = models.CharField(max_length=255, default=None)
    primary_link = models.CharField(max_length=255, default=None)

    class Meta:
        db_table = 'email_template'


class EmailLogs(models.Model):
    sendgrid_id = models.CharField(max_length=255, default=None)
    sent_to = models.CharField(max_length=255, default=None)
    email_template = models.ForeignKey(EmailTemplate)
    sent_on = models.DateTimeField(default=timezone.now)
    is_open = models.BooleanField(default=False)
    is_clicked = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    extra_details = JSONField(default={})

    class Meta:
        db_table = 'email_logs'


# =======================================

class CountryMaster(models.Model):
    country_id = models.AutoField(primary_key=True)
    country_name = models.CharField(max_length=200)
    country_code = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.country_name


class StateMaster(models.Model):
    state_id = models.AutoField(primary_key=True)
    country = models.ForeignKey(CountryMaster, related_name="states", on_delete=models.CASCADE)
    state_name = models.CharField(max_length=200)
    state_code = models.CharField(max_length=200)

    def __str__(self):
        return self.state_name


class ContactSupport(models.Model):
    contact_email = models.EmailField(max_length=100)
    feedback_email = models.EmailField(max_length=100)
    admin_email = models.EmailField(max_length=100, null=True)

    class Meta:
        verbose_name_plural = 'Contact Support Settings'

    def save(self, *args, **kwargs):
        if self.__class__.objects.count():
            self.pk = self.__class__.objects.first().pk
        super().save(*args, **kwargs)
