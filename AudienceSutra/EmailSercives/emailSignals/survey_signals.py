from EmailSercives.tasks import send_email
from survey.models import Survey
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from accounts.models import UserProfile


@receiver(post_save, sender=Survey)
def send_mail_on_survey_create(sender, instance, **kwargs):
    if kwargs.get('created', False):
        try:
            creater = User.objects.get(pk=instance.creator)
            creater = UserProfile.objects.get(user=creater)
            ctx = {
                "username": creater.first_name,
                "message": "{0} has created successfully".format(instance.name),
                "protocol": "https",
                # "protocol": "http",
                "domain": "audiencesutra.do.viewyoursite.net"
                # "domain": "127.0.0.1:8000"
            }
            subject = "Your Survey has been created".strip()
            mail_to = [creater.email]
            send_email(subject, ctx, mail_to, 'create')
        except:
            pass


@receiver(post_save, sender=Survey)
def send_mail_on_survey_update(sender, instance, **kwargs):
    if kwargs.get('created', True) is False:
        try:
            if instance.is_deleted is False:
                if instance.prev_status == "Draft" and instance.status == "Draft":
                    pass
                else:
                    admin = User.objects.filter(is_superuser=True).first()
                    creater = User.objects.get(pk=instance.creator)
                    creater = UserProfile.objects.get(user=creater)
                    subject, ctx, mail_to = '', '', ''
                    if instance.prev_status == "Draft" and instance.status == "Pending Approval":
                        ctx = {
                            "username": admin.first_name,
                            "message": "{0} has submitted {1} survey for Approval".format(creater.first_name, instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [admin.email]
                        subject = "Survey Approval"
                    elif instance.prev_status == "Pending Approval" and instance.status == "Draft":
                        ctx = {
                            "username": admin.first_name,
                            "message": "{0} has withdrawn {1} survey.".format(creater.first_name, instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [creater.email]
                        subject = "Survey Withdraw"
                    elif instance.prev_status == "Pending Approval" and instance.status == "Approved":
                        ctx = {
                            "username": creater.first_name,
                            "message": "{0} has Approved {1} survey".format(admin.first_name, instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [creater.email]
                        subject = "Survey Ready for Payment"
                    elif instance.prev_status == "Approved" and instance.status == "Paid":
                        ctx = {
                            "username": admin.first_name,
                            "message": "{0} has submitted {1} survey for Live".format(creater.first_name, instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [admin.email]
                        subject = "Survey Payment done"
                    elif instance.prev_status == "Paid" and instance.status == "Active":
                        ctx = {
                            "username": creater.first_name,
                            "message": "{0} has Live {1} survey".format(admin.first_name, instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [creater.email]
                        subject = "Survey Ready to assign"
                    elif instance.prev_status == "Pending Approval" and instance.status == "Pending Approval":
                        ctx = {
                            "username": "",
                            "message": "{0} survey has been updated".format(instance.name),
                            "protocol": "https",
                            # "protocol": "http",
                            "domain": "audiencesutra.do.viewyoursite.net"
                            # "domain": "127.0.0.1:8000"
                        }
                        mail_to = [admin.email, creater.email]
                        subject = "Survey Updated"
                    subject = subject.strip()
                    send_email(subject, ctx, mail_to, 'update')
            else:
                pass
        except:
            pass
