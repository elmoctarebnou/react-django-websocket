from django.urls import path, re_path
from chat.views import *


urlpatterns = [
    path("chat/<int:hhid>", ChatConsumer.as_asgi(), name="chat"),
]