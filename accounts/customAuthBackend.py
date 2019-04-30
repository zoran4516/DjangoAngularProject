from .models import User
from django.db.models import Q

class CustomAuthBackend(object):
    '''
        Custom auth backend to suppor login with email,username,mobile as a field
    '''
    supports_object_permissions = True
    supports_anonymous_user = False
    supports_inactive_user = False


    def get_user(self, username):
       try:
          return User.objects.get(username=username)
       except User.DoesNotExist:
          return None


    def authenticate(self, username, password):
        try:
            user = User.objects.get(
                Q(username=username) | Q(email=username) | Q(phone_number=username)
            )
        except User.DoesNotExist:
            return None

        return user if user.check_password(password) else None