from django.apps import AppConfig


class EmailsercivesConfig(AppConfig):
    name = 'EmailSercives'

    def ready(self):
        import EmailSercives.emailSignals
