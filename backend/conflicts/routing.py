from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    re_path(r'^ws/conflict/(?P<session_id>\d+)/$', consumers.ConflictConsumer.as_asgi()),
]
