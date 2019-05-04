from .base import *
DEBUG=True
ALLOWED_HOSTS=['audiencesutra.do.viewyoursite.net',]

#SOCIAL_AUTH_REDIRECT_IS_HTTPS = True
#Force https redirect
#SECURE_SSL_REDIRECT = True
# Honor the 'X-Forwarded-Proto' header for request.is_secure()
#SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

STATIC_ROOT = os.path.join(BASE_DIR, 'static')

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'audience',
        'USER': 'audience_user',
        'PASSWORD': 'PoaTLq%bVr',
        'HOST': 'localhost',
        'PORT': '',
    }
}

SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True




MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,  'media')
