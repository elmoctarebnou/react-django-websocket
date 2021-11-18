import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
import chat.urls

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "mysite.settings")

application = ProtocolTypeRouter({
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat.urls.urlpatterns
        )
    ),
})