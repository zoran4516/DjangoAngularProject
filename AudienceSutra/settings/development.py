from .base import *


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
DEVELOPMENT = True

# Database
# https://docs.djangoproject.com/en/2.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'audience',
        'USER': 'postgres',
        'PASSWORD': 'skysoft',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR,  'media')


STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# print("STATIC_ROOT : ", STATIC_ROOT)
# print("MEDIA_ROOT : ", MEDIA_ROOT)

SALT = "ADntuzoBgu"
PAID_FEE_AMOUNT = 1
PAID_FEE_PRODUCT_INFO = "Message showing product details."
PAYMENT_URL_TEST = 'https://test.payu.in/_payment'
PAYMENT_URL_LIVE = 'https://secure.payu.in/_payment'
SERVICE_PROVIDER = "payu_paisa"
KEY = "FdKMWEcT"

""" New One """

PAYMENT_MODE = "test"
MERCHANT_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCtccIJYrJFkjaCQ6PtvfCka+7zyFw03Mr6zxBIxC7OEXec1U5LhRqBtczjMDHAn2ZQcCS+NfgYgHKzWhp1Ro6GAdWkQ98LdbSuHgyFPnX43+IcuYYpZYC+XekSbRFjSvEAITB5agjew0L6Mdc/bjbCSYIb1laSqu4UxLq+sdBnKZoGRE21qzpePyT0PQ6AhMIZXlOIK9mb769ixOARkoCaf+/Ep5cZ3P3FLaomh8V//ar3S89t6WtpbWtsR9Nf8M2Az5vT29bVOfnUDTEW6cT3p8DTNDGEjukXmElxgtl+2o/3LtVALgWkcVlETO8LjfSHhok2a/2mQoiMGLF5QYWpAgMBAAECggEAWW5OnohFY5oAgSpfXDaT3jPJAepNoPQ3tRsPSnXdrGNVSYiy1j3LbRZQjtRK0wdduhwY1fr98aRJgDD1c4Lt+ir3/bsBRudqQl08F3gdXDYUYLtIcg/kUkQZ6WZTkN8TZP24AOKrsDD+WANa+Vna4lMEw1XBTd7U4+CMacdFrerrbkz3MQhGk7JqvczE8kIN41UVftZ4K0HqKRE1jYSbnAqxfcnSPEtxWRnWD1QpE81RV8HTS5J4GiyEOne7uH1KLaphHCkxxzDYeBzSJhuE1KYQNzLtb9HAGqwIbwReftYjl1bCJNEXAvMrdOrs2S1NfX1zTPgw7/HAJSy903BQAQKBgQDlMiwFCkUWFab1+Eokuone2Rfvx8MJqPvemltgIkIXJmrZhJGPrpwcG+7p0GOAUcljJqjjSMFN6L0nV2Hq5/F0LdPMHuuOAai8l7N4QTym9v6OX+9GFBSsvC6+OHn9YKmzhRn1n2HoAqtOxq8Tld260HNHSOZtQhkvou6/4i7K7wKBgQDBunSbG+NL1EiuIlDz9mlumq07W7Z0yNC+hJGCnHMCaxCe6dGLQFyoLBHJuLsdmuIPSqxLEu5j884YooEiSQUlmtPxHJ49TvD/1aTLuLll4U5ASgiFW6KZmKdWp3uqo5w8lgDNPMXYJZND4kupfT9ymmLjTa1WY+YS6z9/Kh4Y5wKBgQCLv4PHrvNg++LJp5LNwk++aXCG666ofTjWChgdDcZuhyYvav22NilJml6agk2pODUrF69ypjH3Zymui0FREgvPYwH5PAE0nR5dn8H2WRC6XW/pL+WdPTE+AaAerCD1tbLDmyyw73WrGbWKWur1bjO8bM1dcb3OcLcarKYWqbsOUQKBgErt1xP3IV6+6K2RUEZL1FOXN9Fxk4xv720A0Vb3M/SHfJI6VXXKmwvgn7Cp5pV4xl6rvx/6XoICVoBouhGMtJTq4XasXvfPhJ8u/uJcvDiPgDiVad5KpwVJac+2T7qcNV2plv3Kt6r2PZNP/3u6mcO1uvG3pYd4dBB1NMX2gFWZAoGAZhC5tTSvJxs9/K2M+HYBl2dWiZe7sHk0eENMwm4Qdqm8+VRdUSXQrKXLZfxQ5SWYetapK+jpviZ7XnCqSiGvkwiwr59X64GmyYTlM4obJLw+iblflTw2NJp7MfYd0j1H1B++vjgPOCKizh/bVcpTAPj1SOdWdnBM6FgYIBERsnw="
MERCHANT_SALT = "ECePetu9"
SUCCESS_URL = "http://127.0.0.1:8000/payubiz-success"
FAILURE_URL = "http://127.0.0.1:8000/payubiz-failure"
CANCEL_URL = "http://127.0.0.1:8000/payubiz-cancel"
