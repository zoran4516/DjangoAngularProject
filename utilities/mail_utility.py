import requests
from django.core import validators

from audienceSutra_beta_src.utilities.email_template import verify_email_template
from ..accounts.models import EmailLogs, EmailTemplate
import sendgrid
import os


class MailHelper():
    def send_external_mail(self, to_email, subject, message, email_name, additional_data={}, extra_details={}):
        email_template = EmailTemplate.objects.filter(email_name=email_name).first()

        if email_template:
            MailHelper.sendgrid_mail(to_email=to_email, subject=subject, message=message,
                                     email_template=email_template, additional_data=additional_data,
                                     extra_details=extra_details)
        else:
            message = "Email not Sent"
            MailHelper.sendgrid_mail(to_email='support@audiencesutra.com', subject=subject, message=message,
                                     email_template=email_template, additional_data=additional_data,
                                     extra_details=extra_details)
    @staticmethod
    def sendgrid_mail(to_email, subject, message, email_template, additional_data, extra_details):
        sg = sendgrid.SendGridAPIClient(apikey=os.environ.get('SENDGRID_API_KEY'))

        if email_template.email_type == 'welcome':
            from_email = "support@audiencesutra.com"
        else:
            from_email = "contact-us@audiencesutra.com"


        data = {
            "personalizations": [
                {
                    "to": [
                        {
                            "email": to_email
                        }
                    ],
                    "subject": subject
                }
            ],
            "from": {
                "email": from_email,
                "name": "AudienceSutra"
            },
            "categories": [
                email_template.email_category
            ],
            "content": [
                {
                    "type": "text/html",
                    "value": message
                }
            ]
        }
        response = sg.client.mail.send.post(request_body=data)
        sendgrid_id = response.headers['X-Message-Id']
        email_log = EmailLogs.objects.create(
            sendgrid_id=sendgrid_id,
            email_template_id=email_template.id,
            sent_to=to_email
        )
        extra_details = dict(extra_details.items() + additional_data.items())
        email_log.extra_details = extra_details
        email_log.save()



def get_attachments_mailgun(attachments):
    if attachments:
        attachment_list = []

        for file_path in attachments:
            attachment_list.append(("attachment", open(file_path)))
        return attachment_list
    else:
        return []


def verify_email(user):
    try:
        validators.validate_email(str(user.email).strip())
        return True
    except:
        return False
