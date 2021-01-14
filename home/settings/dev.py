'''Use this for development'''

from .base import *

ALLOWED_HOSTS = []
DEBUG = True

WSGI_APPLICATION = 'home.wsgi.dev.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    'localhost:3000', 'localhost:8000'
)
