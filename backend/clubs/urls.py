from rest_framework.routers import DefaultRouter

from .views import ClubViewSet, ShotSessionViewSet, ShotViewSet

router = DefaultRouter()
router.register(r"clubs", ClubViewSet, basename="club")
router.register(r"sessions", ShotSessionViewSet, basename="session")
router.register(r"shots", ShotViewSet, basename="shot")

urlpatterns = router.urls