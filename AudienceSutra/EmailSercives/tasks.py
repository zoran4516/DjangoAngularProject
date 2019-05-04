from django.core.mail import EmailMultiAlternatives
from django.conf import settings
from django.template.loader import render_to_string
from accounts.models import ContactSupport


def send_email(subject, ctx, to_email, flag):
    if to_email is not None:
        try:
            html_content = ''
            if flag == "create":
                html_content = render_to_string("email/survey_creation_mail.txt", ctx)
            elif flag == "update":
                html_content = render_to_string("email/survey_updation_mail.txt", ctx)
            email = EmailMultiAlternatives(subject, html_content, settings.DEFAULT_FROM_EMAIL, to=to_email)
            # if obj.attachment:
            #     attachment = request.FILES['attachment']
            #     email.attach(attachment.name, obj.attachment.read(), attachment.content_type)
            # email.attach_alternative(html_content, "text/html")
            msg = email.send()
            return msg
        except:
            pass
    else:
        pass


def send_feedback(context):
    try:
        subject = ""
        to_email = []
        contact_settings = ContactSupport.objects.all().first()
        if context["flag"] == "feedback":
            subject = context["reason"].strip()
            to_email.append(contact_settings.feedback_email)
        elif context["flag"] == "contact":
            subject = context["reason"].strip()
            to_email.append(contact_settings.contact_email)
        html_content = render_to_string("email/support_mail.txt", context)
        email = EmailMultiAlternatives(subject, html_content, settings.DEFAULT_FROM_EMAIL, to=to_email)
        msg = email.send()
        return msg
    except:
        pass
