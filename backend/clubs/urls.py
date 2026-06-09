from rest_framework.routers import DefaultRouter

from .views import ClubViewSet, ShotSessionViewSet

router = DefaultRouter()
router.register(r"clubs", ClubViewSet, basename="club")
router.register(r"sessions", ShotSessionViewSet, basename="session")

urlpatterns = router.urls